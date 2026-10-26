import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../context/SearchContext.jsx'
import '../styles/Home.css'

// ============================================
// DUMMY DATA FOR MODES & RECOMMENDATIONS
// ============================================

const modes = [
  {
    id: 'trains',
    icon: '🚆',
    title: 'Trains',
    description: 'Explore railway journeys, routes, schedules and travel options.',
    buttonLabel: 'Explore Trains',
    accent: 'accent-train',
    to: '/train',
  },
  {
    id: 'flights',
    icon: 'flights',
    title: 'Flights',
    description: 'Discover faster ways to reach your destination.',
    buttonLabel: 'Explore Flights',
    accent: 'accent-flight',
    to: '/flight',
  },
  {
    id: 'buses',
    icon: '🚌',
    title: 'Buses',
    description: 'Find comfortable and flexible road journeys.',
    buttonLabel: 'Explore Buses',
    accent: 'accent-bus',
    to: '/bus',
  },
]

const priorities = [
  { key: 'money', label: 'Save Money', icon: '💰' },
  { key: 'time', label: 'Save Time', icon: '⚡' },
  { key: 'comfort', label: 'Comfort', icon: '😌' },
  { key: 'balance', label: 'Best Balance', icon: '⚖️' },
]

const recommendations = {
  money: {
    icon: '🚌',
    mode: 'Bus',
    reason: "The most budget-friendly way to get where you're going.",
    to: '/bus',
    accent: 'rec-bus',
  },
  time: {
    icon: '✈️',
    mode: 'Flight',
    reason: 'The fastest option when every hour counts.',
    to: '/flight',
    accent: 'rec-flight',
  },
  comfort: {
    icon: '✈️',
    mode: 'Flight or Premium Train',
    reason: 'Relax and enjoy the ride with extra legroom and fewer stops.',
    to: '/flight',
    accent: 'rec-flight',
  },
  balance: {
    icon: '🚆',
    mode: 'Train',
    reason: 'The best balance of comfort, travel time and value.',
    to: '/train',
    accent: 'rec-train',
  },
}

const features = [
  {
    icon: '🌐',
    title: 'One Platform',
    description: 'Explore multiple travel options from one place.',
  },
  {
    icon: '⚡',
    title: 'Easy Comparison',
    description: 'Quickly understand different ways to travel.',
  },
  {
    icon: '🎯',
    title: 'Travel Your Way',
    description: 'Choose options based on your personal travel priorities.',
  },
]

// ============================================
// HELPER SUB-COMPONENTS
// ============================================

function Hero() {
  function scrollToModes() {
    const section = document.getElementById('travel-modes')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="eyebrow">✦ Smart travel, simplified</span>
          <h1 className="hero-heading">Where Will Your Journey Take You?</h1>
          <p className="hero-sub">
            Compare and explore different ways to travel — all in one place.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToModes}>
              Start Exploring <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-glow"></div>
          <svg viewBox="0 0 480 420" className="route-svg">
            <path
              className="route-path route-path-train"
              d="M40 340 C 120 300, 140 220, 220 200"
            />
            <path
              className="route-path route-path-flight"
              d="M220 200 C 280 170, 300 90, 400 60"
            />
            <path
              className="route-path route-path-bus"
              d="M220 200 C 180 260, 160 320, 90 360"
            />

            <circle className="route-node node-origin" cx="40" cy="340" r="7" />
            <circle className="route-node node-hub" cx="220" cy="200" r="9" />
            <circle className="route-node node-flight" cx="400" cy="60" r="7" />
            <circle className="route-node node-bus" cx="90" cy="360" r="7" />
          </svg>

          <div className="hero-badge badge-train">🚆 Train</div>
          <div className="hero-badge badge-flight">✈️ Flight</div>
          <div className="hero-badge badge-bus">🚌 Bus</div>
        </div>
      </div>
    </section>
  )
}

