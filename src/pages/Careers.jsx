import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Clock, ChevronDown, CheckCircle2, 
  Cpu, Rocket, GraduationCap, Heart, Users, Globe,
  ArrowRight, X, FileText, Send
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/api'

const defaultBenefits = [
  {
    icon_name: 'Cpu',
    title: 'AI-Powered Systems',
    description: 'Work with the latest AI technologies and stay ahead of the curve with premium resources.'
  },
  {
    icon_name: 'Rocket',
    title: 'Competitive Pay',
    description: 'Industry-leading salaries, performance bonuses, and equity options for excellence.'
  },
  {
    icon_name: 'GraduationCap',
    title: 'Continuous Learning',
    description: 'Dedicated learning budgets, certifications, and mentorship programs for your growth.'
  },
  {
    icon_name: 'Heart',
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote-first options, and unlimited PTO for sustainable productivity.'
  },
  {
    icon_name: 'Users',
    title: 'Collaborative Culture',
    description: 'A supportive environment with regular team events and open, honest communication.'
  },
  {
    icon_name: 'Globe',
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and mental health support for your total well-being.'
  }
]

const Careers = () => {
  const [filter, setFilter] = useState('all')
  const [expandedJob, setExpandedJob] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    portfolioUrl: '',
    resumeName: '',
    coverLetter: ''
  })
  const [appSubmitError, setAppSubmitError] = useState('')
  const [appSubmitting, setAppSubmitting] = useState(false)
  const [jobs, setJobs] = useState([])
  const [benefits, setBenefits] = useState(defaultBenefits)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs`)
      .then(res => res.json())
      .then((jobsData) => {
        setJobs(jobsData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching careers data:', err)
        setError('Failed to load careers data. Please try again later.')
        setLoading(false)
      })
  }, [])

  const iconMap = {
    Briefcase, MapPin, Clock, ChevronDown, CheckCircle2, 
    Cpu, Rocket, GraduationCap, Heart, Users, Globe,
    ArrowRight, X, FileText, Send
  }

  const filteredJobs = jobs.filter(j => filter === 'all' || j.category === filter)

  const handleApply = (job) => {
    setSelectedJob(job)
    setApplicationForm({
      fullName: '',
      email: '',
      portfolioUrl: '',
      resumeName: '',
      coverLetter: ''
    })
    setAppSubmitError('')
    setShowApplyModal(true)
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    if (!selectedJob) return

    setAppSubmitting(true)
    setAppSubmitError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJob.id,
          job_title: selectedJob.title,
          full_name: applicationForm.fullName,
          email: applicationForm.email,
          portfolio_url: applicationForm.portfolioUrl,
          resume_filename: applicationForm.resumeName,
          cover_letter: applicationForm.coverLetter
        })
      })

      const data = await response.json()
      if (!response.ok) {
        setAppSubmitError(data.error || 'Application submission failed. Please try again.')
      } else {
        setShowApplyModal(false)
      }
    } catch (err) {
      console.error('Application submit error:', err)
      setAppSubmitError('Unable to submit application. Please try again later.')
    } finally {
      setAppSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100 mb-8"
          >
            <Briefcase className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-medium text-primary">Join Our Growing Team</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Build Your Future with <span className="gradient-text">SolvionTech</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Join a team that's shaping the future of AI-driven business solutions. We're looking for passionate innovators who want to make a real impact.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Team Members', val: '50+', icon: Users },
              { label: 'Open Positions', val: '15+', icon: Briefcase },
              { label: 'Employee Rating', val: '4.8/5', icon: Heart },
              { label: 'Remote Friendly', val: '100%', icon: Globe },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white shadow-xl shadow-primary/5"
              >
                <div className="text-3xl font-black text-primary mb-1">{s.val}</div>
                <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Why Work <span className="gradient-text">With Us?</span></h2>
          </div>
          {error && <div className="text-center py-4 bg-red-50 text-red-600 rounded-lg mb-8"><p>{error}</p></div>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => {
              const IconComponent = iconMap[b.icon_name] || Cpu;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-10 bg-surface rounded-[40px] border border-border hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all shadow-xl shadow-primary/10 border border-primary/20">
                    <IconComponent className="w-8 h-8 text-primary" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="section bg-surface">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Open <span className="gradient-text">Positions</span></h2>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { id: 'all', label: 'All Roles' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'design', label: 'Design' },
                { id: 'business', label: 'Business' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${
                    filter === cat.id 
                    ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                    : 'bg-white text-text-secondary hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div 
                    layout
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-[32px] border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                    <div 
                      className="p-8 lg:p-10 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    >
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                          <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">{job.type}</span>
                          <span className="px-3 py-1 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest rounded-full">{job.location}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-text-secondary uppercase tracking-widest">
                          <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" strokeWidth={2.5} /> {job.location}</span>
                          <span className="flex items-center gap-2"><Clock size={16} className="text-primary" strokeWidth={2.5} /> {job.posted_date}</span>
                        </div>
                        <p className="text-text-secondary leading-relaxed max-w-2xl">{job.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                          className="btn-primary px-8 py-4 hidden lg:flex"
                        >
                          Apply Now
                        </button>
                        <motion.div 
                          animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                          className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-text-secondary"
                        >
                          <ChevronDown size={24} />
                        </motion.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-border bg-surface/30"
                        >
                          <div className="p-8 lg:p-10">
                            <div className="grid md:grid-cols-2 gap-12 mb-10">
                              <div className="space-y-6">
                                <h4 className="text-xl font-bold flex items-center gap-3">
                                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                                  Requirements
                                </h4>
                                <ul className="space-y-4">
                                  {(typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements || []).map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                                      <CheckCircle2 size={20} className="text-success mt-0.5 flex-shrink-0" />
                                      <span className="font-medium">{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-6">
                                <h4 className="text-xl font-bold flex items-center gap-3">
                                  <span className="w-1.5 h-6 bg-accent rounded-full" />
                                  Responsibilities
                                </h4>
                                <ul className="space-y-4">
                                  {(typeof job.responsibilities === 'string' ? JSON.parse(job.responsibilities) : job.responsibilities || []).map((res, i) => (
                                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                                      <ArrowRight size={20} className="text-primary mt-0.5 flex-shrink-0" />
                                      <span className="font-medium">{res}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="text-center lg:hidden">
                              <button 
                                onClick={() => handleApply(job)}
                                className="btn-primary w-full py-4"
                              >
                                Apply for this Position
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
              onClick={() => setShowApplyModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl p-8 lg:p-12 overflow-hidden max-h-[calc(100vh-4rem)]"
            >
              <button 
                onClick={() => setShowApplyModal(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-surface flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-13rem)] pr-2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Apply for <span className="text-primary">{selectedJob?.title}</span></h2>
                  <p className="text-text-secondary">Fill out the form below and we'll get back to you soon.</p>
                </div>

                <form className="space-y-6" onSubmit={handleApplicationSubmit}>
                  {appSubmitError && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-semibold">
                      {appSubmitError}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full p-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John Doe"
                        value={applicationForm.fullName}
                        onChange={(e) => setApplicationForm({ ...applicationForm, fullName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full p-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20"
                        placeholder="john@example.com"
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">GitHub / Portfolio URL</label>
                    <input
                      type="url"
                      className="w-full p-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20"
                      placeholder="https://github.com/johndoe"
                      value={applicationForm.portfolioUrl}
                      onChange={(e) => setApplicationForm({ ...applicationForm, portfolioUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Upload Resume (PDF)</label>
                    <div className="relative group">
                      <input
                        type="file"
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept=".pdf"
                        onChange={(e) => setApplicationForm({
                          ...applicationForm,
                          resumeName: e.target.files?.[0]?.name || ''
                        })}
                      />
                      <div className="w-full p-8 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-4 group-hover:border-primary/30 transition-all bg-surface/50">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-all">
                          <FileText size={24} />
                        </div>
                        <p className="font-bold text-text-secondary">Click to upload or drag & drop</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-primary ml-1">Why should we hire you?</label>
                    <textarea
                      className="w-full p-4 bg-surface rounded-2xl border-none focus:ring-2 focus:ring-primary/20 h-32"
                      placeholder="Tell us about yourself..."
                      value={applicationForm.coverLetter}
                      onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                    />
                  </div>

                  <button type="submit" disabled={appSubmitting} className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50">
                    {appSubmitting ? 'Submitting...' : 'Submit Application'} {appSubmitting ? null : <Send size={20} />}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Careers
