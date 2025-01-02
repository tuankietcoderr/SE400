import { User } from 'src/common/entities';
import { INotificationObserver, NotificationWithoutRecipient } from './notification.interface';
import { NotificationContext } from './notification.context';
import { ENotificationType } from 'src/common/enum';
import { EmailNotificationStrategy } from './email.strategy';
import { PushNotificationStrategy } from './push.strategy';
import { SmsNotificationStrategy } from './sms.strategy';
import { ConfigService } from '@nestjs/config';

export class UserObserver implements INotificationObserver {
  private user: User;
  private context: NotificationContext;
  private readonly configService: ConfigService;
  private notificationId: string;

  constructor(user: User, configService: ConfigService) {
    this.user = user;
    this.context = new NotificationContext();
    this.configService = configService;
    this.notificationId = user._id.toString();
  }

  getNotificationId(): string {
    return this.notificationId;
  }

  async receiveNotification(notif: NotificationWithoutRecipient): Promise<void> {
    let recipient = null;
    switch (true) {
      case this.user.notification_types.includes(ENotificationType.EMAIL):
        recipient = this.user.email;
        this.context.setStrategy(new EmailNotificationStrategy(this.configService));
        break;
      case this.user.notification_types.includes(ENotificationType.PUSH):
        recipient = ''; // device token
        this.context.setStrategy(new PushNotificationStrategy());
        break;
      case this.user.notification_types.includes(ENotificationType.SMS):
        recipient = this.user.phone_number;
        this.context.setStrategy(new SmsNotificationStrategy());
        break;
      default:
        break;
    }
    if (recipient) {
      await this.context.sendNotification({
        ...notif,
        recipient
      });
    }
  }
}
