import { motion } from "framer-motion"
import p from "../assets/p.png"


const About = () => {
  const stats = [
    { label: "Experience", value: "Fresher" },
    { label: "Domain", value: "Data Scientist" },
    { label: "Focus", value: "Accuracy & Precision" },
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-0 w-[400px] h-[400px] opacity-30 blur-[120px] [animation-delay:500ms]",
    "top-1/2 left-1/2 -translate-x-1/10 -translate-y-3/10 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ]
  return (
    <section
      id="about"
      className="w-full min-h-screen flex justify-center items-center bg-black text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          />
        ))}
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
            className="relative w-40 h-40 md:w-50 md:h-90 rounded-2xl overflow-hidden  shadow-2xl bg-linear-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/25 filter drop-shadow-[0_0_10px_rgba(28,216,210,0.5)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img
              src={p}
              alt="Profile-img"
              className="absolute -top-18 left-2.5 inset-0"
            />
          </motion.div>
          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
              Mohammad Islam
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Data Scientist & AI/ML Enthusiast
            </p>
            <p className="mt-4 text-gray-300 leading-relaxed text-justify sm:text-lg lg:max-w-2xl md:max-w-3xl">
              A <i><b>Computer Science Engineering</b></i> graduate passionate in Data Scientist and AI/ML Engineer with expertise in analyzing complex datasets, building predictive models, and deriving actionable insights. Powered by a strong foundation in mathematics, statistics, and programming.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex justify-center items-center rounded-lg bg-gray-200 text-black font-semibold px-5 py-3 hover:bg-gray-500 hover:text-black transition"
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
          className="text-center md:text-left "
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-20 pb-20 flex flex-col gap-5 justify-center" >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-justify sm:text-lg">
            Motivated and detail-oriented Data Scientist with a strong foundation in machine learning, data analysis, and statistical modeling. Skilled in Python, R, SQL, and various data visualization tools, I am passionate about transforming raw data into actionable insights that drive business decisions.
          </p>
          <p className="text-gray-300 leading-relaxed text-justify sm:text-lg">
            Strong foundation in mathematics, statistics, and programming, I thrive on solving challenging problems and uncovering patterns that drive informed decision-making. My goal is to leverage data-driven insights to create innovative solutions that positively impact businesses and society.
          </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
