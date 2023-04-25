import { FC, useContext } from 'react';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import { observer } from 'mobx-react-lite';
import GlobalContext from '../../GlobalContext';
import { Button, Form, Modal } from 'react-bootstrap';
import FormLabeledGroup from '../form_components/FormLabeledGroup';
import { useForm } from 'react-hook-form';
import { ITelegramAccountPhone } from '../../types/ITelegramAccount';
import { formatPhone } from '../../utils/formatPhone';

const TelegramAccountModal: FC<IModalWindow> = observer(({ visible, setVisible }) => {
  const { telegramAccountStore } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm<ITelegramAccountPhone>();

  const onSubmit = async ({ phone }: ITelegramAccountPhone) => {
    phone = formatPhone(phone);
    setVisible(false);
    if (telegramAccountStore.account) {
      await telegramAccountStore.update(phone);
    } else {
      await telegramAccountStore.add(phone);
    }
  };

  const onClose = (visible: boolean) => {
    setVisible(visible);
  };

  return (
    <ModalWindow visible={visible} setVisible={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Telegram</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabeledGroup label='Phone number' className='mb-3' controlId='cm-task'>
            <Form.Control type='tel' placeholder='098 765 43 21' defaultValue={telegramAccountStore.account?.phone}
                          {...register('phone', { required: true })} />
          </FormLabeledGroup>
          <Button variant='primary' type='submit'>Save</Button>
        </Form>
      </Modal.Body>
    </ModalWindow>
  );
});

export default TelegramAccountModal;
