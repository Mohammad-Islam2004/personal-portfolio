import React, { useEffect, useRef, useState, useMemo } from "react"
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.JPG"
import photo1 from "../assets/photo1.png"
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

  // Categories Definition
  const categories = ["All", "Machine Learning", "Python", "PowerBI"]
  const [activeCategory, setActiveCategory] = useState("All")

  // Master Project List with 'category' tags
  const allProjects = useMemo(
    () => [
      {
        title: "Message Filtering",
        link: "https://spam-message-identifier-ffzmaxgr7fqriqfs4vnykp.streamlit.app/",
        bgColor: "#0B1A2E",
        image: isMobile ? photo1 : img1,
        category: ["Machine Learning", "Python"],
      },
      {
        title: "Expense Wise",
        link: "https://expense-wise-frontend.onrender.com/",
        bgColor: "#1a3c1f",
        image: isMobile ? photo2 : img2,
        category: ["Python"],
      },
      {
        title: "Hungry Tiger",
        link: "https://www.eathungrytiger.com/",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
        category: ["PowerBI"],
      },
    ],
    [isMobile],
  )

  // Filtered Projects based on selected category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects
    return allProjects.filter((project) =>
      project.category.includes(activeCategory),
    )
  }, [activeCategory, allProjects])

  // Scroll Tracking Setup
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  })

  const threshold = useMemo(
    () => filteredProjects.map((_, i) => (i + 1) / filteredProjects.length),
    [filteredProjects],
  )

  const [activeIndex, setActiveIndex] = useState(0)

  // Reset active index back to 0 whenever the category swaps
  useEffect(() => {
    setActiveIndex(0)
  }, [activeCategory])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (filteredProjects.length === 0) return
    const idx = threshold.findIndex((t) => v <= t)
    setActiveIndex(idx === -1 ? filteredProjects.length - 1 : idx)
  })

  const activeProject = filteredProjects[activeIndex] || {
    bgColor: "#111",
    link: "#",
  }

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white w-full transition-all duration-500"
      style={{
        height: `${Math.max(filteredProjects.length, 1) * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-between items-center py-4">
        
        {/* Header Container: Row alignment for Desktop, Stacked for Mobile */}
        <div className="z-30 w-full flex flex-col sm:flex-row lg:justify-between items-center lg:gap-4 sm:gap-0.5 lg:px-6 sm:px-2 max-w-7xl mx-auto mt-2">
          <h1 className="text-4xl font-bold tracking-tight">My Work</h1>
          
          {/* Category Tabs Wrapper aligned to the right side */}
          <div className="flex flex-wrap justify-center items-center gap-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeCategory === cat ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Viewport */}
        <div className="relative w-[90%] h-[65%] flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <div
                  key={`${activeCategory}-${project.title}`}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    activeIndex === idx
                      ? "opacity-100 scale-100 z-20"
                      : "opacity-0 scale-95 pointer-events-none z-0"
                  }`}
                  style={{ width: "85%", maxWidth: "1200px" }}
                >
                  {/* Title Animation */}
                  <AnimatePresence mode="wait">
                    {activeIndex === idx && (
                      <motion.h3
                        key={project.title}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white sm:absolute sm:-top-22 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${
                          isMobile ? "-mt-20" : ""
                        }`}
                        style={{
                          zIndex: 15,
                          textAlign: isMobile ? "center" : "left",
                        }}
                      >
                        {project.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>

                  {/* Card Body */}
                  <div
                    className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                      isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                    } h-[55vh] sm:h-[60vh] cursor-pointer`}
                    style={{
                      zIndex: 10,
                      transition: "box-shadow 250ms ease",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
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
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
                        zIndex: 11,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/50 text-xl"
              >
                No projects under this category yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        {filteredProjects.length > 0 && (
          <div className={`absolute ${isMobile ? "bottom-16" : "bottom-6"} z-30`}>
            <a
              href={activeProject?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-300 transition-all active:scale-95 shadow-lg"
              aria-label={`View ${activeProject?.title} project`}
            >
              View Project
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Project