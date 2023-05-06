import './App.css'
import {Routes, Route} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loginUser } from './app/reducers/loginReducer';



function App() {

  const user = useAppSelector(state => state.login.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/test' element={<></>} />
      </Routes>
    </>
  )
}

export default App
