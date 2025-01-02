import { INotificationStrategy, Notification } from './notification.interface';

export class NotificationContext {
  private strategy: INotificationStrategy;

  setStrategy(strategy: INotificationStrategy): void {
    this.strategy = strategy;
  }

  async sendNotification(notif: Notification): Promise<void> {
    if (!this.strategy) {
      throw new Error('Notification strategy is not set');
    }
    await this.strategy.sendNotification(notif);
  }
}
