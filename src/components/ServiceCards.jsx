import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Cpu, Code, BarChart, Cloud, Smartphone, Shield, Zap, ChevronRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'AI Integration',
    desc: 'Seamlessly integrate cutting-edge AI technologies into your existing systems for enhanced automation and intelligence.',
    icon: Cpu,
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    color: '#3b82f6'
  },
  {
    title: 'Custom Development',
    desc: 'Tailored software solutions built with modern technologies to meet your unique business requirements and scale.',
    icon: Code,
    features: ['Web Applications', 'API Development', 'System Architecture'],
    color: '#2563eb'
  },
  {
    title: 'Data Analytics',
    desc: 'Transform raw data into actionable insights with advanced analytics and visualization tools for informed decision-making.',
    icon: BarChart,
    features: ['Predictive Modeling', 'Big Data Processing', 'BI Dashboards'],
    color: '#60a5fa'
  },
  {
    title: 'Cloud Solutions',
    desc: 'Migrate and optimize your infrastructure with secure, scalable cloud solutions that reduce costs and improve performance.',
    icon: Cloud,
    features: ['Cloud Migration', 'DevOps Automation', 'Serverless Computing'],
    color: '#3b82f6'
  },
  {
    title: 'Mobile Apps',
    desc: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    icon: Smartphone,
    features: ['iOS & Android', 'React Native', 'Flutter Development'],
    color: '#2563eb'
  },
  {
    title: 'Cybersecurity',
    desc: 'Comprehensive security solutions to protect your digital assets, data, and infrastructure from evolving cyber threats.',
    icon: Shield,
    features: ['Threat Assessment', 'Secure Coding', 'Compliance Audits'],
    color: '#60a5fa'
  }
]

const AnimatedNodes = ({ isFlipped }) => (
  <div className="absolute top-1/2 right-10 -translate-y-1/2 pointer-events-none opacity-30">
    <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="text-blue-400">
      <motion.circle 
        cx="100" cy="40" r="3" fill="currentColor" 
        animate={isFlipped ? { scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle 
        cx="20" cy="100" r="3" fill="currentColor" 
        animate={isFlipped ? { scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle 
        cx="80" cy="160" r="3" fill="currentColor" 
        animate={isFlipped ? { scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.path 
        d="M100 40 L20 100 L80 160" 
        stroke="currentColor" 
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={isFlipped ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  </div>
)

const ServiceCard = ({ service, index }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  
  // Parallax Tilt Values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsFlipped(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-[480px] w-full [perspective:1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsFlipped(true)}
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1] // Custom easeOutQuint for premium feel
        }}
        className="relative w-full h-full cursor-pointer [will-change:transform]"
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[32px] bg-white border border-blue-50 p-10 shadow-lg flex flex-col items-start"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Static Background Accents (replacing blur for performance) */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full" />
          
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 text-primary relative shadow-inner"
          >
            <service.icon size={36} strokeWidth={2.5} />
          </motion.div>

          <h3 className="text-3xl font-bold mb-6 text-slate-900 tracking-tight">{service.title}</h3>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">{service.desc}</p>
          
          <div className="mt-auto flex items-center text-primary font-bold group">
            <span className="mr-2">View Details</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <ChevronRight size={20} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[32px] bg-gradient-to-br from-[#1e3a8a] to-[#1e1b4b] p-10 text-white shadow-xl flex flex-col overflow-hidden"
          style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
        >
          <AnimatedNodes isFlipped={isFlipped} />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
              <service.icon size={28} strokeWidth={2.5} className="text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold">{service.title}</h3>
          </div>

          <p className="text-blue-100/80 mb-8 leading-relaxed">
            Leading-edge solutions tailored to drive growth and efficiency.
          </p>

          <div className="space-y-4 mb-10">
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 text-blue-100"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <Link 
            to="/services" 
            className="mt-auto w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-center font-bold text-lg transition-colors shadow-lg shadow-blue-900/20 active:scale-[0.98]"
          >
            Explore Service
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ServiceCards = () => {
  return (
    <section className="section relative bg-white overflow-hidden py-32">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 text-blue-600 font-bold text-sm tracking-wider uppercase mb-4"
          >
            <Zap size={16} />
            Our Core Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight"
          >
            Intelligent Solutions for <span className="text-blue-600">Modern Business</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            We deliver AI-powered services that transform your business operations and drive measurable growth across your entire ecosystem.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards
