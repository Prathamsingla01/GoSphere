import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Trains', href: '/train' },
  { label: 'Flights', href: '/flight' },
  { label: 'Buses', href: '/bus' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-icon">🌍</span>
          <span className="navbar-logo-text">GoSphere</span>
        </NavLink>

        {/* Desktop links */}
        <nav className="navbar-links navbar-links-desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions navbar-actions-desktop">
          <NavLink to="/train" className="btn-ghost navbar-cta">
            Get Started
          </NavLink>
        </div>

        {/* Hamburger button, only visible on mobile */}
        <button
          className={`navbar-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu, shown only when menuOpen is true */}
      {menuOpen && (
        <nav className="navbar-mobile-menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/train" className="btn-primary navbar-cta-mobile" onClick={closeMenu}>
            Get Started
          </NavLink>
        </nav>
      )}
    </header>
  )
}

export default Navbar
