export type Notification = {
  message: string;
  recipient: string;
  subject: string;
};

export type NotificationWithoutRecipient = Omit<Notification, 'recipient'>;

export interface INotificationStrategy {
  sendNotification(notif: Notification): Promise<void>;
}

export interface INotificationObserver {
  getNotificationId(): string;
  receiveNotification(notif: NotificationWithoutRecipient): Promise<void>;
}
