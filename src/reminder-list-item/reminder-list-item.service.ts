import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ReminderListItem } from './reminder-list-item.entity';

@Injectable()
export class ReminderListItemService {
  constructor(
    @InjectRepository(ReminderListItem)
    private ReminderListItemsRepository: Repository<ReminderListItem>,
  ) {}

  findAll(query): Promise<ReminderListItem[]> {
    const { skip = 0, take = 10, order = { id: 'DESC' }, where } = query;
    return this.ReminderListItemsRepository.find({
      skip,
      take,
      order,
      where,
    });
  }

  findOne(id: number): Promise<ReminderListItem> {
    return this.ReminderListItemsRepository.findOne(id);
  }

  create(reminderList: ReminderListItem): Promise<ReminderListItem> {
    return this.ReminderListItemsRepository.save(reminderList);
  }

  update(
    id: number,
    listId: number,
    reminderList: ReminderListItem,
  ): Promise<UpdateResult> {
    return this.ReminderListItemsRepository.update(
      {
        id,
        listId,
      },
      reminderList,
    );
  }

  async delete(id: number, listId: number): Promise<void> {
    await this.ReminderListItemsRepository.delete({
      id,
      listId,
    });
  }
}
