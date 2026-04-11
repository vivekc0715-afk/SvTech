import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Search, Map, Cpu, Rocket, Search as SearchIcon, BarChart3, Settings, Zap } from 'lucide-react'

const steps = [
  {
    title: "Discovery & Analysis",
    text: "We dive deep into understanding your business goals, challenges, and requirements through comprehensive consultation and analysis.",
    icon: SearchIcon,
    subIcons: [Search, BarChart3],
    color: "from-blue-400 to-indigo-500",
    glow: "shadow-blue-500/20"
  },
  {
    title: "Strategy & Planning",
    text: "Our experts craft a tailored strategy with clear milestones, timelines, and deliverables aligned with your business objectives.",
    icon: Map,
    subIcons: [Settings, Zap],
    color: "from-indigo-400 to-purple-500",
    glow: "shadow-indigo-500/20"
  },
  {
    title: "Development & Implementation",
    text: "Using agile methodologies, we build and implement solutions with continuous feedback loops and quality assurance at every stage.",
    icon: Cpu,
    subIcons: [Settings, Zap],
    color: "from-purple-400 to-pink-500",
    glow: "shadow-purple-500/20"
  },
  {
    title: "Launch & Support",
    text: "We ensure smooth deployment and provide ongoing support, monitoring, and optimization to maximize your ROI and success.",
    icon: Rocket,
    subIcons: [Rocket, Zap],
    color: "from-pink-400 to-orange-500",
    glow: "shadow-pink-500/20"
  }
]

const ProcessCard = ({ step, index, progress }) => {
  const start = index * 0.25
  const end = (index + 1) * 0.25
  
  // Transform values based on progress
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.8, 1, 1, 0.8])
  const z = useTransform(progress, [start, end], [100, -100])
  const rotateX = useTransform(progress, [start, end], [20, -20])
  const y = useTransform(progress, [start, start + 0.05, end - 0.05, end], [100, 0, 0, -100])

  return (
    <motion.div
      style={{ 
        opacity, 
        scale, 
        z, 
        rotateX,
        y,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
    >
      <div className={`
        relative w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-12
        shadow-2xl overflow-hidden group hover:border-white/40 transition-colors
        ${step.glow}
      `}>
        {/* Background Gradient Glow */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${step.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon Section */}
          <div className="relative">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}>
              <div className="w-full h-full bg-[#10102e] rounded-[1.4rem] flex items-center justify-center relative overflow-hidden">
                <step.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                {/* Floating Micro-icons */}
                {step.subIcons.map((SubIcon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 3 + i, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    className="absolute text-white/20 p-2"
                    style={{ 
                      top: i === 0 ? '10%' : '60%', 
                      right: i === 0 ? '10%' : '10%' 
                    }}
                  >
                    <SubIcon size={20} />
                  </motion.div>
                ))}
              </div>
            </div>
            {/* 3D Reflection/Shadow */}
            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-gradient-to-t ${step.color} opacity-20 blur-xl rounded-full`} />
          </div>

          {/* Text Section */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
              Step {index + 1}
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {step.title}
            </h3>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
              {step.text}
            </p>
          </div>
        </div>

        {/* Success Aura for final step */}
        {index === 3 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500/10 pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  )
}

const ProcessSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Path animation
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1])
  const pathOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050510]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
        
        {/* Title */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
          className="absolute top-20 text-center z-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="gradient-text">Proven Process</span>
          </h2>
          <p className="text-white/40 text-lg uppercase tracking-[0.3em]">Scroll to explore</p>
        </motion.div>

        {/* Central Path (Timeline) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="h-[80vh] w-1 overflow-visible" viewBox="0 0 2 100">
            <motion.line
              x1="1" y1="0" x2="1" y2="100"
              stroke="white"
              strokeWidth="0.5"
              strokeDasharray="0 100"
              style={{ pathLength, opacity: pathOpacity }}
              className="stroke-blue-400/30"
            />
            {/* Glowing particle on path */}
            <motion.circle
              r="1.5"
              fill="white"
              className="fill-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
              style={{ 
                translateY: useTransform(smoothProgress, [0, 1], ["0%", "8000%"]),
                opacity: pathOpacity
              }}
            />
          </svg>
        </div>

        {/* Steps Container */}
        <div className="relative w-full h-[60vh] max-w-6xl">
          {steps.map((step, index) => (
            <ProcessCard 
              key={index} 
              step={step} 
              index={index} 
              progress={smoothProgress} 
            />
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight 
              }}
              animate={{ 
                y: [0, -window.innerHeight],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity,
                delay: Math.random() * 5 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProcessSection
