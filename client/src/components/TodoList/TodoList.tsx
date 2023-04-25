import { FC } from 'react';
import TodoEntry from '../TodoEntry/TodoEntry';
import { Table } from 'react-bootstrap';
import './TodoList.css';
import { ITodoEntry, IUpdateTodoEntry } from '../../types/ITodoEntry';

interface TodoListProps {
  list: ITodoEntry[];
  done: (entry: IUpdateTodoEntry) => Promise<void>;
  update: (entry: IUpdateTodoEntry) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const TodoList: FC<TodoListProps> = ({ list, done, update, remove }) => {
  return (
    <Table>
      <thead>
      <tr className='align-middle'>
        <th className='priority-col'>Priority</th>
        <th className='task-col'>Todo entry</th>
        <th className='status-col'>Status</th>
        <th className='actions-col'>Actions</th>
      </tr>
      </thead>
      <tbody>
      {list.map(entry =>
        <TodoEntry
          key={entry.id}
          entry={entry}
          done={done}
          update={update}
          remove={remove}
        />,
      )}
      </tbody>
    </Table>
  );
};

export default TodoList;
