import Lottie from 'lottie-react';
import animationData from '../assets/boyStudyingFinal.json'
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';



export default function Home() {
    const [count, setCount] = useState(0);
    const [animationFinished, setAnimationFinished] = useState(false);
    
    const websiteTitles =  [
        {subText: 'Welcome to', highlightedText: 'Flasharer'},
        {subText: 'Studying for an exam?', highlightedText: 'With us you create flash cards anytime'},
        {subText: 'Looking for notes?', highlightedText: 'We\'ve got your back!'},
        {subText: 'Share your notes', highlightedText: 'With the entire World!'},
        {subText: 'Get Started', highlightedText: ''}
    ];

    useEffect(() => {
        let intervalId = setInterval(() => {
            setCount(prev => {
                if(prev + 1 === websiteTitles.length - 1)
                {
                    clearInterval(intervalId);
                    setAnimationFinished(true)
                    return prev + 1;
                }
                return prev + 1
            })
        }, 5000);

        return () => {
            clearInterval(intervalId)
        }
    }, [])
  
  return (
    <div className='pt-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-52'>
            <div className='flex justify-center items-center overflow-hidden'>
                <div
                className='h-72 flex-col flex justify-center items-center overflow-hidden'
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
                        {!animationFinished && <motion.span
                        initial={{x: 20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 1}}
                        className='text-semiLightPurple inline-block'
                        >
                        {websiteTitles[count].highlightedText}
                        </motion.span>}
                    </motion.h1>
                </AnimatePresence>
                {animationFinished && 
                    <div className='mt-2 flex flex-col text-2xl md:flex-row justify-center items-center gap-3'>
                        <motion.div
                        initial={{x: -20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 1}}
                        className='h-full w-full'
                        >
                            <button
                            className='homepage-button-template
                            group'
                            >
                            <span className="group-hover:opacity-0 transition-all duration-200">Create Decks</span>
                            <span className="absolute -translate-y-32 left-1/2 -translate-x-1/2 group-hover:-translate-y-8
                            transition-all duration-200">Let's Go!</span>
                            </button>
                        </motion.div>
                        <motion.div
                        initial={{x: 20, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 1}}
                        className='h-full w-full'
                        >
                            <button
                            className='homepage-button-template group'>
                            <span className="group-hover:opacity-0 transition-all duration-200">View Decks</span>
                            <span className="absolute -translate-y-32 left-1/2 -translate-x-1/2 group-hover:-translate-y-4
                            transition-all duration-200">Let's Go!</span>
                            </button>
                        </motion.div>
                    </div>}
                </div>
            </div>
            <Lottie className='min-h-[300px] max-h-[400px] md:max-h-fit' animationData={animationData} />
        </div>
    </div>

  )
}
