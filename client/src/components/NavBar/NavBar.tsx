import { FC, useContext, useState } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import AboutModal from '../Modals/AboutModal';
import { observer } from 'mobx-react-lite';
import GlobalContext from '../../GlobalContext';
import ProfileModal from '../Modals/ProfileModal';
import TelegramAccountModal from '../Modals/TelegramAccountModal';

const NavBar: FC = observer(() => {
  const [aboutModal, setAboutModal] = useState<boolean>(false);
  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [telegramModal, setTelegramModal] = useState<boolean>(false);
  const { userStore } = useContext(GlobalContext);
  return (
    <Navbar className='shadow-sm' fixed='top' bg='light'>
      <AboutModal visible={aboutModal} setVisible={setAboutModal} />
      {userStore.Authenticated &&
        <>
          <ProfileModal visible={profileModal} setVisible={setProfileModal} />
          <TelegramAccountModal visible={telegramModal} setVisible={setTelegramModal} />
        </>
      }
      <Container>
        <Navbar.Collapse className='justify-content-end'>
          {userStore.Authenticated &&
            <>
              <Button variant='info' className='me-2' onClick={() => setProfileModal(true)}>Profile</Button>
              <Button variant='info' className='me-2' onClick={() => setTelegramModal(true)}>Telegram</Button>
            </>
          }
          <Button variant='info' onClick={() => setAboutModal(true)}>About</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;

