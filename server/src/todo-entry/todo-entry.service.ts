import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TodoEntry, TodoEntryDTO } from './todo-entry.model';

@Injectable()
export class TodoEntryService {
  constructor(@InjectModel(TodoEntry) private todoEntryRepository: typeof TodoEntry) {
  }

  private async findByIdOrThrow(id: number): Promise<TodoEntry> {
    const entry = await this.todoEntryRepository.findByPk(id);
    if (!entry) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return entry;
  }

  async create(userId: number, dto: TodoEntryDTO): Promise<TodoEntry> {
    return this.todoEntryRepository.create({ ...dto, userId });
  }

  async get(userId: number, entryId: number): Promise<TodoEntry> {
    const entry = await this.findByIdOrThrow(entryId);
    if (entry.userId !== userId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    return entry;
  }

  async update(userId: number, entryId: number, dto: TodoEntryDTO): Promise<TodoEntry> {
    const entry = await this.findByIdOrThrow(entryId);
    if (entry.userId !== userId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    await entry.update({ ...dto });
    return entry;
  }

  async delete(userId: number, entryId: number): Promise<TodoEntry> {
    const entry = await this.findByIdOrThrow(entryId);
    if (entry.userId !== userId) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    await entry.destroy();
    return entry;
  }
}
