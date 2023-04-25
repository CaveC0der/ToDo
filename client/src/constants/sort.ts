import { TCompareFunction } from '../types/TCompareFunction';
import { ITodoEntry } from '../types/ITodoEntry';

const Descending = (a: ITodoEntry, b: ITodoEntry) => {
  return b.priority - a.priority;
};

const Ascending = (a: ITodoEntry, b: ITodoEntry) => {
  return a.priority - b.priority;
};

export const SortMap = new Map<string, TCompareFunction>([
  ['Descending', Descending],
  ['Ascending', Ascending],
]);

export const SortKeys = Array.from(SortMap.keys());
