import { Card } from "../../types"

interface Props {
    currentCard: Card;
    showAnswer: boolean;
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardCarouselItem({currentCard, showAnswer, setShowAnswer}: Props) {
  return (
        <div className="relative h-3/4 w-3/4 hover:cursor-pointer">
           <div className={`card-grid-item-template bg-white after:content-['Click_to_see_answer']
            ${showAnswer ? 'rotate-X-90' : 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce'}`}
            onClick={() => setShowAnswer(true)}>
                <p>{currentCard.subject}</p>
           </div>
           <div className={`card-grid-item-template text-white bg-purple-600 after:content-['Click_to_see_Question']
            ${showAnswer ? 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce' : 'rotate-X-90'}`}
            onClick={() => setShowAnswer(false)}>
                {showAnswer && <p>{currentCard.answer}</p>}
           </div>
        </div>
  )
}
