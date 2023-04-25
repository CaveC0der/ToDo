import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';

export interface TokenCreationAttrs {
  value: string;
  userId: number;
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
