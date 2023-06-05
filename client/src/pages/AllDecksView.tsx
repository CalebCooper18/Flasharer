import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { initializeDecks } from '../app/reducers/deckReducer';

import Deck from '../components/DeckDisplay/DeckDisplay';
import LoadingDots from '../components/LoadingDots';

export default function AllDecksView() {
  const dispatch = useAppDispatch();
  const decks = useAppSelector((state) => state.deck.decks);
  const loading = useAppSelector((state) => state.deck.isLoading);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    dispatch(initializeDecks(false, signal));

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <motion.section
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '100%', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className='h-full w-full'
    >
      <h2 className='text-center text-2xl text-white capitalize py-6 underline'>
        All Decks:
      </h2>
      <div className='mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {decks.map((deck) => (
          <Deck key={deck.id} deck={deck} isUserDecks={false} />
        ))}
      </div>
    </motion.section>
  );
}
