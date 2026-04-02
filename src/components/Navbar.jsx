import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header 
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ease-in-out w-full
          ${isScrolled 
            ? 'top-4 max-w-[95%] 2xl:max-w-[1440px] bg-[#10102e]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-1.5' 
            : 'top-0 max-w-full bg-[#050510]/90 backdrop-blur-md py-1.5 border-b border-white/5 shadow-xl'}
        `}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/images/Solvion_tech-removebg-preview.png" 
                alt="SolvionTech Logo" 
                className="h-20 md:h-28 w-auto object-contain origin-left transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[17px] font-semibold transition-all relative group py-2 ${
                    isActive(link.path) ? 'text-primary' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              ))}
              <Link to="/contact" className="btn-primary py-2.5 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`lg:hidden p-3.5 rounded-2xl transition-all shadow-xl active:scale-95 ${
                isScrolled 
                  ? 'bg-white/10 text-white' 
                  : 'bg-[#10102e] text-white border border-white/20'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050510] z-[100] lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col h-full p-8 relative min-h-screen">
              {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 blur-[120px] rounded-full" />

              <div className="flex items-center justify-between mb-16 relative z-10">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img 
                    src="/images/Solvion_tech-removebg-preview.png" 
                    alt="SolvionTech Logo" 
                    className="h-20 w-auto object-contain"
                  />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8 relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.2 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-bold tracking-tight transition-all ${
                        isActive(link.path) ? 'text-primary pl-4 border-l-4 border-primary' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8"
                >
                  <Link 
                    to="/contact" 
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full py-6 text-2xl rounded-2xl shadow-2xl shadow-primary/30"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>

              {/* Contact Info at bottom */}
              <div className="mt-auto relative z-10 border-t border-white/10 pt-10 pb-6">
                <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-4">Inquiries</p>
                <a href="mailto:info@solviontech.com" className="text-xl text-white/90 font-medium hover:text-primary transition-colors">
                  info@solviontech.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
