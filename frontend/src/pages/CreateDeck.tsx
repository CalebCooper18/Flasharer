import {v4 as uuid} from 'uuid'

import { SyntheticEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { createAndDeleteNotification } from "../app/reducers/notificationReducer";
import { createNewUserDeck } from "../app/reducers/deckReducer";
import {addCard, clearCards} from "../app/reducers/cardsReducer";

import CardListItem from "../components/CardListItem";
import TagsSelect from "../components/TagsSelect";
import AddCardBtn from "../components/AddCardBtn";
import UpdateCardBtn from "../components/UpdateCardBtn";




import { CreateCard } from "../types";


export default function Create() {
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [tags, setTags] = useState<string[]>([])
    const [shared, setShared] = useState(false);
    const [cardId, setCardId] = useState('');

    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.cards);

    function handleAddCard()
    {
        if(!subject || !answer)
        {
            handleDispatchNotifications('error', 'Missing subject or answer field');
            return;
        }   
        const id = uuid()
        dispatch(addCard({
            id,
            subject,
            answer
        }))
        clearCardFields();
        handleDispatchNotifications('success', 'Card Added');
    }

    function clearCardFields()
    {
        setSubject('');
        setAnswer('');
    }

    function clearAllFields()
    {
        setTopic('');
        setCardId('');
        setTags([]);
        setShared(false);
        dispatch(clearCards);
        clearCardFields();
    }

    function handleDispatchNotifications(type: string, message: string)
    {
        dispatch(createAndDeleteNotification({type, message}))
    }

    function removeCardIds(cards: CreateCard[]): CreateCard[]
    {
        return cards.map(({subject, answer}) => ({subject , answer}))
    }

    function handleSubmit(e: SyntheticEvent)
    {
        e.preventDefault();

        const newDeck = 
        {
            topic,
            cards: removeCardIds(cards),
            tags,
            shared
        }
        dispatch(createNewUserDeck(newDeck));
        dispatch(clearCards());
        clearAllFields();
    }

  return (
    <div className="h-[900px] min-w-[200px] pt-10 w-full flex flex-col justify-center items-center text-white sm:h-[750px] xss:pt-20">
        <div className="bg-primary h-full w-5/6 rounded-lg py-4 px-5">
            <form className="w-full h-full flex flex-col items-center justify-around gap-1 sm:gap-3" onSubmit={(e) => handleSubmit(e)}>
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
                        {!cardId && <AddCardBtn handleAddCard={handleAddCard} />}
                        {cardId && <button className="form-card-button-template bg-red-500 hover:bg-red-900"
                        onClick={() => setCardId('')}>
                        Cancel Edit</button>}
                    </div>
                    <div className="w-full">
                        <UpdateCardBtn id={cardId} subject={subject} answer={answer} clearCardsFields={clearCardFields} setCardId={setCardId}/>
                    </div>
                </div>
                <div className="flex w-full flex-col">
                    <h3 className="mb-2">All Cards:</h3>
                    <ul className="bg-white w-full h-24 rounded-md overflow-y-scroll text-black sm:h-32">
                        {cards.map(card => (
                        <CardListItem key={card.id} subject={card.subject} answer={card.answer} id={card.id as string} 
                        setCardId={setCardId} setSubject={setSubject} setAnswer={setAnswer}/>
                        ))}
                    </ul>
                </div>
                <div className="w-full">
                    <h3 className="my-2 py-0.5 overflow-x-scroll whitespace-nowrap">Tags: 
                    {tags.map(tag => <span key={tag} className="me-1 border border-semiLightPurple rounded-md text-tiny p-0.5">{tag}</span>)}
                    </h3>
                    <TagsSelect tags={tags} setTags={setTags} />
                </div>
                <div className="w-full">
                    <h3>Shareable:</h3>
                    <div className="inline-flex gap-2">
                        <button type="button" className={`share-btn-template ${shared ? 'after:scale-100' : 'after:scale-0'}`
                        } onClick={() => setShared(true)}>Yes</button>
                        <button type="button" className={`share-btn-template ${shared ? 'after:scale-0' : 'after:scale-100'}`} 
                        onClick={() => setShared(false)}>No</button>
                    </div>
                </div>
                <button className="w-full text-center justify-self-end bg-semiLightPurple rounded-lg p-1 hover:bg-purple-800 transition-all duration-500
                active:scale-95 active:opacity-80">
                    Create Deck
                </button>
            </form>
        </div>  
    </div>
  )
}
