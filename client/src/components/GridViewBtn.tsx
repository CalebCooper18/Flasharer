import { BiGridAlt } from 'react-icons/bi';
import { MdCropSquare } from 'react-icons/md';

interface Props {
  gridView: boolean;
  setGridView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GridViewBtn({ gridView, setGridView }: Props) {
  return (
    <div className='flex w-full justify-center xss:justify-start items-center gap-2 pl-2 text-white'>
      <span className='text-white text-sm hidden xss:inline'>View:</span>
      <div className='inline-flex rounded-md shadow-sm'>
        <button
          className={`grid-view-btn-template 
                ${gridView ? 'bg-purple-800' : 'bg-purple-400'}`}
          onClick={() => setGridView(true)}
        >
          <BiGridAlt size={22} />
        </button>
        <button
          className={`grid-view-btn-template border-l-0 
                ${gridView ? 'bg-purple-400' : 'bg-purple-800'}`}
          onClick={() => setGridView(false)}
        >
          <MdCropSquare size={22} />
        </button>
      </div>
    </div>
  );
}
