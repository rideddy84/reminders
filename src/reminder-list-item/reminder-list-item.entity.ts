import { ReminderList } from 'src/reminder-list/reminder-list.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ReminderListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReminderList, (list) => list.items)
  list: ReminderList;

  @Column()
  name: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at?: Date;

  remind_at?: Date;
}
