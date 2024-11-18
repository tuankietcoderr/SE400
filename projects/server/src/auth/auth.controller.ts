import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CurrentUser, Public } from 'src/common/decorators';
import { User } from 'src/common/entities';
import { LocalAuthGuard } from 'src/common/guards';
import { SuccessResponse } from 'src/common/responses';
import { AdminRegisterDto, CustomerRegisterDto, RefreshTokenDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Public()
  @Post('register/admin')
  async createAdmin(@Body() data: AdminRegisterDto) {
    return new SuccessResponse(await this.authService.createAdmin(data))
      .setMessage('Admin được tạo thành công')
      .setStatusCode(HttpStatus.CREATED);
  }

  @Public()
  @Post('register/customer')
  async createChatUser(@Body() data: CustomerRegisterDto) {
    return new SuccessResponse(await this.authService.createCustomer(data))
      .setMessage('Khách hàng được tạo thành công')
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