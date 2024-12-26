import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VnpayService } from 'src/vnpay/vnpay.service';

export interface PaymentStrategy {
  pay(total_price: number, payment_id: string): string | void;
}

@Injectable()
export class CashPaymentStrategy implements PaymentStrategy {
  pay(total_price: number, payment_id: string): void {
    return;
  }
}

@Injectable()
export class OnlineBankingPaymentStrategy implements PaymentStrategy {
  constructor(
    private readonly vnpayService: VnpayService,
    private readonly configService: ConfigService
  ) {}
  pay(total_price: number, payment_id: string): string {
    return this.vnpayService.buildPaymentUrl({
      vnp_Amount: total_price,
      vnp_OrderInfo: payment_id,
      vnp_IpAddr: '127.0.0.1',
      vnp_ReturnUrl: this.configService.get<string>('VNPAY_RETURN_URL'),
      vnp_TxnRef: `TXN-${new Date().getTime()}`
    });
  }
}

@Injectable()
export class PaymentContext {
  private paymentStrategy: PaymentStrategy;

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  pay(total_price: number, payment_id: string): string | void {
    return this.paymentStrategy.pay(total_price, payment_id);
  }
}
