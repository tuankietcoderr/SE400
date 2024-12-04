import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Address, CancellationFee } from '../types';

export type CancellationPolicyDocument = HydratedDocument<CancellationPolicy>;

@Schema({ timestamps: true, collection: ENTITY_NAME.CANCELLATION_POLICY, autoCreate: true })
export class CancellationPolicy {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  policy_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Object,
    default: {
      fixed_amount: 0,
      percentage: 0
    } as CancellationFee
  })
  cancellation_fee: CancellationFee;

  @Prop({ default: 1 })
  hours_before_checkin: number;

  @Prop({
    type: [
      {
        ref: ENTITY_NAME.HOTEL,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  applicable_hotels: Types.ObjectId[];
}

export const CancellationPolicySchema = SchemaFactory.createForClass(CancellationPolicy);
