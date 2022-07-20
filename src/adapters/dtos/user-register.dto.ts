import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  readonly email: string;

  @IsString()
  @Length(5, 50)
  @ApiProperty({ required: true })
  readonly password: string;
}
