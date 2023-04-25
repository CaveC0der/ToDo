export interface ITodoEntry {
  id: number;
  task: string;
  priority: number;
  done: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type IUpdateTodoEntry = Omit<ITodoEntry, 'userId' | 'createdAt' | 'updatedAt'>
export type ICreateTodoEntry = Omit<IUpdateTodoEntry, 'id'>
