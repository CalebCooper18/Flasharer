import {Routes, Route, Navigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';
import Notification from './components/Notification';
import { useEffect } from 'react';
import userService from './services/user.service';
import { login } from './app/reducers/userReducer';
import MyAccount from './pages/MyAccount';
import Create from './pages/Create';
import AllDecksView from './pages/AllDecksView';
import SingleDeckView from './pages/SingleDeckView';



function App() {

  const user = useAppSelector(state => state.users.user);
  const notification = useAppSelector(state =>  state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInStorage = userService.checkIfUserLoggedIn();
    if(userInStorage)
    {
      dispatch(login(userInStorage));
    }
  }, [])

  return (
    <>
      <Navbar user={user} />
      {notification && <Notification message={notification.message} type={notification.type} /> }
      <div className='content-container xss:ms-[76px]'>
        <Routes>
          <Route path='/'/>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/me' element={user ? <MyAccount /> : <Navigate to='/' /> } />
          <Route path='/create' element={user ? <Create /> : <Navigate to = '/' /> } />
          <Route path='/sharedDecks' element={user ? <AllDecksView /> : <Navigate to = '/' />} /> 
          <Route path='/viewDeck/:id' element={user ? <SingleDeckView /> : <Navigate to = '/' />} />
        </Routes>
      </div>
    </>
  )
}

export default App
