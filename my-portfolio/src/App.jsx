import Navbar from './components/Navbar'
import Home from './sections/Home'
import Skills from './sections/Skills'
import About from './sections/About'
import Project from './sections/Project'
import Experience from './sections/Experience'
import Footer from './sections/Footer'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'
import { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Certificates from './sections/Certificates'

const App = () => {
  const [introDone, setIntroDone] = useState(false)
  return (
    <>
    {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

    {introDone && (
      <div className='relative gradient text-white'>
    <CustomCursor/>
    {/* <ParticlesBackground /> */}

    <Navbar />
    <Home />
    <About />
    <Skills />
    <Project />
    <Experience />
    <Certificates/>
    <Contact />
    <Footer />

    </div>
    )}
    </>
  )
}

export default App