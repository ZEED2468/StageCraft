import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}


