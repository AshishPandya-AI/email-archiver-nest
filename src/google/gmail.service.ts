import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuthService } from './google-auth.service';
import { EmailService } from '../email/email.service';
import { AttachmentService } from '../attachment/attachment.service';
import { DriveService } from '../drive/drive.service';

@Injectable()
export class GmailService {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly emailService: EmailService,
    private readonly attachmentService: AttachmentService,
    private readonly driveService: DriveService,
  ) {}

  async fetchAndStoreEmails() {
    const oAuth2Client = this.googleAuthService.getOAuth2Client();
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    const messages = res.data.messages || [];

    for (const msg of messages) {
      const message = await gmail.users.messages.get({ userId: 'me', id: msg.id });
      const payload = message.data.payload;
      const headers = payload.headers.reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {});
      const messageId = message.data.id;
      if (await this.emailService.exists(messageId)) continue;

      const emailData = {
        messageId,
        threadId: message.data.threadId,
        subject: headers['Subject'] || '',
        from: headers['From'] || '',
        to: headers['To'] || '',
        cc: headers['Cc'] || '',
        bcc: headers['Bcc'] || '',
        timestamp: new Date(parseInt(message.data.internalDate)),
        textBody: '',
        htmlBody: '',
        attachments: [],
      };

      const parts = payload.parts || [];
      for (const part of parts) {
        if (part.mimeType === 'text/plain') {
          emailData.textBody = Buffer.from(part.body.data, 'base64').toString();
        } else if (part.mimeType === 'text/html') {
          emailData.htmlBody = Buffer.from(part.body.data, 'base64').toString();
        } else if (part.filename && part.body.attachmentId) {
          const attachment = await gmail.users.messages.attachments.get({
            userId: 'me',
            messageId: msg.id,
            id: part.body.attachmentId,
          });
          const buffer = Buffer.from(attachment.data.data, 'base64');
          const driveLink = await this.driveService.uploadFile(part.filename, buffer);
          emailData.attachments.push({ filename: part.filename, mimetype: part.mimeType, size: buffer.length, driveLink });
        }
      }

      const savedEmail = await this.emailService.saveEmail(emailData);
      await this.attachmentService.saveAttachments(emailData.attachments.map(att => ({ ...att, email: savedEmail })));
    }
  }
}
