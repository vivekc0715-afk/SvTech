import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const Splash = ({ onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5
      const mouseY = e.clientY / window.innerHeight - 0.5
      x.set(mouseX)
      y.set(mouseY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    const timer = setTimeout(() => {
      setIsFadingOut(true)
      setTimeout(onFinish, 1000)
    }, 2500)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [onFinish, x, y])

  return (
    <div className="fixed inset-0 bg-[#05080f] flex items-center justify-center overflow-hidden z-[100]">
      {/* 3D Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.8, z: -200 }}
        animate={{ 
          opacity: isFadingOut ? 0 : 1, 
          scale: isFadingOut ? 1.1 : 1,
          z: isFadingOut ? 200 : 0
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative bg-white/5 backdrop-blur-3xl border border-white/10 p-20 rounded-[32px] text-center shadow-2xl max-w-[90vw] w-[500px]"
      >
        <motion.div
          className="flex justify-center mb-8"
          style={{ transform: 'translateZ(50px)' }}
        >
          <img 
            src="/images/Solvion_tech-removebg-preview.png" 
            alt="SolvionTech Logo" 
            className="h-40 w-auto object-contain"
          />
        </motion.div>
        <motion.p 
          className="text-xl text-gray-300 font-light mb-12"
          style={{ transform: 'translateZ(30px)' }}
        >
          Powering Businesses with AI-Driven Solutions
        </motion.p>
        
        <div className="relative w-24 h-24 mx-auto" style={{ transform: 'translateZ(40px)' }}>
          <motion.div
            className="absolute inset-0 border-4 border-white/10 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-primary rounded-full"
            style={{ 
              borderLeftColor: 'transparent',
              borderBottomColor: 'transparent'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Splash
