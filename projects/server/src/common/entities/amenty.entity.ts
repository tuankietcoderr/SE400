import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types } from 'mongoose';

export type AmentyDocument = HydratedDocument<Amenty>;

@Schema({ timestamps: true, collection: ENTITY_NAME.AMENTY, autoCreate: true })
export class Amenty {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string | null;
}

export const AmentySchema = SchemaFactory.createForClass(Amenty);
