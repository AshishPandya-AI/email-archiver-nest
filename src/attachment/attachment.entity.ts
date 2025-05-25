import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Email } from '../email/email.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  driveLink: string;

  @ManyToOne(() => Email, email => email.attachments, { onDelete: 'CASCADE' })
  email: Email;
}
