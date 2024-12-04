import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { ERole } from 'src/common/enum';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone_number: string;

  @IsNotEmpty()
  @IsEnum(ERole)
  role: ERole;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}
