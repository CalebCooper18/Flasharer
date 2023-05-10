import { PayloadAction, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import deckService from "../../services/deck.service";
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

export function initializeUserDecks()
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try {
            const allDecks: Deck[] = await deckService.getAllUserDecks()
            dispatch(setDecks(allDecks))

        } catch (error) {
            console.error('Error');
        }
    }
}

export default deckReducer.reducer;