import { FC } from 'react';
import { ITodoEntry, IUpdateTodoEntry } from '../../types/ITodoEntry';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import { priorities } from '../../constants/priorities';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal } from 'react-bootstrap';
import FormLabeledGroup from '../form_components/FormLabeledGroup';

interface UpdateTodoModalProps extends IModalWindow {
  entry: ITodoEntry;
  update: (data: IUpdateTodoEntry) => Promise<void>;
}

const UpdateTodoModal: FC<UpdateTodoModalProps> = ({ visible, setVisible, entry, update }) => {
  const { register, handleSubmit, reset } = useForm<IUpdateTodoEntry>();

  const updateMiddleware = async (data: IUpdateTodoEntry) => {
    setVisible(false);
    await update({ ...data, id: entry.id });
  };

  const onClose = (visible: boolean) => {
    setVisible(visible);
  };

  return (
    <ModalWindow visible={visible} setVisible={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(updateMiddleware)}>
          <FormLabeledGroup label='Task' className='mb-3' controlId='um-task'>
            <Form.Control type='text' defaultValue={entry.task}
                          {...register('task')} />
          </FormLabeledGroup>
          <FormLabeledGroup label='Priority' className='mb-3' controlId='um-priority'>
            <Form.Select defaultValue={entry.priority}
                         {...register('priority', { required: true, valueAsNumber: true, min: 1, max: 10 })}>
              <option disabled value={0}>Choose</option>
              {priorities.map(priority =>
                <option key={priority} value={priority}>{priority}</option>,
              )}
            </Form.Select>
          </FormLabeledGroup>
          <FormLabeledGroup label='Status' className='mb-3' controlId='um-done'>
            <Form.Check label='Done' type='checkbox' defaultChecked={entry.done}
                        {...register('done')} />
          </FormLabeledGroup>
          <Button variant='primary' type='submit'>Edit</Button>
        </Form>
      </Modal.Body>
    </ModalWindow>
  );
};

export default UpdateTodoModal;
