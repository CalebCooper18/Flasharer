import { useState } from "react"
import { CreateCard } from "../types";
import {v4 as uuid} from 'uuid'

import CardListItem from "../components/CardListItem";
import TagsSelect from "../components/TagsSelect";

import { useAppDispatch } from "../app/hooks";
import { createAndDeleteNotification } from "../app/reducers/notificationReducer";
import AddCardBtn from "../components/AddCardBtn";
import DeleteCardBtn from "../components/DeleteCardBtn";


export default function Create() {

    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState<CreateCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([])
    const [shared, setShared] = useState(false);
    const dispatch = useAppDispatch();

    console.log(tags);

    function handleAddCard()
    {
        if(!subject || !answer)
        {
            handleDispatchNotifications('error', 'Missing subject or answer field');
            return;
        }   
        const id = uuid()
        setCards(prev => [...prev, {subject, answer, id}])
        setSubject('');
        setAnswer('');
        handleDispatchNotifications('success', 'Card Added');
    }

    function handleCardClick(id: string)
    {
        setSelectedCards((prev) => {
            if(prev.includes(id))
            {
                return prev.filter(card => card !== id);
            }
            else 
            {
                return [...prev, id];
            }
        })
    }

    function handleDeleteCards()
    {
        if(selectedCards.length === 0)
        {
            handleDispatchNotifications('error', 'No cards selected to delete');
            return;
        }
        setCards(cards.filter(card => !selectedCards.includes(card.id as string)))
        setSelectedCards([]);
        handleDispatchNotifications('success', 'Cards Deleted');

    }

    function handleDispatchNotifications(type: string, message: string)
    {
        dispatch(createAndDeleteNotification({type, message}))
    }

  return (
    <div className="h-[800px] pt-10 w-full flex flex-col justify-center items-center text-white sm:h-[750px] xss:pt-20">
        <div className="bg-primary h-full w-5/6 rounded-lg py-4 px-5">
            <form className="w-full flex flex-col items-center gap-1 sm:gap-3">
                <h3 className="leading-4 mb-5 text-center">Create a new Deck:</h3>
                <div className="w-full flex gap-2 items-center flex-col sm:flex-row">
                    <label className="min-w-fit">Topic Name:</label>
                    <input type="text" className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)} />
                </div>
                <h3 className="leading-4 mt-2 text-center">Add Cards:</h3>
                <div className="w-full grid grid-cols-1 gap-y-2 justify-center items-center sm:gap-x-10 sm:gap-y-2 sm:grid-cols-2">
                    <div className="w-full flex flex-col items-center gap-1 sm:gap-0">
                        <label>Front:</label>
                        <input type="text" className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                    <div className="w-full flex flex-col items-center gap-1 sm:gap-0">
                        <label>Back:</label>
                        <input type="text" className="input-field" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <AddCardBtn handleAddCard={handleAddCard} />
                    </div>
                    <div className="w-full">
                        <DeleteCardBtn handleDeleteCards={handleDeleteCards} />
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <h3>All Cards:</h3>
                    <small className="relative ml-2 text-gray-500 before:content-['*'] before:absolute 
                    before:-top-1 before:-left-2 text-tiny">To delete click on multiple cards</small>
                    <ul className="bg-white w-full h-16 rounded-md overflow-y-scroll text-black sm:h-32">
                        {cards.map(card => (
                        <CardListItem key={card.id} front={card.subject} back={card.answer} 
                        handleClick={() => handleCardClick(card.id as string)} selected={selectedCards.includes(card.id as string)}/>
                        ))}
                    </ul>
                </div>
                <div className="w-full">
                    <h3 className="mb-1">Tags:</h3>
                    <TagsSelect tags={tags} setTags={setTags} />
                </div>
                <div className="w-full">
                    <h3>Shareable:</h3>
                    <div className="inline-flex gap-2">
                        <button type="button" className={`relative after:content-[''] after:absolute 
                        after:top-5 ${shared ? 'after:scale-100' : 'after:scale-0'} after:w-full after:h-0.5 after:left-0 after:hover:scale-100
                     after:bg-purple-500 after:origin-left after:transition-all after:duration-700`
                        } onClick={() => setShared(true)}>Yes</button>
                        <button type="button" className={`relative after:content-[''] after:absolute 
                        after:top-5 ${shared ? 'after:scale-0' : 'after:scale-100'} after:w-full after:h-0.5 after:left-0 after:hover:scale-100
                     after:bg-purple-500 after:origin-left after:transition-all after:duration-700`} onClick={() => setShared(false)}>No</button>
                    </div>
                </div>
            </form>
        </div>  
    </div>
  )
}
