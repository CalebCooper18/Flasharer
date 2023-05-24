import { Link } from "react-router-dom";

interface Props {
    linkTo: string,
    text: string
}

export default function HomePageBtn({linkTo, text}: Props) {
  return (
    <Link to={linkTo}>
        <button className='homepage-button-template group text-base'>
            <span className='group-hover:opacity-0 transition-all duration-200'>{text}</span>
            <span className='absolute -translate-y-32 left-1/2 -translate-x-1/2 group-hover:-translate-y-0
            transition-all duration-200'>Let's Go!</span>
        </button> 
    </Link>
  )
}
