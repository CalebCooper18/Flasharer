import { useEffect } from "react"

import Deck from "../components/DeckDisplay";


import { useAppSelector, useAppDispatch } from "../app/hooks";
import { initializeDecks } from "../app/reducers/deckReducer";
import LoadingDots from "../components/LoadingDots";

export default function MyAccount() {

    const dispatch = useAppDispatch();
    const decks = useAppSelector(state => state.deck.decks);
    const loading = useAppSelector(state => state.deck.isLoading)

    useEffect(() => {
        const abortController = new AbortController
        const signal = abortController.signal
        dispatch(initializeDecks(true, signal))

        return () => 
        {
          abortController.abort()
        }
    }, [])


  return (
    <section>
        <h2 className="text-center text-2xl text-white capitalize py-6 underline">My Decks</h2>
        {loading && <LoadingDots />}
        <div className="mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {!loading && decks.map((deck => <Deck key={deck.id} deck={deck} location="user" />))}
        </div>
    </section>
  )
}
