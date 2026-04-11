import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Splash from './pages/Splash'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import CustomCursor from './components/CustomCursor'

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <div className="flex flex-col min-h-screen">
        {!isAdminPath && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        {!isAdminPath && <Footer />}
      </div>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splash_shown')
  })

  const handleSplashFinish = () => {
    sessionStorage.setItem('splash_shown', 'true')
    setShowSplash(false)
  }

  if (showSplash) {
    return <Splash onFinish={handleSplashFinish} />
  }

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
