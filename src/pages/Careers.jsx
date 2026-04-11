import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Clock, ChevronDown, CheckCircle2, 
  Cpu, Rocket, GraduationCap, Heart, Users, Globe,
  ArrowRight, X, FileText, Send
} from 'lucide-react'
import { useState, useEffect } from 'react'

const Careers = () => {
  const [filter, setFilter] = useState('all')
  const [expandedJob, setExpandedJob] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const benefits = [
    { icon: Cpu, title: "AI-Powered Systems", desc: "Work with the latest AI technologies." },
    { icon: Rocket, title: "Competitive Pay", desc: "Industry-leading salaries and bonuses." },
    { icon: GraduationCap, title: "Continuous Learning", desc: "Dedicated learning budgets." },
    { icon: Heart, title: "Work-Life Balance", desc: "Flexible hours and remote-first." },
    { icon: Users, title: "Collaborative Culture", desc: "A supportive environment." },
    { icon: Globe, title: "Health & Wellness", desc: "Comprehensive health insurance." }
  ]

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs')
      if (response.ok) {
        const data = await response.json()
        setJobs(data)
      }
    } catch (err) {
      console.error('Fetch jobs error:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(j => filter === 'all' || (j.category && j.category.toLowerCase() === filter))

  const handleApply = (job) => {
    setSelectedJob(job)
    setShowApplyModal(true)
  }

  return (
    <div className="pt-20">
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Build Your Future with <span className="gradient-text">SolvionTech</span>
          </motion.h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12">Join our team of innovators shaping the future.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-8 border border-border rounded-[32px] hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <b.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                <p className="text-text-secondary">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">Open Positions</h2>
            <div className="flex justify-center gap-3">
              {['all', 'engineering', 'design', 'business'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white' : 'bg-white hover:bg-primary/5'}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center py-10 text-slate-400">Loading openings...</div>
            ) : filteredJobs.map((job) => (
              <div key={job._id} className="bg-white p-8 rounded-[32px] border border-border hover:shadow-lg transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-text-secondary mt-2">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {job.type}</span>
                    </div>
                  </div>
                  <button onClick={() => handleApply(job)} className="btn-primary px-6 py-2">Apply</button>
                </div>
                <p className="text-text-secondary">{job.description || job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-secondary/80 backdrop-blur-md" onClick={() => setShowApplyModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-lg bg-white rounded-[32px] p-10 overflow-hidden">
              <h2 className="text-2xl font-bold mb-6">Apply for {selectedJob?.title}</h2>
              <form onSubmit={(e) => { e.preventDefault(); setShowApplyModal(false); alert('Applied!'); }} className="space-y-4">
                <input required type="text" placeholder="Full Name" className="w-full p-4 bg-surface rounded-xl border-none" />
                <input required type="email" placeholder="Email" className="w-full p-4 bg-surface rounded-xl border-none" />
                <button type="submit" className="btn-primary w-full py-4 mt-4">Submit Application</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Careers
