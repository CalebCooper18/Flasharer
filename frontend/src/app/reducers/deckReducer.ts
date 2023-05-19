import { PayloadAction, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import deckService from "../../services/deck.service";
import { CreateDeck, Deck } from "../../types";
import { createAndDeleteNotification } from "./notificationReducer";


interface InitialState{
    decks: Deck[];
    isLoading: boolean;
}

const initialState: InitialState = {
    decks: [],
    isLoading: false
}


const deckReducer = createSlice({
    name: 'deck',
    initialState,
    reducers: 
    {
        setDecks(state, action: PayloadAction<Deck[]>)
        {
            state.decks = action.payload
        },
        addDeck(state, action: PayloadAction<Deck>)
        {
            state.decks.push(action.payload);
        },
        deleteDeck(state, action: PayloadAction<string>)
        {
           return {...state, decks: state.decks.filter(deck => deck.id !== action.payload)}
        },
        setIsLoading(state, action: PayloadAction<boolean>)
        {
            state.isLoading = action.payload;
        }
    }
})

export const {setDecks, addDeck, deleteDeck, setIsLoading} = deckReducer.actions;

export function initializeDecks(userDecks: boolean, signal: AbortSignal)
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try {
            dispatch(setIsLoading(true))
            const allDecks: Deck[] = userDecks ? await deckService.getAllUserDecks() : await deckService.getAllSharedDecks()
            
            if(!signal.aborted)
            {
                console.log(signal.aborted)
                dispatch(setDecks(allDecks))
                dispatch(setIsLoading(false))
            }

        } catch (error) {
            console.error('Error');
            setIsLoading(false);
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

export function deleteUserDeckReduce(id: string)
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try 
        {
            await deckService.deleteUserDeck(id);
            dispatch(deleteDeck(id))
            dispatch(createAndDeleteNotification({
                type: 'success',
                message: 'Deck has been deleted'
            }))    
            
        } catch (error) {
            console.log(error);
            dispatch(createAndDeleteNotification({
                type: 'error',
                message: 'Internal error please try again later!'
            }))
        }
    }
}

export default deckReducer.reducer;