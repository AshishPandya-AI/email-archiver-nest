import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Attachment } from '../attachment/attachment.entity';

@Entity()
export class Email {
  @PrimaryColumn()
  messageId: string;

  @Column()
  threadId: string;

  @Column()
  subject: string;

  @Column()
  from: string;

  @Column('text')
  to: string;

  @Column('text', { nullable: true })
  cc: string;

  @Column('text', { nullable: true })
  bcc: string;

  @Column()
  timestamp: Date;

  @Column('text', { nullable: true })
  textBody: string;

  @Column('text', { nullable: true })
  htmlBody: string;

  @OneToMany(() => Attachment, attachment => attachment.email, { cascade: true })
  attachments: Attachment[];
}
