import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';

export interface TelegramAccountCreationAttrs {
  phone: string;
  userId: number;
}

@Table({ tableName: 'telegram_accounts' })
export class TelegramAccount extends Model<TelegramAccount, TelegramAccountCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  phone: string;

  @Column({ type: DataType.INTEGER, unique: true })
  telegramUserId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
