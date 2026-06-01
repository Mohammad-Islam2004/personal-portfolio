import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const experiences = [
  {
    role: "Web Developer",
    company: "GeeksIT Data Solutions Ltd.",
    duration: "2024",
    tags: ["React", "Next.js", "AI Integration", "Tailwind"],
    description:
      "Engineered high-performance web applications and seamlessly integrated AI features, resulting in a measurable 10% increase in user engagement metrics.",
  },
  {
    role: "Data Science Intern",
    company: "Pantech.ai Solutions",
    duration: "2025",
    tags: ["Python", "Data Analysis", "Machine Learning"],
    description:
      "Gained robust, hands-on experience applying data science methodologies, cleaning complex datasets, and training foundational machine learning models.",
  },
]

export default function Experience() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 140vh per card on mobile gives your thumb an excellent, steady scrolling rhythm
  const totalHeightVh = experiences.length * (isMobile ? 140 : 130)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // DESKTOP ONLY TRANSLATION: Moves whole ribbon track horizontally
  const xDesktopTransform = useTransform(scrollYProgress, [0, 1], ["0%", `-${(experiences.length - 1) * 35}%`])

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-black text-neutral-100 w-full font-sans selection:bg-emerald-500/30"
      style={{ height: `${totalHeightVh}vh` }}
    >
      {/* Sticky Frame Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-6 sm:py-12 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl w-full mx-auto flex flex-col h-full max-h-[85vh] lg:max-h-[80vh] justify-center">
          
          {/* Header Strip Block */}
          <div className="mb-4 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-800/60 pb-4 sm:pb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-emerald-400 uppercase mb-1 block">
                History & Milestones
              </span>
              <h2 className="text-2xl sm:text-5xl font-black tracking-tight text-white">
                Professional Experience
              </h2>
            </div>
            
            {/* Timeline Progress Gauge Track */}
            <div className="flex items-center gap-3 min-w-37.5 sm:min-w-50">
              <span className="text-[10px] sm:text-xs font-mono text-neutral-500">START</span>
              <div className="h-0.5 bg-neutral-800 flex-1 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-emerald-400 origin-left w-full"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400">END</span>
            </div>
          </div>

          {/* Render Port Viewport Box */}
          <div className="relative w-full overflow-visible mt-2 flex flex-col justify-center flex-1">
            {!isMobile ? (
              /* --- DESKTOP VIEW: Left-To-Right Conveyor Slide --- */
              <motion.div 
                style={{ x: xDesktopTransform }} 
                className="flex items-stretch gap-8 w-full"
              >
                {experiences.map((exp, idx) => (
                  <DesktopCard 
                    key={idx} 
                    exp={exp} 
                    idx={idx} 
                    total={experiences.length} 
                    scrollYProgress={scrollYProgress} 
                  />
                ))}
              </motion.div>
            ) : (
              /* --- MOBILE LAYOUT: Top-Down Fluid Waterfall Stack Reveal --- */
              <div className="relative w-full h-[55vh] sm:h-[60vh] flex items-center justify-center">
                {experiences.map((exp, idx) => (
                  <MobileCard 
                    key={idx} 
                    exp={exp} 
                    idx={idx} 
                    total={experiences.length} 
                    scrollYProgress={scrollYProgress} 
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}

// ==========================================
// --- DESKTOP CARD CONTAINER COMPONENT ---
// ==========================================
function DesktopCard({ exp, idx, total, scrollYProgress }) {
  const startRange = Math.max(0, (idx - 0.5) / total)
  const focalRange = idx / total
  const endRange = Math.min(1, (idx + 0.5) / total)

  const opacity = useTransform(scrollYProgress, [startRange, focalRange, endRange], [0.4, 1, 0.6])
  const scale = useTransform(scrollYProgress, [startRange, focalRange, endRange], [0.95, 1, 0.97])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-125 shrink-0 origin-center transition-all duration-300 ease-out"
    >
      <div className="group h-full relative bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/80 rounded-2xl p-8 shadow-2xl hover:border-neutral-700/60 transition-colors duration-300">
        <div className="absolute top-0 right-12 w-24 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent group-hover:via-emerald-400 transition-all duration-500" />
        
        <div className="flex items-center justify-between gap-4 border-b border-neutral-800/60 pb-4 mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors duration-300">
              {exp.role}
            </h3>
            <p className="text-neutral-400 text-sm font-medium mt-0.5">{exp.company}</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full whitespace-nowrap">
            {exp.duration}
          </span>
        </div>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 wrap-break-word">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {exp.tags.map((tag, tIdx) => (
            <span key={tIdx} className="text-xs font-medium text-neutral-400 bg-neutral-800/50 px-2.5 py-1 rounded-md border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// --- MOBILE CARD CONTAINER COMPONENT ---
// ==========================================
function MobileCard({ exp, idx, total, scrollYProgress }) {
  // Balanced windows mapped out evenly relative to total scroll timeline progress splits
  const startWindow = idx / total
  const focusWindow = (idx + 0.4) / total
  const exitWindow = (idx + 1) / total

  // TOP-DOWN TRANSFORMS:
  // 1. Opacity fades in as it approaches, locks at full focus, then fades out at exitWindow boundary.
  const opacity = useTransform(scrollYProgress, [startWindow, focusWindow, exitWindow - 0.1, exitWindow], [0, 1, 1, 0])
  
  // 2. Scale gives a subtle 'pop-up' focus snap depth effect.
  const scale = useTransform(scrollYProgress, [startWindow, focusWindow, exitWindow - 0.1, exitWindow], [0.9, 1, 1, 0.9])
  
  // 3. Y Vector: Card ascends upward smoothly out from bottom (160px), rests in center (0), and leaves up top (-160px).
  const y = useTransform(scrollYProgress, [startWindow, focusWindow, exitWindow - 0.1, exitWindow], [160, 0, 0, -160])

  return (
    <motion.div 
      style={{ opacity, scale, y }} 
      className="absolute inset-x-0 mx-auto w-full max-w-87.5 sm:max-w-105 origin-center"
    >
      <div className="relative bg-neutral-900/70 backdrop-blur-xl border border-neutral-800/90 rounded-2xl p-5 shadow-2xl flex flex-col justify-between min-h-75">
        
        {/* Subtle Accent Glow Line Header */}
        <div className="absolute top-0 right-8 w-16 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent" />
        
        <div>
          <div className="flex items-start justify-between gap-3 border-b border-neutral-800/60 pb-3 mb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight tracking-tight">{exp.role}</h3>
              <p className="text-neutral-400 text-xs mt-0.5">{exp.company}</p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
              {exp.duration}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed wrap-break-word">
            {exp.description}
          </p>
        </div>

        {/* Technical Pills Matrix Footer */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {exp.tags.map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="text-[9px] font-medium text-neutral-400 bg-neutral-800/50 px-2 py-0.5 rounded border border-neutral-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}