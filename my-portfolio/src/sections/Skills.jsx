import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import { FaPython } from 'react-icons/fa'
import { 
  SiNumpy, 
  SiPandas, 
  SiTensorflow, 
  SiPytorch, 
  SiMysql, 
  SiMongodb,
  SiGit
} from "react-icons/si";
import { GrGenai } from "react-icons/gr";

const Skills = () => {
  const skills = [
    { icon: <FaPython />, name: "Python" },
    { icon: <SiNumpy />, name: "NumPy" },
    { icon: <SiPandas />, name: "Pandas" },
    { 
      // Safe Inline SVG for Scikit-Learn (ML Nodes/Clusters)
      icon: (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ), 
      name: "Scikit-Learn" 
    },
    { icon: <SiTensorflow />, name: "TensorFlow" },
    { icon: <SiPytorch />, name: "PyTorch" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <GrGenai />, name: "Generative AI" },
    { 
      // Safe Inline SVG for Power BI (Data Columns)
      icon: (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 2h-4v20h4V2zm-6 6H9v14h4V8zm-6 6H3v8h4v-8z"/>
        </svg>
      ), 
      name: "Power BI" 
    },
    { 
      // Safe Inline SVG for Tableau (Data Star/Cross Cluster)
      icon: (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 2h2v20h-2V2zm-9 9h20v2H2v-2zm4.5-4.5h11v11h-11v-11z" opacity="0.3"/>
          <path d="M10 5h4v14h-4V5zm-5 5h14v4H5v-4z"/>
        </svg>
      ), 
      name: "Tableau" 
    },
    { icon: <SiGit />, name: "Git" }
  ]

  const repeat = [...skills, ...skills]
  // ... rest of your code remains exactly the same

  const [dir, setDir] = useState(-1)
  const [active, setActive] = useState(false)
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const touchY = useRef(null)
  const x = useMotionValue(0)

  useEffect(() => {
    const el = sectionRef.current
    if(!el) return

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1)
    }, { threshold: [0.1] })
    
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
     if(!active) return

     const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1)
     const onTouchStart = (e) => (touchY.current = e.touches[0].clientY)
     const onTouchMove = (e) => {
      if(touchY.current == null) return
      const delta = e.touches[0].clientY - touchY.current
      setDir(delta > 0 ? 1 : -1)
      touchY.current = e.touches[0].clientY
     }
     window.addEventListener('wheel', onWheel, { passive: true })
     window.addEventListener('touchstart', onTouchStart, { passive: true })
     window.addEventListener('touchmove', onTouchMove, { passive: true })
     
     return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
     }
  }, [active])

  useEffect(() => {
    let id
    let last = performance.now()
    const SPEED = 80

    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      let next = x.get() + SPEED * dir * dt
      const loop = trackRef.current ? trackRef.current.scrollWidth / 2 : 0

      if(loop) {
        if(next <= -loop) next += loop
        if(next >= 0) next -= loop
      }
      x.set(next)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [dir, x])

  return (
    <section ref={sectionRef} id='skills' className='w-full h-1/2 pb-3 flex flex-col justify-center items-center relative bg-black text-white overflow-hidden'>
      {/* Background glow animations */}
      <div className='absolute inset-0'>
        <div
        className='absolute -top-100 -left-32
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-125 max-h-125
        rounded-full
        bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse
        '></div>
        <div
        className='absolute -bottom-100 right-1
        w-[70vw] sm:w-[z-500vw] md:w-[40vw]
        h-[70vw] sm:h-[50vw] md:h-[40vw]
        max-w-125 max-h-125
        rounded-full
        bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-300'
        ></div>
      </div>
      
      {/* Heading matching updated styling */}
      <motion.h2
      className='text-4xl sm:text-5xl mt-5 font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500 z-10'
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      >
        My Technical Stack
      </motion.h2>
      
      <motion.p
      className='mt-2 mb-4 text-gray-400 text-base sm:text-lg z-10 font-medium'
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      >
        Predictive Analytics | Core Machine Learning architectures
      </motion.p>
      
      {/* Slider Track */}
      <div className='relative w-full overflow-hidden py-4'>
        <motion.div
        ref={trackRef}
        className='flex gap-0 text-6xl text-cyan-400/90'
        style={{ x, whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          {repeat.map((s, i) => (
            <div key={i}
            className='flex flex-col items-center gap-3 min-w-36 transition-all duration-300 group'
            aria-label={s.name}
            title={s.name}
            >
              {/* Scale icon and illuminate color slightly on hover */}
              <span className='group-hover:scale-125 group-hover:text-teal-300 transition-all duration-300 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]'>
                {s.icon}
              </span>
              <p className='text-xs font-semibold text-gray-400 tracking-wider group-hover:text-white transition-colors duration-300'>
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills