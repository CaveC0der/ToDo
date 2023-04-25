import { FC, useState } from 'react';
import { ITodoEntry, IUpdateTodoEntry } from '../../types/ITodoEntry';
import { Button, ButtonGroup } from 'react-bootstrap';
import UpdateTodoModal from '../Modals/UpdateTodoModal';

interface TodoEntryProps {
  entry: ITodoEntry;
  done: (entry: IUpdateTodoEntry) => Promise<void>;
  update: (entry: IUpdateTodoEntry) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

const TodoEntry: FC<TodoEntryProps> = ({ entry, done, update, remove }) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);

  return (
    <tr className='align-middle'>
      <th>{entry.priority}</th>
      <td>{entry.task}</td>
      <td>{entry.done ? 'Done' : 'In progress'}</td>
      <td className='text-end'>
        <ButtonGroup className='d-flex align-items-center justify-content-between'>
          {!entry.done &&
            <Button
              variant='success'
              className='me-1'
              onClick={() => done(entry)}
            >Done</Button>
          }
          <Button
            variant='warning'
            className='me-1'
            onClick={() => setUpdateModal(true)}
          >Edit</Button>
          <Button
            variant='danger'
            onClick={() => remove(entry.id)}
          >Remove</Button>
        </ButtonGroup>
      </td>
      <UpdateTodoModal entry={entry} update={update} visible={updateModal} setVisible={setUpdateModal} />
    </tr>
  );
};

export default TodoEntry;
