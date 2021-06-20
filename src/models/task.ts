import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Board from './board';
import User from './user';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column('integer')
  order!: number;

  @Column('text')
  description!: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  userId!: string | null;

  @ManyToOne(() => Board, board => board.id, {
    eager: false,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string | null;

  @Column('text', { nullable: true })
  columnId!: string | null;
}

export default Task;
