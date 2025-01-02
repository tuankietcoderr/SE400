import { INotificationStrategy, Notification } from './notification.interface';

export class PushNotificationStrategy implements INotificationStrategy {
  async sendNotification(notif: Notification): Promise<void> {}
}
