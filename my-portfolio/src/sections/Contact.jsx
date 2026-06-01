import { useState } from 'react'
import ShootingStarBg from '../components/ShootingStarBg'
import emailjs from '@emailjs/browser'
import Astra from '../assets/astra.png'
import { motion } from 'framer-motion'

const Contact = () => {
  // FIXED: Added VITE_ prefix required by Vite configuration bundles
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    idea: ''
  })
  const [error, setError] = useState({})
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'budget' && value && !/^\d*$/.test(value)) return

    setFormData(prev => ({ ...prev, [name]: value }))

    if (error[name]) setError(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const required = ['name', 'email', 'service', 'idea']
    const newError = {}
    required.forEach((f) => !formData[f].trim() && (newError[f] = 'Field is required'))

    // FIXED: Adjusted match string to look for 'Others' instead of 'Other' to match your select value
    if (formData.service && formData.service !== 'Others' && !formData.budget.trim()) {
      newError.budget = 'Field is required'
    }
    
    setError(newError)
    return !Object.keys(newError).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setStatus('Sending')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { ...formData, from_name: formData.name, reply_to: formData.email },
        PUBLIC_KEY
      )
      // FIXED: Swapped out explicit text for clean status codes matching the JSX renderer condition loops
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        service: '',
        budget: '',
        idea: ''
      })
    } catch (err) {
      console.error('Failed to send message.', err)
      setStatus("error")
    }
  }

  return (
    <section id='contacts' className='w-full min-h-screen relative z-0 bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10'>
      
      <ShootingStarBg />

      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>
        {/* left side */}
        <motion.div className='w-full md:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.img src={Astra} alt="Astronaut" 
            className='md:w-3/4 lg:w-2/3 rotate-12 rounded-2xl shadow-lg object-cover'
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* right side */}
        <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold mb-6'>Let's Work Together !</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            
            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-neutral-300'>Your Name <sup className='text-red-500'>*</sup></label>
              <input
                type="text"
                name="name"
                placeholder='Your Name ...'
                value={formData.name}
                onChange={handleChange}
                className={`p-2.5 text-white rounded-md bg-white/10 border ${error.name ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
              {error.name && <span className='text-red-500 text-sm mt-1'>{error.name}</span>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-neutral-300'>Your Email <sup className='text-red-500'>*</sup></label>
              <input
                type="email"
                name="email"
                placeholder='Your Email ...'
                value={formData.email}
                onChange={handleChange}
                className={`p-2.5 text-white rounded-md bg-white/10 border ${error.email ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
              {error.email && <span className='text-red-500 text-sm mt-1'>{error.email}</span>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-neutral-300'>Service Needed <sup className='text-red-500'>*</sup></label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-2.5 text-white rounded-md bg-white/10 border ${error.service ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              >
                <option value="" disabled className='text-black'>Something on mind ?</option>
                <option value="Web Development" className='text-black'>Web Development</option>
                <option value="UI/UX Design" className='text-black'>UI/UX Design</option>
                <option value="Others" className='text-black'>Others</option>
              </select>
              {error.service && <span className='text-red-500 text-sm mt-1'>{error.service}</span>}
            </div>

            {formData.service && formData.service !== 'Others' && (
              <div className='flex flex-col'>
                <label className='mb-1 text-sm text-neutral-300'>Budget <sup className='text-red-500'>*</sup></label>
                <input
                  type="text" // Changed to text to properly align with your regex numeric testing method
                  name="budget"
                  placeholder='Your Budget ...'
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-2.5 text-white rounded-md bg-white/10 border ${error.budget ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                />
                {error.budget && <span className='text-red-500 text-sm mt-1'>{error.budget}</span>}
              </div>
            )}

            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-neutral-300'>Enter your idea <sup className='text-red-500'>*</sup></label>
              <textarea
                name="idea"
                rows="4"
                placeholder='Enter your Idea ...'
                value={formData.idea}
                onChange={handleChange}
                className={`p-2.5 text-white rounded-md bg-white/10 border ${error.idea ? 'border-red-500' : 'border-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
              {error.idea && <span className='text-red-500 text-sm mt-1'>{error.idea}</span>}
            </div>

            {/* FIXED: Output blocks read corresponding status flags cleanly now */}
            {status && (
              <p className={`text-sm mt-1 font-medium ${status === 'success' ? 'text-green-400' : status === 'Sending' ? 'text-blue-400' : 'text-red-400'}`}>
                {status === 'Sending' && 'Sending transmission... 🚀'}
                {status === 'success' && 'Message sent successfully ✅'}
                {status === 'error' && 'Something went wrong. Please check console logs ❌'}
              </p>
            )}

            <motion.button 
              type="submit" 
              className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 font-semibold rounded-md cursor-pointer transition'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'Sending'}
            >
              {status === 'Sending' ? 'Sending...' : 'Send Message'}
            </motion.button>

          </form>
        </motion.div>
      </div>
      
    </section>
  )
}

export default Contact