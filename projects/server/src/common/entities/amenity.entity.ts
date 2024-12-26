import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types } from 'mongoose';

export type AmenityDocument = HydratedDocument<Amenity>;

@Schema({ timestamps: true, collection: ENTITY_NAME.AMENTY, autoCreate: true })
export class Amenity {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string | null;
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
