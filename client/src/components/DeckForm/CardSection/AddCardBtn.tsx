interface Props {
    handleAddCard: () => void;
}

export default function AddCardBtn({handleAddCard}: Props) {
  return (
    <button type="button" className="form-card-button-template bg-green-600 hover:bg-green-700 
    active:bg-green-800 group" onClick={handleAddCard}>
        <span className="group-active:opacity-0 transition-all duration-200">Add Card</span>
        <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
        transition-all duration-200">Card Added</span>
    </button>
  )
}
