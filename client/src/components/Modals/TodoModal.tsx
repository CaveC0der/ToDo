import { FC } from 'react';
import { ICreateTodoEntry, ITodoEntry, IUpdateTodoEntry } from '../../types/ITodoEntry';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import { useForm } from 'react-hook-form';
import { priorities } from '../../constants/priorities';
import { Button, Form, Modal } from 'react-bootstrap';

interface TodoModalProps extends IModalWindow {
  entry: ITodoEntry | undefined;
  create: (data: ICreateTodoEntry) => Promise<void>;
  update: (data: IUpdateTodoEntry) => Promise<void>;
}

// TODO : refactor
const TodoModal: FC<TodoModalProps> = ({ visible, setVisible, entry, create, update }) => {
  const { register, handleSubmit, reset } = useForm<IUpdateTodoEntry | ICreateTodoEntry>();

  const onSubmitMiddleware = async (data: IUpdateTodoEntry | ICreateTodoEntry) => {
    setVisible(false);
    if (entry) {
      await update({ ...data, id: entry.id });
    } else {
      await create(data);
    }
    reset();
  };

  const onClose = (visible: boolean) => {
    setVisible(visible);
    reset();
  };

  return (
    <ModalWindow visible={visible} setVisible={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{entry ? 'Edit' : 'Create'} Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmitMiddleware)}>
          <Form.Group className='mb-3' controlId='cu-task-input'>
            <Form.Label>Task</Form.Label>
            <Form.Control type='text' defaultValue={entry?.task} placeholder='do something'
                          {...register('task', { required: true })} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='cu-priority-select'>
            <Form.Label>Priority</Form.Label>
            <Form.Select defaultValue={entry?.priority ?? 0}
                         {...register('priority', { required: true, valueAsNumber: true, min: 1, max: 10 })}>
              <option disabled value={0}>Choose</option>
              {priorities.map(priority =>
                <option key={priority} value={priority}>{priority}</option>,
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='cu-done-checkbox'>
            <Form.Label>Status</Form.Label>
            <Form.Check type='checkbox' label='Done' defaultChecked={entry?.done}
                        {...register('done')} />
          </Form.Group>
          <Button variant='primary' type='submit'>{entry ? 'Edit' : 'Create'}</Button>
        </Form>
      </Modal.Body>
    </ModalWindow>
  );
};

export default TodoModal;
