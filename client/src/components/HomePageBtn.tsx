import { Link } from "react-router-dom";

interface Props {
    linkTo: string,
    text: string,
    direction: string
}

export default function HomePageBtn({linkTo, text, direction}: Props) {
  return (
    <Link to={linkTo}>
        <button className='homepage-button-template group text-center'>
            <span className='group-hover:opacity-0 transition-all duration-200'>{text}</span>
            <span className={`absolute w-full left-0 top-1/2 -translate-y-1/2 
            ${direction === 'right' ? 'translate-x-full' : '-translate-x-full'} 
            group-hover:-translate-x-0
            transition-all duration-200`}>Let's Go!</span>
        </button> 
    </Link>
  )
}
