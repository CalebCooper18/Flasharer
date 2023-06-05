import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';

import DeleteDeckBtn from './DeleteDeckBtn';
import LikeDeckBtn from './LikeDeckBtn';

import { Deck } from '../../types';
interface Props {
  deck: Deck;
  isUserDecks: boolean;
}

export default function DeckDisplay({ deck, isUserDecks }: Props) {
  const { user } = useAppSelector((state) => state.user);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className='deck-grid-item-template'
      onClick={() => setIsClicked(!isClicked)}
    >
      <p className='text-base md:text-xl max-h-12 min-h-[48px] overflow-y-scroll break-words'>
        Topic: {deck.topic}
      </p>
      <p className='text-sm md:text-base my-1'>
        Number of cards: {deck.cards.length}
      </p>
      <p className='text-sm md:text-base max-h-8 md:max-h-12 overflow-y-scroll'>
        Tags:
        {deck.tags.map((tag) => (
          <span
            key={tag}
            className='inline-block me-1 mb-1 border border-semiLightPurple rounded-md text-tiny p-0.5 break-words'
          >
            {tag}
          </span>
        ))}
      </p>
      <p className='text-sm md:text-base'>
        Likes: {deck.likes}
        {deck.likedBy.includes(user?.id as string) && !isUserDecks ? (
          <small className='text-tiny'> You've liked this</small>
        ) : null}
      </p>
      {isUserDecks && (
        <p className='text-sm md:text-base'>
          Shared: {deck.shared ? 'Yes' : 'No'}
        </p>
      )}
      <div
        className={`absolute flex flex-col justify-center items-center w-full h-full 
        top-0 left-0 origin-center bg-purple-900 opacity-90 
        transition-all duration-200 font-black ${
          isClicked ? 'scale-100' : 'scale-0'
        }`}
      >
        <Link to={`/viewDeck/${deck.id}`}>
          <button className='hover:underline hover:text-black'>View</button>
        </Link>
        {!isUserDecks && <LikeDeckBtn deck={deck} />}
        {isUserDecks && (
          <Link to={`/editDeck/${deck.id}`}>
            {' '}
            <button className='hover:underline hover:text-black'>
              Edit
            </button>{' '}
          </Link>
        )}
        {isUserDecks && <DeleteDeckBtn id={deck.id} />}
      </div>
    </div>
  );
}
