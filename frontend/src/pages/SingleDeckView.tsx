import { useEffect, useState } from 'react'
import deckService from '../services/deck.service'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks';
import { createAndDeleteNotification } from '../app/reducers/notificationReducer';
import LoadingDots from '../components/LoadingDots';
import { Deck } from '../types';
import { BiGridAlt } from 'react-icons/bi';
import { MdCropSquare } from 'react-icons/md'
import CardGridItem from '../components/CardGridItem'

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
        <div className='flex w-full justify-center xss:justify-start items-center gap-2 pl-2 text-white'>
            <span className='text-white text-sm hidden xss:inline'>View:</span>
            <div className='inline-flex rounded-md shadow-sm'>
                <button className={`inline-flex justify-center items-center gap-2 first:rounded-l-lg 
                last:rounded-r-lg border-semiLightPurple border-4 px-3 py-1 
                hover:bg-purple-800 transition-all duration-500  
                ${gridView ? 'bg-purple-800': 'bg-purple-400'}`} 
                onClick={(() => setGridView(true))}>
                <BiGridAlt size={22}/>
                </button>
                <button className={`inline-flex justify-center items-center gap-2 first:rounded-l-lg
                 last:rounded-r-lg border-semiLightPurple border-4 border-l-0 px-3 py-1
                hover:bg-purple-800 transition-all duration-500  
                ${gridView ? 'bg-purple-400': 'bg-purple-800'}`} 
                onClick={(() => setGridView(false))}>
                    <MdCropSquare size={22}/>
                </button>
            </div>
        </div>
        {gridView && 
        <div className='mx-8 mt-5 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {deck.cards.map((card => <CardGridItem key={card.id} front={card.subject} back={card.answer} /> ))}
        </div>
        }
    </section>    
  )
}
