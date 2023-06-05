import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  icon: ReactNode;
  text: string;
  linkLocation: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IconLink({
  icon,
  text,
  linkLocation,
  setIsOpen,
}: Props) {
  return (
    <Link to={`${linkLocation}`}>
      <div className='icon-btn group hidden xss:flex'>
        {icon}
        <span className='icon-tooltip group-hover:scale-100'>{text}</span>
      </div>
      <div className='xss:hidden flex' onClick={() => setIsOpen(false)}>
        <p className='mobile-link'>{text}</p>
      </div>
    </Link>
  );
}
