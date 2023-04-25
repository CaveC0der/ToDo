import { TodoEntry } from '../todo-entry/todo-entry.model';

export const formatToDoList = (list: TodoEntry[]) => list.map(entry =>
  `Task: ${entry.task}\n` +
  `Priority: ${entry.priority}\n` +
  `Status: ${entry.done ? '✅ Done' : '⏳ In progress'}\n` +
  `id: ${entry.id}\n`).join('\n');
