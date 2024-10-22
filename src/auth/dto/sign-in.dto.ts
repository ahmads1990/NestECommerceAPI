import { IsEmail, IsString, Length } from 'class-validator';

export class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 20)
  password: string;
}
