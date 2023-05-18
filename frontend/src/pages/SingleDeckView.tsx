import { useEffect, useState } from 'react'
import deckService from '../services/deck.service'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks';
import { createAndDeleteNotification } from '../app/reducers/notificationReducer';
import LoadingDots from '../components/LoadingDots';
import { Deck } from '../types';
import CardGridItem from '../components/CardGridItem'
import GridViewBtn from '../components/GridViewBtn';

export default function SingleDeckView() {

    const dispatch = useAppDispatch();
    const [deck, setDeck] = useState<Deck>({} as Deck);
    const [gridView, setGridView] = useState(true);
    const [loading, setLoading] = useState(true)
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

    if(loading)
    {
        return (
            <LoadingDots />
        )
    }

  return (
    <section>
        <h2 className='text-center text-2xl text-white capitalize py-6 underline'>{deck.topic}</h2>
        <GridViewBtn gridView={gridView} setGridView={setGridView} /> 
        {gridView && 
        <div className='mx-8 mt-5 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {deck.cards.map((card => <CardGridItem key={card.id} front={card.subject} back={card.answer} /> ))}
        </div>
        }
    </section>    
  )
}
