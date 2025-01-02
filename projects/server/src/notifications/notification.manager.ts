import { Injectable } from '@nestjs/common';
import { INotificationObserver, NotificationWithoutRecipient } from './notification.interface';

@Injectable()
export class NotificationManager {
  private observers: INotificationObserver[];

  private static instance: NotificationManager;

  private constructor() {
    this.observers = [];
  }

  getObservers(): INotificationObserver[] {
    return this.observers;
  }

  addObservers(observers: INotificationObserver[]): void {
    this.observers.push(...observers);
  }

  addObserver(observer: INotificationObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: INotificationObserver): void {
    this.observers = this.observers.filter((obs) => obs.getNotificationId() !== observer.getNotificationId());
  }

  notifyObservers(notif: NotificationWithoutRecipient): void {
    this.observers.forEach((observer) => observer.receiveNotification(notif));
  }

  sendNotification(notif: NotificationWithoutRecipient): void {
    this.notifyObservers(notif);
  }

  public static get Instance(): NotificationManager {
    return this.instance || (this.instance = new this());
  }
}
