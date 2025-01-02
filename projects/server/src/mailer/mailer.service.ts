import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { IMailerService, MailOptions } from './mailer.interface';

@Injectable()
export class MailerAdapter implements IMailerService {
  private transporter: Transporter;
  private mailUser: string;
  private readonly logger = new Logger(MailerAdapter.name);

  constructor(private configService: ConfigService) {
    this.transporter = this.initialize();

    this.transporter.on('error', (error) => {
      this.logger.error(error.message, error.stack);
    });
  }

  private initialize() {
    this.mailUser = this.configService.get('MAIL_USER');
    return createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: this.configService.get('MAIL_SECURE'),
      auth: {
        user: this.mailUser,
        pass: this.configService.get('MAIL_PASSWORD')
      }
    });
  }

  async sendMail({ to, subject, text, ...options }: MailOptions): Promise<void> {
    return await this.transporter
      .sendMail({
        from: `"Booking No Reply" <${this.mailUser}>`,
        to,
        subject,
        text,
        ...options
      })
      .catch((error) => {
        this.logger.error(error.message, error.stack);
        throw error;
      });
  }
}
