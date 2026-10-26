import { useState } from "react";
import { useSearchContext } from "../context/SearchContext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { saveTrip, removeTrip } from "../redux/travelSlice.js";
import BookingForm from "../components/BookingForm.jsx";
import "../styles/Bus.css";

// ============================================
// DUMMY BUS DATA
// ============================================

const busData = [
  {
    id: 1,
    operator: "Volvo Multi-Axle",
    type: "Sleeper",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "10:00 PM",
    arrivalTime: "05:00 AM",
    durationHours: 7,
    durationLabel: "7h",
    price: 1200,
    seatsAvailable: 18,
    amenities: ["AC", "Sleeper", "WiFi", "Charging"],
    comfortFactors: {
      sleeper: true,
      ac: true,
      wifi: true,
      charging: true,
      seatQuality: 8,
    },
    route: ["Chandigarh", "Karnal", "Panipat", "Delhi"],
  },
  {
    id: 2,
    operator: "Zoom Yatra Express",
    type: "Seater",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "06:30 AM",
    arrivalTime: "12:30 PM",
    durationHours: 6,
    durationLabel: "6h",
    price: 650,
    seatsAvailable: 32,
    amenities: ["AC", "Charging"],
    comfortFactors: {
      sleeper: false,
      ac: true,
      wifi: false,
      charging: true,
      seatQuality: 6,
    },
    route: ["Chandigarh", "Ambala", "Panipat", "Delhi"],
  },
  {
    id: 3,
    operator: "HighwayKing Travels",
    type: "Non-AC",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "11:15 PM",
    arrivalTime: "06:45 AM",
    durationHours: 8,
    durationLabel: "7h 30m",
    price: 500,
    seatsAvailable: 25,
    amenities: ["Charging"],
    comfortFactors: {
      sleeper: false,
      ac: false,
      wifi: false,
      charging: true,
      seatQuality: 4,
    },
    route: ["Chandigarh", "Rajpura", "Karnal", "Delhi"],
  },
  {
    id: 4,
    operator: "SunCruiser Sleeper",
    type: "Sleeper",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "09:00 PM",
    arrivalTime: "03:30 AM",
    durationHours: 6,
    durationLabel: "6h 30m",
    price: 1450,
    seatsAvailable: 10,
    amenities: ["AC", "Sleeper", "WiFi", "Charging"],
    comfortFactors: {
      sleeper: true,
      ac: true,
      wifi: true,
      charging: true,
      seatQuality: 9,
    },
    route: ["Chandigarh", "Panipat", "Sonipat", "Delhi"],
  },
  {
    id: 5,
    operator: "RoadLine Comfort",
    type: "Seater",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "02:00 PM",
    arrivalTime: "08:15 PM",
    durationHours: 6,
    durationLabel: "6h 15m",
    price: 800,
    seatsAvailable: 21,
    amenities: ["AC", "WiFi", "Charging"],
    comfortFactors: {
      sleeper: false,
      ac: true,
      wifi: true,
      charging: true,
      seatQuality: 7,
    },
    route: ["Chandigarh", "Karnal", "Delhi"],
  },
  {
    id: 6,
    operator: "GoSphere Express AC",
    type: "AC",
    from: "Chandigarh",
    to: "Delhi",
    departureTime: "07:45 AM",
    arrivalTime: "01:45 PM",
    durationHours: 6,
    durationLabel: "6h",
    price: 950,
    seatsAvailable: 15,
    amenities: ["AC", "Charging", "WiFi"],
    comfortFactors: {
      sleeper: false,
      ac: true,
      wifi: true,
      charging: true,
      seatQuality: 7,
    },
    route: ["Chandigarh", "Ambala", "Panipat", "Delhi"],
  },
];

// ============================================
// HELPER METHODS
// ============================================

const calculateComfortScore = (factors) => {
  let score = 0;
  if (factors.sleeper) score += 30;
  if (factors.ac) score += 20;
  if (factors.wifi) score += 15;
  if (factors.charging) score += 15;
  score += factors.seatQuality * 2;
  return Math.min(score, 100);
};

const getComfortLevel = (score) => {
  if (score >= 85) return "⭐ Ultimate Luxury";
  if (score >= 70) return "🛋️ High Comfort";
  if (score >= 50) return "✅ Standard Travel";
  return "⚙️ Budget Seating";
};

// ============================================
// SUB-COMPONENTS
// ============================================

function BusHero() {
  return (
    <section className="bus-hero">
      <div className="hero-route-line" aria-hidden="true">
        <span className="route-dot start" />
        <span className="route-line" />
        <span className="route-dot end">🚌</span>
      </div>

      <h1 className="hero-title">Travel by Road. Connect with Ease.</h1>
      <p className="hero-subtitle">
        Find schedules, compare comforts and book luxury coach tickets.
      </p>
      <a href="#bus-search" className="hero-cta">
        Explore Buses 🚌
      </a>
    </section>
  );
}

