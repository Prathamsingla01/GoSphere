import { useState, useContext } from 'react';
import { X, Users, Utensils, ShieldCheck, Zap, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

// Class price multipliers matching GoSphere standards
const classPriceMultiplier = {
  'Executive Chair Car': 1.5,
  'AC Chair Car': 1.2,
  'First Class': 1.8,
  Business: 1.8,
  'AC 1 Tier': 2.5,
  'AC 2 Tier': 1.8,
  'AC 3 Tier': 1.3,
  Sleeper: 1.0,
  Economy: 1.0,
  Standard: 1.0,
  'Second Sitting': 0.6,
  General: 0.4,
};

function BookingForm({ trip, isOpen, onClose }) {
  const { saveBooking } = useContext(AppContext);

  // Default classes for fallback
  const availableClasses =
    trip?.classes && trip.classes.length > 0
      ? trip.classes
      : trip?.travelClass
      ? [trip.travelClass]
      : ['Standard', 'Executive Chair Car'];

  // Controlled form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState(availableClasses[0] || 'Standard');
  const [addOns, setAddOns] = useState({ meals: false, insurance: false, priority: false });
  const [step, setStep] = useState(1); // 1 = form, 2 = confirmation
  const [error, setError] = useState('');

  if (!isOpen || !trip) return null;

  // Price calculations
  const rawBase = trip.price || 500;
  const multiplier = classPriceMultiplier[selectedClass] ?? 1.0;
  const basePrice = Math.round(rawBase * multiplier);
  const mealsPrice = addOns.meals ? 150 * passengers : 0;
  const insurancePrice = addOns.insurance ? 99 : 0;
  const priorityPrice = addOns.priority ? 50 * passengers : 0;
  const totalPrice = basePrice * passengers + mealsPrice + insurancePrice + priorityPrice;

  function toggleAddOn(key) {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleClose() {
    setName('');
    setPhone('');
    setEmail('');
    setPassengers(1);
    setSelectedClass(availableClasses[0] || 'Standard');
    setAddOns({ meals: false, insurance: false, priority: false });
    setError('');
    setStep(1);
    onClose();
  }

  function handleConfirm(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');

    // Save confirmed booking into Context API
    saveBooking({
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      passengers,
      travelClass: selectedClass,
      travelMode: trip.mode || 'Train',
      tripName: trip.name || `${trip.from} → ${trip.to}`,
      from: trip.from,
      to: trip.to,
      pricePerPerson: basePrice,
      totalFare: totalPrice,
      addOns,
    });

    // Advance to Step 2: Confirmation modal
    setStep(2);
  }

  const categoryEmoji =
    trip.mode === 'Flight' ? '✈️' : trip.mode === 'Bus' ? '🚌' : '🚆';

  return (
    <div className="book-modal-overlay" onClick={handleClose}>
      <div className="book-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="book-modal-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        {step === 1 ? (
          <>
            <div className="book-modal-header">
              <span className="book-modal-eyebrow">
                {categoryEmoji} Book Your Ticket
              </span>
              <h2 className="book-modal-title">{trip.name}</h2>
              <p className="book-modal-sub">
                {trip.from} → {trip.to}
                {trip.depTime && trip.arrTime && (
                  <> &nbsp;·&nbsp; {trip.depTime} – {trip.arrTime}</>
                )}
              </p>
            </div>

            <form className="book-modal-form" onSubmit={handleConfirm} noValidate>
              {/* Passenger Details */}
              <div className="book-section-label">Passenger Details</div>
              <div className="book-fields-grid">
                <div className="book-field">
                  <label htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </div>
                <div className="book-field">
                  <label htmlFor="modal-phone">Phone Number *</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </div>
                <div className="book-field book-field-full">
                  <label htmlFor="modal-email">Email Address *</label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="rahul@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </div>
              </div>

              {/* Number of Passengers */}
              <div className="book-section-label">
                <Users size={14} style={{ display: 'inline', marginRight: 4 }} /> Number of Passengers
              </div>
              <div className="book-passenger-row">
                <button
                  type="button"
                  className="book-count-btn"
                  onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                  disabled={passengers <= 1}
                  aria-label="Decrease passenger count"
                >
                  −
                </button>
                <span className="book-count-num">{passengers}</span>
                <button
                  type="button"
                  className="book-count-btn"
                  onClick={() => setPassengers((p) => Math.min(6, p + 1))}
                  disabled={passengers >= 6}
                  aria-label="Increase passenger count"
                >
                  +
                </button>
                <span className="book-count-hint">Max 6 passengers</span>
              </div>

              {/* Travel Class Selection */}
              <div className="book-section-label">Travel Class</div>
              <div className="book-class-options">
                {availableClasses.map((cls) => {
                  const clsMultiplier = classPriceMultiplier[cls] ?? 1.0;
                  const clsPrice = Math.round(rawBase * clsMultiplier);
                  return (
                    <button
                      key={cls}
                      type="button"
                      className={`book-class-btn ${selectedClass === cls ? 'active' : ''}`}
                      onClick={() => setSelectedClass(cls)}
                    >
                      <span className="book-class-name">{cls}</span>
                      <span className="book-class-price">₹{clsPrice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Add-ons (Optional) */}
              <div className="book-section-label">Add-ons (Optional)</div>
              <div className="book-addons">
                <label className={`addon-card ${addOns.meals ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addOns.meals}
                    onChange={() => toggleAddOn('meals')}
                  />
                  <Utensils size={18} />
                  <span>
                    <strong>Meals on Board</strong>
                    <small>+₹150/person</small>
                  </span>
                </label>
                <label className={`addon-card ${addOns.insurance ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addOns.insurance}
                    onChange={() => toggleAddOn('insurance')}
                  />
                  <ShieldCheck size={18} />
                  <span>
                    <strong>Travel Insurance</strong>
                    <small>+₹99 flat</small>
                  </span>
                </label>
                <label className={`addon-card ${addOns.priority ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={addOns.priority}
                    onChange={() => toggleAddOn('priority')}
                  />
                  <Zap size={18} />
                  <span>
                    <strong>Priority Boarding</strong>
                    <small>+₹50/person</small>
                  </span>
                </label>
              </div>

              {/* Fare Summary */}
              <div className="book-fare-summary">
                <div className="book-fare-row">
                  <span>
                    Base Fare ({passengers} × ₹{basePrice})
                  </span>
                  <span>₹{(basePrice * passengers).toLocaleString('en-IN')}</span>
                </div>
                {addOns.meals && (
                  <div className="book-fare-row">
                    <span>Meals ({passengers} × ₹150)</span>
                    <span>₹{mealsPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {addOns.insurance && (
                  <div className="book-fare-row">
                    <span>Travel Insurance (Flat)</span>
                    <span>₹{insurancePrice}</span>
                  </div>
                )}
                {addOns.priority && (
                  <div className="book-fare-row">
                    <span>Priority Boarding ({passengers} × ₹50)</span>
                    <span>₹{priorityPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="book-fare-row book-fare-total">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Validation error message */}
              {error && (
                <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '10px' }} role="alert">
                  {error}
                </p>
              )}

              {/* Confirmation button */}
              <button
                type="submit"
                className="book-confirm-btn"
                disabled={!name.trim() || !phone.trim() || !email.trim()}
              >
                Confirm Booking → ₹{totalPrice.toLocaleString('en-IN')}
              </button>
            </form>
          </>
        ) : (
          /* Step 2: Booking Confirmation Modal */
          <div className="book-success">
            <div className="book-success-icon">
              <CheckCircle size={54} />
            </div>
            <h2>Booking Confirmed! 🎉</h2>
            <p>
              Your ticket for <strong>{trip.name}</strong> has been booked successfully.
            </p>
            <div className="book-success-details">
              <div className="success-detail-row">
                <span>Route</span>
                <strong>{trip.from} → {trip.to}</strong>
              </div>
              <div className="success-detail-row">
                <span>Passengers</span>
                <strong>{passengers}</strong>
              </div>
              <div className="success-detail-row">
                <span>Class</span>
                <strong>{selectedClass}</strong>
              </div>
              <div className="success-detail-row">
                <span>Name</span>
                <strong>{name}</strong>
              </div>
              <div className="success-detail-row">
                <span>Total Paid</span>
                <strong className="success-price">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
            <p className="book-success-note">
              A confirmation will be sent to <strong>{email}</strong>
            </p>
            <button className="book-confirm-btn" onClick={handleClose}>
              Done ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
