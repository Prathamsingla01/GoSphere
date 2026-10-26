import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveTrip, removeTrip } from '../redux/travelSlice.js';
import BookingForm from '../components/BookingForm.jsx';
import '../styles/Flight.css';

// ============================================
// DUMMY FLIGHT DATA
// ============================================

const flightData = [
  {
    id: 1,
    airline: 'IndiGo',
    flightNumber: '6E 234',
    from: 'Delhi',
    fromCode: 'DEL',
    to: 'Mumbai',
    toCode: 'BOM',
    departureTime: '08:30 AM',
    departureHour: 8,
    arrivalTime: '10:40 AM',
    duration: '2h 10m',
    durationMins: 130,
    stops: 0,
    travelClass: 'Economy',
    price: 4299,
    amenities: ['📶 Entertainment', '🍽️ Meals', '🔌 Charging', '🧳 Cabin Baggage'],
  },
  {
    id: 2,
    airline: 'Air India',
    flightNumber: 'AI 101',
    from: 'Delhi',
    fromCode: 'DEL',
    to: 'Bangalore',
    toCode: 'BLR',
    departureTime: '06:15 AM',
    departureHour: 6,
    arrivalTime: '09:00 AM',
    duration: '2h 45m',
    durationMins: 165,
    stops: 0,
    travelClass: 'Business',
    price: 8999,
    amenities: ['📶 Entertainment', '🍽️ Meals', '🔌 Charging', '🛋️ Lounge Access'],
  },
  {
    id: 3,
    airline: 'Vistara',
    flightNumber: 'UK 955',
    from: 'Mumbai',
    fromCode: 'BOM',
    to: 'Goa',
    toCode: 'GOA',
    departureTime: '07:10 AM',
    departureHour: 7,
    arrivalTime: '08:35 AM',
    duration: '1h 25m',
    durationMins: 85,
    stops: 0,
    travelClass: 'Economy',
    price: 2599,
    amenities: ['🍽️ Meals', '🔌 Charging', '🧳 Cabin Baggage'],
  },
  {
    id: 4,
    airline: 'SpiceJet',
    flightNumber: 'SG 442',
    from: 'Bangalore',
    fromCode: 'BLR',
    to: 'Hyderabad',
    toCode: 'HYD',
    departureTime: '09:15 PM',
    departureHour: 21,
    arrivalTime: '10:35 PM',
    duration: '1h 20m',
    durationMins: 80,
    stops: 0,
    travelClass: 'Economy',
    price: 2799,
    amenities: ['🔌 Charging', '🧳 Cabin Baggage'],
  },
  {
    id: 5,
    airline: 'Akasa Air',
    flightNumber: 'QP 1301',
    from: 'Delhi',
    fromCode: 'DEL',
    to: 'Goa',
    toCode: 'GOA',
    departureTime: '11:40 AM',
    departureHour: 11,
    arrivalTime: '02:20 PM',
    duration: '2h 40m',
    durationMins: 160,
    stops: 1,
    travelClass: 'Economy',
    price: 4499,
    amenities: ['📶 Entertainment', '🍽️ Meals', '🧳 Cabin Baggage'],
  },
  {
    id: 6,
    airline: 'Air India',
    flightNumber: 'AI 202',
    from: 'Chennai',
    fromCode: 'MAA',
    to: 'Delhi',
    toCode: 'DEL',
    departureTime: '05:50 AM',
    departureHour: 5,
    arrivalTime: '08:35 AM',
    duration: '2h 45m',
    durationMins: 165,
    stops: 0,
    travelClass: 'Business',
    price: 9499,
    amenities: ['📶 Entertainment', '🍽️ Meals', '🔌 Charging', '🛋️ Lounge Access'],
  },
];

// ============================================
// HELPER PARTS
// ============================================

function PassengerSelector({ adults, onIncrement, onDecrement }) {
  return (
    <div className="passenger-selector">
      <button
        type="button"
        className="passenger-btn"
        onClick={onDecrement}
        disabled={adults <= 1}
      >
        −
      </button>
      <span className="passenger-count">{adults}</span>
      <button
        type="button"
        className="passenger-btn"
        onClick={onIncrement}
        disabled={adults >= 6}
      >
        +
      </button>
    </div>
  );
}

function FlightHero() {
  return (
    <section className="flight-hero">
      <div className="cloud-field" aria-hidden="true">
        <div className="cloud-blob one"></div>
        <div className="cloud-blob two"></div>
        <div className="cloud-blob three"></div>
      </div>

      <div className="container flight-hero-inner">
        <span className="section-eyebrow">GoSphere · Flights</span>
        <h1 className="flight-hero-title">The World Is Closer Than You Think.</h1>
        <p className="flight-hero-subtitle">
          Explore faster journeys and discover the best way to reach your
          destination.
        </p>
        <a href="#flight-search" className="btn btn-primary flight-hero-cta">
          Explore Flights ✈️
        </a>
      </div>

      <div className="flight-path" aria-hidden="true">
        <svg className="flight-path-line" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path
            d="M 0 100 Q 500 -40 1000 100"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="2"
            strokeDasharray="10 12"
          />
          <defs>
            <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--sky-purple-soft)" />
              <stop offset="100%" stopColor="var(--sky-blue-soft)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flight-path-plane">✈️</div>
      </div>
    </section>
  );
}

function FlightSearch({ onSearch }) {
  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [toCity, setToCity] = useState('Mumbai (BOM)');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  function handleSwap() {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSearch({ fromCity, toCity, date, adults, travelClass });
  }

  return (
    <section id="flight-search" className="flight-search-section">
      <div className="container">
        <form className="flight-search-card glass-card" onSubmit={handleSubmit}>
          <div className="search-row">
            <div className="search-field">
              <label>From</label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                placeholder="Delhi (DEL)"
              />
            </div>

            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              aria-label="Swap cities"
            >
              ⇄
            </button>

            <div className="search-field">
              <label>To</label>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                placeholder="Mumbai (BOM)"
              />
            </div>
          </div>

          <div className="search-row search-row-secondary">
            <div className="search-field">
              <label>Departure Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="search-field">
              <label>Passengers</label>
              <PassengerSelector
                adults={adults}
                onIncrement={() => setAdults((a) => Math.min(a + 1, 6))}
                onDecrement={() => setAdults((a) => Math.max(a - 1, 1))}
              />
            </div>

            <div className="search-field">
              <label>Travel Class</label>
              <div className="class-toggle">
                <button
                  type="button"
                  className={travelClass === 'Economy' ? 'btn btn-outline active' : 'btn btn-outline'}
                  onClick={() => setTravelClass('Economy')}
                >
                  Economy
                </button>
                <button
                  type="button"
                  className={travelClass === 'Business' ? 'btn btn-outline active' : 'btn btn-outline'}
                  onClick={() => setTravelClass('Business')}
                >
                  Business
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary search-submit">
            Search Flights
          </button>
        </form>
      </div>
    </section>
  );
}

