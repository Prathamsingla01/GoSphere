import { useState } from "react";
import {
  Train as TrainIcon,
  MapPin,
  Calendar,
  ArrowLeftRight,
  Search,
  Zap,
  Wallet,
  Smile,
  Leaf,
  X,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import "../styles/Train.css";

// ============================================
// DUMMY TRAIN DATA
// ============================================

const trainsData = [
  {
    id: 1,
    name: "Vande Bharat Express",
    number: "22439",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "06:00 AM",
    arrTime: "09:20 AM",
    durationLabel: "3h 20m",
    durationMinutes: 200,
    price: 850,
    classes: ["Executive Chair Car", "AC Chair Car"],
    score: { overall: 94, speed: 96, value: 82, comfort: 95, eco: 90 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "06:00 AM", gap: null },
      { station: "Ambala Cantt", time: "07:10 AM", gap: "1h 10m" },
      { station: "Chandigarh", time: "09:20 AM", gap: "2h 10m" },
    ],
  },
  {
    id: 2,
    name: "Shatabdi Express",
    number: "12005",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "07:40 AM",
    arrTime: "10:45 AM",
    durationLabel: "3h 05m",
    durationMinutes: 185,
    price: 720,
    classes: ["AC Chair Car", "Executive Chair Car"],
    score: { overall: 89, speed: 88, value: 85, comfort: 88, eco: 84 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food"],
    stops: [
      { station: "Delhi", time: "07:40 AM", gap: null },
      { station: "Ambala Cantt", time: "08:55 AM", gap: "1h 15m" },
      { station: "Chandigarh", time: "10:45 AM", gap: "1h 50m" },
    ],
  },
  {
    id: 3,
    name: "Kalka Shatabdi",
    number: "12011",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "07:20 AM",
    arrTime: "10:35 AM",
    durationLabel: "3h 15m",
    durationMinutes: 195,
    price: 690,
    classes: ["AC Chair Car", "Executive Chair Car"],
    score: { overall: 86, speed: 85, value: 80, comfort: 87, eco: 85 },
    facilities: ["❄️ AC", "🔌 Charging", "🍽️ Food"],
    stops: [
      { station: "Delhi", time: "07:20 AM", gap: null },
      { station: "Ambala Cantt", time: "08:40 AM", gap: "1h 20m" },
      { station: "Chandigarh", time: "10:35 AM", gap: "1h 55m" },
    ],
  },
  {
    id: 4,
    name: "Shan-e-Punjab Express",
    number: "12497",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "06:50 AM",
    arrTime: "10:30 AM",
    durationLabel: "3h 40m",
    durationMinutes: 220,
    price: 480,
    classes: ["AC 2 Tier", "AC 3 Tier", "Sleeper"],
    score: { overall: 78, speed: 80, value: 88, comfort: 75, eco: 82 },
    facilities: ["❄️ AC", "🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "06:50 AM", gap: null },
      { station: "Ambala Cantt", time: "08:30 AM", gap: "1h 40m" },
      { station: "Chandigarh", time: "10:30 AM", gap: "2h 00m" },
    ],
  },
  {
    id: 5,
    name: "Jan Shatabdi Express",
    number: "12046",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "05:15 AM",
    arrTime: "08:50 AM",
    durationLabel: "3h 35m",
    durationMinutes: 215,
    price: 410,
    classes: ["AC Chair Car", "Second Sitting"],
    score: { overall: 74, speed: 78, value: 90, comfort: 68, eco: 80 },
    facilities: ["🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "05:15 AM", gap: null },
      { station: "Ambala Cantt", time: "06:45 AM", gap: "1h 30m" },
      { station: "Chandigarh", time: "08:50 AM", gap: "2h 05m" },
    ],
  },
  {
    id: 6,
    name: "Himalayan Queen",
    number: "14095",
    from: "Delhi",
    to: "Chandigarh",
    depTime: "05:55 AM",
    arrTime: "12:15 PM",
    durationLabel: "6h 20m",
    durationMinutes: 380,
    price: 320,
    classes: ["AC 3 Tier", "Sleeper", "General"],
    score: { overall: 68, speed: 55, value: 92, comfort: 60, eco: 88 },
    facilities: ["🔌 Charging", "🪑 Comfortable Seating"],
    stops: [
      { station: "Delhi", time: "05:55 AM", gap: null },
      { station: "Ambala Cantt", time: "08:20 AM", gap: "2h 25m" },
      { station: "Chandigarh", time: "12:15 PM", gap: "3h 55m" },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function sortTrains(list, sortBy) {
  const copy = [...list];
  if (sortBy === "fastest") {
    copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else if (sortBy === "cheapest") {
    copy.sort((a, b) => a.price - b.price);
  } else {
    copy.sort((a, b) => b.score.overall - a.score.overall);
  }
  return copy;
}

// ============================================
// COMPONENT PARTS
// ============================================

function TrainHero() {
  return (
    <section className="hero">
      <div className="hero-rail-art" aria-hidden="true">
        <div className="rail-track" />
        <div className="rail-track rail-track-2" />
        <span className="station-dot dot-1" />
        <span className="station-dot dot-2" />
        <span className="station-dot dot-3" />
        <span className="station-dot dot-4" />
        <div className="moving-train">
          <TrainIcon size={22} />
        </div>
      </div>

      <div className="hero-content">
        <span className="eyebrow">
          <TrainIcon size={14} style={{ display: 'inline', marginRight: 4, transform: 'translateY(1px)' }} /> GoSphere &middot; Train Travel
        </span>
        <h1>Your Journey Begins on the Right Track.</h1>
        <p>
          Explore train journeys, compare travel options and find the route
          that fits you best.
        </p>
      </div>
    </section>
  );
}

function TrainSearch({ onSearch }) {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Chandigarh");
  const [date, setDate] = useState("");

  function handleSwap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  function handleSearchClick() {
    onSearch();
  }

  return (
    <section className="search-section">
      <div className="search-card">
        <div className="ticket-strip">
          <span>BOARDING PASS</span>
          <span>GOSPHERE RAIL</span>
        </div>

        <div className="search-fields">
          <div className="field">
            <label>From</label>
            <div className="field-input">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Delhi"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          </div>

          <button className="swap-btn" onClick={handleSwap} title="Swap stations">
            <ArrowLeftRight size={18} />
          </button>

          <div className="field">
            <label>To</label>
            <div className="field-input">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Chandigarh"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Journey Date</label>
            <div className="field-input">
              <Calendar size={16} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <button className="search-btn" onClick={handleSearchClick}>
            <Search size={18} /> Search Trains 🚆
          </button>
        </div>
      </div>
    </section>
  );
}

function TravelScore({ score }) {
  const factors = [
    { key: "speed", label: "⚡ Speed", value: score.speed },
    { key: "value", label: "💰 Value", value: score.value },
    { key: "comfort", label: "😌 Comfort", value: score.comfort },
    { key: "eco", label: "🌱 Eco-Friendly", value: score.eco },
  ];

  return (
    <div className="travel-score">
      <div className="score-circle">
        <span className="score-number">{score.overall}</span>
        <span className="score-max">/100</span>
      </div>
      <div className="score-bars">
        {factors.map((factor) => (
          <div className="score-row" key={factor.key}>
            <span className="score-label">{factor.label}</span>
            <div className="score-track">
              <div
                className="score-fill"
                style={{ width: factor.value + "%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainCard({ train, onViewJourney }) {
  return (
    <div className="train-card">
      <div className="train-card-top">
        <div>
          <h3>{train.name}</h3>
          <span className="train-number">Train No. {train.number}</span>
        </div>
        <span className="score-pill">
          <Star size={14} /> {train.score.overall}/100
        </span>
      </div>

      <div className="route-row">
        <div className="route-point">
          <span className="time">{train.depTime}</span>
          <span className="station">{train.from}</span>
        </div>
        <div className="route-line-mini">
          <Clock size={14} />
          <span>{train.durationLabel}</span>
        </div>
        <div className="route-point align-right">
          <span className="time">{train.arrTime}</span>
          <span className="station">{train.to}</span>
        </div>
      </div>

      <div className="train-card-bottom">
        <div className="price-classes">
          <span className="price">💰 Starting ₹{train.price}</span>
          <span className="classes">{train.classes.join(" · ")}</span>
        </div>
        <TravelScore score={train.score} />
      </div>

      <button className="view-journey-btn" onClick={() => onViewJourney(train)}>
        View Journey <ChevronRight size={16} />
      </button>
    </div>
  );
}

function SortBar({ sortBy, onSortChange }) {
  const options = [
    { key: "best", label: "⭐ Best Overall" },
    { key: "fastest", label: "⚡ Fastest" },
    { key: "cheapest", label: "💰 Cheapest" },
  ];

  return (
    <div className="sort-bar">
      {options.map((option) => (
        <button
          key={option.key}
          className={sortBy === option.key ? "sort-btn active" : "sort-btn"}
          onClick={() => onSortChange(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function TrainResults({ trains, sortBy, onSortChange, onViewJourney }) {
  const sortedTrains = sortTrains(trains, sortBy);

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>Trains from Delhi to Chandigarh</h2>
        <SortBar sortBy={sortBy} onSortChange={onSortChange} />
      </div>

      <div className="train-list">
        {sortedTrains.map((train) => (
          <TrainCard key={train.id} train={train} onViewJourney={onViewJourney} />
        ))}
      </div>
    </section>
  );
}

function JourneyModal({ train, onClose }) {
  if (!train) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h3>{train.name}</h3>
        <span className="train-number">Train No. {train.number}</span>

        <div className="timeline">
          {train.stops.map((stop) => (
            <div className="timeline-row" key={stop.station}>
              {stop.gap && <div className="timeline-gap">{stop.gap}</div>}
              <div className="timeline-point">
                <span className="timeline-dot" />
                <div className="timeline-text">
                  <span className="timeline-station">{stop.station}</span>
                  <span className="timeline-time">{stop.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-section">
          <h4>Total Duration</h4>
          <p>{train.durationLabel}</p>
        </div>

        <div className="modal-section">
          <h4>Travel Classes</h4>
          <div className="chip-row">
            {train.classes.map((cls) => (
              <span className="chip" key={cls}>
                {cls}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-section">
          <h4>Facilities Onboard</h4>
          <div className="chip-row">
            {train.facilities.map((facility) => (
              <span className="chip chip-facility" key={facility}>
                {facility}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainBenefits() {
  const benefits = [
    {
      icon: <Leaf size={22} />,
      title: "🌱 Eco-Friendly",
      text: "A more sustainable way to travel.",
    },
    {
      icon: <Smile size={22} />,
      title: "🛋️ Comfortable",
      text: "Relax and enjoy the journey.",
    },
    {
      icon: <Wallet size={22} />,
      title: "💰 Great Value",
      text: "A balanced combination of cost and convenience.",
    },
  ];

  return (
    <section className="benefits-section">
      <h2>Why Travel by Train?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// EXPORTED COMPONENT
// ============================================

export default function Train() {
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState("best");
  const [selectedTrain, setSelectedTrain] = useState(null);

  function handleSearch() {
    setSearched(true);
  }

  function handleViewJourney(train) {
    setSelectedTrain(train);
  }

  function handleCloseModal() {
    setSelectedTrain(null);
  }

  return (
    <div className="train-page">
      <TrainHero />
      <TrainSearch onSearch={handleSearch} />

      {searched && (
        <TrainResults
          trains={trainsData}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onViewJourney={handleViewJourney}
        />
      )}

      <TrainBenefits />

      <JourneyModal train={selectedTrain} onClose={handleCloseModal} />
    </div>
  );
}