import { Injectable, UnauthorizedException, BadRequestException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as SYS_MSG from '../common/SystemMessages';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { Request } from 'express';
import { EmailService } from '../email/email.service';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  /* 
  =======================================
  User Registration Method
  ========================================
  */
  async register(createUserDto: CreateUserDto, req?: Request) {
    const { email, fullName, password } = createUserDto;
    if (!email || !fullName || !password)
      throw new BadRequestException(SYS_MSG.MISSING_FIELDS);
    const existing = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existing) throw new BadRequestException(SYS_MSG.USER_ACCOUNT_EXIST);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = randomInt(100000, 999999).toString();
    
    try {
      await this.emailService.sendOtpEmail({ email, fullName }, otp);
    } catch (error) {
      throw new BadRequestException(SYS_MSG.EMAIL_SENDING_FAILED);
    }

    const user = this.userRepository.create({
      email,
      fullName,
      password: hashedPassword,
      isEmailVerified: false,
      otp: await bcrypt.hash(otp, 10),
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });
    const saved = await this.userRepository.save(user);
    const { accessToken } = this.generateTokens(saved);
    return {
      statusCode: HttpStatus.CREATED,
      message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
      data: {
        user: {
          id: saved.id,
          email: saved.email,
          fullName: saved.fullName,
          isEmailVerified: saved.isEmailVerified,
          createdAt: saved.createdAt,
        },
        accessToken,
      },
    };
  }

  /* 
  =======================================
  User Login Method
  ========================================
  */
  async login(signIn: SignInDto) {
    const fieldsInDto = Object.keys(signIn);
    if (fieldsInDto.length !== 2 || !signIn.email || !signIn.password)
      throw new UnauthorizedException(SYS_MSG.INVALID_FIELDS);
    const user = await this.validateUser(signIn.email, signIn.password);
    const { accessToken } = this.generateTokens(user);
    return {
      statusCode: HttpStatus.OK,
      message: SYS_MSG.LOGIN_SUCCESSFUL,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
        },
        accessToken,
      },
    };
  }

  /* 
  =======================================
  Google Authentication Method
  ========================================
  */
  async googleAuth(googleAuthPayload: { id_token: string }) {
    const idToken = googleAuthPayload.id_token;
    if (!idToken)
      throw new UnauthorizedException(SYS_MSG.INVALID_CREDENTIALS);
    
    try {
      const request = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
      );
      const verifyTokenResponse = await request.json();

      // Check if the response contains an error
      if (verifyTokenResponse.error || verifyTokenResponse.error_description) {
        throw new UnauthorizedException(SYS_MSG.INVALID_CREDENTIALS);
      }

      const { email: userEmail, name: userName } = verifyTokenResponse;

      // Validate that we have the required email
      if (!userEmail) {
        throw new UnauthorizedException(SYS_MSG.INVALID_CREDENTIALS);
      }

      const user = await this.validateOrCreateGoogleUser(userEmail, userName);
      const { accessToken } = this.generateTokens(user);
      
      return {
        statusCode: HttpStatus.OK,
        message: SYS_MSG.LOGIN_SUCCESSFUL,
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            createdAt: user.createdAt,
          },
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(SYS_MSG.SERVER_ERROR);
    }
  }

  /*
  =======================================
  Generate JWT Tokens Method
  ========================================
  */
  generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload); 
    return { accessToken };
  }

  /*
  =======================================
  Validate User Credentials Method
  ========================================
  */
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { where: { email }, 
      select: ['id','email','fullName','password','isEmailVerified','createdAt','updatedAt'] 
    });
    if (!user) throw new UnauthorizedException(SYS_MSG.USER_ACCOUNT_DOES_NOT_EXIST);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException(SYS_MSG.INVALID_PASSWORD);
    
    if (!user.isEmailVerified) {
      // Re-send OTP
      const otp = randomInt(100000, 999999).toString();
      user.otp = await bcrypt.hash(otp, 10);
      user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      await this.userRepository.save(user);
      await this.emailService.sendOtpEmail(user, otp);

      throw new UnauthorizedException(SYS_MSG.EMAIL_NOT_VERIFIED);
    }
    
    return user;
  }

  /* 
  ==========================================
  Validate or Create User for Google OAuth
  ==========================================
  */
  private async validateOrCreateGoogleUser(email: string, name: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      const randomPassword = 'google_' + Math.random().toString(36).slice(2);
      const hash = await bcrypt.hash(randomPassword, 10);
      const created = this.userRepository.create({ 
        email, 
        fullName: name || 'Google User', 
        password: hash,
        isEmailVerified: true, // Google users are automatically verified
      });
      user = await this.userRepository.save(created);
    }
    
    return user;
  }

  /* 
  =======================================
  Send OTP Method
  ========================================
  */
  async sendOtp(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new BadRequestException(SYS_MSG.USER_ACCOUNT_DOES_NOT_EXIST);

    const otp = randomInt(100000, 999999).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await this.userRepository.save(user);
    try {
      await this.emailService.sendOtpEmail(user, otp);
    } catch (error) {
      throw new BadRequestException(SYS_MSG.OTP_EMAIL_FAILED);
    }
    return { message: SYS_MSG.OTP_SENT_SUCCESSFULLY };
  }

  /* 
  =======================================
  Validate OTP Method
  ========================================
  */
  async validateOtp(email: string, otp: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException(SYS_MSG.USER_ACCOUNT_DOES_NOT_EXIST);
    }
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      throw new UnauthorizedException(SYS_MSG.OTP_INVALID_OR_EXPIRED);
    }
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      throw new UnauthorizedException(SYS_MSG.OTP_INVALID_OR_EXPIRED);
    }
    user.otp = null;
    user.otpExpiresAt = null;
    user.isEmailVerified = true;
    await this.userRepository.save(user);
    return { message: SYS_MSG.OTP_VALIDATED_SUCCESSFULLY };
  }

  /* 
  =======================================
  Forgot Password Method
  ========================================
  */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new BadRequestException(SYS_MSG.USER_ACCOUNT_DOES_NOT_EXIST);
    }

    const otp = randomInt(100000, 999999).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    
    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await this.userRepository.save(user);
    
    try {
      await this.emailService.sendForgotPasswordEmail(user, otp);
    } catch (error) {
      throw new BadRequestException(SYS_MSG.OTP_EMAIL_FAILED);
    }
    
    return { message: SYS_MSG.FORGOT_PASSWORD_OTP_SENT };
  }

  /* 
  =======================================
  Reset Password Method
  ========================================
  */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, otp, newPassword } = resetPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException(SYS_MSG.USER_ACCOUNT_DOES_NOT_EXIST);
    }
    
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      throw new UnauthorizedException(SYS_MSG.INVALID_RESET_OTP);
    }
    
    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      throw new UnauthorizedException(SYS_MSG.INVALID_RESET_OTP);
    }
    
    // Reset password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await this.userRepository.save(user);
    
    return { message: SYS_MSG.PASSWORD_RESET_SUCCESSFUL };
  }

}