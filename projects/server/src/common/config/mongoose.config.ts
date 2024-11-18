import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminSchema,
  Credential,
  CredentialSchema,
  Customer,
  CustomerSchema,
  User,
  UserSchema
} from 'src/common/entities';

const MODELS: ModelDefinition[] = [
  {
    name: User.name,
    schema: UserSchema,
    discriminators: [
      { name: Admin.name, schema: AdminSchema },
      { name: Customer.name, schema: CustomerSchema }
    ]
  },
  { name: Credential.name, schema: CredentialSchema }
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule]
})
export class MongooseModelsModule {}
