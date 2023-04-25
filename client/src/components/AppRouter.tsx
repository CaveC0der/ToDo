import { FC, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Todos from '../pages/Todos/Todos';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { observer } from 'mobx-react-lite';
import GlobalContext from '../GlobalContext';
import Loader from './Loader/Loader';

const AppRouter: FC = observer(() => {
  const { userStore } = useContext(GlobalContext);

  if (userStore.isLoading) {
    return <Loader size='lg' />;
  }
  return (userStore.Authenticated ?
      <Routes>
        <Route path='/todo-list' element={<Todos />} />
        <Route path='*' element={<Navigate to={'/todo-list'} replace={true} />} />
      </Routes> :
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Navigate to={'/login'} replace={true} />} />
      </Routes>
  );
});

export default AppRouter;
