import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, User, Lock, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../utils/api'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', data.username)
        navigate('/admin/dashboard')
      } else {
        // Detailed error message if available
        setError(data.error || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Cannot connect to the backend server. Please ensure the server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510] px-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-2xl rounded-[48px] p-10 lg:p-12 border border-white/20 shadow-2xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mx-auto mb-8">
              <img
                src="/images/Solvion_tech-removebg-preview.png"
                alt="SolvionTech Logo"
                className="h-16 w-auto object-contain"
              />
              <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary/20 group hover:rotate-6 transition-transform">
                <ShieldAlert size={48} strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">SolvionTech Admin Portal</h1>
            <p className="text-white/60 font-medium">SolvionTech Control Center</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-5 bg-error/10 border border-error/20 text-error rounded-2xl text-sm font-bold flex items-center gap-3"
                >
                  <ShieldAlert size={20} className="flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" required 
                  className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all" 
                  placeholder="Enter admin username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" required 
                  className="w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/10 transition-all" 
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-5 bg-primary hover:bg-primary-600 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <LogIn size={24} strokeWidth={2.5} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-white/40 text-sm">
          Protected by enterprise-grade encryption
        </p>
      </motion.div>
    </div>
  )
}

export default AdminLogin
