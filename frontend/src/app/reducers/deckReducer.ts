import { PayloadAction, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import deckService from "../../services/deck.service";
import { CreateDeck, Deck } from "../../types";
import { createAndDeleteNotification } from "./notificationReducer";


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
        addDeck(state, action: PayloadAction<Deck>)
        {
            state.push(action.payload);
        }
    }
})

export const {setDecks, addDeck} = deckReducer.actions;

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

export function createNewUserDeck(deck: CreateDeck)
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try
        {
            const newDeck = await deckService.createUserDeck(deck);
            dispatch(addDeck(newDeck));
            dispatch(createAndDeleteNotification({
                type: 'success',
                message: 'New deck created'
            }))
        } catch (error) 
        {
            dispatch(createAndDeleteNotification({
                type: 'error',
                message: 'Internal error please try again later'
            }))
        }
    } 
}

export default deckReducer.reducer;