import { createContext } from 'react';
import UserStore from './stores/UserStore';
import TodoStore from './stores/TodoStore';
import TelegramAccountStore from './stores/TelegramAccountStore';

export interface IContext {
  userStore: UserStore;
  todoStore: TodoStore;
  telegramAccountStore: TelegramAccountStore;
}

const userStore = new UserStore();
const todoStore = new TodoStore();
const telegramAccountStore = new TelegramAccountStore();

const GlobalContext = createContext<IContext>({
  userStore,
  todoStore,
  telegramAccountStore,
});

export default GlobalContext;
