import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { API_BASE_URL } from '../utils/api'
import { 
  LayoutDashboard, MessageSquare, Briefcase, Cpu, 
  LogOut, Trash2, Plus, RefreshCcw, CheckCircle2, 
  X, Mail, Phone, Clock, User, ArrowRight, ShieldAlert
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages')
  const [messages, setMessages] = useState([])
  const [services, setServices] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState({
    title: '',
    category: '',
    description: '',
    icon_name: '',
    timeline: '',
    image_url: '',
    type: '',
    location: '',
    posted_date: '',
    requirements: '',
    responsibilities: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin')
    else fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    const token = localStorage.getItem('adminToken')
    const headers = { 'Authorization': `Bearer ${token}` }

    try {
      const [msgRes, svcRes, jobRes, appRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/messages`, { headers }),
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/jobs`),
        fetch(`${API_BASE_URL}/api/admin/applications`, { headers })
      ])

      if ([msgRes, svcRes, jobRes, appRes].some(res => res.status === 401 || res.status === 403)) {
        handleLogout()
        return
      }

      const safeJson = async (res) => {
        try {
          return await res.json()
        } catch {
          return null
        }
      }

      if (!msgRes.ok || !svcRes.ok || !jobRes.ok || !appRes.ok) {
        const [msgData, svcData, jobData, appData] = await Promise.all([
          safeJson(msgRes),
          safeJson(svcRes),
          safeJson(jobRes),
          safeJson(appRes)
        ])
        setError(
          msgData?.error ||
          svcData?.error ||
          jobData?.error ||
          appData?.error ||
          'Failed to fetch dashboard data'
        )
        return
      }

      const [msgData, svcData, jobData, appData] = await Promise.all([
        msgRes.json(),
        svcRes.json(),
        jobRes.json(),
        appRes.json()
      ])

      setMessages(msgData)
      setServices(svcData)
      setJobs(jobData)
      setApplications(appData)
    } catch (err) {
      setError('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin')
  }

  const handleDeleteService = async (id) => {
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setServices(services.filter(s => s.id !== id))
    } catch (err) { alert('Delete failed') }
  }

  const handleDeleteJob = async (id) => {
    const token = localStorage.getItem('adminToken')
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) setJobs(jobs.filter(j => j.id !== id))
    } catch (err) { alert('Delete failed') }
  }

  const openAddModal = () => {
    setAddForm({
      title: '',
      category: '',
      description: '',
      icon_name: '',
      timeline: '',
      image_url: '',
      type: '',
      location: '',
      posted_date: '',
      requirements: '',
      responsibilities: '',
    })
    setShowAddModal(true)
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    if (!token) {
      handleLogout()
      return
    }

    try {
      if (activeTab === 'services') {
        const res = await fetch(`${API_BASE_URL}/api/admin/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: addForm.title,
            category: addForm.category,
            description: addForm.description,
            icon_name: addForm.icon_name || 'Cpu',
            timeline: addForm.timeline,
            image_url: addForm.image_url
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to create service')
        setServices([...services, { id: data.id, ...addForm }])
      } else if (activeTab === 'jobs') {
        const res = await fetch(`${API_BASE_URL}/api/admin/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: addForm.title,
            category: addForm.category,
            type: addForm.type,
            location: addForm.location,
            posted_date: addForm.posted_date || 'Just now',
            description: addForm.description,
            requirements: addForm.requirements
              ? addForm.requirements.split('\n').map(s => s.trim()).filter(Boolean)
              : [],
            responsibilities: addForm.responsibilities
              ? addForm.responsibilities.split('\n').map(s => s.trim()).filter(Boolean)
              : [],
          })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to create job')
        setJobs([...jobs, { id: data.id, ...addForm }])
      }
      setShowAddModal(false)
    } catch (err) {
      alert(err.message || 'Failed to create item')
    }
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col z-20">
        <div className="mb-16 flex items-center gap-4">
          <img
            src="/images/Solvion_tech-removebg-preview.png"
            alt="SolvionTech Logo"
            className="h-14 w-auto object-contain"
          />
          <div>
            <h2 className="text-xl font-bold tracking-tight">SolvionTech</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">Control Center</p>
          </div>
        </div>

        <nav className="space-y-3 flex-grow">
          {[
            { id: 'messages', label: 'User Inquiries', icon: MessageSquare, count: messages.length },
            { id: 'applications', label: 'Job Applicants', icon: User, count: applications.length },
            { id: 'services', label: 'Service Portfolio', icon: Cpu, count: services.length },
            { id: 'jobs', label: 'Career Openings', icon: Briefcase, count: jobs.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                activeTab === tab.id 
                ? 'bg-primary text-white shadow-2xl shadow-primary/40' 
                : 'text-white/40 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <div className="flex items-center gap-4 font-bold">
                <tab.icon size={20} strokeWidth={2.5} />
                {tab.label}
              </div>
              {tab.count > 0 && (
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-2xl">
            <img
              src="/images/Solvion_tech-removebg-preview.png"
              alt="SolvionTech Logo"
              className="w-14 h-14 object-contain rounded-2xl bg-white/10 p-2"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{localStorage.getItem('adminUser')}</p>
              <p className="text-[10px] text-white/40 uppercase font-bold">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-error hover:bg-error/10 transition-all font-bold group"
          >
            <LogOut size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 lg:p-12 overflow-y-auto relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        </div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-5xl font-black mb-3 tracking-tight capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <div className="flex items-center gap-3 text-white/40 font-medium">
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
              <ArrowRight size={14} />
              <span className="text-primary">{activeTab}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchData}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white transition-all group"
              title="Refresh Data"
            >
              <RefreshCcw size={20} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
            </button>
            {(activeTab === 'services' || activeTab === 'jobs') && (
              <button
                onClick={openAddModal}
                className="btn-primary py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-3 group"
              >
                <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> 
                Add New
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="mb-8 mx-auto w-full max-w-3xl p-5 bg-error/10 border border-error/20 text-error rounded-2xl text-sm font-bold flex items-center gap-3">
            <ShieldAlert size={20} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-6">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Syncing Database...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {messages.length === 0 ? (
                  <div className="p-20 text-center bg-white/5 rounded-[48px] border border-white/10 backdrop-blur-sm">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-white/10">
                      <MessageSquare size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Inbox is empty</h3>
                    <p className="text-white/40">No user inquiries have been received yet.</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <motion.div 
                      key={msg.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 lg:p-10 border border-white/10 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-gradient-primary rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-primary/20">
                            {msg.first_name[0]}{msg.last_name[0]}
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-1">{msg.first_name} {msg.last_name}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-white/40 font-medium">
                              <span className="flex items-center gap-2"><Mail size={14} /> {msg.email}</span>
                              <span className="w-1 h-1 bg-white/20 rounded-full" />
                              <span className="flex items-center gap-2"><Clock size={14} /> {new Date(msg.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-5 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest border border-primary/20">{msg.service_interest}</span>
                          <span className="px-5 py-2 bg-accent/10 text-accent rounded-xl text-xs font-black uppercase tracking-widest border border-accent/20">{msg.budget_range}</span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-10 bg-[#050510]/50 rounded-[32px] text-xl text-white/80 leading-relaxed border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 text-white/5 pointer-events-none">
                          <MessageSquare size={120} strokeWidth={1} />
                        </div>
                        {msg.message}
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div 
                key="services"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {services.map(svc => (
                  <div key={svc.id} className="bg-white/5 backdrop-blur-md rounded-[48px] p-10 border border-white/10 hover:border-primary/30 transition-all flex flex-col group">
                    <div className="flex items-center justify-between mb-10">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-inner">
                        <Cpu size={32} strokeWidth={2.5} />
                      </div>
                      <button 
                        onClick={() => handleDeleteService(svc.id)}
                        className="w-12 h-12 rounded-2xl bg-error/5 text-error hover:bg-error hover:text-white transition-all flex items-center justify-center border border-error/10"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 leading-tight">{svc.title}</h3>
                    <p className="text-white/40 text-lg line-clamp-3 mb-10 leading-relaxed">{svc.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">{svc.category}</span>
                      <span className="text-sm font-bold text-white/40 flex items-center gap-2"><Clock size={16} /> {svc.timeline}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div 
                key="jobs"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {jobs.map(job => (
                  <div key={job.id} className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 lg:p-10 border border-white/10 hover:border-primary/30 transition-all flex items-center justify-between gap-10 group">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-3xl font-bold text-white tracking-tight">{job.title}</h3>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">{job.type}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-white/40 font-bold uppercase text-[10px] tracking-widest">
                        <span className="flex items-center gap-2 text-accent"><User size={14} /> {job.category}</span>
                        <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                        <span className="flex items-center gap-2"><Clock size={14} /> Posted {job.posted_date}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="w-16 h-16 rounded-[24px] bg-error/5 text-error hover:bg-error hover:text-white transition-all flex items-center justify-center border border-error/10 shadow-lg shadow-error/5"
                    >
                      <Trash2 size={28} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {applications.length === 0 ? (
                  <div className="p-20 text-center bg-white/5 rounded-[48px] border border-white/10 backdrop-blur-sm">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-white/10">
                      <User size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No applications yet</h3>
                    <p className="text-white/40">Once candidates submit job applications, they will appear here.</p>
                  </div>
                ) : (
                  applications.map(app => (
                    <div key={app.id} className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 lg:p-10 border border-white/10 hover:border-primary/30 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">{app.full_name}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
                            <span className="flex items-center gap-2"><Mail size={14} /> {app.email}</span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="flex items-center gap-2"><Clock size={14} /> {new Date(app.applied_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm uppercase text-white/40 tracking-[0.2em] mb-2">Applied For</h4>
                          <p className="text-xl font-bold text-white">{app.job_title || 'Unknown Role'}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <p className="text-white/60"><span className="font-bold text-white">Portfolio:</span> {app.portfolio_url || 'Not provided'}</p>
                          <p className="text-white/60"><span className="font-bold text-white">Resume File:</span> {app.resume_filename || 'Not provided'}</p>
                        </div>
                        <div className="bg-[#050510]/70 p-6 rounded-3xl border border-white/10">
                          <h4 className="text-white font-bold mb-3">Cover Letter</h4>
                          <p className="text-white/60 leading-relaxed">{app.cover_letter || 'No additional details provided.'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Add New Modal */}
      <AnimatePresence>
        {showAddModal && activeTab !== 'messages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#050510] border border-white/10 rounded-[32px] p-8 md:p-10 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Add New {activeTab === 'services' ? 'Service' : 'Job'}
              </h2>
              <p className="text-white/50 mb-8 text-sm">
                Fill out the fields below and save to update the {activeTab}.
              </p>

              <form className="space-y-5 max-h-[70vh] overflow-y-auto pr-2" onSubmit={handleAddSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Title</label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={addForm.title}
                    onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Category</label>
                    <input
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                      value={addForm.category}
                      onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    />
                  </div>

                  {activeTab === 'services' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Timeline</label>
                        <input
                          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          value={addForm.timeline}
                          onChange={(e) => setAddForm({ ...addForm, timeline: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Icon Name (optional)</label>
                        <input
                          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          placeholder="Cpu, Code, BarChart..."
                          value={addForm.icon_name}
                          onChange={(e) => setAddForm({ ...addForm, icon_name: e.target.value })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Type</label>
                        <input
                          className="w-full px-4 py-3 rounded-2xl bg.white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          value={addForm.type}
                          onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Location</label>
                        <input
                          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                          value={addForm.location}
                          onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                </div>

                {activeTab === 'services' && (
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Image URL</label>
                    <input
                      className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                      value={addForm.image_url}
                      onChange={(e) => setAddForm({ ...addForm, image_url: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">
                    {activeTab === 'services' ? 'Description' : 'Role Description'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={addForm.description}
                    onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  />
                </div>

                {activeTab === 'jobs' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Requirements (one per line)</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        value={addForm.requirements}
                        onChange={(e) => setAddForm({ ...addForm, requirements: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Responsibilities (one per line)</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        value={addForm.responsibilities}
                        onChange={(e) => setAddForm({ ...addForm, responsibilities: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard
