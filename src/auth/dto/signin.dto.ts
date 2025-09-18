import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}


