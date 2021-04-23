import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReminderListItem } from 'src/reminder-list-item/reminder-list-item.entity';

@Entity()
export class ReminderList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at?: Date;

  @OneToMany(() => ReminderListItem, (item) => item.list)
  items: ReminderListItem[];
}
