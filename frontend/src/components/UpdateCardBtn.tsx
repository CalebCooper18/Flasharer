import { updateCard } from "../app/reducers/cardsReducer";
import { useAppDispatch } from "../app/hooks";

interface Props {
    id: string,
    subject: string,
    answer: string,
    clearCardsFields: () => void;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
}

export default function UpdateCardBtn({id, subject, answer, clearCardsFields, setCardId}: Props) {
  console.log(id, subject, answer, clearCardsFields);
  return (
    <button type="button" disabled={!!!id} className={`form-card-button-template bg-purple-400 ${!id ? 
    'disabled:cursor-not-allowed disabled:opacity-20': 
    'hover:bg-purple-600 active:bg-purple-900 group'}`}>
        <span className="group-active:opacity-0 transition-all duration-200">Edit Card</span>
        <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
        transition-all duration-200">Card Updated</span>
    </button>
  )
}
