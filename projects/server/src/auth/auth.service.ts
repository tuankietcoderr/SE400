import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CredentialService } from 'src/credential/credential.service';
import { User } from 'src/common/entities';
import { IDataFilter, ITokenPayload } from 'src/common/interfaces';
import { HashHelperService } from 'src/common/helpers';
import { EAuthStrategy, ERole } from 'src/common/enum';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashHelper: HashHelperService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly credentialService: CredentialService
  ) {}

  async signJwtToken(user: User) {
    const accessTokenExpirationTime = this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
    const refreshTokenExpirationTime = this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
    const payload: ITokenPayload = {
      userId: user._id.toString(),
      role: user.role
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: accessTokenExpirationTime,
        secret: this.configService.get('JWT_SECRET')
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: refreshTokenExpirationTime,
        secret: this.configService.get('JWT_SECRET')
      }),
      accessTokenExpiration: accessTokenExpirationTime,
      refreshTokenExpiration: refreshTokenExpirationTime
    };
  }

  async login(user: User) {
    const tokens = await this.signJwtToken(user);

    return {
      ...tokens,
      user
    };
  }

  async createUser(data: RegisterDto) {
    const { email, password, role, phone_number } = data;
    const user = await this.userService.getUserByEmailOrPhone(email, phone_number);

    if (user) {
      throw new ConflictException('Email/SĐT đã tồn tại');
    }

    let newUser: User;

    switch (role) {
      case ERole.ADMIN:
        newUser = await this.userService.createAdmin(data);
        break;
      case ERole.CUSTOMER:
        newUser = await this.userService.createCustomer(data);
        break;
      default:
        throw new BadRequestException('Role không hợp lệ');
    }

    const hashedPassword = await this.hashHelper.hashPassword(password);

    await this.credentialService.create({
      user: newUser,
      password: hashedPassword
    });

    const tokens = await this.signJwtToken(newUser);

    return {
      ...tokens,
      user: newUser
    };
  }

  async validateUser(data: LoginDto) {
    const user = await this.userService.getUserByEmailOrThrow(data.email);

    const credential = await this.credentialService.findByUserId(user._id);

    const isMatchPassword = await this.hashHelper.comparePassword(data.password, credential.password);

    if (!isMatchPassword) {
      throw new BadRequestException('Mật khẩu không chính xác');
    }
    return user;
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
      ignoreExpiration: true
    });

    const { userId, exp } = payload;
    const expSecond = exp * 1000;

    if (expSecond < Date.now()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.userService.getUser(userId);

    return this.signJwtToken(user);
  }
}
