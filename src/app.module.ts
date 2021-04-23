import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReminderListItem } from './reminder-list-item/reminder-list-item.entity';
import { ReminderList } from './reminder-list/reminder-list.entity';
import { ReminderListModule } from './reminder-list/reminder-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [ReminderList, ReminderListItem],
      synchronize: true,
    }),
    ReminderListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
