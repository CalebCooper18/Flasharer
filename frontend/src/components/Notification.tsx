import React from 'react'
import { INotification } from '../app/reducers/notificationReducer';



export default function Notification({message, type} : INotification) {


  return (
    <div className={`fixed bottom-1 z-10 py-1 text-center
    rounded-lg w-full text-sm shadow-md animate-fading-in
  ${type === 'error' ? 
  'bg-red-600 text-red-200': 'bg-green-500 text-green-50'}`}>
      {message}
    </div>
  )
}
