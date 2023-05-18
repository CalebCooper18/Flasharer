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
            <div className={`absolute w-full h-full flex items-center justify-center rounded-lg p-4 
            bg-white shadow-lg shadow-black transition-all duration-500 
            after:transition-all after:duration-200 after:content-['Click_to_see_answer'] after:absolute after:-bottom-0 after:opacity-0 
            ${showAnswer ? 'rotate-X-90' : 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce'}`} 
            onClick={() => setShowAnswer(true)}>
                <h2 className="line-clamp-4 break-words">`{front}</h2>
            </div>
            <div className={`absolute w-full h-full flex items-center justify-center rounded-lg p-4 
            bg-black text-white shadow-lg shadow-black transition-all duration-500 
            after:transition-all after:duration-200 after:content-['Click_to_see_question'] after:absolute after:-bottom-0 after:opacity-0  
            ${showAnswer ? 'rotate-X-0 hover:after:opacity-100 hover:after:animate-bounce' : 'rotate-X-90'}`} 
            onClick={() => setShowAnswer(false)}>
                <h2 className="line-clamp-4 break-words">{back}</h2>
            </div>
        </div>
        </div>
    ) 
}
