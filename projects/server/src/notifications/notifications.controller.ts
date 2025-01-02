import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationManager } from './notification.manager';
import { SuccessResponse } from 'src/common/responses';
import { CurrentUser, Roles } from 'src/common/decorators';
import { ENotificationType, ERole } from 'src/common/enum';
import { User } from 'src/common/entities';
import { UserObserver } from './user.observer';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Controller('notifications')
export class NotificationsController {
  private readonly notificationsManager: NotificationManager = NotificationManager.Instance;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  @Roles([ERole.ADMIN])
  @Get('send')
  async send() {
    return new SuccessResponse(
      this.notificationsManager.sendNotification({
        message: 'Hello',
        subject: 'Test'
      })
    );
  }

  @Post('subscribe')
  async subscribe(@CurrentUser() user: User, @Body('notification_types') notificationTypes: ENotificationType[]) {
    const updatedUser = await this.userService.subscribeToNotifications(user._id.toString(), notificationTypes);

    this.notificationsManager.removeObserver(new UserObserver(user, this.configService));
    if (updatedUser.notification_types.length > 0) {
      this.notificationsManager.addObserver(new UserObserver(user, this.configService));
    }

    return new SuccessResponse(null);
  }
}
