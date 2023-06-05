import { deleteUserDeckReduce } from '../../app/reducers/deckReducer';
import { useAppDispatch } from '../../app/hooks';

interface Props {
  id: string;
}

export default function DeleteDeckBtn({ id }: Props) {
  const dispatch = useAppDispatch();

  function handleDelete(id: string) {
    dispatch(deleteUserDeckReduce(id));
  }

  return (
    <button
      className='hover:underline hover:text-red-600'
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
}
