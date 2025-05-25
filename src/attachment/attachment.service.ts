import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  async saveAttachments(attachments: Partial<Attachment>[]): Promise<Attachment[]> {
    return this.attachmentRepository.save(attachments);
  }
}
