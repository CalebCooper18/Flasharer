import { useState } from "react"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'


import { Card } from "../../types"

import CardCarouselItem from "./CardCarouselItem"

interface Props {
    cards: Card[]
}

export default function CardCarousel({cards}: Props) {
    const [cardNumber, setCardNumber] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    function handleClick(amount: number)
    {
        setCardNumber(() => {
            if((cardNumber + amount) > cards.length - 1) return 0;
            if((cardNumber + amount) < 0) return cards.length - 1;
            return cardNumber + amount;
            
        })
        setShowAnswer(false);

    }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[600px]">
        <CardCarouselItem currentCard={cards[cardNumber]} showAnswer={showAnswer} setShowAnswer={setShowAnswer}/>
        <div className="text-white w-full xss:w-3/4 flex justify-center items-center gap-3 mt-4">
            <button className="border-white border rounded-full p-0.5" onClick={() => handleClick(-1)}><BsArrowLeft size={22} /></button>
            <h2 className=" text-sm xss:text-base">{cardNumber + 1 } / {cards.length}</h2>
            <button className="border-white border rounded-full p-0.5" onClick={() => handleClick(1)}><BsArrowRight size={22} /></button>
        </div>
    </div>
  )
}
