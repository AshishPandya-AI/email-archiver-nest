import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GmailService } from './gmail.service';
import { HttpModule } from '@nestjs/axios';
import { EmailModule } from '../email/email.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { DriveModule } from '../drive/drive.module';

@Module({
  imports: [HttpModule, EmailModule, AttachmentModule, DriveModule],
  providers: [GoogleAuthService, GmailService],
})
export class GoogleModule {}
