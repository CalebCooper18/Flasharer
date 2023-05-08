import {Routes, Route, Navigate} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginUser } from './app/reducers/loginReducer';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';



function App() {

  const user = useAppSelector(state => state.login.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar user={user} />
      <div className='content-container xss:ms-[76px]'>
        <Routes>
          <Route path='/'/>
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        </Routes>
      </div>
    </>
  )
}

export default App
