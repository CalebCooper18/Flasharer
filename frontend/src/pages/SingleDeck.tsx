import React from 'react'
import deckService from '../services/deck.service'
import { useParams } from 'react-router-dom'

export default function SingleDeck() {

    let { id } = useParams();

    console.log(id);
    

  return (
    <div>SingleDeck</div>
  )
}
