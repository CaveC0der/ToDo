import { IUser, IUserLogin, IUserSignup } from '../types/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { IAuthResponse } from '../types/IAuthResponse';
import { BASE_BACKEND_URL } from '../app/api';
import { sleep } from '../utils/dev-utils';

export default class UserStore {
  user: IUser = {} as IUser;
  Authenticated: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setAuthenticated(authenticated: boolean) {
    this.Authenticated = authenticated;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async signup(data: IUserSignup): Promise<void> {
    this.setIsLoading(true);
    try {
      await sleep(500); // TODO
      const res = await AuthService.signup(data);
      localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID, res.data.accessToken);
      this.setUser(res.data.user);
      this.setAuthenticated(true);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async login(data: IUserLogin): Promise<void> {
    this.setIsLoading(true);
    try {
      await sleep(500); // TODO
      const res = await AuthService.login(data);
      localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID, res.data.accessToken);
      this.setUser(res.data.user);
      this.setAuthenticated(true);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async logout(): Promise<void> {
    this.setIsLoading(true);
    try {
      await sleep(500); // TODO
      await AuthService.logout();
      localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID);
      this.setAuthenticated(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async authenticate(): Promise<void> {
    this.setIsLoading(true);
    try {
      await sleep(500); // TODO
      const res = await axios.get<IAuthResponse>(`${BASE_BACKEND_URL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID, res.data.accessToken);
      this.setUser(res.data.user);
      this.setAuthenticated(true);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }
}
