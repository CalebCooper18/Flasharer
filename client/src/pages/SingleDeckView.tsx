import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useFetchDeck } from '../hooks/useFetchDeck';

import LoadingDots from '../components/LoadingDots';
import CardGridItem from '../components/CardGridItem';
import GridViewBtn from '../components/GridViewBtn';
import CardCarousel from '../components/CardCarousel/CardCarousel';

export default function SingleDeckView() {
  const [gridView, setGridView] = useState(true);
  const { id } = useParams();
  const { deck, loading } = useFetchDeck(id as string);

  if (loading || !deck) {
    return <LoadingDots />;
  }

  return (
    <motion.section
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '100%', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
    >
      <h2 className='text-center text-2xl text-white capitalize py-6 underline max-w-full break-words'>
        {deck.topic}
      </h2>
      <GridViewBtn gridView={gridView} setGridView={setGridView} />
      {gridView && (
        <motion.div
          initial={{ translateX: '-100vw', opacity: 0 }}
          animate={{ translateX: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 19 }}
          className='mx-8 mt-5 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'
        >
          {deck.cards.map((card) => (
            <CardGridItem
              key={card.id}
              front={card.subject}
              back={card.answer}
            />
          ))}
        </motion.div>
      )}
      {!gridView && <CardCarousel cards={deck.cards} />}
    </motion.section>
  );
}
