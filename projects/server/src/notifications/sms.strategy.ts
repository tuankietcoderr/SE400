import { INotificationStrategy, Notification } from './notification.interface';

export class SmsNotificationStrategy implements INotificationStrategy {
  async sendNotification(notif: Notification): Promise<void> {}
}
