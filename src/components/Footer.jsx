import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#10102e] text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/Solvion_tech-removebg-preview.png" 
                alt="SolvionTech Logo" 
                className="h-40 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for AI-driven business solutions and digital transformation.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-primary transition-all hover:scale-110 border border-white/5"
                >
                  <Icon size={22} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-gray-200">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-gray-200">Services</h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">AI Integration</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Custom Development</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Cloud Solutions</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Data Analytics</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Cybersecurity</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-gray-200">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0" size={22} strokeWidth={2.5} />
                <span className="text-gray-400">Bhubaneswar, Odisha, India</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-primary shrink-0" size={22} strokeWidth={2.5} />
                <a href="mailto:solviontech@gmail.com" className="text-gray-400 hover:text-white transition-colors">solviontech@gmail.com</a>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="text-primary shrink-0" size={22} strokeWidth={2.5} />
                <span className="text-gray-400">+91 70086 79523</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SolvionTech Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
