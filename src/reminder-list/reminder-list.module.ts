import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderListService } from './reminder-list.service';
import { ReminderListController } from './reminder-list.controller';
import { ReminderList } from './reminder-list.entity';
import { ReminderListItemService } from 'src/reminder-list-item/reminder-list-item.service';
import { ReminderListItem } from 'src/reminder-list-item/reminder-list-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderList, ReminderListItem])],
  providers: [ReminderListService, ReminderListItemService],
  controllers: [ReminderListController],
})
export class ReminderListModule {}
