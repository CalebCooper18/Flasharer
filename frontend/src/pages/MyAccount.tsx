import { useEffect } from "react"
import deckService from "../services/deck.service"
import Deck from "../components/Deck";

export default function MyAccount() {

    useEffect(() => {
        deckService.getAllUserDecks();
    })
  return (
    <>
        <h2 className="text-center text-white capitalize py-6 underline">My Decks</h2>
        <div className="mx-4 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <Deck />
            <Deck />
            <Deck />
            <Deck />
            <Deck />
            <Deck />
            <Deck />
            <Deck />
        </div>
    </>
  )
}
