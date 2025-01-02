import { EPaymentMethod } from 'src/common/enum';
import { CashPaymentStrategy, OnlineBankingPaymentStrategy, PaymentStrategy } from './payment.strategy';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VnpayService } from 'src/vnpay/vnpay.service';

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly vnPayService: VnpayService
  ) {}
  createPayment(pm: EPaymentMethod): PaymentStrategy {
    switch (pm) {
      case EPaymentMethod.ONLINE_BANKING:
        return new OnlineBankingPaymentStrategy(this.vnPayService, this.configService);
      case EPaymentMethod.CASH:
      default:
        return new CashPaymentStrategy();
    }
  }
}
