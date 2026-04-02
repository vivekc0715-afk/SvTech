import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User, Bot, Sparkles, Minus } from 'lucide-react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm Solvi, your AI assistant. How can I help you today?", time: new Date() }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  const quickReplies = [
    { text: "What services do you offer?", icon: "🚀" },
    { text: "How can I get a quote?", icon: "💰" },
    { text: "Where is your office?", icon: "📍" },
    { text: "Talk to an expert", icon: "👨‍💻" }
  ]

  // Global event listener to open chat from other components
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener('openChat', handleOpenChat)
    return () => window.removeEventListener('openChat', handleOpenChat)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    const userMessage = { id: messages.length + 1, type: 'user', text, time: new Date() }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = { 
        id: messages.length + 2, 
        type: 'bot', 
        text: getBotResponse(text), 
        time: new Date() 
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (input) => {
    const query = input.toLowerCase()
    if (query.includes('price') || query.includes('cost')) return "Our pricing is tailored to each project. Would you like to schedule a free consultation to get a quote?"
    if (query.includes('service') || query.includes('offer')) return "We specialize in AI Integration, Custom Software, Cloud Solutions, and Data Analytics. Which one interests you?"
    if (query.includes('contact') || query.includes('email')) return "You can reach us at solviontech@gmail.com or call us at +91 70086 79523."
    if (query.includes('location') || query.includes('address')) return "Our studio is located in Patia, Bhubaneswar, Odisha."
    return "That's interesting! I'd love to help you with that. Can you tell me more about your requirements?"
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    const text = inputValue
    setInputValue('')
    await sendMessage(text)
  }

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-white relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <MessageSquare size={28} className="relative z-10" strokeWidth={2.5} />
            <div className="absolute top-0 right-0 w-4 h-4 bg-accent rounded-full border-4 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="w-[400px] h-[600px] bg-white rounded-[40px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                  <img src="/images/Solvion_tech-removebg-preview.png" alt="Solvion Logo" className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">Solvi AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs text-white/80 font-medium uppercase tracking-widest">Online Support</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Minus size={20} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto bg-gray-50/50 space-y-6 scrollbar-hide"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -20 : 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    msg.type === 'bot' 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}>
                    {msg.type === 'bot' ? <Bot size={20} strokeWidth={2.5} /> : <User size={20} strokeWidth={2.5} />}
                  </div>
                  <div className={`max-w-[75%] p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                    msg.type === 'bot' 
                      ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
                      : 'bg-primary text-white rounded-tr-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Bot size={20} strokeWidth={2.5} />
                  </div>
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center h-10">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-6 pb-4 flex flex-wrap gap-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(reply.text)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center gap-2"
                  >
                    <span>{reply.icon}</span>
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-100">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Solvi anything..."
                  className="w-full pl-6 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-primary shadow-lg shadow-primary/20"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-4 font-black uppercase tracking-widest">Powered by SolvionTech AI</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatWidget
