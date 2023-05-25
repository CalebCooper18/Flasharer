import { motion } from 'framer-motion'

import { INotification } from '../app/reducers/notificationReducer';


export default function Notification({message, type} : INotification) {

  return (
    <motion.div 
    initial={{translateX: '-100vw', opacity: 0}}
    animate={{translateX: 0, opacity: 1}}
    transition={{duration: 0.5}}
    exit={{translateX: '100vw', opacity: 0}}
    className={`fixed bottom-0.5 z-10 xss:py-1 text-center
    rounded-lg w-full text-sm shadow-md ${type === 'error' ? 
    'bg-red-600 text-red-200' : 'bg-green-500 text-green-50'}`}>
      {message}
    </motion.div>
  )
}
