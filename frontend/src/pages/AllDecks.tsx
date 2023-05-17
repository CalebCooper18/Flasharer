import { useEffect } from "react"

import Deck from "../components/DeckDisplay";
import LoadingDots from "../components/LoadingDots";


import { useAppSelector, useAppDispatch } from "../app/hooks";
import { initializeDecks } from "../app/reducers/deckReducer";

export default function AllDecks() {
    
    const dispatch = useAppDispatch();
    const decks = useAppSelector(state => state.deck.decks);
    const loading = useAppSelector(state => state.deck.isLoading);

    useEffect(() => {
      const abortController = new AbortController
      const signal = abortController.signal
      dispatch(initializeDecks(false, signal))

      return () => 
      {
        abortController.abort()
      }
  }, [])


  return (
    <>
        <h2 className="text-center text-2xl text-white capitalize py-6 underline">All Decks:</h2>
        {loading && <LoadingDots />}
        <div className="mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {!loading && decks.map((deck => <Deck key={deck.id} deck={deck} location="user" />))}
        </div>
    </>
  )
}
