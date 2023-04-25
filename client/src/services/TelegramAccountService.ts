import AxiosAPI from '../app/api';
import { ITelegramAccount } from '../types/ITelegramAccount';
import { AxiosResponse } from 'axios';

export default class TelegramAccountService {
  static async add(phone: string): Promise<AxiosResponse<ITelegramAccount>> {
    return AxiosAPI.post<ITelegramAccount>('/user/telegram-account', { phone });
  }

  static async update(phone: string): Promise<AxiosResponse<ITelegramAccount>> {
    return AxiosAPI.put<ITelegramAccount>('/user/telegram-account', { phone });
  }

  static async get(): Promise<AxiosResponse<ITelegramAccount>> {
    return AxiosAPI.get<ITelegramAccount>('/user/telegram-account');
  }
}
