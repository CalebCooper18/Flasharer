import React from 'react'
import { INotification } from '../app/reducers/notificationReducer';



export default function Notification({message, type} : INotification) {


  return (
    <div className={`fixed top-10 left-1/2 -translate-x-1/4 z-10 p-2 text-center
    rounded-lg min-h-fit min-w-fit flex gap-2 text-sm shadow-md animate-fading-in
  ${type === 'error' ? 
  'bg-red-600 text-red-300': 'bg-green-500 text-green-50'}`}>
      {message}
    </div>
  )
}
