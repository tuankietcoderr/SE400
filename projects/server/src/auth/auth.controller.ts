import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Put,
  Redirect,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CurrentUser, Public } from 'src/common/decorators';
import { User } from 'src/common/entities';
import { LocalAuthGuard } from 'src/common/guards';
import { SuccessResponse } from 'src/common/responses';
import { RefreshTokenDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from 'src/common/guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @Redirect('http://localhost:8080/user/login/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const data = await this.authService.googleLogin(req);
    return {
      url: `http://localhost:8080/user/login/google/callback?token=${data.accessToken}&refreshToken=${data.refreshToken}`
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return new SuccessResponse(await this.authService.login(user)).setMessage('Đăng nhập thành công');
  }

  @Get('me')
  async currentUser(@CurrentUser() user: User) {
    return new SuccessResponse(user).setMessage('Thông tin người dùng');
  }

  @Put('me')
  async updateProfile(@CurrentUser() user: User, @Body() data: any) {
    console.log(data);
    return new SuccessResponse(await this.authService.updateProfile(user._id.toString(), data)).setMessage(
      'Cập nhật thông tin thành công'
    );
  }

  @Public()
  @Post('register')
  async createChatUser(@Body() data: RegisterDto) {
    return new SuccessResponse(await this.authService.createUser(data))
      .setMessage('Đăng ký thành công')
      .setStatusCode(HttpStatus.CREATED);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return new SuccessResponse(await this.authService.refreshToken(data.refreshToken)).setMessage(
      'Token đã được cập nhật'
    );
  }

  @Delete('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout(function (err) {
      if (err) {
        return new InternalServerErrorException(err.message);
      }
    });

    return res.send(new SuccessResponse(true).setMessage('Đăng xuất thành công'));
  }
}
