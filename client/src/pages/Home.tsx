import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';

import animationData from '../assets/boyStudyingFinal.json';
import HomePageBtnsContainer from '../components/HomePageBtnContainer';

import { User } from '../types';

interface Props {
  user: User | null;
}

export default function Home({ user }: Props) {
  const [count, setCount] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);

  const websiteTitles = user
    ? [
        { subText: 'Welcome Back', highlightedText: `${user.username}` },
        { subText: "Let's get back in the action", highlightedText: '' },
      ]
    : [
        { subText: 'Welcome to', highlightedText: 'Flasharer' },
        {
          subText: 'Studying for an exam?',
          highlightedText: 'With us you create flash cards anytime',
        },
        {
          subText: 'Looking for notes?',
          highlightedText: "We've got your back!",
        },
        {
          subText: 'Share your notes',
          highlightedText: 'With the entire World!',
        },
        { subText: 'Get Started', highlightedText: '' },
      ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev + 1 === websiteTitles.length - 1) {
          clearInterval(intervalId);
          setAnimationFinished(true);
          return websiteTitles.length - 1;
        }
        return prev + 1;
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [websiteTitles.length]);

  return (
    <motion.section
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '100%', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className='pt-4 md:pt-20'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-h-52'>
        <div className='flex justify-center items-center overflow-hidden'>
          <div className='h-56 md:h-72 flex-col flex justify-center items-center overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.h1
                key={count}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                className='text-white text-xl xs:text-4xl text-center inline-block'
              >
                {websiteTitles[count].subText}{' '}
                {!animationFinished && (
                  <motion.p
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className='text-semiLightPurple block'
                  >
                    {websiteTitles[count].highlightedText}
                  </motion.p>
                )}
              </motion.h1>
            </AnimatePresence>
            {animationFinished && <HomePageBtnsContainer user={user} />}
          </div>
        </div>
        <Lottie
          className='min-h-[300px] max-h-[400px] md:max-h-fit'
          animationData={animationData}
        />
      </div>
    </motion.section>
  );
}
