import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  async saveEmail(email: Partial<Email>): Promise<Email> {
    return this.emailRepository.save(email);
  }

  async exists(messageId: string): Promise<boolean> {
    const count = await this.emailRepository.count({ where: { messageId } });
    return count > 0;
  }
}
