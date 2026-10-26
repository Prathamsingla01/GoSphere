import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SavedTripsModal from './SavedTripsModal.jsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Trains', href: '/train' },
  { label: 'Flights', href: '/flight' },
  { label: 'Buses', href: '/bus' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  // Read saved trips count from Redux store using useSelector
  const savedCount = useSelector((state) => state.travel.savedTrips.length);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
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
            {/* Redux State trigger: Shortlisted Trips */}
            <button
              type="button"
              className="btn-ghost navbar-cta"
              onClick={() => setSavedModalOpen(true)}
              title="View Shortlisted Journeys"
            >
              ★ Saved ({savedCount})
            </button>
            <NavLink to="/train" className="btn-primary navbar-cta" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Book Travel
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


            <button
              type="button"
              className="btn-ghost"
              style={{ justifyContent: 'center', marginTop: '8px' }}
              onClick={() => {
                closeMenu();
                setSavedModalOpen(true);
              }}
            >
              ★ Saved Journeys ({savedCount})
            </button>
            <NavLink to="/train" className="btn-primary navbar-cta-mobile" onClick={closeMenu}>
              Book Travel
            </NavLink>
          </nav>
        )}
      </header>

      {/* Modal for viewing Redux-managed saved trips */}
      <SavedTripsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
      />
    </>
  );
}

export default Navbar;
