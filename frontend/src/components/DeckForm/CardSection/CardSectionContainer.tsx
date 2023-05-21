import React from "react";

import CardInputs from "./CardInputs";
import AddCardBtn from "./AddCardBtn";
import CancelEditBtn from "./CancelEditBtn";
import UpdateCardBtn from "./UpdateCardBtn";
import CardList from "./CardList";

import { CreateCard } from "../../../types";

interface Props 
{
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  handleAddCard: () => void;
  clearCardFields: ()  => void;
  subject: string;
  answer: string;
  cardId: string;
  cards: CreateCard[]
}

export default function CardSectionContainer({setSubject, setAnswer, setCardId, subject, answer, cardId, handleAddCard, clearCardFields, cards}: Props) {
  return (
    <>
     <h3 className="leading-4 mt-2 text-center">Add Cards:</h3>
    <div className="w-full grid grid-cols-1 gap-y-2 justify-center items-center sm:gap-x-10 sm:gap-y-2 sm:grid-cols-2">
        <CardInputs subject={subject} answer={answer} setSubject={setSubject} setAnswer={setAnswer} />
        <div className="w-full">
            {!cardId && <AddCardBtn handleAddCard={handleAddCard} />}
            {cardId && <CancelEditBtn setCardId={setCardId} />}
        </div>
        <UpdateCardBtn id={cardId} subject={subject} answer={answer} clearCardsFields={clearCardFields} setCardId={setCardId}/>
    </div>
    <CardList cards={cards} setCardId={setCardId} setSubject={setSubject} setAnswer={setAnswer} />
    </>
  )
}
