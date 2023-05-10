import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Deck } from "../../types";


type InitialState = Deck[];

const initialState: InitialState = []


const deckReducer = createSlice({
    name: 'deck',
    initialState,
    reducers: 
    {
        setDecks(_state, action: PayloadAction<Deck[]>)
        {
            return action.payload
        },
    }
})

export const {setDecks} = deckReducer.actions;


export default deckReducer.reducer;