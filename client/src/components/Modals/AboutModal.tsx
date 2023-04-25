import { FC } from 'react';
import ModalWindow, { IModalWindow } from './ModalWindow/ModalWindow';
import { Card, Modal } from 'react-bootstrap';

const AboutModal: FC<IModalWindow> = ({ visible, setVisible }) => {
  return (
    <ModalWindow visible={visible} setVisible={setVisible}>
      <Modal.Header closeButton>
        <Modal.Title>About</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Text>Frontend: TypeScript, React, Bootstrap, MobX</Card.Text>
            <Card.Text>Backend: TypeScript, NestJS, PostgreSQL, Sequelize</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </ModalWindow>
  );
};

export default AboutModal;
