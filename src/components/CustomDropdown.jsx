import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option", 
  label,
  icon: Icon,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => 
    typeof opt === 'string' ? opt === value : opt.value === value
  )

  const getLabel = (opt) => typeof opt === 'string' ? opt : opt.label
  const getValue = (opt) => typeof opt === 'string' ? opt : opt.value

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-2 ml-1">
          {Icon && <Icon size={14} />} {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 bg-white rounded-2xl border-none ring-0 transition-all text-left ${isOpen ? 'focus:ring-2 focus:ring-primary/20 shadow-lg' : 'hover:bg-surface'}`}
      >
        <span className={`truncate font-medium ${!value ? 'text-text-secondary' : 'text-text-primary'}`}>
          {selectedOption ? getLabel(selectedOption) : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "anticipate" }}
          className="text-text-secondary"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-border/50 overflow-hidden backdrop-blur-xl"
          >
            <div className="max-h-60 overflow-y-auto p-2 space-y-1">
              {options.map((option, idx) => {
                const optValue = getValue(option)
                const optLabel = getLabel(option)
                const isSelected = value === optValue

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(optValue)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-sm font-semibold ${isSelected ? 'bg-primary text-white shadow-lg' : 'hover:bg-primary/5 text-text-secondary hover:text-primary'}`}
                  >
                    <span>{optLabel}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomDropdown
