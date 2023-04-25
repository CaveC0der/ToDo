import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';

export interface TodoEntryCreationAttrs {
  task: string;
  priority: number;
  done: boolean;
  userId: number;
}

export type TodoEntryDTO = Omit<TodoEntryCreationAttrs, 'userId'>

@Table({ tableName: 'todo_entries' })
export class TodoEntry extends Model<TodoEntry, TodoEntryCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  task: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  priority: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  done: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