function TravelCard({ icon, title, description, buttonLabel, accent, to, id }) {
  return (
    <Link id={id} to={to} className={`travel-card glass-card ${accent}`}>
      <div className="travel-card-icon">
        {icon === 'flights' ? '✈️' : icon}
      </div>
      <h3 className="travel-card-title">{title}</h3>
      <p className="travel-card-desc">{description}</p>
      <span className="travel-card-btn">
        {buttonLabel} <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

function TravelModes() {
  return (
    <section className="section travel-modes" id="travel-modes">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">✦ Choose your way to go</span>
          <h2 className="section-heading">Three ways to travel, one platform</h2>
          <p className="section-sub" style={{ textAlign: 'center' }}>
            Every journey starts with a choice. Compare trains, flights and buses
            side by side before you commit.
          </p>
        </div>

        <div className="travel-modes-grid">
          {modes.map((mode) => (
            <TravelCard key={mode.title} {...mode} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TravelAssistant() {
  const [selected, setSelected] = useState(null)
  const recommendation = selected ? recommendations[selected] : null

  return (
    <section className="section travel-assistant">
      <div className="container assistant-inner">
        <div className="section-head">
          <span className="eyebrow">🤔 Not Sure How to Travel?</span>
          <h2 className="section-heading">Tell us what matters most</h2>
          <p className="section-sub" style={{ textAlign: 'center' }}>
            Pick a priority and GoSphere will point you to the best way to travel.
          </p>
        </div>

        <div className="priority-options">
          {priorities.map((option) => (
            <button
              key={option.key}
              className={`priority-btn ${selected === option.key ? 'is-selected' : ''}`}
              onClick={() => setSelected(option.key)}
            >
              <span className="priority-icon">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {recommendation && (
          <div className={`recommendation-card glass-card ${recommendation.accent}`}>
            <span className="recommendation-label">GoSphere Recommends</span>
            <div className="recommendation-mode">
              <span className="recommendation-icon">{recommendation.icon}</span>
              <h3>{recommendation.mode}</h3>
            </div>
            <p className="recommendation-reason">{recommendation.reason}</p>
            <Link to={recommendation.to} className="btn-primary">
              Explore This Option <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function WhyGoSphere() {
  return (
    <section className="section why-gosphere">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">✦ Why GoSphere</span>
          <h2 className="section-heading">Built to make travel simple</h2>
        </div>

        <div className="why-grid">
          {features.map((feature) => (
            <div key={feature.title} className="why-card glass-card">
              <div className="why-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// RECENT SEARCHES COMPONENTS (Evaluation 2)
// ============================================

function RecentTrainSearch() {
  const { latestSearch } = useSearchContext();

  if (!latestSearch) return null;

  return (
    <section className="section recent-search-section">
      <div className="container">
        <div className="recent-search-card recent-train">
          <div className="recent-search-icon" aria-hidden="true">🚆</div>
          <div className="recent-search-copy">
            <span className="eyebrow">YOUR RECENT TRAIN SEARCH</span>
            <h2>{latestSearch.from} <span aria-hidden="true">→</span> {latestSearch.to}</h2>
            <p>Journey date: {latestSearch.date}</p>
          </div>
          <Link className="btn-primary recent-search-button" to="/train">
            Search Again <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecentFlightSearch() {
  const { latestFlightSearch } = useSearchContext();

  if (!latestFlightSearch) return null;

  return (
    <section className="section recent-search-section">
      <div className="container">
        <div className="recent-search-card recent-flight">
          <div className="recent-search-icon" aria-hidden="true">✈️</div>
          <div className="recent-search-copy">
            <span className="eyebrow">YOUR RECENT FLIGHT SEARCH</span>
            <h2>{latestFlightSearch.fromCity} <span aria-hidden="true">→</span> {latestFlightSearch.toCity}</h2>
            <p>
              {latestFlightSearch.date ? `Journey date: ${latestFlightSearch.date}` : 'Any date'} · {latestFlightSearch.adults} passenger{latestFlightSearch.adults > 1 ? 's' : ''} · {latestFlightSearch.travelClass}
            </p>
          </div>
          <Link className="btn-primary recent-search-button" to="/flight">
            Search Again <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecentBusSearch() {
  const { latestBusSearch } = useSearchContext();

  if (!latestBusSearch) return null;

  return (
    <section className="section recent-search-section">
      <div className="container">
        <div className="recent-search-card recent-bus">
          <div className="recent-search-icon" aria-hidden="true">🚌</div>
          <div className="recent-search-copy">
            <span className="eyebrow">YOUR RECENT BUS SEARCH</span>
            <h2>{latestBusSearch.fromCity} <span aria-hidden="true">→</span> {latestBusSearch.toCity}</h2>
            <p>
              {latestBusSearch.date ? `Journey date: ${latestBusSearch.date}` : 'Any date'} · Bus type: {latestBusSearch.busType}
            </p>
          </div>
          <Link className="btn-primary recent-search-button" to="/bus">
            Search Again <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <RecentTrainSearch />
      <RecentFlightSearch />
      <RecentBusSearch />
      <TravelModes />
      <TravelAssistant />
      <WhyGoSphere />
    </div>
  )
}

export default Home

