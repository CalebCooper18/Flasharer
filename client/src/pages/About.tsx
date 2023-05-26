import { motion } from "framer-motion"
import Lottie from 'lottie-react'

import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { SiCodewars } from 'react-icons/si'

import animationData from '../assets/codingGuy.json';

const linkVariants = {
    initial: {x: -10, opacity: 0},
    animate: {x: 0, 
        opacity: 1,
        transition: {delayChildren: 2, staggerChildren: 0.5, duration: 1}
    }
}

export default function About() {
  return (
    <motion.section
    initial={{width: 0, opacity: 0}}
    animate={{width: '100%', opacity: 1}}
    exit={{width:0, opacity: 0}} 
    className='h-full w-full text-white text-center'>
    <h2 className='text-center underline text-2xl py-6'>About</h2>
    <div className='flex items-center justify-center flex-col w-full gap-2'>
        <motion.div
        initial={{opacity: 0, x:-10}}
        animate={{opacity: 1, x:0}}
        transition={{delay: 0.5, duration:1}}
        >
        <Lottie className='max-h-80 max-w-xs' animationData={animationData} />
        </motion.div>
        <motion.h3
        initial={{opacity: 0, x:-10}}
        animate={{opacity: 1, x:0}}
        transition={{delay: 1, duration:1}}
        className='text-sm xss:text-2xl'>
        Created By Caleb Cooper
        </motion.h3>
        <motion.a
         initial={{opacity: 0, x:-10}}
         animate={{opacity: 1, x:0}}
         transition={{delay: 1.5, duration:1}}
         className='text-sm xss:text-xl underline hover:underline'
         href='https://github.com/CalebCooper18/Flasharer'
         target='_blank'
         >
        Link to code
        </motion.a>
        <motion.div
        variants={linkVariants}
        initial='initial'
        animate='animate'
        >
            <motion.h2
            variants={linkVariants}>
            Links to my socials: 
            </motion.h2>
            <div className='flex justify-center items-center gap-2'>
                <motion.a 
                variants={linkVariants} 
                className='icon-btn'
                href='https://github.com/CalebCooper18'
                target='_blank'>
                    <AiFillGithub size={22} />
                </motion.a>
                <motion.a 
                variants={linkVariants} 
                className='icon-btn'
                href='https://www.linkedin.com/in/caleblukecooper19/'
                target='_blank'>
                    <AiFillLinkedin size={22} />
                </motion.a>
                <motion.a
                variants={linkVariants}
                className='icon-btn'
                href='https://www.codewars.com/users/Jiffylemmon67'
                target='_blank'>
                    <SiCodewars size={22} />
                </motion.a>
            </div>
        </motion.div>
    </div>
    </motion.section>
  )
}