function FlightCard({ flight, badges, onViewDetails, onSave, isSaved }) {
  const stopsLabel = flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;

  return (
    <div className="flight-card glass-card">
      {badges.length > 0 && (
        <div className="flight-card-badges">
          {badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="flight-card-top">
        <div className="flight-card-airline">
          <div className="airline-icon">✈️</div>
          <div>
            <div className="airline-name">{flight.airline}</div>
            <div className="airline-number">{flight.flightNumber}</div>
          </div>
        </div>
        <div className="flight-card-class">{flight.travelClass}</div>
      </div>

      <div className="flight-card-route">
        <div className="route-point">
          <div className="route-time">{flight.departureTime}</div>
          <div className="route-city">{flight.fromCode}</div>
        </div>

        <div className="route-middle">
          <div className="route-duration">⏱ {flight.duration}</div>
          <div className="route-track">
            <span className="route-dot"></span>
            <span className="route-dash"></span>
            <span className="route-plane">✈️</span>
            <span className="route-dash"></span>
            <span className="route-dot"></span>
          </div>
          <div className="route-stops">{stopsLabel}</div>
        </div>

        <div className="route-point">
          <div className="route-time">{flight.arrivalTime}</div>
          <div className="route-city">{flight.toCode}</div>
        </div>
      </div>

      <div className="flight-card-bottom">
        <div className="flight-price">💰 ₹{flight.price.toLocaleString('en-IN')}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className={`btn-save ${isSaved ? 'is-saved' : ''}`}
            onClick={() => onSave(flight)}
            title={isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}
          >
            {isSaved ? '✓ Saved' : '★ Save'}
          </button>
          <button className="btn btn-primary" onClick={() => onViewDetails(flight)}>
            View Flight →
          </button>
        </div>
      </div>
    </div>
  );
}

function FlightDetails({ flight, onClose, onBook }) {
  const stopsLabel = flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;

  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-modal glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="details-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="details-header">
          <div className="airline-icon">✈️</div>
          <div>
            <div className="airline-name">{flight.airline}</div>
            <div className="airline-number">{flight.flightNumber}</div>
          </div>
        </div>

        <div className="vertical-route">
          <div className="vertical-point">
            <div className="vertical-icon">🛫</div>
            <div>
              <div className="vertical-code">{flight.fromCode}</div>
              <div className="vertical-city">{flight.from}</div>
              <div className="vertical-time">{flight.departureTime}</div>
            </div>
          </div>

          <div className="vertical-connector">
            <span className="vertical-line"></span>
            <span className="vertical-duration">⏱ {flight.duration}</span>
            <span className="vertical-line"></span>
          </div>

          <div className="vertical-point">
            <div className="vertical-icon">🛬</div>
            <div>
              <div className="vertical-code">{flight.toCode}</div>
              <div className="vertical-city">{flight.to}</div>
              <div className="vertical-time">{flight.arrivalTime}</div>
            </div>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <div className="details-label">Airline</div>
            <div className="details-value">{flight.airline}</div>
          </div>
          <div>
            <div className="details-label">Flight No.</div>
            <div className="details-value">{flight.flightNumber}</div>
          </div>
          <div>
            <div className="details-label">Stops</div>
            <div className="details-value">{stopsLabel}</div>
          </div>
          <div>
            <div className="details-label">Class</div>
            <div className="details-value">{flight.travelClass}</div>
          </div>
        </div>

        <div className="details-amenities">
          <div className="details-label">Amenities</div>
          <div className="amenities-list">
            {flight.amenities.map((item) => (
              <span key={item} className="amenity-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="details-footer">
          <div className="flight-price">💰 ₹{flight.price.toLocaleString('en-IN')}</div>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onBook(flight);
            }}
          >
            Book This Flight →
          </button>
        </div>
      </div>
    </div>
  );
}

function FlightBenefits() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Save Time',
      description: 'Reach distant destinations faster.',
    },
    {
      icon: '🌍',
      title: 'Go Further',
      description: 'Connect cities and countries.',
    },
    {
      icon: '⭐',
      title: 'Travel Comfortably',
      description: 'Choose an experience that fits your journey.',
    },
  ];

  return (
    <section className="flight-benefits-section">
      <div className="container">
        <div className="benefits-heading">
          <span className="section-eyebrow">The GoSphere Difference</span>
          <h2 className="section-title">Designed for Every Journey</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <div className="benefit-card glass-card" key={benefit.title}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlightResults({ tripInfo, onSave, onBook, savedTrips }) {
  const [sortBy, setSortBy] = useState('default');
  const [selectedFlight, setSelectedFlight] = useState(null);

  const cheapestFlight = flightData.reduce((a, b) => (b.price < a.price ? b : a));
  const fastestFlight = flightData.reduce((a, b) => (b.durationMins < a.durationMins ? b : a));
  const bestValueFlight = flightData.reduce((a, b) =>
    b.price / b.durationMins < a.price / a.durationMins ? b : a
  );

  function getBadges(flight) {
    const badges = [];
    if (flight.id === fastestFlight.id) badges.push('⚡ Fastest Flight');
    if (flight.id === cheapestFlight.id) badges.push('💰 Best Price');
    if (flight.id === bestValueFlight.id) badges.push('⭐ Best Value');
    if (flight.departureHour >= 5 && flight.departureHour < 11) badges.push('🌅 Morning Choice');
    return badges;
  }

  const sortedFlights = [...flightData].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'fastest') return a.durationMins - b.durationMins;
    if (sortBy === 'value') return a.price / a.durationMins - b.price / b.durationMins;
    return 0;
  });

  return (
    <section className="flight-results-section">
      <div className="container">
        <div className="results-header">
          <div>
            <h2 className="section-title">
              Flights from {tripInfo.fromCity} to {tripInfo.toCity}
            </h2>
            <p>
              {tripInfo.date || 'Any date'} · {tripInfo.adults} passenger
              {tripInfo.adults > 1 ? 's' : ''} · {tripInfo.travelClass}
            </p>
          </div>

          <div className="sort-buttons">
            <button
              className={sortBy === 'cheapest' ? 'btn btn-outline active' : 'btn btn-outline'}
              onClick={() => setSortBy('cheapest')}
            >
              💰 Cheapest
            </button>
            <button
              className={sortBy === 'fastest' ? 'btn btn-outline active' : 'btn btn-outline'}
              onClick={() => setSortBy('fastest')}
            >
              ⚡ Fastest
            </button>
            <button
              className={sortBy === 'value' ? 'btn btn-outline active' : 'btn btn-outline'}
              onClick={() => setSortBy('value')}
            >
              ⭐ Best Value
            </button>
          </div>
        </div>

        <div className="flight-results-grid">
          {sortedFlights.map((flight) => {
            const isSaved = savedTrips.some((item) => item.id === `flight-${flight.id}`);
            return (
              <FlightCard
                key={flight.id}
                flight={flight}
                badges={getBadges(flight)}
                onViewDetails={setSelectedFlight}
                onSave={onSave}
                isSaved={isSaved}
              />
            );
          })}
        </div>
      </div>

      {selectedFlight && (
        <FlightDetails
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onBook={onBook}
        />
      )}
    </section>
  );
}

// ============================================
// MAIN PAGE EXPORT
// ============================================

export default function Flight() {
  const [hasSearched, setHasSearched] = useState(false);
  const [tripInfo, setTripInfo] = useState(null);
  const [bookingTrip, setBookingTrip] = useState(null);

  // Redux Toolkit hooks
  const dispatch = useDispatch();
  const savedTrips = useSelector((state) => state.travel.savedTrips);

  function handleSearch(searchDetails) {
    setTripInfo(searchDetails);
    setHasSearched(true);
  }

  // Toggle saving flight in Redux store
  function handleSave(flight) {
    const tripId = `flight-${flight.id}`;
    const alreadySaved = savedTrips.some((t) => t.id === tripId);
    if (alreadySaved) {
      dispatch(removeTrip(tripId));
    } else {
      dispatch(
        saveTrip({
          id: tripId,
          name: `${flight.airline} (${flight.flightNumber})`,
          mode: 'Flight',
          from: flight.from,
          to: flight.to,
          price: flight.price,
          icon: '✈️',
        })
      );
    }
  }

  function handleBook(flight) {
    setBookingTrip({
      name: `${flight.airline} (${flight.flightNumber})`,
      mode: 'Flight',
      from: flight.from,
      to: flight.to,
      price: flight.price,
    });
  }

  return (
    <div className="flight-page">
      <FlightHero />
      <FlightSearch onSearch={handleSearch} />

      {hasSearched && (
        <FlightResults
          tripInfo={tripInfo}
          onSave={handleSave}
          onBook={handleBook}
          savedTrips={savedTrips}
        />
      )}

      <FlightBenefits />

      {/* Controlled booking form modal */}
      <BookingForm
        trip={bookingTrip}
        isOpen={Boolean(bookingTrip)}
        onClose={() => setBookingTrip(null)}
      />
    </div>
  );
}