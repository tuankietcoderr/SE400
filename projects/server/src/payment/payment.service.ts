import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from 'src/common/entities';
import { CreatePaymentRequestDto } from './payment.dto';
import * as dayjs from 'dayjs';
import { EPaymentStatus } from 'src/common/enum';
import { RefundDetails } from 'src/common/types';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument>) {}

  async create(payload: CreatePaymentRequestDto) {
    const transaction_id = `TXN-${dayjs().format('YYYYMMDDHHmmss')}`;
    return await this.paymentModel.create({
      ...payload,
      transaction_id
    });
  }

  async findAll() {
    return await this.paymentModel.find(
      {},
      {},
      {
        populate: [
          {
            path: 'user_id',
            select: 'name'
          },
          {
            path: 'booking_id',
            select: 'booking_id'
          }
        ]
      }
    );
  }

  async findById(id: string) {
    return await this.paymentModel.findById(
      id,
      {},
      {
        populate: [
          {
            path: 'user_id',
            select: 'name email phone_number'
          },
          {
            path: 'booking_id',
            select: 'booking_id'
          }
        ]
      }
    );
  }

  async findByIdOrThrow(id: string) {
    const payment = await this.findById(id);
    if (!payment) {
      throw new NotFoundException('Không tìm thấy giao dịch');
    }
    return payment;
  }

  async updatePaymentStatus(payment_id: string, status: EPaymentStatus) {
    const payment = await this.findByIdOrThrow(payment_id);
    payment.status = status;
    return await payment.save();
  }

  async delete(id: string) {
    const payment = await this.paymentModel.findByIdAndDelete(id);
    if (!payment) {
      throw new NotFoundException('Không tìm thấy giao dịch');
    }
    return payment;
  }

  async refund(id: string, detail: string) {
    const payment = await this.paymentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          refund_details: {
            refund_reason: detail,
            refund_date: new Date()
          } as RefundDetails,
          status: EPaymentStatus.REFUNDED
        }
      },
      { new: true }
    );
    if (!payment) {
      throw new NotFoundException('Không tìm thấy giao dịch');
    }
    return payment;
  }
}
