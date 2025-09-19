import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';
import { GoogleAuthPayloadDto } from './dto/google-auth.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SendOtpDto, ValidateOtpDto } from './dto/otp.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAuthCookie(res: Response, accessToken: string): void {
    res.cookie('access_token', accessToken, {
      httpOnly: true, // Prevents XSS attacks - cookie not accessible via JavaScript
      sameSite: 'lax', // CSRF protection - cookie sent only on same-site requests
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
    });
  }

  /** API Endpoint for User Registration */
  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const response = await this.authService.register(createUserDto);
    this.setAuthCookie(res, response.data.accessToken);
    return response;
  }

  /** API Endpoint for User Login */
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const response = await this.authService.login(loginDto);
    this.setAuthCookie(res, response.data.accessToken);
    return response;
  }

  /** API Endpoint for Google Authentication */
  @Post('google')
  @HttpCode(200)
  @ApiOperation({ summary: 'Google authentication' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated via Google',
    type: AuthResponseDto,
  })
  async google(
    @Body() body: GoogleAuthPayloadDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const response = await this.authService.googleAuth(body);
    this.setAuthCookie(res, response.data.accessToken);
    return response;
  }

  /** API Endpoint for sending OTP to user's registered email */
  @Post('send-otp')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send OTP to user' })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto.email);
  }

  /** API Endpoint for validating OTP sent to user's registered email */
  @Post('verify-otp')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify OTP sent to user' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or expired OTP' })
  async validateOtp(@Body() validateOtpDto: ValidateOtpDto) {
    const { email, otp } = validateOtpDto;
    return this.authService.validateOtp(email, otp);
  }

  /** API Endpoint for forgot password request */
  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiResponse({
    status: 200,
    description: 'Password reset OTP sent successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  /** API Endpoint for reset password with OTP */
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset password with OTP verification' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or expired OTP' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
