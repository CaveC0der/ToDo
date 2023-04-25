export interface IUser {
  id: number;
  username: string;
  email: string;
}

export type IUserSignup = Omit<IUser, 'id'> & { password: string }
export type IUserLogin = Omit<IUserSignup, 'username'>
