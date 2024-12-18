import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { ERole } from 'src/common/enum';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone_number: string;

  @IsNotEmpty()
  @IsEnum(ERole)
  role: ERole;
}
