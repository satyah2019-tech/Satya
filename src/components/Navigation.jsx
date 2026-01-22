import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import './Navigation.css'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Detect scroll for potential styling adjustments (e.g., more blur on scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/partners', label: 'Partners & Clients' },
    { path: '/blogs', label: 'Blogs & Articles' },
    { path: '/careers', label: 'Careers' },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleNavClick = (path) => {
    closeMenu()
    window.scrollTo(0, 0)
    navigate(path)
  }

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-pill-container">

        {/* LEFT: Logo Section */}
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          <Logo size={42} /> {/* Slightly larger logo icon */}
          <span className="logo-text">SATYAH<span className="logo-text-suffix"> (सत्यः)</span></span>
        </Link>

        {/* RIGHT: Desktop Navigation & Actions */}
        <div className="nav-desktop">
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/contact" className="nav-cta-button">
            Contact Us
          </Link>
        </div>

        {/* MOBILE: Hamburger & Menu */}
        <div className="nav-mobile-controls">
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeMenu}
              />
              <motion.nav
                className="menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <button
                  className="menu-close-button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="menu-header">
                  <Logo size={60} />
                  <span className="logo-text">SATYAH (सत्यः)</span>
                </div>
                <ul className="menu-list">
                  {/* Standard Links */}
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <button
                        className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.path)}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}

                  {/* Contact Us in Mobile Menu */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: menuItems.length * 0.08 }}
                  >
                    <button
                      className={`menu-link ${location.pathname === '/contact' ? 'active' : ''}`}
                      onClick={() => handleNavClick('/contact')}
                    >
                      Contact Us
                    </button>
                  </motion.li>
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navigation
