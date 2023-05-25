import { SyntheticEvent, useEffect} from "react"
import { motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCardForm } from '../hooks/useCardForm';

import { createNewUserDeck } from "../app/reducers/deckReducer";
import { clearCards } from "../app/reducers/cardsReducer";

import DeckShared from '../components/DeckForm/DeckShared';
import CardSectionContainer from '../components/DeckForm/CardSection/CardSectionContainer';

import TopicInput from '../components/DeckForm/TopicInput';
import TagsSection from '../components/DeckForm/TagsSection';


export default function Create() {

    const {topic, setTopic, subject, setSubject, answer, setAnswer, tags, setTags, shared, setShared,
        cardId, setCardId, removeCardIds, clearAllFields, clearCardFields, handleAddCard} = useCardForm();

    const dispatch = useAppDispatch();
    const { cards } = useAppSelector(state => state.cards);

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

    useEffect(() => {
        return () => 
        {
            dispatch(clearCards())
        }
    }, [])

  return (
    <motion.section 
    initial={{width: 0, opacity: 0}}
    animate={{width: '100%', opacity: 1}}
    exit={{width: 0, opacity: 0}}
    className="h-[900px] min-w-[200px] pt-10 w-full flex flex-col justify-center items-center text-white sm:h-[750px] xss:pt-20">
        <div className="bg-primary h-full w-5/6 rounded-lg py-4 px-5">
            <form className="w-full h-full flex flex-col items-center justify-around gap-1 sm:gap-3" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="leading-4 mb-5 text-center">Create a new Deck:</h3>
                <TopicInput setTopic={setTopic} topic={topic} />
                <CardSectionContainer setSubject={setSubject} setAnswer={setAnswer} setCardId={setCardId} subject={subject}
                answer={answer} cardId={cardId} handleAddCard={handleAddCard} clearCardFields={clearCardFields}/>
                <TagsSection setTags={setTags} tags={tags} />
                <DeckShared setShared={setShared} shared={shared} />
                <button className="w-full text-center justify-self-end bg-semiLightPurple rounded-lg p-1 hover:bg-purple-800 transition-all duration-500
                active:scale-95 active:opacity-80">
                    Create Deck
                </button>
            </form>
        </div>  
    </motion.section>
  )
}
