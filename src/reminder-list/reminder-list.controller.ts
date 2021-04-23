import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReminderList } from './reminder-list.entity';
import { ReminderListService } from './reminder-list.service';

@Controller('reminder_list')
export class ReminderListController {
  constructor(private readonly reminderListService: ReminderListService) {}

  @Get()
  async findAll(
    @Query() query,
  ): Promise<{
    lists: ReminderList[];
  }> {
    const { skip, take } = query;
    const lists = await this.reminderListService.findAll({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });
    return {
      lists,
    };
  }

  @Post()
  create(@Body() reminderList: ReminderList): Promise<ReminderList> {
    return this.reminderListService.create(reminderList);
  }

  @Patch(':list_id')
  async update(
    @Param('list_id') id: number,
    @Body() reminderList: ReminderList,
  ): Promise<ReminderList> {
    await this.reminderListService.update(id, reminderList);
    return this.reminderListService.findOne(id);
  }

  @Delete(':list_id')
  async delete(
    @Param('list_id') id: number,
  ): Promise<{
    id: number;
    deleted: boolean;
  }> {
    const reminderList = await this.reminderListService.findOne(id);
    if (reminderList) {
      await this.reminderListService.delete(id);
      return {
        id,
        deleted: true,
      };
    } else {
      return {
        id,
        deleted: false,
      };
    }
  }
}
