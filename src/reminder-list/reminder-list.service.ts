import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ReminderList } from './reminder-list.entity';

@Injectable()
export class ReminderListService {
  constructor(
    @InjectRepository(ReminderList)
    private ReminderListsRepository: Repository<ReminderList>,
  ) {}

  findAll(query): Promise<ReminderList[]> {
    const { skip = 0, take = 10, order = { id: 'DESC' }, where } = query;
    return this.ReminderListsRepository.find({
      skip,
      take,
      order,
      where,
    });
  }

  findOne(id: number): Promise<ReminderList> {
    return this.ReminderListsRepository.findOne(id);
  }

  create(reminderList: ReminderList): Promise<ReminderList> {
    return this.ReminderListsRepository.save(reminderList);
  }

  update(id: number, reminderList: ReminderList): Promise<UpdateResult> {
    return this.ReminderListsRepository.update(
      {
        id,
      },
      reminderList,
    );
  }

  async delete(id: number): Promise<void> {
    await this.ReminderListsRepository.delete(id);
  }
}
