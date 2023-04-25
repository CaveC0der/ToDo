import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Token } from '../token/token.model';
import { TelegramAccount } from '../telegram-account/telegram-account.model';
import { TodoEntry } from '../todo-entry/todo-entry.model';

export interface UserCreationAttrs {
  username: string;
  email: string;
  password: string;
}

export type UserLoginDTO = Omit<UserCreationAttrs, 'username'>
export type UserSignupDTO = UserCreationAttrs

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasOne(() => Token)
  token: Token;

  @HasOne(() => TelegramAccount)
  telegram: TelegramAccount;

  @HasMany(() => TodoEntry)
  TodoList: TodoEntry[];
}
