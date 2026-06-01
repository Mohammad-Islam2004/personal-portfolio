import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(() => [
    "Hello", "नमस्ते", "Hola", "Bonjour",
    "Ciao", "Olá", "Здравствуйте",
    "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
  ], [])

  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 1. If we haven't reached the end of the list, keep incrementing
    if (index < greetings.length - 1) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1)
      }, 180); // Speed of word change
      return () => clearTimeout(timeout)
    } else {
      // 2. Once we hit the last word, wait a moment then trigger exit
      const exitTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 1000); 
      return () => clearTimeout(exitTimeout)
    }
  }, [index, greetings.length])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center z-9999 bg-black text-white overflow-hidden'
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Dot/Shape Decoration (Optional but looks pro) */}
          <motion.div 
             className="absolute bottom-[-10%] w-[120%] h-[150%] bg-black rounded-[50%]"
             exit={{ scaleY: 0 }} 
          />

          <motion.h1
            key={index}
            className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold relative z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <span className="mr-3 text-emerald-400">●</span>
            {greetings[index]}...
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroAnimation