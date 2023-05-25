import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

import { useAppDispatch } from '../app/hooks';

import { loginUser } from '../app/reducers/userReducer';

export default function Login() {

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: SyntheticEvent)
  {
      e.preventDefault();
      dispatch(loginUser({
        username,
        password
      }));
  }


  return (
    <motion.section 
    initial={{width: 0, opacity: 0}}
    animate={{width: '100%', opacity: 1}}
    exit={{width: 0, opacity: 0}}
    className='flex items-center flex-col h-screen xss:justify-center'>
      <form className='bg-primary text-white flex justify-center items-center flex-col rounded-lg shadow-md
      w-11/12 h-96 mt-5 xss:w-3/4' onSubmit={handleSubmit}>
      <h1 className='text-base tracking-wider mb-7 text-center xss:text-2xl'>Login To Your Account:</h1>
        <div className='w-4/5 mb-6 xss:w-3/4'>
            <input className='input-field' type='text' placeholder='Username' 
            onChange={(e) => setUsername(e.target.value)} value={username} /> 
        </div>
        <div className='w-4/5 mb-6 xss:w-3/4'>
            <input className='input-field' type='password' placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className='mt-6 flex justify-center w-3/4'>
          <button className='form-button-user-accounts' type='submit'>
            Login
          </button>
        </div>
        <div className='mt-5 flex flex-col items-center'>
          <small className='text-gray-300 text-center'>Don't have an account?</small>
          <Link to='/register' className='text-blue-600 hover:text-blue-500 hover:underline'>
          Sign up here!</Link>
        </div>
      </form>
    </motion.section>
  )
}
