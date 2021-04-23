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
import { ReminderListItem } from 'src/reminder-list-item/reminder-list-item.entity';
import { ReminderListItemService } from 'src/reminder-list-item/reminder-list-item.service';
import { ReminderList } from './reminder-list.entity';
import { ReminderListService } from './reminder-list.service';

@Controller('reminder_list')
export class ReminderListController {
  constructor(
    private readonly reminderListService: ReminderListService,
    private readonly reminderListItemService: ReminderListItemService,
  ) {}

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

  @Post(':list_id/item')
  createItem(
    @Param('list_id') listId: number,
    @Body() reminderListItem: ReminderListItem,
  ): Promise<ReminderListItem> {
    return this.reminderListItemService.create({
      ...reminderListItem,
      listId,
    });
  }

  @Get(':list_id/item')
  async findAllItem(
    @Param('list_id') listId: number,
    @Query() query,
  ): Promise<{
    items: ReminderListItem[];
  }> {
    const { skip, take } = query;
    const items = await this.reminderListItemService.findAll({
      skip,
      take,
      order: {
        remind_at: 'DESC',
      },
      where: {
        listId,
      },
    });
    return {
      items,
    };
  }

  @Patch(':list_id/item/:item_id')
  async updateItem(
    @Param('list_id') listId: number,
    @Param('item_id') id: number,
    @Body() reminderListItem: ReminderListItem,
  ): Promise<ReminderListItem> {
    await this.reminderListItemService.update(id, listId, reminderListItem);
    return this.reminderListItemService.findOne(id);
  }

  @Delete(':list_id/item/:item_id')
  async deleteItem(
    @Param('list_id') listId: number,
    @Param('item_id') id: number,
  ): Promise<{
    id: number;
    list_id: number;
    deleted: boolean;
  }> {
    const reminderList = await this.reminderListItemService.findOne(id);
    if (reminderList) {
      await this.reminderListItemService.delete(id, listId);
      return {
        id,
        list_id: listId,
        deleted: true,
      };
    } else {
      return {
        id,
        list_id: listId,
        deleted: false,
      };
    }
  }
}
