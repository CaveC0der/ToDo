import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TelegramAccount } from './telegram-account.model';

@Injectable()
export class TelegramAccountService {
  constructor(@InjectModel(TelegramAccount) private telegramAccountRepository: typeof TelegramAccount) {
  }

  async create(userId: number, phone: string) {
    const account = await this.telegramAccountRepository.findOne({ where: { userId } });
    if (account) {
      throw new HttpException('ACCOUNT_ALREADY_EXISTS', HttpStatus.CONFLICT);
    }
    return this.telegramAccountRepository.create({ userId, phone });
  }

  async update(userId: number, phone: string) {
    const account = await this.telegramAccountRepository.findOne({ where: { userId } });
    if (!account) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return account.update({ phone, telegramUserId: undefined });
  }

  async getByUserId(userId: number) {
    const account = await this.telegramAccountRepository.findOne({ where: { userId } });
    if (!account) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async getByPhone(phone: string) {
    const account = await this.telegramAccountRepository.findOne({ where: { phone } });
    if (!account) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async getByTelegramUserId(telegramUserId: number) {
    const account = await this.telegramAccountRepository.findOne({ where: { telegramUserId } });
    if (!account) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async bindTelegramUserId(phone: string, telegramUserId: number) {
    const account = await this.getByPhone(phone);
    await account.update({ telegramUserId });
    return account;
  }

  test() {
    return 'TelegramAccountService';
  }
}
