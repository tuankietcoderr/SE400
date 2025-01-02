import { MailerAdapter } from 'src/mailer/mailer.service';
import { INotificationStrategy, Notification, NotificationWithoutRecipient } from './notification.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailNotificationStrategy implements INotificationStrategy {
  private readonly mailService: MailerAdapter;
  constructor(configService: ConfigService) {
    this.mailService = new MailerAdapter(configService);
  }
  async sendNotification(notif: Notification): Promise<void> {
    await this.mailService.sendMail({
      to: notif.recipient,
      subject: notif.subject,
      text: notif.message
    });
  }
}
