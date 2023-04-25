import { ITelegramAccount } from '../types/ITelegramAccount';
import { makeAutoObservable } from 'mobx';
import TelegramAccountService from '../services/TelegramAccountService';

export default class TelegramAccountStore {
  account: ITelegramAccount | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAccount(account: ITelegramAccount) {
    this.account = account;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async add(phone: string) {
    this.setIsLoading(true);
    try {
      const res = await TelegramAccountService.add(phone);
      this.setAccount(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async update(phone: string) {
    this.setIsLoading(true);
    try {
      const res = await TelegramAccountService.update(phone);
      this.setAccount(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async get() {
    this.setIsLoading(true);
    try {
      const res = await TelegramAccountService.get();
      this.setAccount(res.data);
    } catch (e) {
      // console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }
}
