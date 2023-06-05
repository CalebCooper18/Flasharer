import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { login } from './app/reducers/userReducer';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';
import Notification from './components/Notification';
import MyAccount from './pages/MyAccount';
import Create from './pages/CreateDeck';
import AllDecksView from './pages/AllDecksView';
import SingleDeckView from './pages/SingleDeckView';

import userService from './services/user.service';
import EditDeck from './pages/EditDeck';

function App() {
  const user = useAppSelector((state) => state.user.user);
  const notification = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const userInStorage = userService.checkIfUserLoggedIn();
    if (userInStorage) {
      dispatch(login(userInStorage));
    }
  }, []);

  return (
    <>
      <Navbar user={user} />
      <AnimatePresence mode='wait'>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </AnimatePresence>
      <div className='content-container xss:ms-[76px]'>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/about' element={<About />} />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/me' />}
            />
            <Route
              path='/register'
              element={!user ? <Register /> : <Navigate to='/' />}
            />
            <Route
              path='/me'
              element={user ? <MyAccount /> : <Navigate to='/' />}
            />
            <Route
              path='/create'
              element={user ? <Create /> : <Navigate to='/' />}
            />
            <Route
              path='/editDeck/:id'
              element={user ? <EditDeck /> : <Navigate to='/' />}
            />
            <Route
              path='/sharedDecks'
              element={user ? <AllDecksView /> : <Navigate to='/' />}
            />
            <Route
              path='/viewDeck/:id'
              element={user ? <SingleDeckView /> : <Navigate to='/' />}
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
