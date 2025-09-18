import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ValidateOtpDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'The otp received in mail' })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
