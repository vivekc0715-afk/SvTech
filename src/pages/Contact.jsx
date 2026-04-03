import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Phone, MessageSquare, MapPin, Clock, 
  Send, ChevronDown, CheckCircle2, Shield,
  Linkedin, Twitter, Github, Facebook, X, Info
} from 'lucide-react'
import { useState } from 'react'
import { API_BASE_URL } from '../utils/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    requestCallback: false,
    callbackDate: '',
    callbackTime: '',
    privacy: false
  })

  const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success, error
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      q: "How quickly can you start my project?",
      a: "We can typically begin initial consultations within 24-48 hours of your inquiry. For full project kickoff, we usually start within 1-2 weeks after finalizing the scope."
    },
    {
      q: "What is your pricing structure?",
      a: "Our pricing is customized based on project scope, complexity, and timeline. We offer both fixed-price and time-and-materials models."
    },
    {
      q: "Do you provide ongoing support after project completion?",
      a: "Yes, we offer comprehensive post-launch support including bug fixes, updates, monitoring, and optimization."
    },
    {
      q: "What industries do you specialize in?",
      a: "We work across multiple industries including healthcare, finance, e-commerce, education, and manufacturing."
    },
    {
      q: "How do you ensure project security and data privacy?",
      a: "We implement industry-standard security practices including encrypted communications, secure development environments, and regular audits."
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          company: '', service: '', budget: '', message: '',
          requestCallback: false, callbackDate: '', callbackTime: '',
          privacy: false
        })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setFormStatus('error')
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100 mb-6"
          >
            <MessageSquare className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">We're Here to Help</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Let's Start Your <span className="gradient-text">Digital Journey</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Get in touch with our AI consulting experts for a free consultation. We're ready to transform your business with intelligent solutions.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Phone, label: 'Call Us', val: '+91 70086 79523', link: 'tel:+917008679523' },
              { icon: Mail, label: 'Email Us', val: 'solviontech@gmail.com', link: 'mailto:solviontech@gmail.com' },
              { icon: MessageSquare, label: 'Live Chat', val: 'Chat Now', action: () => window.dispatchEvent(new CustomEvent('openChat')) },
            ].map((item, i) => (
              <motion.a 
                key={i}
                href={item.link}
                onClick={item.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group p-6 bg-white rounded-3xl border border-white shadow-xl shadow-primary/5 hover:shadow-2xl hover:-translate-y-1 transition-all text-left"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={24} strokeWidth={2.5} />
                </div>
                <div className="text-xs font-black text-text-secondary uppercase tracking-widest mb-1">{item.label}</div>
                <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.val}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface rounded-[40px] p-8 lg:p-12 border border-border"
            >
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-text-secondary mb-10">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">First Name</label>
                    <input 
                      type="text" required 
                      className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20" 
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Last Name</label>
                    <input 
                      type="text" required 
                      className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20" 
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Email Address</label>
                  <input 
                    type="email" required 
                    className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20" 
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Service Interest</label>
                    <select 
                      required 
                      className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20 appearance-none"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Select a service</option>
                      <option value="ai">AI Integration</option>
                      <option value="web">Web Development</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="data">Data Analytics</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Budget Range</label>
                    <select 
                      className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20 appearance-none"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="">Select budget</option>
                      <option value="low">Under ₹100k</option>
                      <option value="mid">₹100k - ₹500k</option>
                      <option value="high">Over ₹500k</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Message</label>
                  <textarea 
                    required 
                    className="w-full p-4 bg-white rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20 h-40" 
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" required 
                    id="privacy" 
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                  />
                  <label htmlFor="privacy" className="text-sm font-medium text-text-secondary">
                    I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send size={20} strokeWidth={2.5} />
                </button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-success/10 text-success rounded-2xl flex items-center gap-3 font-bold"
                    >
                      <CheckCircle2 size={24} strokeWidth={2.5} />
                      Message sent successfully! We'll be in touch.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

            {/* Content Side */}
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-bold mb-4">Visit Our <span className="gradient-text">Studio</span></h2>
                  <p className="text-xl text-text-secondary leading-relaxed">Stop by for a coffee and discuss how we can transform your business with AI.</p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, title: 'Office Address', val: 'SolvionTech Hub, Patia, Bhubaneswar, 751024' },
                    { icon: Clock, title: 'Business Hours', val: 'Mon - Fri: 9:00 AM - 6:00 PM IST' },
                    { icon: Shield, title: 'Data Privacy', val: 'GDPR & ISO 27001 Compliant Operations' },
                  ].map((info, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-[32px] bg-surface border border-border">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                        <info.icon size={28} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-text-secondary font-medium">{info.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="rounded-[40px] overflow-hidden border border-border bg-surface aspect-video relative group">
                <img 
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_14a04b47e-1766741796908.png" 
                  alt="Office Map" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent flex items-end p-8">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn bg-white text-gray-900 border-none px-8 flex items-center gap-2 font-bold shadow-xl"
                  >
                    Get Directions <MapPin size={18} strokeWidth={2.5} />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Linkedin, link: '#' },
                  { icon: Twitter, link: '#' },
                  { icon: Github, link: '#' },
                  { icon: Facebook, link: '#' },
                ].map((s, i) => (
                  <a 
                    key={i} 
                    href={s.link} 
                    className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                  >
                    <s.icon size={24} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface overflow-hidden">
        <div className="container-custom relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">FAQ <span className="gradient-text">Questions</span></h2>
            <p className="text-xl text-text-secondary">Quick answers to common questions about our services.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[32px] border border-border shadow-sm overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors pr-8">{faq.q}</h3>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${activeFaq === i ? 'bg-primary text-white rotate-180' : 'bg-surface text-text-secondary'}`}>
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-lg text-text-secondary leading-relaxed border-t border-border/50 mx-8">
                        <p className="pt-8">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
