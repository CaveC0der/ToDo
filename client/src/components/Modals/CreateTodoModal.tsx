import { FC } from 'react';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import { Button, Form, Modal } from 'react-bootstrap';
import { priorities } from '../../constants/priorities';
import { ICreateTodoEntry } from '../../types/ITodoEntry';
import { useForm } from 'react-hook-form';
import FormLabeledGroup from '../form_components/FormLabeledGroup';

interface CreateTodoModalProps extends IModalWindow {
  create: (data: ICreateTodoEntry) => Promise<void>;
}

const CreateTodoModal: FC<CreateTodoModalProps> = ({ visible, setVisible, create }) => {
  const { register, handleSubmit, reset } = useForm<ICreateTodoEntry>();

  const createMiddleware = async (data: ICreateTodoEntry) => {
    setVisible(false);
    reset();
    await create(data);
  };

  const onClose = (visible: boolean) => {
    setVisible(visible);
    reset();
  };

  return (
    <ModalWindow visible={visible} setVisible={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(createMiddleware)}>
          <FormLabeledGroup label='Task' className='mb-3' controlId='cm-task'>
            <Form.Control type='text' placeholder='do something'
                          {...register('task', { required: true })} />
          </FormLabeledGroup>
          <FormLabeledGroup label='Priority' className='mb-3' controlId='cm-priority'>
            <Form.Select defaultValue={0}
                         {...register('priority', { required: true, valueAsNumber: true, min: 1, max: 10 })}>
              <option disabled value={0}>Choose</option>
              {priorities.map(priority =>
                <option key={priority} value={priority}>{priority}</option>,
              )}
            </Form.Select>
          </FormLabeledGroup>
          <FormLabeledGroup label='Status' className='mb-3' controlId='cm-done'>
            <Form.Check label='Done' type='checkbox'
                        {...register('done')} />
          </FormLabeledGroup>
          <Button variant='primary' type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </ModalWindow>
  );
};

export default CreateTodoModal;
