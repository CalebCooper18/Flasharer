import { PayloadAction, createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { createAndDeleteNotification } from "./notificationReducer";

import deckService from "../../services/deck.service";

import { CreateDeck, Deck } from "../../types";


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
        updateDeck(state, action: PayloadAction<Deck>){
            return {...state, decks: state.decks.map(deck => deck.id === action.payload.id ? action.payload : deck)}
        },
        setIsLoading(state, action: PayloadAction<boolean>)
        {
            state.isLoading = action.payload;
        }
    }
})

export const {setDecks, addDeck, deleteDeck, updateDeck, setIsLoading} = deckReducer.actions;

export function initializeDecks(userDecks: boolean, signal: AbortSignal)
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try {
            dispatch(setIsLoading(true))
            const allDecks: Deck[] = userDecks ? await deckService.getAllUserDecks() : await deckService.getAllSharedDecks()
            
            if(!signal.aborted)
            {
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
            dispatch(createAndDeleteNotification({
                type: 'error',
                message: 'Internal error please try again later!'
            }))
        }
    }
}

export function updateDeckLikes(deck: Deck)
{
   
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try 
        {
            const updatedDeck: Deck = await deckService.updateDeckLikes(deck.id)
            dispatch(updateDeck(updatedDeck))
            dispatch(createAndDeleteNotification({
                type: 'success',
                message: deck.likes < updatedDeck.likes ? 'Deck Liked' : 'Like Removed' 
            }))    
            
        } catch (error) {
            dispatch(createAndDeleteNotification({
                type: 'error',
                message: 'Internal error please try again later!'
            }))
        }
    }
}

export function updateUserDeck(deck: Deck)
{
    return async function(dispatch: ThunkDispatch<unknown, unknown, AnyAction>)
    {
        try 
        {
            const updatedDeck: Deck = await deckService.updateUserDeck(deck)
            dispatch(updateDeck(updatedDeck))
            dispatch(createAndDeleteNotification({
                type: 'success',
                message: 'Deck successfully updated'
            }))    
            
        } catch (error) {
            dispatch(createAndDeleteNotification({
                type: 'error',
                message: 'Internal error please try again later!'
            }))
        }
    }
}

export default deckReducer.reducer;