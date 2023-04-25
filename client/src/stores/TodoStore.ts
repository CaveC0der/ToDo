import { ICreateTodoEntry, ITodoEntry, IUpdateTodoEntry } from '../types/ITodoEntry';
import { makeAutoObservable } from 'mobx';
import { sleep } from '../utils/dev-utils';
import TodoService from '../services/TodoService';

export default class TodoStore {
  todoList: ITodoEntry[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTodoList(list: ITodoEntry[]) {
    this.todoList = list;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async fetchTodoList() {
    this.setIsLoading(true);
    try {
      await sleep(500); // TODO
      const res = await TodoService.getTodoList();
      this.setTodoList(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async createEntry(data: ICreateTodoEntry) {
    try {
      const res = await TodoService.createEntry(data);
      this.setTodoList([...this.todoList, res.data]);
    } catch (e) {
      console.error(e);
    }
  }

  async updateEntry(data: IUpdateTodoEntry) {
    try {
      const res = await TodoService.update(data);
      this.setTodoList([...this.todoList.filter(entry => entry.id !== res.data.id), res.data]);
    } catch (e) {
      console.error(e);
    }
  }

  async remove(id: number) {
    try {
      const {} = await TodoService.remove(id);
      this.setTodoList(this.todoList.filter(entry => entry.id !== id));
    } catch (e) {
      console.error(e);
    }
  }
}
