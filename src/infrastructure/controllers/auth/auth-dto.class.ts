import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ required: true, description: 'username' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true, description: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
