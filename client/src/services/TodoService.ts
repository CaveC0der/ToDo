import AxiosAPI from '../app/api';
import { ICreateTodoEntry, ITodoEntry, IUpdateTodoEntry } from '../types/ITodoEntry';

export default class TodoService {
  static async getTodoList() {
    return AxiosAPI.get<ITodoEntry[]>('/user/todo-list');
  }

  static async createEntry(data: ICreateTodoEntry) {
    return AxiosAPI.post<ITodoEntry>('/todo-entry', data);
  }

  static async update(data: IUpdateTodoEntry) {
    return AxiosAPI.put<ITodoEntry>(`/todo-entry/${data.id}`, data);
  }

  static async remove(id: number) {
    return AxiosAPI.delete<ITodoEntry>(`/todo-entry/${id}`);
  }
}
