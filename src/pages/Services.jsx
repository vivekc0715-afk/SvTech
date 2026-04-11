import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Cpu, Code, BarChart, Cloud, Smartphone, Shield,
  Search, RotateCcw, Zap, CheckCircle, ArrowRight,
  Clock, X, Mail, Phone, Building, DollarSign, Users
} from 'lucide-react'
import { useState, useEffect } from 'react'
import CustomDropdown from '../components/CustomDropdown'

const Counter = ({ target, duration = 2, suffix = "" }) => {
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

  return <span>{count}{suffix}</span>
}

const Services = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: 'Under 10000'
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (err) {
      console.error('Fetch services error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredServices = services.filter(s => {
    const matchesFilter = filter === 'all' || s.category === filter
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openQuoteModal = (serviceTitle) => {
    setSelectedService(serviceTitle)
    setIsModalOpen(true)
    setIsSubmitted(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: quoteFormData.name,
          email: quoteFormData.email,
          phone: quoteFormData.phone,
          subject: `Quote Request: ${selectedService} (${quoteFormData.budget})`,
          message: `Company: ${quoteFormData.company}. Budget: ${quoteFormData.budget}. Initial interest in ${selectedService}.`
        }),
      });

      if (response.ok) {
        setIsSubmitted(true)
        setQuoteFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: 'Under 10000'
        })
      }
    } catch (err) {
      console.error('Quote error:', err);
    } finally {
      setIsSubmitting(false)
    }
  }

  const IconMap = { Cpu, Code, BarChart, Cloud, Smartphone, Shield };

  return (
    <div className="pt-20">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100"
            >
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Comprehensive Service Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Transform Your Business with <span className="gradient-text">Intelligent Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto"
            >
              From intelligent automation to custom-built systems, we engineer next-generation solutions that accelerate growth and redefine competitive advantage.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {[
                { label: 'Projects Delivered', value: '25', suffix: '+' },
                { label: 'Client Satisfaction', value: '98', suffix: '%' },
                { label: 'Industries Served', value: '15', suffix: '+' },
                { label: 'Expert Support', value: '24', suffix: '/7' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 py-6 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl border border-border focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 text-text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'ai', label: 'AI & ML' },
                { id: 'development', label: 'Development' },
                { id: 'cloud', label: 'Cloud & Data' },
                { id: 'security', label: 'Security' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === btn.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-surface text-text-secondary hover:bg-primary/5 hover:text-primary'
                    }`}
                >
                  {btn.label}
                </button>
              ))}
              {(filter !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => { setFilter('all'); setSearchQuery('') }}
                  className="p-2 text-text-secondary hover:text-primary transition-colors flex items-center gap-1 text-sm font-bold"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading services...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service, i) => {
                  const Icon = IconMap[service.icon] || Cpu;
                  return (
                    <motion.div
                      layout
                      key={service._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card group hover:shadow-2xl transition-all border border-border/50 overflow-hidden flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={service.image || "https://images.unsplash.com/photo-1634711853733-9bff20b2639d"}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            {service.category?.replace('_', ' ') || 'AI'}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex-1 flex flex-col">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Icon size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-text-secondary mb-6 leading-relaxed line-clamp-3">{service.description || service.desc}</p>

                        <div className="space-y-6 mt-auto">
                          <div>
                            <p className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">Core Tech:</p>
                            <div className="flex flex-wrap gap-2">
                              {service.techStack?.map(tech => (
                                <span key={tech} className="px-2 py-1 bg-surface text-[10px] font-bold text-text-secondary rounded">
                                  {tech}
                                </span>
                              )) || <span className="text-xs text-slate-400">Custom Implementation</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-text-secondary font-medium pb-6 border-b border-border">
                            <Clock size={16} />
                            <span>Timeline: {service.timeline || '4-8 weeks'}</span>
                          </div>

                          <button
                            onClick={() => openQuoteModal(service.title)}
                            className="btn-primary w-full py-4 group"
                          >
                            Request Quote
                            <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-secondary">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No services found</h3>
              <p className="text-text-secondary mb-8">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setFilter('all'); setSearchQuery('') }}
                className="btn-primary px-8"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section bg-surface overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
            >
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Scale Your Success</span>
            </motion.div>
            <h2 className="text-4xl lg:text-7xl font-bold text-gray-900 leading-tight">Ready-to-Deploy <span className="gradient-text">Packages</span></h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">Transparent pricing models designed to grow with your business.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                tier: 'Starter', price: '₹14999/-', desc: 'Basic digital presence for small businesses.',
                features: [
                  { text: '1 Free Domain Name', active: true },
                  { text: '1 Free Web Hosting*', active: true },
                  { text: '10 Page (Static Website)', active: true },
                  { text: 'SEO Ready Website', active: true },
                  { text: '100% Responsive', active: true },
                  { text: 'Support 3 Months', active: true },
                ]
              },
              {
                tier: 'Growth', price: '₹19999/-', desc: 'Enhanced features and dynamic capabilities.',
                features: [
                  { text: '1 Free Domain Name', active: true },
                  { text: '1 Free Web Hosting*', active: true },
                  { text: 'Dynamic Pages', active: true },
                  { text: 'Social Media Integration', active: true },
                  { text: 'Support 6 months', active: true },
                ],
                popular: true
              },
              {
                tier: 'Enterprise', price: 'Custom', desc: 'Full-scale transformation for large enterprises.',
                features: [
                  { text: 'Strategic consulting', active: true },
                  { text: 'Unlimited support', active: true },
                  { text: 'Payment Gateway', active: true },
                  { text: '24/7 dedicated team', active: true },
                  { text: 'Full AI Integration', active: true },
                ]
              }
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[32px] bg-white border-2 flex flex-col ${pkg.popular ? 'border-primary shadow-xl' : 'border-border shadow-sm'}`}
              >
                <h3 className="text-2xl font-bold mb-2">{pkg.tier}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">{pkg.price}</div>
                <p className="text-text-secondary mb-8">{pkg.desc}</p>
                <div className="space-y-4 mb-10 flex-1">
                  {pkg.features.map(f => (
                    <div key={f.text} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-success shrink-0" />
                      <span className="text-sm font-medium text-text-primary">{f.text}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary w-full py-4 text-center">Get Started</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Request Quote</h3>
                  <p className="text-sm text-text-secondary">For: {selectedService}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>

              <div className="p-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input required type="text" placeholder="Name" className="input-field p-4 bg-surface rounded-xl w-full" value={quoteFormData.name} onChange={e => setQuoteFormData({...quoteFormData, name: e.target.value})} />
                      <input required type="email" placeholder="Email" className="input-field p-4 bg-surface rounded-xl w-full" value={quoteFormData.email} onChange={e => setQuoteFormData({...quoteFormData, email: e.target.value})} />
                    </div>
                    <button className="btn-primary w-full py-4" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit'}</button>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <CheckCircle size={48} className="text-success mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Success!</h3>
                    <button onClick={() => setIsModalOpen(false)} className="btn-primary px-8 py-3 mt-6">Close</button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services
