import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [UserService]
})
export class NotificationsModule {}
