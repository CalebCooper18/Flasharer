
import { motion } from "framer-motion";

import HomePageBtn from "./HomePageBtn";

import { User } from "../types";

interface Props {
    user : User | null;
}

export default function HomePageBtnsContainer({user}: Props) {

    return (
    <div className='mt-4 flex flex-col md:flex-row justify-center items-center gap-3'>
        <motion.div
        initial={{x: -20, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{delay: 1}}
        className='h-full w-full'
        >
        { user ? 
        <HomePageBtn text={'Create Deck'} linkTo={'/create'} direction={'left'} />  : 
        <HomePageBtn text={'Create Account'} linkTo={'/register'} direction={'left'} /> }
        </motion.div>
        <motion.div
        initial={{x: 20, opacity: 0}}
        animate={{x: 0, opacity: 1}}
        transition={{delay: 1}}
        className='h-full w-full'
        >  
        {user ? 
        <HomePageBtn text={'View Decks'} linkTo={'/sharedDecks'} direction={'right'} /> :
        <HomePageBtn text={'Login'} linkTo={'/login'} direction={'right'} />
        }
        </motion.div>
    </div>
    )
}
