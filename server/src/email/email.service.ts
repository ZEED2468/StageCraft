import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  /*
   =============================
   Send Welcome OTP Email
   =============================
   */
  async sendOtpEmail(
    userDetails: { email: string; fullName: string },
    otp: string,
  ) {
    await this.mailerService.sendMail({
      to: userDetails.email,
      subject: 'Your OTP Code',
      template: './signup',
      context: {
        username: userDetails.fullName,
        otp,
      },
    });
  }

  /*
   =============================
   Send Forgot Password OTP Email
   =============================
   */
  async sendForgotPasswordEmail(
    userDetails: { email: string; fullName: string },
    otp: string,
  ) {
    await this.mailerService.sendMail({
      to: userDetails.email,
      subject: 'Password Reset Request',
      template: './forgetpassword',
      context: {
        username: userDetails.fullName,
        otp,
      },
    });
  }
}
