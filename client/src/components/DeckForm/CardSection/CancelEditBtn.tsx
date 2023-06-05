import React from 'react';

interface Props {
  setCardId: React.Dispatch<React.SetStateAction<string>>;
  clearCardFields: () => void;
}

export default function CancelEditBtn({ setCardId, clearCardFields }: Props) {
  function cancelEdit() {
    setCardId('');
    clearCardFields();
  }
  return (
    <button
      className='form-card-button-template bg-red-500 hover:bg-red-900'
      onClick={cancelEdit}
    >
      Cancel Edit
    </button>
  );
}
