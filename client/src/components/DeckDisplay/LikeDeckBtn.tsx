import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateDeckLikes } from '../../app/reducers/deckReducer';

import { Deck } from '../../types';

interface Props {
  deck: Deck;
}

export default function LikeDeckBtn({ deck }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(updateDeckLikes(deck));
  }

  return (
    <button onClick={handleClick} className='hover:underline hover:text-black'>
      {deck.likedBy.includes(user?.id as string) ? 'Unlike' : 'Like'}
    </button>
  );
}
