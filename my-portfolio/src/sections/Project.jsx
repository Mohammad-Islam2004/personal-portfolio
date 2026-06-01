import React, { useEffect, useRef, useState, useMemo } from "react"
import img1 from "../assets/img1.JPG"
import img2 from "../assets/img2.JPG"
import img3 from "../assets/img3.JPG"
import photo1 from "../assets/photo1.JPG"
import photo2 from "../assets/photo2.PNG"
import photo3 from "../assets/photo3.png"
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion"

const Project = () => {
  const useIsMobile = (query = "(max-width : 630px)") => {
    const [isMobile, setIsMobile] = useState(
      typeof window !== "undefined" && window.matchMedia(query).matches,
    )
    useEffect(() => {
      if (typeof window === "undefined") return
      const mql = window.matchMedia(query)
      const handler = (e) => setIsMobile(e.matches)
      mql.addEventListener("change", handler)
      setIsMobile(mql.matches)
      return () => mql.removeEventListener("change", handler)
    }, [query])
    return isMobile
  }
  const isMobile = useIsMobile()
  const sceneRef = useRef(null)

  const projects = useMemo(
    () => [
      {
        title: "nk studio",
        link: "https://www.nk.studio/",
        bgColor: "#0d4d3d",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "Gamily",
        link: "https://gamilyapp.com/",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile],
  )

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  })
  const threshold = projects.map((_, i) => (i + 1) / projects.length)
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = threshold.findIndex((t) => v <= t)
    setActiveIndex(idx === -1 ? projects.length - 1 : idx)
  })
  const activeProject = projects[activeIndex]

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white w-full h-screen"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-between items-center  ">
        <h1
          className={`text-4xl font-bold z-10 text-center ${
            isMobile ? "mt-4" : "mt-4 mb-4"
          }`}
        >
          My Work
        </h1>

        <div className="relative w-[90%] h-[70%] flex-1 flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-95 pointer-events-none z-0"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/70 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile ? "-mt-24" : ""}`}
                    style={{
                      zIndex: 15,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
              isMobile ? 'mb-6 rounded-lg' : 'mb-10 sm:mb-12 rounded-xl'
              } h-[62vh] sm:h-[66vh] cursor-pointer`}
              style={{
                zIndex: 10,
                transition: "box-shadow 250ms ease",
              }}
              >
                <img src={project.image} alt={project.title} 
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.5))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
                    zIndex: 11,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`absolute ${
        isMobile ? "bottom-20" : "bottom-7"
        }`}>
          <a href={activeProject?.link} target="_blank" rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-300 transition-all active:scale-95"
            aria-label={`View ${activeProject?.title} project`}
          >
            View Project
          </a>
        </div>
        
      </div>
    </section>
  )
}

export default Project
