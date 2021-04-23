import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReminderListService } from './reminder-list.service';
import { ReminderListController } from './reminder-list.controller';
import { ReminderList } from './reminder-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderList])],
  providers: [ReminderListService],
  controllers: [ReminderListController],
})
export class ReminderListModule {}
