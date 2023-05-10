import React, { ReactNode, SetStateAction } from 'react'
import { logoutUser } from '../../app/reducers/userReducer';
import { useAppDispatch } from '../../app/hooks';

interface Props {
    icon: ReactNode;
    text: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

}


export default function IconBtn({icon, text, setIsOpen}: Props) {
    const dispatch = useAppDispatch();

    function handleClick(menuType: string)
    {
        if(menuType === 'mobile')
        {
            setIsOpen(false);
        }

        dispatch(logoutUser());
    }


  return (
    <>
     <div className='icon-btn group hidden xss:flex' onClick={() => handleClick('desktop')  }>
        {icon}
        <span className='icon-tooltip group-hover:scale-100'>
          {text}
        </span>
      </div>
      <div className='xss:hidden flex justify-center' onClick={() => handleClick('mobile')}>
        <p className='mobile-link'>{text}</p>
      </div>
    </>
  )
}
