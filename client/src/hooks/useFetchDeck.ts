import { useEffect, useState} from "react";

import { createAndDeleteNotification } from "../app/reducers/notificationReducer";
import { useAppDispatch } from "../app/hooks";


import deckService from "../services/deck.service";

import { Deck } from "../types";

export function useFetchDeck(id: string)
{
    const [deck, setDeck] = useState<Deck | null>(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()


  useEffect(() => {
    let isCancelled = false;
   
    async function getDeck()
    {
        try 
        {
            if(id !== undefined)
            {
                if(!isCancelled)
                {
                    let result: Deck = await deckService.getSingleDeck(id);
                    setDeck(result);
                    setLoading(false);
                }
            }    
        } catch (error) 
        {
            if(!isCancelled)
            {
                if(error instanceof Error)
                {
                    dispatch(createAndDeleteNotification({type: 'error', message: error.message}))
                }
            }
        }
    }

    getDeck();

    return () => {
        isCancelled = true;
    }

  }, [])


  return {
    deck,
    loading
  }

}