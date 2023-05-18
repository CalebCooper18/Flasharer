import { useState } from "react"

interface Props
{
    front: string;
    back: string;
}

export default function CardGridItem({front, back}: Props) {
    const [showAnswer, setShowAnswer] = useState(false);
  
    return (
        <div>
        <div className="relative h-40 hover:cursor-pointer text-sm">
            <div className={`card-grid-item-template bg-white after:content-['Click_to_see_answer']
            ${showAnswer ? 'rotate-X-90' : 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce'}`} 
            onClick={() => setShowAnswer(true)}>
                <h2 className="line-clamp-4 break-words">{front}</h2>
            </div>
            <div className={`card-grid-item-template 
            bg-black text-white after:content-['Click_to_see_Question']
            ${showAnswer ? 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce' : 'rotate-X-90'}`} 
            onClick={() => setShowAnswer(false)}>
                <h2 className="line-clamp-4 break-words">{back}</h2>
            </div>
        </div>
        </div>
    ) 
}
