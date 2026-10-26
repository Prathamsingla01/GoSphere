import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

function BookingForm({ trip, isOpen, onClose }) {
  // Access saveBooking from Context API to store confirmed booking
  const { saveBooking } = useContext(AppContext);

  // 1. Controlled component state for each input field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const [travelClass, setTravelClass] = useState('Standard');

  // State for form validation errors and submission status
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  // 2. Form validation function
  function validateForm() {
    const newErrors = {};

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate Phone Number
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits.';
    }

    // Validate Number of Passengers (positive integer check)
    if (!passengers || Number(passengers) < 1) {
      newErrors.passengers = 'Number of passengers must be at least 1.';
    }

    // Validate Journey Date
    if (!travelDate) {
      newErrors.travelDate = 'Please select a travel date.';
    }

    setErrors(newErrors);
    // Returns true only if no validation errors exist
    return Object.keys(newErrors).length === 0;
  }

  // 3. Form submission handler
  function handleSubmit(e) {
    // Prevent default browser form submission (no full page reload)
    e.preventDefault();

    if (validateForm()) {
      const bookingData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        passengers: Number(passengers),
        travelDate,
        travelClass,
        travelMode: trip?.mode || 'Travel',
        tripName: trip?.name || 'Selected Journey',
        from: trip?.from || 'Origin',
        to: trip?.to || 'Destination',
        pricePerPerson: trip?.price || 500,
        totalFare: (trip?.price || 500) * Number(passengers),
      };

      // Save to React Context API
      saveBooking(bookingData);

      // Display success message
      setSuccessMessage('✓ Booking inquiry submitted successfully! Your details have been recorded.');

      // Clear the form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setPassengers(1);
      setTravelDate('');
      setTravelClass('Standard');
      setErrors({});
    }
  }

  function handleModalClose() {
    setSuccessMessage('');
    setErrors({});
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleModalClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleModalClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header-row" style={{ marginBottom: '16px' }}>
          <div>
            <span className="badge-pill">Travel Reservation</span>
            <h2 style={{ fontSize: '22px', marginTop: '6px' }}>
              Book: {trip?.name || 'Travel Ticket'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {trip?.from} → {trip?.to} {trip?.price && `(₹${trip.price} / person)`}
            </p>
          </div>
        </div>

        {/* Success notification */}
        {successMessage ? (
          <div className="form-success-alert">
            <p style={{ fontWeight: 600, color: '#34d399', marginBottom: '8px' }}>{successMessage}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              The booking details have been stored in the application's Context API.
            </p>
            <button className="btn-primary" onClick={handleModalClose} style={{ width: '100%', justifyContent: 'center' }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="booking-form-body">
            {/* Passenger Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="field-error-text">{errors.fullName}</span>}
            </div>

            {/* Email and Phone */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="field-error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>
            </div>

            {/* Passengers, Date & Class */}
            <div className="form-row-3">
              <div className="form-group">
                <label htmlFor="passengers">Passengers *</label>
                <input
                  id="passengers"
                  type="number"
                  min="1"
                  max="10"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className={errors.passengers ? 'input-error' : ''}
                />
                {errors.passengers && <span className="field-error-text">{errors.passengers}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="travelDate">Journey Date *</label>
                <input
                  id="travelDate"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className={errors.travelDate ? 'input-error' : ''}
                />
                {errors.travelDate && <span className="field-error-text">{errors.travelDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="travelClass">Class</label>
                <select
                  id="travelClass"
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Executive / AC">Executive / AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>

            {/* Price Preview */}
            {trip?.price && (
              <div className="fare-summary" style={{ padding: '10px 14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Estimated Fare: </span>
                <strong style={{ color: 'var(--accent-cyan)' }}>
                  ₹{(trip.price * (Number(passengers) || 1)).toLocaleString('en-IN')}
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> (₹{trip.price} × {passengers || 1})</span>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Confirm Booking Inquiry →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
