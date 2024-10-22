import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(10, 20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 20)
  password: string;

  @Length(10, 20)
  isVendor: boolean;

  @IsString()
  @Length(10, 200)
  description: string;

  @IsString()
  @Length(10, 200)
  address: string;
}
