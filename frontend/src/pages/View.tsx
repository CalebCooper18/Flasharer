import { useEffect } from "react"

import Deck from "../components/DeckDisplay";


import { useAppSelector, useAppDispatch } from "../app/hooks";
import { initializeDecks } from "../app/reducers/deckReducer";

export default function View() {
    
    const dispatch = useAppDispatch();
    const decks = useAppSelector(state => state.decks);

    useEffect(() => {
        dispatch(initializeDecks(false))
    }, [])

  return (
    <>
        <h2 className="text-center text-2xl text-white capitalize py-6 underline">All Decks:</h2>
        <div className="mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {decks.map((deck => <Deck key={deck.id} deck={deck} location="user" />))}
        </div>
    </>
  )
}
