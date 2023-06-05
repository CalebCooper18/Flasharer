import React from 'react';

import { useAppDispatch } from '../../../app/hooks';

import { deleteCard } from '../../../app/reducers/cardsReducer';

interface Props {
  subject: string;
  answer: string;
  tempId: string;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardListItem({
  subject,
  answer,
  tempId,
  setCardId,
  setSubject,
  setAnswer,
}: Props) {
  const dispatch = useAppDispatch();

  function handleDelete(tempId: string) {
    dispatch(deleteCard(tempId));
    setCardId('');
  }

  function handleEdit(tempId: string) {
    setCardId(tempId);
    setSubject(subject);
    setAnswer(answer);
  }

  return (
    <li className='my-2 flex justify-between items-center text-tiny sm:text-base'>
      {subject} | {answer}
      <div className='flex gap-2 me-2 text-white'>
        <button
          onClick={() => handleEdit(tempId)}
          type='button'
          className='bg-blue-600 rounded-md hover:bg-blue-900 transition-all duration-200 p-0.5 sm:p-1'
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(tempId)}
          type='button'
          className='bg-red-500 rounded-md hover:bg-red-900 transition-all duration-200 p-0.5 sm:p-1'
        >
          Delete
        </button>
      </div>
    </li>
  );
}
