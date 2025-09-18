import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'The OTP received in email' })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({ example: 'newpassword123', description: 'The new password' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;
}
