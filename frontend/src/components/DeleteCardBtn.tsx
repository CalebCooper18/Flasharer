
interface Props {
    handleDeleteCards: () => void;
}

export default function DeleteCardBtn({handleDeleteCards} : Props) {
  return (
    <button type="button" className="form-card-button-template bg-red-600 hover:bg-red-700
    active:bg-red-800 group" onClick={handleDeleteCards}>
        <span className="group-active:opacity-0 transition-all duration-200">Delete Cards</span>
        <span className="absolute -translate-y-24 left-1/2 -translate-x-1/2 group-active:translate-y-0
        transition-all duration-200">Cards Deleted</span>
    </button>
  )
}
