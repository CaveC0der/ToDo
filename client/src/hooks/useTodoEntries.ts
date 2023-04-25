import { ITodoEntry } from '../types/ITodoEntry';
import { useMemo } from 'react';
import { SortMap } from '../constants/sort';

export const useSortedTodoEntries = (todoEntries: ITodoEntry[], sort: string) => {
  return useMemo<ITodoEntry[]>(() => {
    if (sort) {
      return [...todoEntries].sort(SortMap.get(sort));
    }
    return todoEntries;
  }, [sort, todoEntries]);
};

export const useTodoEntries = (todoEntries: ITodoEntry[], sort: string, query: string) => {
  const sorted = useSortedTodoEntries(todoEntries, sort);
  return useMemo<ITodoEntry[]>(() => {
    return sorted.filter(entry => entry.task.toLowerCase().includes(query.toLowerCase()));
  }, [query, sorted]);
};
