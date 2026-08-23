import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Trains', href: '/train' },
  { label: 'Flights', href: '/flight' },
  { label: 'Buses', href: '/bus' },
]

const socials = ['𝕏', 'in', 'ig', 'fb']

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>🌍</span> GoSphere
          </Link>
          <p className="footer-tagline">Explore More. Travel Smarter.</p>
        </div>

        <nav className="footer-links">
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="footer-socials">
          {socials.map((icon) => (
            <a key={icon} href="#" className="footer-social-icon" aria-label={icon} onClick={(e) => e.preventDefault()}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} GoSphere. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
