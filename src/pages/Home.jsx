import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Cpu, Code, BarChart, Cloud, Smartphone, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProcessSection from '../components/ProcessSection'
import ServiceCards from '../components/ServiceCards'
import { API_BASE_URL } from '../utils/api'

const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(target)
    if (start === end) return

    let totalMilisecondsStep = Math.abs(Math.floor(duration * 1000 / end))
    let timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, totalMilisecondsStep)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count}</span>
}

const Home = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/testimonials`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setTestimonials(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err)
        setError('Could not load testimonials.')
        setLoading(false)
      })
  }, [])

  const stats = [
    { label: 'Projects Delivered', value: '25' },
    { label: 'Happy Clients', value: '20' },
    { label: 'Team Members', value: '50' },
    { label: 'Years Experience', value: '8' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100">
                <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">AI-Powered Solutions</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Your <span className="gradient-text">Business Partner</span> in the Digital Age
              </h1>
              
              <p className="text-xl text-text-secondary leading-relaxed">
                Transform your business with intelligent AI-driven solutions. We combine cutting-edge technology with strategic expertise to deliver measurable results for SMBs and enterprises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  Start Your Journey
                  <ArrowRight className="ml-2" strokeWidth={2.5} />
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all">
                  Explore Services
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                {['ISO Certified', 'GDPR Compliant', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" strokeWidth={2.5} />
                    <span className="text-sm text-text-secondary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/story-image.png" 
                  alt="SolvionTech Office"
                  className="w-full h-auto object-cover"
                />
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-sm text-text-secondary">Client Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-6xl font-bold text-white mb-2">
                  <Counter target={stat.value} />+
                </div>
                <p className="text-accent-300 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Process Section */}
      <ProcessSection />

      {/* Services Section */}
      <ServiceCards />

      {/* Testimonials */}
      <section className="section bg-surface overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-text-secondary">
              Real feedback from businesses we've helped transform through technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-warning mb-6">
                      {[...Array(5)].map((_, i) => <Zap key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-lg text-text-primary italic mb-8 leading-relaxed">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-border pt-6">
                    <img src={t.image_url} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-900">{t.author}</h4>
                      <p className="text-sm text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-400/20 via-transparent to-transparent opacity-50" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-5xl mx-auto space-y-10"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's discuss how our AI-driven solutions can help you achieve your business goals. Get a free consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="bg-white text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
                Schedule Consultation
              </Link>
              <Link to="/services" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const ChevronRight = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export default Home
