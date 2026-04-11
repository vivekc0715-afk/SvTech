import React, { useState, useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  RoundedBox, 
  Float, 
  MeshDistortMaterial, 
  Text, 
  OrbitControls, 
  Environment, 
  ContactShadows,
  PresentationControls
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Code, BarChart, Cloud, Smartphone, Shield, Zap, ChevronRight, X, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'AI Integration & Automation',
    desc: 'Powering your enterprise with next-gen AI solutions, machine learning models, and automated workflows designed for scale.',
    icon: Cpu,
    tech: ['PyTorch', 'TensorFlow', 'OpenAI'],
    color: '#3b82f6',
    pos: [-3.5, 1.5, 0]
  },
  {
    title: 'Custom Software Development',
    desc: 'Bespoke software architecture and full-stack development that transforms your unique vision into high-performance digital products.',
    icon: Code,
    tech: ['React', 'Node.js', 'TypeScript'],
    color: '#7c3aed',
    pos: [0, 1.5, 0]
  },
  {
    title: 'Data Analytics & BI',
    desc: 'Turning complex data into actionable business intelligence through advanced visualization and predictive modeling.',
    icon: BarChart,
    tech: ['Tableau', 'BigQuery', 'Python'],
    color: '#60a5fa',
    pos: [3.5, 1.5, 0]
  },
  {
    title: 'Cloud Migration & Optimization',
    desc: 'Scalable, secure cloud infrastructure migration and DevOps automation to drive agility and cost-efficiency.',
    icon: Cloud,
    tech: ['AWS', 'Azure', 'Kubernetes'],
    color: '#3b82f6',
    pos: [-3.5, -1.5, 0]
  },
  {
    title: 'Mobile App Development',
    desc: 'Premium native and cross-platform mobile experiences that engage users and deliver seamless performance across all platforms.',
    icon: Smartphone,
    tech: ['Swift', 'Flutter', 'React Native'],
    color: '#7c3aed',
    pos: [0, -1.5, 0]
  },
  {
    title: 'Cybersecurity Solutions',
    desc: 'End-to-end security audits, threat detection, and robust compliance frameworks to safeguard your critical digital assets.',
    icon: Shield,
    tech: ['ISO 27001', 'SOC2', 'Pen-Testing'],
    color: '#60a5fa',
    pos: [3.5, -1.5, 0]
  }
]

const ServiceBlock = ({ service, index, onFocus, focusedIndex }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const isFocused = focusedIndex === index

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    
    // Idle micro-rotation & floating
    if (!isFocused) {
      meshRef.current.rotation.x = Math.sin(t / 2 + index) * 0.1
      meshRef.current.rotation.y = Math.cos(t / 2 + index) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[3, 2.5, 1.5]} // Width, Height, Depth
        radius={0.3}
        smoothness={4}
        position={service.pos}
        onPointerOver={() => {
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onPointerDown={(e) => {
          e.stopPropagation()
          console.log('Focusing service index:', index)
          onFocus(index)
        }}
        scale={isFocused ? 1.2 : hovered ? 1.1 : 1}
      >
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.5}
          roughness={0.1}
          metalness={0.1}
          color={isFocused ? service.color : hovered ? service.color : '#ffffff'}
          opacity={isFocused ? 0.9 : hovered ? 0.9 : 0.6}
          transparent
          envMapIntensity={2}
        />
        <meshStandardMaterial
          attach="material-1"
          color={service.color}
          emissive={service.color}
          emissiveIntensity={hovered || isFocused ? 2 : 0.5}
        />
      </RoundedBox>
    </Float>
  )
}

const ServiceCube = () => {
  const [focusedIndex, setFocusedIndex] = useState(null)
  const focusedService = focusedIndex !== null ? services[focusedIndex] : null

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-32">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-50/50 blur-[120px] rounded-full" />
      </div>

      <div className="container-custom relative z-10 h-full flex flex-col">
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 text-blue-600 font-bold text-sm tracking-wider uppercase"
          >
            <Zap size={16} />
            Our Dynamic Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight"
          >
            Interactive <span className="text-blue-600">3D Solutions</span>
          </motion.h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Click on a 3D block to explore our specialized services and high-performance tech stack.
          </p>
        </div>

        <div className="relative flex-grow h-[700px] w-full">
          <Canvas shadows camera={{ position: [0, 0, 12], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            
            <Suspense fallback={null}>
              <PresentationControls
                enabled={true}
                global={false} // Only interact within the canvas
                cursor={true}
                snap={true}
                speed={2}
                zoom={1}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
                config={{ mass: 1, tension: 170, friction: 26 }}
              >
                <group rotation={[0, -0.4, 0]}>
                  {services.map((service, i) => (
                    <ServiceBlock 
                      key={i} 
                      index={i} 
                      service={service} 
                      onFocus={setFocusedIndex}
                      focusedIndex={focusedIndex}
                    />
                  ))}
                </group>
              </PresentationControls>
              <Environment preset="city" />
              <ContactShadows 
                position={[0, -4.5, 0]} 
                opacity={0.4} 
                scale={20} 
                blur={2} 
                far={4.5} 
              />
            </Suspense>
          </Canvas>

          {/* Service Detail Overlay */}
          <AnimatePresence>
            {focusedService && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute top-0 right-0 h-full w-full lg:w-[450px] pointer-events-none flex items-center p-6"
              >
                <div className="bg-white/80 backdrop-blur-2xl border border-white/40 p-10 rounded-[40px] shadow-2xl pointer-events-auto relative overflow-hidden group">
                  {/* Glass Accent */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full" />
                  
                  <button 
                    onClick={() => setFocusedIndex(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors text-slate-500"
                  >
                    <X size={20} />
                  </button>

                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-10 text-blue-600">
                    <focusedService.icon size={32} />
                  </div>

                  <h3 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">
                    {focusedService.title}
                  </h3>
                  
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                    {focusedService.desc}
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Technological Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {focusedService.tech.map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-xl text-sm font-bold text-blue-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-12 w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 transition-all"
                  >
                    Request a Quote
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ServiceCube
