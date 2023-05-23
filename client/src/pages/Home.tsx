import Lottie from 'lottie-react';
import animationData from '../assets/boyStudyingFinal.json'
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';



export default function Home() {
    const [count, setCount] = useState(0);
    const websiteTitles =  [
        {subText: 'Welcome to', highlightedText: 'Flasharer'},
        {subText: 'Studying for an exam?', highlightedText: 'With us you create flash cards anytime'},
        {subText: 'Looking for notes?', highlightedText: 'We\'ve got your back!'},
        {subText: 'Share your notes', highlightedText: 'With the entire World!'},
    ];

    useEffect(() => {
        let intervalId = setInterval(() => {
            setCount(prev => (prev + 1) % websiteTitles.length)
        }, 5000);

        return () => {
            clearInterval(intervalId)
        }
    })
  
  return (
    <div className='pt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-52'>
            <div className='flex justify-center items-center overflow-hidden'>
                <div
                className='h-52 flex justify-center items-center overflow-hidden'
                >
                <AnimatePresence mode='wait'> 
                    <motion.h1
                    key={count}
                    initial={{y: 30, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: -30, opacity: 0}}
                    className='text-white text-4xl text-center inline-block'
                    >
                    {websiteTitles[count].subText}
                    {" "}
                    <motion.span
                    initial={{x: 20, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: -20000, opacity: 0}}
                    transition={{delay: 1}}
                    className='text-semiLightPurple inline-block'
                    >
                    {websiteTitles[count].highlightedText}
                    </motion.span>
                    </motion.h1>
                </AnimatePresence>
                </div>
            </div>
            <Lottie className='min-h-[300px] max-h-[400px] md:max-h-fit' animationData={animationData} />
        </div>
    </div>

  )
}
