import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Code, BarChart, Cloud, Smartphone, Shield, Megaphone,
  Search, RotateCcw, Zap, CheckCircle, ArrowRight,
  Clock, X, Mail, Phone, Building, DollarSign, Users
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/api'

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
  const [allServices, setAllServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setAllServices(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching services:', err)
        setError('Could not load services.')
        setLoading(false)
      })
  }, [])

  const iconMap = {
    Cpu, Code, BarChart, Cloud, Smartphone, Shield, Megaphone
  }

  const filteredServices = allServices.filter(s => {
    const matchesFilter = filter === 'all' || s.category === filter
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openQuoteModal = (serviceTitle) => {
    setSelectedService(serviceTitle)
    setIsModalOpen(true)
  }

  return (
    <div className="pt-20">
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="container-custom relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100"
          >
            <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-medium text-primary">Enterprise Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight"
          >
            Digital <span className="gradient-text">Transformation</span> Services
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            We deliver end-to-end technology solutions that drive efficiency, innovation, and growth. Explore our comprehensive service offerings.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {['all', 'ai', 'development', 'cloud', 'security', 'marketing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-surface min-h-[600px]">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredServices.length > 0 ? (
                <motion.div 
                  layout
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredServices.map((service) => {
                    const IconComponent = iconMap[service.icon_name] || Cpu;
                    return (
                      <motion.div
                        layout
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
                      >
                        <div className="aspect-video overflow-hidden relative">
                          <img 
                            src={service.image_url} 
                            alt={service.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                              <IconComponent size={28} className="text-white" strokeWidth={2.5} />
                            </div>
                          </div>
                        </div>

                        <div className="p-10 flex-grow flex flex-col">
                          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                          <p className="text-text-secondary leading-relaxed mb-8 line-clamp-3">
                            {service.description}
                          </p>

                          <div className="space-y-6 mt-auto">
                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-text-secondary">
                                <Clock size={18} strokeWidth={2.5} />
                                <span className="text-sm font-medium">{service.timeline}</span>
                              </div>
                              <button 
                                onClick={() => {
                                  setSelectedService(service.title)
                                  setIsModalOpen(true)
                                }}
                                className="p-3 bg-gray-50 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                              >
                                <ArrowRight size={20} strokeWidth={2.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 space-y-6"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <RotateCcw size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold">No services found</h3>
                  <p className="text-text-secondary">Try adjusting your search or filters.</p>
                  <button 
                    onClick={() => {setFilter('all'); setSearchQuery('')}}
                    className="btn-primary"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">Ready to <span className="text-blue-300">Elevate</span> Your Business?</h2>
              <p className="text-xl text-blue-50 font-light leading-relaxed">
                Schedule a free consultation with our experts to discuss how our services can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <CheckCircle className="text-blue-300" size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-lg">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <CheckCircle className="text-blue-300" size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-lg">Tailored Solutions</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Link to="/contact" className="px-12 py-6 bg-white text-primary text-xl font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 active:scale-95">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all z-10"
              >
                <X size={24} strokeWidth={2.5} />
              </button>

              <div className="p-10 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-primary/5 text-primary text-sm font-bold rounded-full">
                    Inquiry for {selectedService}
                  </div>
                  <h3 className="text-3xl font-bold">Request a Proposal</h3>
                  <p className="text-text-secondary">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                        <input type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Work Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                        <input type="email" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="john@company.com" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                        <input type="tel" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                        <input type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Acme Inc." />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Estimated Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} strokeWidth={2.5} />
                      <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none">
                        <option>$5k - $10k</option>
                        <option>$10k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k+</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all">
                    Submit Request
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services
