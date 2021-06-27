import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

@Entity()
class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column({ type: 'simple-json', array: false, default: () => "'[]'" })
  columns!: IColumn[];
}

export default Board;
