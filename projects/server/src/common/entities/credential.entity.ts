import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ENTITY_NAME } from '../constants';

export type CredentialDocument = HydratedDocument<Credential>;

@Schema({ timestamps: true, collection: ENTITY_NAME.CREDENTIAL, autoCreate: true })
export class Credential {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ENTITY_NAME.USER, required: true, index: true })
  user: string | User;

  @Prop({ required: true })
  password: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
