import { FaWhatsapp, FaLinkedinIn, FaGithub, FaArrowUp } from "react-icons/fa"
import { motion } from 'framer-motion'

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contacts", href: "#contacts" }
]

const socials = [
  { Icon: FaWhatsapp, label: "Whatsapp", href: 'https://wa.me/917877167630' },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: 'https://linkedin.com/in/mohammad-islam-khan-1615293a9' },
  { Icon: FaGithub, label: "Github", href: 'https://github.com/Mohammad-Islam2004' }
]

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))" },
  hover: { 
    scale: 1.2, 
    y: -3, 
    filter: "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))", 
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  tap: { 
    scale: 0.95, 
    y: 0, 
    filter: "drop-shadow(0 0 2px rgba(13, 88, 204, 0.3))",
    transition: { duration: 0.08 }
  }
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full bg-black text-neutral-400 py-4  overflow-hidden">
      
      {/* Premium Font Injection Link Block */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* ========================================================================= */}
      {/* INTEGRATED: TWO AMBIENT GLOWING BLOB EFFECTS                              */}
      {/* ========================================================================= */}
      {/* Blobs */}
      <div 
        className="absolute -bottom-20 -rotate-12 left-[5%] -translate-x-1/2 w-70 sm:w-120 h-62.5 bg-blue-600/20 blur-[50px] rounded-full pointer-events-none animate-pulse" 
        style={{ animationDuration: '11s' }}
      />
      
      <div 
        className="absolute -top-20 left-[95%] rotate-12 -translate-x-1/2 w-70 sm:w-120 h-62.5 bg-emerald-500/25 blur-[50px] rounded-full pointer-events-none animate-pulse" 
        style={{ animationDuration: '11s' }} 
      />

      <div 
        className="absolute inset-0 top-20 left-1/2 -translate-x-1/2 w-160 sm:w-120 h-72.5 bg-red-500/15 blur-[50px] -rotate-12 rounded-full pointer-events-none animate-pulse"
        style={{ animationDuration: '11s' }}
      />
      {/* ========================================================================= */}

      {/* Top Ambient Subtle Line Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-neutral-800/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center space-y-12"
      >
        
        {/* UPPER PANEL: Hero Typography & Quote Tagline */}
        <div className="w-full flex flex-col items-center text-center space-y-5">
          <h1 
            className="font-semibold select-none text-white font-jakarta tracking-tight italic"
            style={{
              fontSize: 'clamp(2.5rem, 7.5vw, 7.5rem)',
              lineHeight: 0.9,
              padding: '0 3vw',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 18px rgba(255, 255, 255, 0.45), 0 0 30px rgba(255, 255, 255, 0.25)'
            }}
          >
            Mohammad Islam
          </h1>
          
          {/* REFACTORED: Standardized height utility for cross-version rendering accuracy */}
          <div className="h-0.75 lg:w-44 md:w-32 w-24 rounded-full bg-linear-to-r from-[#0d58cc] via-cyan-300 to-emerald-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
          
          <p className="text-neutral-400 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-jakarta font-semibold max-w-xl pt-2">
            "Success is when preparation meets opportunity."
          </p>
        </div>

        {/* MID PANEL: Navigation Anchors & Quick Link Loops */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-b border-neutral-900/60 pb-8">
          <ul className="flex items-center flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium font-jakarta">
            {links.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2, color: 'pink' }} className="transition-colors duration-200">
                <a href={link.href}>{link.name}</a>
              </motion.li>
            ))}
          </ul>

          {/* Social Icons Docking Frame */}
          <div className='flex items-center gap-5 text-2xl md:text-3xl justify-center'>
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                href={href}
                key={label}
                target='_blank'
                aria-label={label}
                rel='noopener noreferrer'
                variants={glowVariants}
                initial='initial'
                whileHover='hover'
                whileTap='tap'
                className='text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center justify-center p-1'
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* BOTTOM PANEL: Clean Sign-Off & Scroll Trigger */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-jakarta tracking-wide">
            &copy; {new Date().getFullYear()} Mohammad Islam. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-neutral-950 border border-neutral-900 px-3 py-1.5 rounded-xl text-xs font-medium text-neutral-500 cursor-pointer font-jakarta transition-colors group"
          >
            <span>Top</span>
            <FaArrowUp className="text-[9px] transform group-hover:-translate-y-px transition-transform duration-300" />
          </motion.button>
        </div>

      </motion.div>
    </footer>
  )
}

export default Footer