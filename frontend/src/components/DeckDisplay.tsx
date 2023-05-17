import { Deck } from '../types'

interface Props {
    deck: Deck;
    location: string
}

export default function DeckDisplay({deck, location}: Props) {
    const apple = location 
    
  return (
    <div className=' relative h-40 w-full bg-black border-double border-4 border-gray-100
    pl-2 text-white flex flex-col justify-between pt-2 hover:-translate-y-1
    hover:cursor-pointer transition-transform duration-300 ease-in-out group'>
        <p className='text-base line-clamp-2'>Topic: {deck.topic}</p>
        <p className='text-xs line-clamp-2'>Number of cards: {deck.cards.length}</p>
        <p className='text-xs truncate'>Likes: {deck.likes}</p>
        <div className='absolute flex flex-col justify-center items-center scale-0 w-full h-full 
        top-0 left-0 origin-center bg-purple-900 opacity-90 group-hover:scale-100 
        transition-all duration-200 font-black '>
            <button className='hover:underline hover:text-black'>View</button>
            <button className='hover:underline hover:text-black'>Edit</button>
            <button className='hover:underline hover:text-red-600'>Delete</button>
        </div>
    </div>
  )
}
