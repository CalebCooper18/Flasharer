import React from 'react'

export default function Deck() {
  return (
    <div className='h-40 w-full bg-black border-double border-4 border-gray-100
    pl-2 text-white flex flex-col justify-between pt-2 hover:-translate-y-1  
    hover:underline hover:cursor-pointer transition-transform duration-300 ease-in-out'>
    <p className='text-base line-clamp-2'>Topic:</p>
    <p className='text-xs line-clamp-2'>Number of cards:</p>
    <p className='text-xs truncate'>Likes:</p>
    </div>
  )
}
