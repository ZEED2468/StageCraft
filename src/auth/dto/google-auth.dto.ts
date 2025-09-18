import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthPayloadDto {
  @ApiProperty({ example: 'eyJhbGciOiJSUzI1NiIs...', description: 'Google ID token from client' })
  @IsString()
  @IsNotEmpty()
  id_token: string;
}


