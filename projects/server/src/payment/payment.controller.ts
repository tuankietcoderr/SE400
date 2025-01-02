import { Body, Controller, Delete, Get, Inject, Ip, Param, ParseIntPipe, Post, Put, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { SuccessResponse } from 'src/common/responses';
import { CurrentUser, IpAddress, Public, Roles } from 'src/common/decorators';
import { EPaymentMethod, ERole } from 'src/common/enum';
import { Request, Response } from 'express';
import { VnpayService } from 'src/vnpay/vnpay.service';
import { ConfigService } from '@nestjs/config';
import { CashPaymentStrategy, OnlineBankingPaymentStrategy, PaymentContext } from './payment.strategy';
import { RefundDetails } from 'src/common/types';
import { CreateBookingRequestDto } from 'src/booking/booking.dto';
import { BookingService } from 'src/booking/booking.service';
import { User } from 'src/common/entities';
import { PaymentFactory } from './payment.factory';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly vnpayService: VnpayService,
    private readonly configService: ConfigService,
    private readonly bookingService: BookingService,
    private readonly paymentFactory: PaymentFactory
  ) {}

  @Roles([ERole.ADMIN])
  @Put(':id/status')
  async updatePaymentStatus(@Param('id') id: string, @Body() data: any) {
    return new SuccessResponse(await this.paymentService.updatePaymentStatus(id, data.status));
  }

  @Roles([ERole.ADMIN])
  @Get()
  async findAll() {
    return new SuccessResponse(await this.paymentService.findAll());
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return new SuccessResponse(await this.paymentService.findById(id));
  }

  @Roles([ERole.ADMIN])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return new SuccessResponse(await this.paymentService.delete(id));
  }

  @Post('create/:method')
  async create(
    @Body() payload: CreateBookingRequestDto,
    @Param('method') method: EPaymentMethod,
    @CurrentUser() user: User
  ) {
    const booking = await this.bookingService.create({
      ...payload,
      user_id: user._id.toString()
    });

    const payment = this.paymentFactory.createPayment(method);

    return new SuccessResponse(payment.pay(payload.total_price, booking.payment_id.toString()));
  }

  @Put(':id/refund')
  async refund(@Param('id') id: string, @Body('reason') reason: string) {
    return new SuccessResponse(await this.paymentService.refund(id, reason));
  }
}
