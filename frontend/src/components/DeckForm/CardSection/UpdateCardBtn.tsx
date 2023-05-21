import { useAppDispatch } from "../../../app/hooks";
import { updateCard } from "../../../app/reducers/cardsReducer";
import { createAndDeleteNotification } from "../../../app/reducers/notificationReducer";

interface Props {
    id: string,
    subject: string,
    answer: string,
    clearCardsFields: () => void;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
}

export default function UpdateCardBtn({id, subject, answer, clearCardsFields, setCardId}: Props) {
  const dispatch = useAppDispatch();

  function handleClick()
  {
    if(!subject || !answer) {
      dispatch(createAndDeleteNotification({
        type: 'error',
        message: 'Missing subject or answer field'
      }));
      return;
    }

      dispatch(updateCard({
        id,
        subject,
        answer
      }));
      clearCardsFields();
      setCardId('');
      dispatch(createAndDeleteNotification({
        type: 'Success',
        message: 'Card updated'
      }));
  }

  return (
    <div className="w-full">
      <button type="button" disabled={!!!id} className={`form-card-button-template bg-semiLightPurple ${!id ? 
      'disabled:cursor-not-allowed disabled:opacity-20': 
      'hover:bg-purple-800 active:bg-purple-900 group'}`} onClick={handleClick}>
          <span className="group-active:opacity-0 transition-all duration-200">Edit Card</span>
          <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
          transition-all duration-200">Card Updated</span>
      </button>
    </div>
  )
}
