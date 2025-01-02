import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, MinLength } from 'class-validator';
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
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
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
