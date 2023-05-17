import { useEffect, useState } from 'react'
import deckService from '../services/deck.service'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks';
import { createAndDeleteNotification } from '../app/reducers/notificationReducer';
import { Deck } from '../types';

export default function SingleDeckView() {

    const dispatch = useAppDispatch();
    const [deck, setDeck] = useState<Deck | null>(null);
    let { id } = useParams();

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
    

  return (
    <div>SingleDeck</div>
  )
}
