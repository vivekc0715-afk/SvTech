import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Cursor position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the outer ring
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(!!isInteractive)
    }

    const handleMouseOut = () => {
      setIsVisible(true) // Maintain visibility unless moving outside window
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer trailing ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0)',
          borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)',
          borderWidth: isHovering ? 2 : 1,
        }}
        className="fixed top-0 left-0 rounded-full border border-primary/30 pointer-events-none flex items-center justify-center transition-[background-color] duration-300"
      />

      {/* Inner precise dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none"
      />
      
      {/* Interactive center glow for hover */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full blur-[2px] pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.8)]"
      />
    </div>
  )
}

export default CustomCursor
