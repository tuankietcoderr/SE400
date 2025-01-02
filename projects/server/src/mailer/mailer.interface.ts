import Mail from 'nodemailer/lib/mailer';

export type MailOptions = {
  to: string;
  subject: string;
  text: string;
  [key: string]: any;
};

export interface IMailerService {
  sendMail({ to, subject, text, ...otherOptions }: MailOptions): Promise<void>;
}
