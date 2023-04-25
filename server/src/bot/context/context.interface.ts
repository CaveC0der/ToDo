import { Context } from 'telegraf';

export interface IContext extends Context {
  session: {
    userId?: number;
    type?: 'done-todo-entry' | 'create-todo-entry' | 'remove-todo-entry'
  };
}
