"use client"
import { UserButton } from '@stackframe/stack'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      const sections = ['home', 'features', 'solutions', 'pricing', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'feedback', label: 'Feedbacks' },
    { id: 'credits', label: 'Credits' },
    // { id: 'pricing', label: 'Pricing' },
    // { id: 'contact', label: 'Contact' }
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      {/* Add a placeholder div that matches the header height when fixed */}
      {isScrolled && <div className="h-14" />}
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`w-full transition-all duration-300 ${
          isScrolled ? 'bg-blue-700/95 shadow-xl fixed top-0 left-0 z-50 h-14' : 'bg-blue-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a 
                href="/dashboard" 
                className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              >
                Agents.io
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item : any) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative px-4 py-2"
                >
                  <a
                    href={`/${item.id}`}
                    className={`relative font-medium transition-colors duration-300 ${
                      activeSection === item.id 
                        ? 'text-white font-semibold' 
                        : 'text-blue-100 hover:text-white'
                    }`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.label}
                    {(hoveredItem === item.id || activeSection === item.id) && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute left-0 -bottom-3 w-full h-1 bg-gradient-to-r from-blue-300 to-white rounded-t-sm"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* User controls */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block"
              >
                <UserButton />
              </motion.div>

              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-white hover:bg-blue-500 transition-colors duration-200 lg:hidden"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="lg:hidden absolute z-50 bg-blue-600/95 border-t border-blue-500/50 shadow-xl"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item : any, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-4 py-3 rounded-lg text-base font-medium relative ${
                      activeSection === item.id 
                        ? 'text-white bg-blue-700' 
                        : 'text-blue-100 hover:text-white hover:bg-blue-500/50'
                    }`}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    {item.label}
                    {(hoveredItem === item.id || activeSection === item.id) && (
                      <motion.span
                        className="absolute left-0 bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-300 to-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 0.3 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -45, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
          />
        </motion.div>
      </motion.header>
    </>
  )
}

export default Header