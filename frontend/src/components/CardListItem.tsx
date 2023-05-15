import React from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteCard } from "../app/reducers/cardsReducer";

interface Props 
{
    subject: string;
    answer: string;
    id: string;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
    
}

export default function CardListItem({subject, answer, id, setCardId, setSubject, setAnswer}: Props) {

  const dispatch = useAppDispatch();

  function handleDelete(id: string)
  {
      dispatch(deleteCard(id));
      setCardId('');
  }

  function handleEdit(id: string)
  {
    setCardId(id);
    setSubject(subject);
    setAnswer(answer);
  }


  return (
    <li className= 'my-2 flex justify-between items-center text-tiny sm:text-base'>
    {subject} | {answer}
    <div className="flex gap-2 me-2 text-white">
      <button onClick={() => handleEdit(id)} type='button' className="bg-blue-600 rounded-md hover:bg-blue-900 transition-all duration-200 p-0.5 sm:p-1">Edit</button>
      <button onClick={() => handleDelete(id)} type='button' className="bg-red-500 rounded-md hover:bg-red-900 transition-all duration-200 p-0.5 sm:p-1">Delete</button>
    </div>
    </li>
  )
}
