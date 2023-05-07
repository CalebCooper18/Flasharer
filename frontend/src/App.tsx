import {Routes, Route} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginUser } from './app/reducers/loginReducer';
import Login from './pages/Login';
import Navbar from './components/Navbar/Navbar';



function App() {

  const user = useAppSelector(state => state.login.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path='/' />
        <Route path='/login' element={!user && <Login />} />
        <Route path='/test' element={<></>} />
      </Routes>
    </>
  )
}

export default App
