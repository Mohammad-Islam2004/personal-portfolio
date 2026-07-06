import { motion } from "framer-motion"
import p from "../assets/p.png"

const About = () => {
  // Elevated professional statistics
  const stats = [
    { label: "Experience", value: "Entry-Level Specialist" },
    { label: "Core Competency", value: "Predictive Analytics" },
    { label: "Technical Focus", value: "Statistical Optimization" },
  ]
  
  return (
    <section
      id="about"
      className="w-full min-h-screen flex justify-center items-center bg-black text-white overflow-hidden relative"
    >
      <div className='absolute inset-0'>
        <div
        className='absolute -top-32 -left-32
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
        className='absolute bottom-0 right-2
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

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-10 pt-20 flex flex-col gap-8 justify-center items-center">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="relative w-40 h-40 md:w-50 md:h-90 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-teal-500/20 to-indigo-500/20 border border-cyan-500/25 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img
              src={p}
              alt="Mohammad Islam"
              className="absolute -top-18 left-2.5 inset-0"
            />
          </motion.div>
          
          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-teal-400 via-cyan-400 to-indigo-500">
              Mohammad Islam
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Data Scientist & AI/ML Engineer
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-justify sm:text-lg lg:max-w-2xl md:max-w-3xl">
              A <i><b>Computer Science Engineering</b></i> graduate specializing in data science methodologies and machine learning architectures. Driven by a rigorous foundation in mathematical optimization, statistical inference, and computational intelligence, I transform complex, high-dimensional datasets into high-fidelity predictive models.
            </p>
            
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center flex flex-col justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-xs sm:text-sm text-gray-400">{item.label}</div>
                  <div className="text-sm sm:text-base font-semibold text-cyan-400 mt-1">{item.value}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex justify-center items-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition shadow-md"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center rounded-lg border border-white/20 text-white bg-white/10 font-semibold px-5 py-3 hover:bg-white/20 transition"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="text-center md:text-left w-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-0 pb-20 flex flex-col gap-5 justify-center" >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed text-justify sm:text-lg">
              I am an analytical, detail-oriented Data Scientist focused on building end-to-end intelligent systems, statistical modeling, and mining complex data structures. Proficient in Python, Advanced SQL, and specialized machine learning frameworks, I thrive on uncovering subtle mathematical correlations within raw data to engineer automated solutions that solve intricate domain problems.
            </p>
            <p className="text-gray-300 leading-relaxed text-justify sm:text-lg">
              Leveraging advanced techniques in feature engineering, deep learning architectures, and data visualization frameworks, I translate noisy information pipelines into crisp analytics. I look forward to advancing technical frameworks and uncovering underlying system dynamics that deliver real computational and predictive value.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About