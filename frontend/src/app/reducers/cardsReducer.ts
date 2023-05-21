import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CreateCard } from '../../types'

interface InitialState {
     cards: CreateCard[]
}

const initialState: InitialState = {
     cards: []
}


const cardsReducer = createSlice({
    name: 'cards',
    initialState,
    reducers: 
    {
       addCard(state, action: PayloadAction<CreateCard>)
       {
          state.cards.push(action.payload)
       },
       deleteCard(state, action: PayloadAction<string>)
       {
          return {
               ...state,
               cards: state.cards.filter(card => card.id !== action.payload)
          }
       },
       updateCard(state, action: PayloadAction<CreateCard>)
       {
            return {
               ...state,
               cards: state.cards.map(card => card.id !== action.payload.id ? card : action.payload )
            }
       },
       clearCards(state)
       {
          state.cards = []
       },
    }
})


export const {addCard, deleteCard, updateCard, clearCards} = cardsReducer.actions;


export default cardsReducer.reducer;