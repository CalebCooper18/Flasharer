import React from "react"

import CardListItem from "./CardListItem"

import { Card, CreateCard } from "../../../types"


interface Props {
    cards: Card[] | CreateCard[];
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardList({ cards, setCardId, setSubject, setAnswer }: Props) {
  return (
    <div className="flex w-full flex-col">
        <h3 className="mb-2">All Cards:</h3>
        <ul className="bg-white w-full h-24 rounded-md overflow-y-scroll text-black sm:h-32">
            {cards.map(card => (
            <CardListItem key={card.tempId} subject={card.subject} answer={card.answer} tempId={card.tempId as string} 
            setCardId={setCardId} setSubject={setSubject} setAnswer={setAnswer}/>
            ))}
        </ul>
    </div>
  )
}
