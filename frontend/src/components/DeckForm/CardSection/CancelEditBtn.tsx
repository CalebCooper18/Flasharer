import React from 'react'

interface Props {
    setCardId: React.Dispatch<React.SetStateAction<string>>;
}

export default function CancelEditBtn({ setCardId }: Props) {
  return (
    <button className="form-card-button-template bg-red-500 hover:bg-red-900"
    onClick={() => setCardId('')}>
    Cancel Edit
    </button>
  )
}
