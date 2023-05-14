import { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';

import { createUser } from '../app/reducers/userReducer';
import { useAppDispatch } from '../app/hooks';

export default function Register() {

    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handleSubmit(e: SyntheticEvent)
    {
        e.preventDefault();
        dispatch(createUser({
            name,
            username,
            password
        }));
    }

    return (
            <section className='flex items-center flex-col h-screen xss:justify-center'>
            <form className='bg-primary text-white flex justify-center items-center flex-col rounded-lg shadow-md
            w-11/12 h-[600px] mt-5 xss:w-3/4' onSubmit={handleSubmit}>
            <h1 className='text-base tracking-wider mb-7 text-center xss:text-2xl'>Create An Account:</h1>
                <div className='w-4/5 mb-6 xss:w-3/4'>
                    <input className='input-field' type='text' placeholder='Name'
                    onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className='w-4/5 mb-6 xss:w-3/4'>
                    <input className='input-field' type='text' placeholder='Username' 
                    onChange={(e) => setUsername(e.target.value)} value={username} /> 
                </div>
                <div className='w-4/5 mb-6 xss:w-3/4'>
                    <input className='input-field' type='password' placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className='w-4/5 mb-6 xss:w-3/4'>
                    <input className='input-field' type='password' placeholder='Confirm Password'
                    onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} /> 
                </div>
                <div className='mt-6 flex justify-center w-3/4'>
                <button className='form-button' type='submit'>
                    Create Account
                </button>
                </div>
                <div className='mt-5 flex flex-col items-center'>
                <small className='text-gray-300 text-center'>Already have an account?</small>
                <Link to='/login' className='text-blue-600 hover:text-blue-500 hover:underline'>
                Login here!</Link>
                </div>
            </form>
            </section>
    )
}
