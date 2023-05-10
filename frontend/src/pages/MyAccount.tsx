import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { initializeUserDecks } from "../app/reducers/deckReducer";
import Deck from "../components/DeckDisplay";

export default function MyAccount() {

    const dispatch = useAppDispatch();
    const decks = useAppSelector(state => state.decks);

    useEffect(() => {
        dispatch(initializeUserDecks())
    }, [])

  return (
    <>
        <h2 className="text-center text-white capitalize py-6 underline">My Decks</h2>
        <div className="mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {decks.map((deck => <Deck key={deck.id} deck={deck} location="user" />))}
        </div>
    </>
  )
}
