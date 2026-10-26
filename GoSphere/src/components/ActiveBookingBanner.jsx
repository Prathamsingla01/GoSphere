import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

function ActiveBookingBanner() {
  // Access shared booking state and cancel function from AppContext
  const { booking, cancelBooking } = useContext(AppContext);

  // If no booking has been made yet, do not render anything
  if (!booking) {
    return null;
  }

  return (
    <div className="active-booking-container container">
      <div className="active-booking-card glass-card">
        <div className="active-booking-header">
          <div className="active-booking-title">
            <span className="badge-pill">✓ Context API State</span>
            <h3>Active Booking: {booking.bookingId}</h3>
          </div>
          <button
            className="btn-cancel"
            onClick={cancelBooking}
            title="Cancel this booking"
          >
            ✕ Cancel Booking
          </button>
        </div>

        <div className="active-booking-details">
          <div>
            <span className="detail-label">Passenger</span>
            <span className="detail-value">{booking.fullName}</span>
          </div>
          <div>
            <span className="detail-label">Mode & Journey</span>
            <span className="detail-value">
              {booking.travelMode}: {booking.tripName || `${booking.from} → ${booking.to}`}
            </span>
          </div>
          <div>
            <span className="detail-label">Travel Date</span>
            <span className="detail-value">{booking.travelDate}</span>
          </div>
          <div>
            <span className="detail-label">Passengers</span>
            <span className="detail-value">{booking.passengers} Ticket(s)</span>
          </div>
          <div>
            <span className="detail-label">Class</span>
            <span className="detail-value">{booking.travelClass || 'Standard'}</span>
          </div>
          <div>
            <span className="detail-label">Status</span>
            <span className="detail-value status-badge">{booking.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveBookingBanner;
