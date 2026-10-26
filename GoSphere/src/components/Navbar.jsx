import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppContext } from '../context/AppContext.jsx';
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

  // Read Context API live ticket state (before vs after confirmation)
  const { booking, recentSeenTicket } = useAppContext();

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
            {/* Live Context API Ticket Status Indicator */}
            {booking ? (
              <NavLink
                to="/"
                className="navbar-ticket-badge confirmed"
                title={`Context API Confirmed Ticket: ${booking.bookingId}`}
              >
                <span className="pulsing-dot-green" /> ✓ Confirmed ({booking.bookingId})
              </NavLink>
            ) : recentSeenTicket ? (
              <NavLink
                to="/"
                className="navbar-ticket-badge unconfirmed"
                title={`Context API Recent Ticket: ${recentSeenTicket.name}`}
              >
                <span>👁 Recent: {recentSeenTicket.name.length > 15 ? recentSeenTicket.name.slice(0, 15) + '…' : recentSeenTicket.name}</span>
              </NavLink>
            ) : null}

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

            {/* Context API Ticket Status in Mobile Menu */}
            {booking ? (
              <NavLink
                to="/"
                className="navbar-ticket-badge confirmed mobile"
                onClick={closeMenu}
              >
                <span className="pulsing-dot-green" /> ✓ Confirmed Ticket: {booking.bookingId}
              </NavLink>
            ) : recentSeenTicket ? (
              <NavLink
                to="/"
                className="navbar-ticket-badge unconfirmed mobile"
                onClick={closeMenu}
              >
                <span>👁 Recently Seen: {recentSeenTicket.name}</span>
              </NavLink>
            ) : null}

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
