import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
