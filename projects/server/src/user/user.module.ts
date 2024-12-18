import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [],
  providers: [UserService, AddressService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
