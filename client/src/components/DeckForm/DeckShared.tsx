import React from "react"

interface Props {
  shared: boolean,
  setShared: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeckShared({shared, setShared}: Props) {
  
  return (
    <div className="w-full">
      <h3>Shareable:</h3>
      <div className="inline-flex gap-2">
          <button type="button" className={`share-btn-template ${shared ? 'after:scale-100' : 'after:scale-0'}`
          } onClick={() => setShared(true)}>Yes</button>
          <button type="button" className={`share-btn-template ${shared ? 'after:scale-0' : 'after:scale-100'}`} 
          onClick={() => setShared(false)}>No</button>
      </div>
    </div>
  )
}

