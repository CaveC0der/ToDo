import { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

export interface IModalWindow {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

interface ModalWindowProps extends IModalWindow {
  children: ReactNode;
}

const ModalWindow: FC<ModalWindowProps> = ({ visible, setVisible, children }) => {
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal show={visible} onHide={handleClose}>
      {children}
    </Modal>
  );
};

export default ModalWindow;