function BusSearch({ onSearch }) {
  const [fromCity, setFromCity] = useState("Chandigarh");
  const [toCity, setToCity] = useState("Delhi");
  const [date, setDate] = useState("");
  const [busType, setBusType] = useState("All");

  const types = ["All", "Sleeper", "Seater", "AC", "Non-AC"];

  function handleSwap() {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  }

  function handleSearchClick() {
    onSearch({ fromCity, toCity, date, busType });
  }

  return (
    <section id="bus-search" className="section search-section">
      <div className="search-panel glass-card">
        <div className="search-row">
          <div className="field">
            <label>From</label>
            <input
              type="text"
              placeholder="Chandigarh"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
          </div>

          <button className="swap-btn" onClick={handleSwap} title="Swap cities">
            ⇄
          </button>

          <div className="field">
            <label>To</label>
            <input
              type="text"
              placeholder="Delhi"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Travel Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="bus-type-row">
          <span className="bus-type-label">Bus Configuration</span>
          <div className="bus-type-options">
            {types.map((type) => (
              <button
                key={type}
                className={busType === type ? "bus-type-btn selected" : "bus-type-btn"}
                onClick={() => setBusType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button className="search-btn" onClick={handleSearchClick}>
          Search Buses
        </button>
      </div>
    </section>
  );
}

function ComfortMeter({ factors }) {
  const score = calculateComfortScore(factors);
  const comfortLevel = getComfortLevel(score);

  return (
    <div className="comfort-meter">
      <div className="comfort-meter-header">
        <span>GoSphere Comfort Rating</span>
        <span className="comfort-score">{score}/100</span>
      </div>
      <div className="comfort-bar-track">
        <div className="comfort-bar-fill" style={{ width: `${score}%` }}></div>
      </div>
      <span className="comfort-label">{comfortLevel}</span>
    </div>
  );
}

function BusCard({ bus, onViewDetails, onSave, isSaved }) {
  return (
    <div className="bus-card glass-card">
      <div className="bus-card-top">
        <div>
          <h3 className="bus-operator">{bus.operator}</h3>
          <span className="bus-type-tag">{bus.type}</span>
        </div>
        <span className="bus-price">₹{bus.price}</span>
      </div>

      <div className="bus-route-row">
        <div className="route-point">
          <span className="time">{bus.departureTime}</span>
          <span className="city">{bus.from}</span>
        </div>
        <div className="route-visual">
          <span className="duration">{bus.durationLabel}</span>
          <div className="route-divider" />
        </div>
        <div className="route-point" style={{ textAlign: "right", alignItems: "flex-end" }}>
          <span className="time">{bus.arrivalTime}</span>
          <span className="city">{bus.to}</span>
        </div>
      </div>

      <div className="bus-amenities">
        {bus.amenities.map((item) => (
          <span key={item} className="amenity-pill">
            {item}
          </span>
        ))}
      </div>

      <div className="seats-available">🟢 {bus.seatsAvailable} Seats left</div>

      <ComfortMeter factors={bus.comfortFactors} />

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        <button
          type="button"
          className={`btn-save ${isSaved ? "is-saved" : ""}`}
          onClick={() => onSave(bus)}
          title={isSaved ? "Remove from Shortlist" : "Save to Shortlist"}
          style={{ flex: 1 }}
        >
          {isSaved ? "✓ Saved" : "★ Save"}
        </button>
        <button
          className="view-bus-btn"
          onClick={() => onViewDetails(bus)}
          style={{ flex: 2, marginTop: 0 }}
        >
          View & Book →
        </button>
      </div>
    </div>
  );
}

function BusResults({ buses, onViewDetails, onSave, savedTrips }) {
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("best");

  const filterOptions = [
    { key: "all", label: "Show All" },
    { key: "sleeper", label: "Sleeper Only" },
    { key: "ac", label: "AC Coach Only" },
  ];

  const sortOptions = [
    { key: "best", label: "⭐ Best Comfort" },
    { key: "cheap", label: "💰 Low Price" },
    { key: "fast", label: "⚡ Fast Route" },
  ];

  let displayBuses = [...buses];

  if (filterType === "sleeper") {
    displayBuses = displayBuses.filter((b) => b.comfortFactors.sleeper);
  } else if (filterType === "ac") {
    displayBuses = displayBuses.filter((b) => b.comfortFactors.ac);
  }

  if (sortBy === "cheap") {
    displayBuses.sort((a, b) => a.price - b.price);
  } else if (sortBy === "fast") {
    displayBuses.sort((a, b) => a.durationHours - b.durationHours);
  } else {
    displayBuses.sort(
      (a, b) =>
        calculateComfortScore(b.comfortFactors) - calculateComfortScore(a.comfortFactors)
    );
  }

  return (
    <section className="section results-section">
      <div className="results-controls">
        <div>
          <span className="control-label">Filter Out</span>
          <div className="control-options">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                className={filterType === opt.key ? "control-btn selected" : "control-btn"}
                onClick={() => setFilterType(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="control-label">Order By</span>
          <div className="control-options">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                className={sortBy === opt.key ? "control-btn selected" : "control-btn"}
                onClick={() => setSortBy(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {displayBuses.length === 0 ? (
        <div className="no-results">
          <p>No buses found matching your criteria.</p>
        </div>
      ) : (
        <div className="bus-grid">
          {displayBuses.map((bus) => {
            const isSaved = savedTrips.some((item) => item.id === `bus-${bus.id}`);
            return (
              <BusCard
                key={bus.id}
                bus={bus}
                onViewDetails={onViewDetails}
                onSave={onSave}
                isSaved={isSaved}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

function BusDetails({ bus, onClose, onBook }) {
  if (!bus) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h3 className="modal-title">{bus.operator}</h3>
        <span className="bus-type-tag">{bus.type}</span>

        <div className="modal-route">
          <h4 style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 12 }}>
            Boarding & Dropping Points
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {bus.route.map((stop, idx) => (
              <div key={stop} className="route-stop">
                <div>
                  <span className="stop-marker">📍</span>
                  <span className="stop-name">{stop}</span>
                </div>
                {idx < bus.route.length - 1 && <span className="stop-arrow">↓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-info-grid">
          <div className="info-block">
            <span className="info-label">Departure</span>
            <span className="info-value">{bus.departureTime}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Arrival</span>
            <span className="info-value">{bus.arrivalTime}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Duration</span>
            <span className="info-value">{bus.durationLabel}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Fare</span>
            <span className="info-value" style={{ color: "var(--orange)" }}>₹{bus.price}</span>
          </div>
        </div>

        <h4 style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
          Amenities
        </h4>
        <div className="modal-amenities">
          {bus.amenities.map((item) => (
            <span key={item} className="amenity-pill" style={{ color: "var(--text-light)" }}>
              {item}
            </span>
          ))}
        </div>

        <button
          className="search-btn"
          onClick={() => {
            onClose();
            onBook(bus);
          }}
        >
          Book Seats Now →
        </button>
      </div>
    </div>
  );
}

function BusBenefits() {
  const benefits = [
    {
      icon: "🛣️",
      title: "Flexible Routes",
      desc: "Connect directly to local bus stands and terminal hubs.",
    },
    {
      icon: "💺",
      title: "Full Recliners",
      desc: "Opt for sleeper or semi-sleeper layouts for comfortable long trips.",
    },
    {
      icon: "🍵",
      title: "Pit Stops included",
      desc: "Stop for refreshments at trusted local diners.",
    },
  ];

  return (
    <section className="section benefits-section">
      <h2 className="section-heading">Road Travel Redefined</h2>
      <p className="section-subheading">Choose GoSphere for reliable intercity coach journeys.</p>

      <div className="benefits-grid">
        {benefits.map((b) => (
          <div className="benefit-card glass-card" key={b.title}>
            <span className="benefit-icon">{b.icon}</span>
            <h3 className="benefit-title">{b.title}</h3>
            <p className="benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE EXPORT
// ============================================

export default function Bus() {
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedBusType, setSelectedBusType] = useState("All");
  const [bookingTrip, setBookingTrip] = useState(null);

  // Redux Toolkit hooks
  const dispatch = useDispatch();
  const savedTrips = useSelector((state) => state.travel.savedTrips);

  // Shared search context — stores the latest bus search
  const { setLatestBusSearch } = useSearchContext();

  const handleSearch = (searchValues) => {
    setLatestBusSearch(searchValues);
    setSelectedBusType(searchValues.busType);
    setHasSearched(true);
  };

  // Toggle saving bus journey in Redux store
  const handleSave = (bus) => {
    const tripId = `bus-${bus.id}`;
    const alreadySaved = savedTrips.some((t) => t.id === tripId);
    if (alreadySaved) {
      dispatch(removeTrip(tripId));
    } else {
      dispatch(
        saveTrip({
          id: tripId,
          name: `${bus.operator} (${bus.type})`,
          mode: "Bus",
          from: bus.from,
          to: bus.to,
          price: bus.price,
          icon: "🚌",
        })
      );
    }
  };

  const handleBook = (bus) => {
    setBookingTrip({
      name: `${bus.operator} (${bus.type})`,
      mode: "Bus",
      from: bus.from,
      to: bus.to,
      price: bus.price,
    });
  };

  const busesToShow =
    selectedBusType === "All"
      ? busData
      : busData.filter((bus) => bus.type === selectedBusType);

  return (
    <div className="bus-page">
      <BusHero />
      <BusSearch onSearch={handleSearch} />

      {hasSearched && (
        <BusResults
          buses={busesToShow}
          onViewDetails={setSelectedBus}
          onSave={handleSave}
          savedTrips={savedTrips}
        />
      )}

      <BusBenefits />

      {selectedBus && (
        <BusDetails
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
          onBook={handleBook}
        />
      )}

      {/* Controlled booking form modal */}
      <BookingForm
        trip={bookingTrip}
        isOpen={Boolean(bookingTrip)}
        onClose={() => setBookingTrip(null)}
      />
    </div>
  );
}