import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const certificates = [
  {
    title: "Full Stack Development Training Program",
    issuer: "GeeksIT Data Solutions",
    date: "2024",
    imgUrl: "https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D",
    certificateLink: "/FullStack.png",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
  },
  {
    title: "Python for Data Science",
    issuer: "Kaggle",
    date: "2025",
    imgUrl: "https://images.unsplash.com/photo-1690683789978-3cf73960d650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHB5dGhvbiUyMHByb2dyYW1taW5nfGVufDB8fDB8fHww",
    certificateLink: "/Python.png",
    tags: ["Data Structures", "Pandas", "NumPy", "Object-Oriented Programming (OOP)", "Data Visualization"],
    themeColor: "#f97316" // Orange accent
  },
  {
    title: "Excel Crash Course",
    issuer: "Skill Course E-learning Platform by Learn More Pro",
    date: "2025",
    imgUrl: "https://plus.unsplash.com/premium_photo-1671461774955-7aab3ab41b90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhjZWx8ZW58MHx8MHx8fDA%3D",
    certificateLink: "/Excel.png",
    tags: ["Data Analysis", "Pivot Tables", "Power Query", "Financial Modeling"],
    themeColor: "#16a34a" 
  }
]

export default function HolographicVault() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCert, setSelectedCert] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section id="certificates" className="relative bg-black text-neutral-100 min-h-screen py-24 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">

    <div  className='absolute bottom-1/10 left-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 blur-[120px] animate-pulse'/>
      
      {/* Premium Ambient Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1e1b4b,transparent_60%)] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Dynamic Metadata Display */}
        <div className="md:col-span-5 space-y-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none">
              Certificate <br className="hidden md:inline"/>Vault
            </h2>
          </div>

          {/* Active Info Display Card */}
          <div className="hidden md:block min-h-40 border-l-2 border-white/50 pl-6 py-2 space-y-3">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h3 className="text-xl font-bold text-white leading-tight">{certificates[activeIndex].title}</h3>
              <p className="text-neutral-400 text-sm">Issued by {certificates[activeIndex].issuer} • {certificates[activeIndex].date}</p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {certificates[activeIndex].tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Manual Controller Navigation Bullets */}
          <div className="flex justify-center md:justify-start gap-2 pt-2">
            {certificates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-8 bg-emerald-400" : "w-2 bg-neutral-800"}`}
                aria-label={`Go to certificate ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Card Deck Presentation Area */}
        <div className="md:col-span-7 flex justify-center items-center relative min-h-105 w-full">
          {!isMobile ? (
            /* DESKTOP DECK MODE */
            <div className="relative w-85 h-110 sm:w-95 sm:h-120]">
              {certificates.map((cert, idx) => (
                <HolographicCard
                  key={idx}
                  cert={cert}
                  idx={idx}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  onInspect={() => setSelectedCert(cert)}
                />
              ))}
            </div>
          ) : (
            /* MOBILE SWIPE LIST MODE */
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 py-8 w-full no-scrollbar">
              {certificates.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="w-[85vw] shrink-0 snap-center bg-neutral-900/60 border border-neutral-800 rounded-3xl p-5 space-y-4"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-black border border-neutral-800">
                    <img src={cert.imgUrl} alt={cert.title} className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="space-y-1">
                  <p className="text-gray-400 text-center">Tap to view</p>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">{cert.date}</span>
                    <h4 className="text-lg font-bold text-white tracking-tight">{cert.title}</h4>
                    <p className="text-neutral-400 text-xs">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* --- EXPANSE INSPECTOR MODAL LIGHTBOX --- */}
      <AnimatePresence>
        {selectedCert && (
          <LightboxModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

// ==================================================
// --- 3D INTERACTIVE HOLOGRAPHIC DECK CARD ---
// ==================================================
function HolographicCard({ cert, idx, activeIndex, setActiveIndex, onInspect }) {
  const cardRef = useRef(null)
  
  // Custom Motion values mapping the real-time mouse positions
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Turn tracking positions directly into dynamic 3D degrees vectors
  const rotateX = useTransform(mouseY, [-200, 200], [15, -15])
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15])
  
  // Converts layout coordinate metrics into floating background specular lighting gradients
  const sheenX = useTransform(mouseX, [-200, 200], ["120%", "-20%"])
  const sheenY = useTransform(mouseY, [-200, 200], ["120%", "-20%"])

  // Calculations that handle multi-layered depth arrangement stacking order offsets
  const positionOffset = idx - activeIndex
  const isTargetActive = positionOffset === 0
  const isPast = positionOffset < 0

  const handleMouseMove = (e) => {
    if (!isTargetActive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const valX = e.clientX - rect.left - width / 2
    const valY = e.clientY - rect.top - height / 2
    mouseX.set(valX)
    mouseY.set(valY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => isTargetActive ? onInspect() : setActiveIndex(idx)}
      style={{
        rotateX: isTargetActive ? rotateX : 0,
        rotateY: isTargetActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        zIndex: certificates.length - Math.abs(positionOffset)
      }}
      animate={{
        scale: isTargetActive ? 1 : 0.88 - Math.abs(positionOffset) * 0.04,
        x: isTargetActive ? 0 : isPast ? -160 - Math.abs(positionOffset) * 20 : 160 + Math.abs(positionOffset) * 20,
        y: isTargetActive ? 0 : Math.abs(positionOffset) * 15,
        rotate: isTargetActive ? 0 : isPast ? -8 : 8,
        opacity: isTargetActive ? 1 : 0.35 / Math.abs(positionOffset)
      }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
      className={`absolute inset-0 mx-auto w-full h-full cursor-pointer select-none`}
    >
      <div className="relative w-full h-full bg-neutral-900/40 backdrop-blur-3xl border border-neutral-800/80 rounded-4xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-neutral-700/60 transition-colors duration-300">
        
        {/* Dynamic Inner Radial Accent Hue Glow */}
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${cert.themeColor}, transparent 70%)` }}
        />

        {/* Dynamic Holographic Specular Lighting Sheen Overlay */}
        {isTargetActive && (
          <motion.div 
            className="absolute -inset-40 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)`
            }}
          />
        )}

        {/* Certificate Frame Image Container */}
        <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 relative shadow-inner">
          <img 
            src={cert.imgUrl} 
            alt={cert.title} 
            className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-95 group-hover:scale-[1.02] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
        </div>

        {/* Bottom Metadata Panel Context Info */}
        <div className="pt-4 flex items-center justify-between border-t border-neutral-800/60 mt-auto">
          <div className="space-y-0.5">
            <h4 className="text-base font-bold text-white tracking-tight leading-tight transition-colors group-hover:text-emerald-300 duration-300">{cert.title}</h4>
            <p className="text-neutral-500 text-xs">{cert.issuer}</p>
          </div>
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl text-neutral-300 font-bold shadow-sm shrink-0">
            {cert.date}
          </span>
        </div>

      </div>
    </motion.div>
  )
}

// ==========================================
// --- LIGHTBOX GALLERY VIEW MODAL ---
// ==========================================
function LightboxModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-black/60 transition-colors"
        >
          ✕
        </button>

        <div className="w-full flex-1 min-h-0 bg-neutral-950 flex items-center justify-center overflow-hidden p-2 sm:p-4 border-b border-neutral-800">
          <img 
            src={cert.imgUrl} 
            alt={cert.title} 
            className="max-w-full max-h-[50vh] sm:max-h-[60vh] object-contain rounded-lg shadow-xl"
          />
        </div>

        <div className="p-6 sm:p-8 bg-neutral-900 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                {cert.date}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">{cert.title}</h4>
            <p className="text-neutral-400 text-sm">Issued officially by {cert.issuer}</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={onClose}
              className="w-full sm:w-auto bg-neutral-800 text-neutral-300 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-neutral-700 transition-colors"
            >
              Close
            </button>
            <a 
              href={cert.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-neutral-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-neutral-200 transition-colors text-center shadow-lg whitespace-nowrap"
            >
              View Certificate ↗
            </a>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}