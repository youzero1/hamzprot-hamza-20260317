import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', nullable: true })
  imageUrl!: string;

  @Column({ type: 'text', nullable: true })
  liveUrl!: string;

  @Column({ type: 'text', nullable: true })
  repoUrl!: string;

  @Column({ type: 'text' })
  techStack!: string;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
