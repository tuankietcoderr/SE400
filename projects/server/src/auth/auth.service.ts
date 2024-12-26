import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/entities';
import { ERole } from 'src/common/enum';
import { HashHelperService } from 'src/common/helpers';
import { ITokenPayload } from 'src/common/interfaces';
import { CredentialService } from 'src/credential/credential.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Request } from 'express';

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

    const newUser = await this.userService.createUser(data);

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
    const user = await this.userService.getUserByEmailOrPhone(data.email, data.email);

    if (!user) {
      throw new BadRequestException('Email/SĐT không tồn tại');
    }

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
      throw new UnauthorizedException('Token đã hết hạn');
    }

    const user = await this.userService.getUser(userId);

    return this.signJwtToken(user);
  }

  async updateProfile(userId: string, data: any) {
    return await this.userService.updateProfile(userId, data);
  }

  async googleLogin(req: Request) {
    const googleUser = req.user as User;

    if (!googleUser) {
      throw new UnauthorizedException('Không thể đăng nhập bằng Google');
    }

    const user = await this.userService.getUserByEmail(googleUser.email);

    if (!user) {
      const newUser = await this.userService.createUser({
        email: googleUser.email,
        name: googleUser.name,
        role: ERole.CUSTOMER,
        password: await this.hashHelper.generateRandomString(10)
      });

      const tokens = await this.signJwtToken(newUser);

      return {
        ...tokens,
        user: newUser
      };
    }

    const tokens = await this.signJwtToken(user);

    return {
      ...tokens,
      user
    };
  }
}
