import { Deck } from '../types'
import { Link } from 'react-router-dom';

interface Props {
    deck: Deck;
    location: string
}

export default function DeckDisplay({deck, location}: Props) {
    const apple = location 
    
  return (
    <div className='deck-grid-item-template group'>
        <p className='text-base line-clamp-2'>Topic: {deck.topic}</p>
        <p className='text-xs line-clamp-2'>Number of cards: {deck.cards.length}</p>
        <p className='text-xs truncate'>Likes: {deck.likes}</p>
        <div className='absolute flex flex-col justify-center items-center scale-0 w-full h-full 
        top-0 left-0 origin-center bg-purple-900 opacity-90 group-hover:scale-100 
        transition-all duration-200 font-black '>
            <Link to={`/viewDeck/${deck.id}`}><button className='hover:underline hover:text-black'>View</button></Link>
            <button className='hover:underline hover:text-black'>Edit</button>
            <button className='hover:underline hover:text-red-600'>Delete</button>
        </div>
    </div>
  )
}
