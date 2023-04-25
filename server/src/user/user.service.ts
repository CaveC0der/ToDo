import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationAttrs } from './user.model';
import { TodoEntry } from '../todo-entry/todo-entry.model';
import { TelegramAccountService } from '../telegram-account/telegram-account.service';
import { TelegramAccount } from '../telegram-account/telegram-account.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private telegramAccountService: TelegramAccountService) {
  }

  private async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async findByIdOrThrow(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(user: UserCreationAttrs): Promise<User> {
    return this.userRepository.create(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.findByEmailOrThrow(email);
  }

  async getById(id: number): Promise<User> {
    return this.findByIdOrThrow(id);
  }

  async exists(email: string): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { email } }));
  }

  async getTodoList(id: number): Promise<TodoEntry[]> {
    const user = await this.findByIdOrThrow(id);
    return user.$get('TodoList');
  }

  async getTelegramAccount(id: number): Promise<TelegramAccount> {
    return this.telegramAccountService.getByUserId(id);
  }

  async addTelegramAccount(id: number, phone: string): Promise<TelegramAccount> {
    return this.telegramAccountService.create(id, phone);
  }

  async updateTelegramAccount(id: number, phone: string): Promise<TelegramAccount> {
    return this.telegramAccountService.update(id, phone);
  }
}
