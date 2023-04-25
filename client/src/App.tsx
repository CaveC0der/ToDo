import { FC, useContext, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import NavBar from './components/NavBar/NavBar';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const App: FC = observer(() => {
  const { userStore, todoStore, telegramAccountStore } = useContext(GlobalContext);

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_LOCAL_STORAGE_ID)) {
      userStore.authenticate().then(() => {
        if (userStore.Authenticated) {
          telegramAccountStore.get().then();
        }
      });
    }
  }, []);

  return (
    <>
      <GlobalContext.Provider value={{
        userStore,
        todoStore,
        telegramAccountStore,
      }}>
        <BrowserRouter>
          <NavBar />
          <AppRouter />
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
});

export default App;
