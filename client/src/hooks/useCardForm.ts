import { v4 as uuid } from 'uuid';

import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';

import { addCard, clearCards } from '../app/reducers/cardsReducer';
import { createAndDeleteNotification } from '../app/reducers/notificationReducer';

import { CreateCard } from '../types';

export function useCardForm() {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [shared, setShared] = useState(false);
  const [cardId, setCardId] = useState('');

  const dispatch = useAppDispatch();

  function handleAddCard() {
    if (!subject || !answer) {
      handleDispatchNotifications('error', 'Missing subject or answer field');
      return;
    }
    const tempId = createTempId();
    dispatch(
      addCard({
        tempId,
        subject,
        answer,
      })
    );
    clearCardFields();
    handleDispatchNotifications('success', 'Card Added');
  }

  function createTempId() {
    return uuid();
  }

  function clearCardFields() {
    setSubject('');
    setAnswer('');
  }

  function clearAllFields() {
    setTopic('');
    setCardId('');
    setTags([]);
    setShared(false);
    dispatch(clearCards);
    clearCardFields();
  }

  function handleDispatchNotifications(type: string, message: string) {
    dispatch(createAndDeleteNotification({ type, message }));
  }

  function removeCardIds(cards: CreateCard[]): CreateCard[] {
    return cards.map(({ subject, answer }) => ({ subject, answer }));
  }

  return {
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
    handleAddCard,
    clearCardFields,
    clearAllFields,
    removeCardIds,
  };
}
