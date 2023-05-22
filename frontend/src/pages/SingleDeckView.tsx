import { useState } from 'react'
import { useParams } from 'react-router-dom'

import LoadingDots from '../components/LoadingDots';
import CardGridItem from '../components/CardGridItem'
import GridViewBtn from '../components/GridViewBtn';
import CardCarousel from '../components/CardCarousel/CardCarousel';

import { useFetchDeck } from '../hooks/useFetchDeck';

export default function SingleDeckView() {
    const [gridView, setGridView] = useState(true);
    const { id } = useParams();
    const {deck, loading} = useFetchDeck(id as string)
    

    if(loading)
    {
        return (
            <LoadingDots />
        )
    }

   
  return (
    <section>
        <h2 className='text-center text-2xl text-white capitalize py-6 underline max-w-full break-words'>{deck?.topic}</h2>
        <GridViewBtn gridView={gridView} setGridView={setGridView} /> 
        {gridView && 
        <div className='mx-8 mt-5 grid grid-cols-1 xss:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {deck?.cards.map((card => <CardGridItem key={card.id} front={card.subject} back={card.answer} /> ))}
        </div>
        }
        {!gridView && <CardCarousel cards={deck?.cards} />}
    </section>    
  )
}
