import { motion } from 'framer-motion'
import { Award, Target, Users, Globe, BookOpen, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const About = () => {
  const values = [
    { title: 'Innovation First', icon: Lightbulb, desc: 'We stay at the forefront of AI and technology trends, constantly exploring new possibilities to deliver cutting-edge solutions.' },
    { title: 'Client Partnership', icon: Users, desc: "We view every engagement as a partnership, not a transaction. Your success is our success." },
    { title: 'Quality Excellence', icon: Award, desc: 'Premium quality without pretension. We maintain rigorous standards in every aspect of our work.' },
    { title: 'Results-Driven', icon: Target, desc: 'Every solution we deliver is designed with measurable business outcomes in mind.' },
    { title: 'Continuous Learning', icon: BookOpen, desc: "The tech landscape evolves rapidly. We invest heavily in our team's growth." },
    { title: 'Global Mindset', icon: Globe, desc: 'While rooted in Bhubaneswar, we think globally. Our solutions are designed to scale worldwide.' },
  ]

  const team = [
    {
      name: 'Shiv Kumar',
      role: 'CEO & Co-founder',
      image: '/images/sibu bhai formal.png',
      bio: 'SolvionTech delivers purpose-driven, innovative, and scalable technology solutions—simplifying complexity through software, AI, and cybersecurity.',
      expertise: ['AI Strategy', 'Business Transformation', 'Leadership']
    },
    {
      name: 'Madhusmita Sahu',
      role: 'CTO & Co-founder',
      image: '/images/madhu didi.png',
      bio: 'Madhusmita is a strategic HR leader with extensive experience in talent management, culture building, and HR transformation.',
      expertise: ['Machine Learning', 'Cloud Architecture', 'AI Research']
    },
    {
      name: 'Chinmaya Mishra',
      role: 'Developer',
      image: '/images/chiku img.png',
      bio: 'Chinmaya Mishra is a full-stack web and Java developer, building scalable applications with React, JavaScript, and MongoDB.',
      expertise: ['Product Strategy', 'UX Design', 'Agile Development']
    },
    {
      name: 'Sumit Ray',
      role: 'Developer',
      image: '/images/sumit img.png',
      bio: 'Sumit Ray is a CSE (AIML) undergraduate and full-stack developer, skilled in Python, machine learning, and modern web technologies.',
      expertise: ['Client Relations', 'Project Management', 'Training']
    }
  ]

  const timeline = [
    { year: '2019', title: 'Foundation', desc: 'SolvionTech founded in Bhubaneswar with a vision to democratize AI for businesses.' },
    { year: '2021', title: 'First Major Client', desc: 'Secured our first enterprise client, delivering an AI-powered analytics platform.' },
    { year: '2022', title: 'ISO Certification', desc: 'Achieved ISO 27001 certification, demonstrating our commitment to security.' },
    { year: '2024', title: 'International Expansion', desc: 'Expanded operations to serve clients across 15 countries.' },
    { year: '2026', title: 'Innovation Hub', desc: 'Launched our AI Innovation Hub, a dedicated R&D facility.' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        <div className="container-custom relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100"
          >
            <Award className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-medium text-primary">Est. 2019 • Bhubaneswar, India</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight"
          >
            Where <span className="gradient-text">Human Expertise</span> Meets Artificial Intelligence
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            We go beyond being a technology provider—we become your strategic partner in digital transformation. At SolvionTech, we blend advanced AI innovation with deep business insight.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm font-medium text-text-secondary">
            {['ISO Certified', 'GDPR Compliant', 'AWS Partner', 'Microsoft Gold Partner'].map(item => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" strokeWidth={2.5} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-full border border-accent-100">
                <Target className="w-5 h-5 text-accent" strokeWidth={2.5} />
                <span className="text-sm font-medium text-accent uppercase tracking-wider">Our Story</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                A Journey Rooted in Innovation and <span className="gradient-text">Trust</span>
              </h2>
              
              <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                <p>
                  SolvionTech Private Limited was founded in 2019 in the tech-forward city of Bhubaneswar. What started as a small group of passionate AI engineers has grown into a leading technology consulting firm.
                </p>
                <p>
                  Our mission is simple: To empower businesses of all sizes with intelligent technology that drives meaningful impact. We believe AI should be accessible, ethical, and purpose-driven.
                </p>
              </div>

              <div className="flex gap-4">
                <Link to="/contact" className="btn-primary">
                  Work With Us
                  <ArrowRight className="ml-2" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[2.5rem] overflow-hidden group shadow-2xl"
            >
              <img 
                src="/images/story-image.png" 
                alt="Our Office Culture" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10102e]/80 to-transparent" />
              <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <div className="text-white text-3xl font-bold mb-2">150+</div>
                <div className="text-white/80 text-sm">Projects Delivered Globally</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section bg-[#050510] text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">The <span className="gradient-text">Principles</span> We Live By</h2>
            <p className="text-gray-400 text-lg">
              Our core values guide every decision we make, from the technologies we choose to the team members we hire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all border border-primary/20">
                  <value.icon className="w-8 h-8 text-primary" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Meet Our <span className="gradient-text">Expert Team</span></h2>
            <p className="text-xl text-text-secondary">A diverse group of technologists united by a passion for innovation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/5] bg-surface">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10102e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.expertise.map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-wider font-bold bg-surface px-2 py-1 rounded text-text-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-surface">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Our <span className="gradient-text">Journey</span></h2>
            <p className="text-xl text-text-secondary">Key milestones that shaped SolvionTech into a trusted partner.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:inset-y-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-primary-100">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm z-10" />
                <div className="w-full md:w-1/2 p-8 bg-white rounded-3xl border border-border shadow-sm ml-8 md:ml-0">
                  <span className="text-primary font-bold text-lg mb-2 block">{item.year}</span>
                  <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#10102e] text-white">
        <div className="container-custom text-center space-y-10">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Partner with Us?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Let's discuss how our expertise and AI-driven approach can transform your business. Schedule a free consultation today.</p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="btn-primary px-10 py-5 text-lg">
              Get in Touch <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
