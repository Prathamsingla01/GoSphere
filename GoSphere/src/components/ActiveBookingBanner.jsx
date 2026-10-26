import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import BookingForm from './BookingForm.jsx';

function ActiveBookingBanner() {
  // Access Context API state and actions
  const {
    booking,
    cancelBooking,
    recentSearches,
    recentSeenTicket,
    recentSeenTickets,
    selectRecentTicket,
  } = useContext(AppContext);

  // Modal state to allow direct booking of the recently seen ticket from Home
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // =========================================================================
  // STATE 1: AFTER TICKET CONFIRMATION (booking is truthy)
  // =========================================================================
  if (booking) {
    return (
      <div className="active-booking-container container" id="context-ticket-banner">
        <div className="active-booking-card confirmed-ticket-card glass-card">
          <div className="active-booking-header">
            <div className="active-booking-title">
              <span className="badge-pill context-pill">⚡ Context API State</span>
              <span className="badge-pill confirmed-pill">
                <span className="pulsing-dot" /> ✓ Ticket Confirmed
              </span>
              <h3>Active Reservation: {booking.bookingId}</h3>
            </div>
            <button
              className="btn-cancel"
              onClick={cancelBooking}
              title="Cancel this booking and return to recent searches"
            >
              ✕ Cancel / Clear Booking
            </button>
          </div>

          <div className="confirmed-ticket-alert-strip">
            <p>
              🎉 <strong>Booking Confirmed!</strong> Your reservation has been stored globally in the
              React Context API. Before confirmation, this banner displayed your recent searches; now it
              displays your confirmed ticket.
            </p>
          </div>

          <div className="active-booking-details">
            <div>
              <span className="detail-label">Passenger Name</span>
              <span className="detail-value">{booking.fullName}</span>
            </div>
            <div>
              <span className="detail-label">Contact</span>
              <span className="detail-value" style={{ fontSize: '13px' }}>
                {booking.email} <br />
                <span style={{ color: 'var(--text-muted)' }}>{booking.phone}</span>
              </span>
            </div>
            <div>
              <span className="detail-label">Travel Mode & Service</span>
              <span className="detail-value">
                {booking.travelMode === 'Flight' ? '✈️' : booking.travelMode === 'Bus' ? '🚌' : '🚆'}{' '}
                {booking.tripName || `${booking.from} → ${booking.to}`}
              </span>
            </div>
            <div>
              <span className="detail-label">Route</span>
              <span className="detail-value">
                {booking.from} ➔ {booking.to}
              </span>
            </div>
            <div>
              <span className="detail-label">Journey Date</span>
              <span className="detail-value">{booking.travelDate}</span>
            </div>
            <div>
              <span className="detail-label">Passengers & Class</span>
              <span className="detail-value">
                {booking.passengers} Ticket(s) &bull; {booking.travelClass || 'Standard'}
              </span>
            </div>
            <div>
              <span className="detail-label">Total Fare Paid</span>
              <span className="detail-value fare-highlight">
                ₹{Number(booking.totalFare || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="detail-label">Status</span>
              <span className="detail-value status-badge">
                ● {booking.status || 'Confirmed (Demo)'}
              </span>
            </div>
          </div>

          {/* Boarding Pass / Ticket Verification Strip */}
          <div className="ticket-verification-bar">
            <div className="barcode-simulation" aria-hidden="true">
              <span className="barcode-line w-2" />
              <span className="barcode-line w-1" />
              <span className="barcode-line w-3" />
              <span className="barcode-line w-2" />
              <span className="barcode-line w-1" />
              <span className="barcode-line w-4" />
              <span className="barcode-line w-2" />
              <span className="barcode-line w-1" />
              <span className="barcode-line w-3" />
              <span className="barcode-line w-2" />
              <span className="barcode-line w-4" />
              <span className="barcode-line w-1" />
              <span className="barcode-line w-3" />
              <span className="barcode-line w-2" />
              <span className="barcode-line w-1" />
              <span className="barcode-line w-4" />
            </div>
            <div className="ticket-ref-text">
              <span className="ref-code">PASS REF: GOSPHERE-CX-{booking.bookingId}</span>
              <span className="ref-note">Confirmed on {booking.createdAt} &bull; Valid with ID</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 2: BEFORE TICKET CONFIRMATION (booking is null)
  // Shows recent searches and recently viewed / seen ticket
  // =========================================================================
  const ticket = recentSeenTicket || recentSeenTickets[0];

  function getModePath(mode) {
    if (mode === 'Flight') return '/flight';
    if (mode === 'Bus') return '/bus';
    return '/train';
  }

  return (
    <div className="active-booking-container container" id="context-ticket-banner">
      <div className="active-booking-card recent-ticket-card glass-card">
        {/* Banner Header */}
        <div className="active-booking-header">
          <div className="active-booking-title">
            <span className="badge-pill context-pill">⚡ Context API State</span>
            <span className="badge-pill stage-pill">⏱ Before Ticket Confirmation</span>
            <h3>Recent Searches & Recently Seen Ticket</h3>
          </div>
          <span className="context-state-caption">
            Live shared state via Context API
          </span>
        </div>

        {/* Recent Searches Strip */}
        {recentSearches && recentSearches.length > 0 && (
          <div className="recent-searches-row">
            <span className="recent-searches-label">🔍 Recent Searches:</span>
            <div className="recent-searches-list">
              {recentSearches.map((search) => {
                const isSelected =
                  ticket &&
                  ticket.from?.toLowerCase() === search.from?.toLowerCase() &&
                  ticket.to?.toLowerCase() === search.to?.toLowerCase();

                return (
                  <button
                    key={search.id}
                    type="button"
                    className={`recent-search-pill ${isSelected ? 'is-active' : ''}`}
                    onClick={() => {
                      // Find if we have a seen ticket matching this search, or select one
                      const matched = recentSeenTickets.find(
                        (t) =>
                          t.from?.toLowerCase() === search.from?.toLowerCase() &&
                          t.to?.toLowerCase() === search.to?.toLowerCase()
                      );
                      if (matched) {
                        selectRecentTicket(matched);
                      }
                    }}
                    title={`Search for ${search.summary} (${search.mode})`}
                  >
                    <span>{search.icon}</span>
                    <span>{search.summary}</span>
                    <span className="search-pill-date">{search.timestamp || search.date}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Seen Ticket Spotlight */}
        {ticket && (
          <div className="recent-seen-ticket-box">
            <div className="seen-ticket-top">
              <div className="seen-ticket-identity">
                <span className="mode-badge-pill">
                  {ticket.mode === 'Flight' ? '✈️ Flight' : ticket.mode === 'Bus' ? '🚌 Bus' : '🚆 Train'}
                </span>
                <h4 className="seen-ticket-name">
                  {ticket.name} {ticket.number && <span className="ticket-num">#{ticket.number}</span>}
                </h4>
                {ticket.score && (
                  <span className="seen-ticket-score">
                    ⭐ {typeof ticket.score === 'object' ? ticket.score.overall : ticket.score}/100 Rating
                  </span>
                )}
              </div>
              <div className="seen-ticket-status">
                <span className="unconfirmed-status-pill">
                  👁 Recently Inspected Ticket (Unconfirmed)
                </span>
              </div>
            </div>

            {/* Route Timeline Graphic */}
            <div className="ticket-route-timeline">
              <div className="timeline-station origin">
                <span className="station-name">{ticket.from}</span>
                <span className="station-time">{ticket.depTime || 'Departure'}</span>
              </div>

              <div className="timeline-connector">
                <span className="connector-duration">{ticket.durationLabel || 'Direct'}</span>
                <div className="connector-line">
                  <span className="connector-dot start" />
                  <span className="connector-vehicle" aria-hidden="true">
                    {ticket.mode === 'Flight' ? '✈️' : ticket.mode === 'Bus' ? '🚌' : '🚆'}
                  </span>
                  <span className="connector-dot end" />
                </div>
                <span className="connector-type">Non-Stop Express</span>
              </div>

              <div className="timeline-station destination">
                <span className="station-name">{ticket.to}</span>
                <span className="station-time">{ticket.arrTime || 'Arrival'}</span>
              </div>
            </div>

            {/* Facilities & Amenities */}
            {ticket.facilities && ticket.facilities.length > 0 && (
              <div className="ticket-facilities-row">
                {ticket.facilities.map((fac, idx) => (
                  <span key={idx} className="facility-tag">
                    {fac}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Fare & Action Row */}
            <div className="seen-ticket-footer">
              <div className="seen-ticket-pricing">
                <span className="price-caption">Estimated Fare</span>
                <span className="price-amount">
                  ₹{Number(ticket.price || 500).toLocaleString('en-IN')}{' '}
                  <small style={{ fontSize: '13px', fontWeight: 'normal', color: 'var(--text-muted)' }}>
                    / person
                  </small>
                </span>
              </div>

              <div className="seen-ticket-actions">
                <Link to={getModePath(ticket.mode)} className="btn-ghost">
                  Explore More {ticket.mode}s →
                </Link>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsBookingOpen(true)}
                  style={{ boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)' }}
                >
                  Book / Confirm This Ticket →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Selector for other recently inspected tickets */}
        {recentSeenTickets.length > 1 && (
          <div className="other-seen-tickets">
            <span className="other-seen-label">Other recently inspected tickets:</span>
            <div className="other-seen-cards-grid">
              {recentSeenTickets.map((item) => (
                <button
                  key={item.id || item.name}
                  type="button"
                  className={`other-seen-card ${ticket?.name === item.name ? 'is-current' : ''}`}
                  onClick={() => selectRecentTicket(item)}
                >
                  <span className="other-seen-icon">
                    {item.mode === 'Flight' ? '✈️' : item.mode === 'Bus' ? '🚌' : '🚆'}
                  </span>
                  <div className="other-seen-info">
                    <span className="other-seen-title">{item.name}</span>
                    <span className="other-seen-sub">
                      {item.from} → {item.to} &bull; ₹{item.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controlled Booking Form Modal for direct booking */}
      {ticket && (
        <BookingForm
          trip={{
            name: ticket.name,
            mode: ticket.mode,
            from: ticket.from,
            to: ticket.to,
            price: ticket.price,
          }}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}

export default ActiveBookingBanner;
