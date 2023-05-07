import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section className='flex justify-center xss:items-center h-full w-full flex-col'>
      <form className='bg-primary text-white flex justify-center items-center flex-col rounded-lg  px-4 py-20 shadow-md w-11/12 xss:w-4/5 xss:px-10'>
      <h1 className='text-2xl tracking-wider mb-7'>Login To Your Account:</h1>
        <div className='w-full xss:w-3/4 mb-6'>
            <input className='input-field' type='text' placeholder='Username' /> 
        </div>
        <div className='w-full xss:w-3/4 mb-6'>
            <input className='input-field' type='password' placeholder='Password' />
        </div>
        <div className='mt-6 flex justify-center w-3/4'>
          <button className='form-button'>
            Login
          </button>
        </div>
      </form>
    </section>
  )
}
