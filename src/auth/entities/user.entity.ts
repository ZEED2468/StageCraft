import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  otpExpiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


