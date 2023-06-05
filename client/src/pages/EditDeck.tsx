import { SyntheticEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useFetchDeck } from '../hooks/useFetchDeck';
import { useCardForm } from '../hooks/useCardForm';

import { initializeCards } from '../app/reducers/cardsReducer';
import { updateUserDeck } from '../app/reducers/deckReducer';

import TagsSection from '../components/DeckForm/TagsSection';
import TopicInput from '../components/DeckForm/TopicInput';
import DeckShared from '../components/DeckForm/DeckShared';
import LoadingDots from '../components/LoadingDots';
import CardSectionContainer from '../components/DeckForm/CardSection/CardSectionContainer';

import { Card } from '../types';

export default function EditDeck() {
  const { id } = useParams();
  const { deck, loading } = useFetchDeck(id as string);
  const {
    topic,
    setTopic,
    subject,
    setSubject,
    answer,
    setAnswer,
    tags,
    setTags,
    shared,
    setShared,
    cardId,
    setCardId,
    removeCardIds,
    clearCardFields,
    handleAddCard,
  } = useCardForm();
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.cards);
  const navigate = useNavigate();

  useEffect(() => {
    if (deck) {
      setTopic(deck.topic);
      setTags(deck.tags);
      setShared(deck.shared);
      dispatch(initializeCards(deck.cards));
    }
  }, [deck]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (deck) {
      dispatch(
        updateUserDeck({
          ...deck,
          topic,
          tags,
          shared,
          cards: removeCardIds(cards) as Card[],
        })
      );
      navigate('/me');
    }
  }

  if (loading && !deck) {
    return <LoadingDots />;
  }

  return (
    <motion.section
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '100%', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className='h-[900px] min-w-[200px] pt-10 w-full flex flex-col justify-center items-center text-white sm:h-[750px] xss:pt-20'
    >
      <div className='bg-primary h-full w-5/6 rounded-lg py-4 px-5'>
        <form
          className='w-full h-full flex flex-col items-center justify-around gap-1 sm:gap-3'
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className='leading-4 mb-5 text-center'>Edit Your Deck:</h3>
          <TopicInput setTopic={setTopic} topic={topic} />
          <CardSectionContainer
            setSubject={setSubject}
            setAnswer={setAnswer}
            setCardId={setCardId}
            subject={subject}
            answer={answer}
            cardId={cardId}
            handleAddCard={handleAddCard}
            clearCardFields={clearCardFields}
          />
          <TagsSection setTags={setTags} tags={tags} />
          <DeckShared setShared={setShared} shared={shared} />
          <button
            className='w-full text-center justify-self-end bg-semiLightPurple rounded-lg p-1 hover:bg-purple-800 transition-all duration-500
          active:scale-95 active:opacity-80'
          >
            Edit Deck
          </button>
        </form>
      </div>
    </motion.section>
  );
}
