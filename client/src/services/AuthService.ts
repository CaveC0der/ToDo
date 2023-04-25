import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../types/IAuthResponse';
import AxiosAPI from '../app/api';
import { IUserLogin, IUserSignup } from '../types/IUser';

export default class AuthService {
  static async signup(data: IUserSignup): Promise<AxiosResponse<IAuthResponse>> {
    return AxiosAPI.post<IAuthResponse>('/auth/signup', data);
  }

  static async login(data: IUserLogin): Promise<AxiosResponse<IAuthResponse>> {
    return AxiosAPI.post<IAuthResponse>('/auth/login', data);
  }

  static async logout(): Promise<void> {
    await AxiosAPI.post('/auth/logout');
  }
}
