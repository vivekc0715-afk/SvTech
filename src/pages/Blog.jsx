import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, ChevronDown, Calendar, Clock, ArrowRight, 
  User, Mail, Layout, Cpu, Globe, BarChart, Shield, X, RotateCcw
} from 'lucide-react'
import { useState } from 'react'
import CustomDropdown from '../components/CustomDropdown'
import { Link } from 'react-router-dom'

const Blog = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [selectedReadingTime, setSelectedReadingTime] = useState('')

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'ai-transformation', label: 'AI Transformation' },
    { id: 'digital-strategy', label: 'Digital Strategy' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'industry-insights', label: 'Industry Insights' },
  ]

  const featuredArticle = {
    title: "Users increasingly likely to follow AI chatbot’s advice without question, Anthropic study finds",
    category: "AI Transformation",
    date: "Feb 2, 2026",
    readTime: "12 min read",
    desc: "Anthropic’s findings come amid concerns about the rise of AI psychosis, a non-clinical term broadly used to describe when users lose touch with reality after having lengthy conversations with an AI chatbot.",
    author: "Tech Desk",
    authorRole: "AI Strategy Expert",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b9cfc75-1764651774193.png",
    authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1633cb965-1763297100193.png",
    link: "https://indianexpress.com/article/technology/artificial-intelligence/users-follow-ai-chatbot-advice-without-question-anthropic-study-10509267/?ref=artificial-intelligence_pg"
  }

  const articles = [
    {
      id: 1,
      title: "Budget 2026: Artificial Intelligence, Semiconductors, Cloud, Data",
      category: "digital-strategy",
      categoryLabel: "Digital Strategy",
      date: "Dec 18, 2025",
      readTime: "8 min read",
      desc: "The Union Budget 2026-27 details proposals ranging from the Semiconductor Mission 2.0 and tax breaks for cloud services to new AI tools for farmers and ports.",
      author: "Tech Desks",
      authorRole: "AI Strategy Expert",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c5c678b-1766565518339.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dceeae29-1763298758424.png"
    },
    {
      id: 2,
      title: "ThoughtSpot: On the new fleet of agents delivering modern analytics",
      category: "implementation",
      categoryLabel: "Implementation",
      date: "Dec 15, 2025",
      readTime: "10 min read",
      desc: "Certainly, agentic systems really are shifting us into very new territory,” explains Jane Smith, field chief data and AI officer at ThoughtSpot.",
      author: "Emily Watson",
      authorRole: "Cloud Solutions Architect",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10dab81f6-1766741797189.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11da40f54-1763293529528.png"
    },
    {
      id: 3,
      title: "AI profitability in Southeast Asia",
      category: "ai-transformation",
      categoryLabel: "AI Transformation",
      date: "Dec 12, 2025",
      readTime: "7 min read",
      desc: "As we navigate the first quarter of 2026, the global narrative surrounding Artificial Intelligence has evolved from speculative exploration to a rigorous demand for measurable profitability.",
      author: "TN global",
      authorRole: "AI Strategy Expert",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15d08eded-1764641538764.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1633cb965-1763297100193.png"
    },
    {
      id: 4,
      title: "Cybersecurity Trends: Protecting Your Digital Assets",
      category: "industry-insights",
      categoryLabel: "Industry Insights",
      date: "Dec 10, 2025",
      readTime: "6 min read",
      desc: "Stay ahead of evolving threats with modern security frameworks. Essential insights for building resilient security postures.",
      author: "Michael Rodriguez",
      authorRole: "Security Consultant",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10e9df28f-1764654518042.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dceeae29-1763298758424.png"
    },
    {
      id: 5,
      title: "Digital Transformation Roadmap: From Vision to Execution",
      category: "digital-strategy",
      categoryLabel: "Digital Strategy",
      date: "Dec 8, 2025",
      readTime: "9 min read",
      desc: "Create actionable transformation strategies that deliver results. Framework for aligning technology with business objectives.",
      author: "Emily Watson",
      authorRole: "Digital Strategy Lead",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf36d10e-1766473998398.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11da40f54-1763293529528.png"
    },
    {
      id: 6,
      title: "Microservices Architecture: Design Patterns and Best Practices",
      category: "implementation",
      categoryLabel: "Implementation",
      date: "Dec 5, 2025",
      readTime: "11 min read",
      desc: "Build scalable, maintainable systems with microservices. Comprehensive guide to modern architectural patterns.",
      author: "Michael Rodriguez",
      authorRole: "Solutions Architect",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16a546e2e-1766741797712.png",
      authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1dceeae29-1763298758424.png"
    }
  ]

  const filteredArticles = articles.filter(a => {
    const matchesFilter = filter === 'all' || a.category === filter
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         a.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-custom relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full border border-primary-100"
          >
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Thought Leadership</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold leading-tight"
          >
            Insights on <span className="gradient-text">AI & Digital Innovation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Expert perspectives on AI transformation, digital strategy, and business innovation. Stay ahead with actionable insights from industry leaders.
          </motion.p>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search articles, topics, or authors..." 
                className="w-full pl-14 pr-4 py-5 bg-white rounded-2xl shadow-xl shadow-primary/5 border-none ring-0 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-6 h-6 text-text-secondary absolute left-5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 py-6 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    filter === cat.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-surface text-text-secondary hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl border transition-all font-bold text-sm ${
                  showAdvancedFilters ? 'bg-primary text-white border-primary' : 'bg-white text-text-primary border-border hover:border-primary/30'
                }`}
              >
                <Filter size={18} />
                Filters
              </button>
              <div className="w-48">
                <CustomDropdown
                  placeholder="Sort By"
                  options={['Latest First', 'Oldest First', 'Most Popular']}
                  onChange={(val) => console.log('Sort by:', val)}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-8 grid md:grid-cols-3 gap-6">
                  <CustomDropdown
                    label="Author"
                    icon={User}
                    value={selectedAuthor}
                    onChange={(val) => setSelectedAuthor(val)}
                    placeholder="All Authors"
                    options={[
                      { label: 'All Authors', value: '' },
                      { label: 'Tech Desk', value: 'tech-desk' },
                      { label: 'Emily Watson', value: 'emily-watson' },
                      { label: 'Michael Rodriguez', value: 'michael-rodriguez' }
                    ]}
                  />
                  <CustomDropdown
                    label="Date Range"
                    icon={Calendar}
                    value={selectedDateRange}
                    onChange={(val) => setSelectedDateRange(val)}
                    placeholder="All Time"
                    options={[
                      { label: 'All Time', value: '' },
                      { label: 'Past Week', value: 'week' },
                      { label: 'Past Month', value: 'month' },
                      { label: 'Past Year', value: 'year' }
                    ]}
                  />
                  <CustomDropdown
                    label="Reading Time"
                    icon={Clock}
                    value={selectedReadingTime}
                    onChange={(val) => setSelectedReadingTime(val)}
                    placeholder="Any Length"
                    options={[
                      { label: 'Any Length', value: '' },
                      { label: 'Under 5 min', value: 'short' },
                      { label: '5-10 min', value: 'medium' },
                      { label: '10+ min', value: 'long' }
                    ]}
                  />
                </div>
                <div className="flex gap-3 mt-8">
                  <button className="btn-primary px-8 py-3">Apply Filters</button>
                  <button 
                    onClick={() => { setSelectedAuthor(''); setSelectedDateRange(''); setSelectedReadingTime(''); }}
                    className="btn-ghost px-6 py-3 flex items-center gap-2 text-sm"
                  >
                    <RotateCcw size={16} /> Reset All
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold flex items-center gap-3">
              <span className="w-12 h-1 bg-primary rounded-full" />
              Featured Article
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative bg-[#10102e] rounded-[40px] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-[500px] overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#10102e] via-transparent to-transparent hidden lg:block" />
              </div>
              <div className="p-8 lg:p-16 flex flex-col justify-center text-white space-y-6">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1 bg-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <Calendar size={14} /> {featuredArticle.date}
                    <span className="mx-2">•</span>
                    <Clock size={14} /> {featuredArticle.readTime}
                  </div>
                </div>
                <h3 className="text-3xl lg:text-5xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer">{featuredArticle.title}</a>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed line-clamp-3">
                  {featuredArticle.desc}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <img src={featuredArticle.authorImage} alt={featuredArticle.author} className="w-14 h-14 rounded-full border-2 border-white/20" />
                  <div>
                    <h4 className="font-bold text-white">{featuredArticle.author}</h4>
                    <p className="text-sm text-gray-500">{featuredArticle.authorRole}</p>
                  </div>
                </div>
                <div className="pt-6">
                  <a 
                    href={featuredArticle.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 font-bold text-primary group/btn"
                  >
                    Read Full Story
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-all group-hover/btn:bg-primary group-hover/btn:text-white">
                      <ArrowRight size={20} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="section bg-surface">
        <div className="container-custom">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
              <p className="text-xl text-text-secondary">Explore our most recent thoughts on the future of technology.</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, i) => (
                <motion.article
                  layout
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-primary rounded-full shadow-sm">
                        {article.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col space-y-4">
                    <div className="flex items-center gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                      <a href="javascript:void(0)">{article.title}</a>
                    </h3>
                    <p className="text-text-secondary leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                    <div className="pt-6 mt-auto border-t border-border flex items-center gap-3">
                      <img src={article.authorImage} alt={article.author} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{article.author}</h4>
                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{article.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-border"
            >
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-secondary">
                <Layout size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-text-secondary mb-8">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setFilter('all'); setSearchQuery('') }}
                className="btn-primary px-8"
              >
                Show All Articles
              </button>
            </motion.div>
          )}

          <div className="mt-20 text-center">
            <button className="px-10 py-5 bg-white border-2 border-border rounded-2xl font-bold text-text-primary hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center gap-3 mx-auto">
              Load More Articles <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 lg:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-[20px] flex items-center justify-center text-primary">
                  <Mail size={32} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">Stay Ahead with Expert Insights</h2>
                <p className="text-lg text-text-secondary">Join 5,000+ professionals receiving weekly AI insights and digital strategy tips.</p>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full p-5 bg-surface rounded-2xl border-none ring-0 focus:ring-2 focus:ring-primary/20 text-lg shadow-inner"
                    required
                  />
                </div>
                <button className="btn-primary w-full py-5 text-lg shadow-lg shadow-primary/20">
                  Subscribe Now
                </button>
                <p className="text-center text-sm text-text-secondary font-medium">Unsubscribe anytime. Your data is secure.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Explore More Topics</h2>
            <p className="text-xl text-text-secondary">Discover content across our core areas of expertise.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, label: 'AI & Machine Learning', count: 24 },
              { icon: Globe, label: 'Cloud Computing', count: 18 },
              { icon: BarChart, label: 'Data Analytics', count: 21 },
              { icon: Shield, label: 'Cybersecurity', count: 15 },
            ].map((topic, i) => (
              <motion.a 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-surface rounded-[32px] text-center space-y-4 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <topic.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{topic.label}</h3>
                <p className="text-xs font-black text-text-secondary uppercase tracking-widest">{topic.count} Articles</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
