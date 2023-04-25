import { FC, useContext } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import GlobalContext from '../../GlobalContext';
import { observer } from 'mobx-react-lite';

const ProfileModal: FC<IModalWindow> = observer(({ visible, setVisible }) => {
  const { userStore, telegramAccountStore } = useContext(GlobalContext);

  const logout = async () => {
    setVisible(false);
    await userStore.logout();
  };

  return (
    <ModalWindow visible={visible} setVisible={setVisible}>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className='mb-3'>
          <Card.Body>
            <Card.Text>Username: {userStore.user.username}</Card.Text>
            <Card.Text>Email: {userStore.user.email}</Card.Text>
            <Card.Text>Telegram: {telegramAccountStore.account?.phone ?? 'not bound'}</Card.Text>
          </Card.Body>
        </Card>
        <Button variant='danger' className='me-2' onClick={logout}>Log out</Button>
      </Modal.Body>
    </ModalWindow>
  );
});

export default ProfileModal;
