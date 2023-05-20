import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CreateCard } from '../../types'

type InitialState = CreateCard[];

const initialState: InitialState = []


const cardsReducer = createSlice({
    name: 'cards',
    initialState,
    reducers: 
    {
       addCard(state, action: PayloadAction<CreateCard>)
       {
            state.push(action.payload)
       },
       deleteCard(state, action: PayloadAction<string>)
       {
            return state.filter(card => card.id !== action.payload);
       },
       updateCard(state, action: PayloadAction<CreateCard>)
       {
            return state.map(card => card.id !== action.payload.id ? card : action.payload );
       },
       clearCards(_state)
       {
          return []
       },
    }
})


export const {addCard, deleteCard, updateCard, clearCards} = cardsReducer.actions;


export default cardsReducer.reducer;