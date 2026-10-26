/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Create the Context object
export const AppContext = createContext();

// Pre-seeded initial data so the Context API immediately showcases recent seen ticket and searches
const defaultRecentSearches = [
  {
    id: 'search-train-del-chd',
    mode: 'Train',
    from: 'Delhi',
    to: 'Chandigarh',
    date: '2026-10-28',
    summary: 'Delhi ➔ Chandigarh',
    icon: '🚆',
    timestamp: 'Today',
  },
  {
    id: 'search-flight-del-bom',
    mode: 'Flight',
    from: 'Delhi',
    to: 'Mumbai',
    date: '2026-10-30',
    summary: 'Delhi ➔ Mumbai',
    icon: '✈️',
    timestamp: 'Yesterday',
  },
  {
    id: 'search-bus-del-mnl',
    mode: 'Bus',
    from: 'Delhi',
    to: 'Manali',
    date: '2026-11-02',
    summary: 'Delhi ➔ Manali',
    icon: '🚌',
    timestamp: '3 days ago',
  },
];

// Pre-seeded initial recently seen tickets to show before ticket confirmation
const defaultRecentTickets = [
  {
    id: 'train-1',
    mode: 'Train',
    name: 'Vande Bharat Express',
    number: '22439',
    from: 'Delhi',
    to: 'Chandigarh',
    depTime: '06:00 AM',
    arrTime: '09:20 AM',
    durationLabel: '3h 20m',
    price: 850,
    classes: ['Executive Chair Car', 'AC Chair Car'],
    score: 94,
    facilities: ['❄️ AC', '🔌 Charging', '🍽️ Food', '🪑 Comfortable Seating'],
    statusLabel: 'Recently Viewed Ticket',
  },
  {
    id: 'flight-1',
    mode: 'Flight',
    name: 'IndiGo (6E 234)',
    number: '6E 234',
    from: 'Delhi',
    to: 'Mumbai',
    depTime: '08:30 AM',
    arrTime: '10:40 AM',
    durationLabel: '2h 10m',
    price: 4299,
    classes: ['Economy'],
    score: 92,
    facilities: ['📶 Entertainment', '🍽️ Meals', '🔌 Charging', '🧳 Cabin Baggage'],
    statusLabel: 'Recent Search Result',
  },
  {
    id: 'bus-1',
    mode: 'Bus',
    name: 'Zingbus Plus (Volvo AC Sleeper)',
    number: 'ZB-402',
    from: 'Delhi',
    to: 'Manali',
    depTime: '08:00 PM',
    arrTime: '08:30 AM',
    durationLabel: '12h 30m',
    price: 1250,
    classes: ['AC Sleeper (2+1)'],
    score: 88,
    facilities: ['❄️ AC', '🔌 Charging', '💺 Reclining Sleeper', '💧 Water Bottle'],
    statusLabel: 'Recent Search Result',
  },
];

// 2. Create the Provider component to wrap the application
export function AppProvider({ children }) {
  // Shared state: stores the confirmed travel booking inquiry (null = unconfirmed)
  const [booking, setBooking] = useState(null);

  // Shared state: recent searches performed across Train, Flight, Bus
  const [recentSearches, setRecentSearches] = useState(defaultRecentSearches);

  // Shared state: list of recently seen/inspected tickets
  const [recentSeenTickets, setRecentSeenTickets] = useState(defaultRecentTickets);

  // Shared state: active recent seen ticket (displayed before ticket confirmation)
  const [recentSeenTicket, setRecentSeenTicket] = useState(defaultRecentTickets[0]);

  // Record a new search inquiry in Context API
  function recordSearch(searchData) {
    if (!searchData || !searchData.from || !searchData.to) return;

    const newSearch = {
      id: `search-${Date.now()}`,
      mode: searchData.mode || 'Travel',
      from: searchData.from,
      to: searchData.to,
      date: searchData.date || 'Flexible Date',
      summary: `${searchData.from} ➔ ${searchData.to}`,
      icon: searchData.mode === 'Flight' ? '✈️' : searchData.mode === 'Bus' ? '🚌' : '🚆',
      timestamp: 'Just now',
      details: searchData,
    };

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (s) =>
          !(
            s.from.toLowerCase() === searchData.from.toLowerCase() &&
            s.to.toLowerCase() === searchData.to.toLowerCase() &&
            s.mode.toLowerCase() === (searchData.mode || '').toLowerCase()
          )
      );
      return [newSearch, ...filtered].slice(0, 6);
    });
  }

  // Record a seen/inspected/clicked ticket into Context API
  function recordSeenTicket(ticketData) {
    if (!ticketData) return;

    const formattedTicket = {
      id: ticketData.id || `ticket-${Date.now()}`,
      mode: ticketData.mode || (ticketData.airline ? 'Flight' : ticketData.operator ? 'Bus' : 'Train'),
      name:
        ticketData.name ||
        (ticketData.airline
          ? `${ticketData.airline} (${ticketData.flightNumber})`
          : ticketData.operator
          ? `${ticketData.operator} (${ticketData.type})`
          : 'Selected Journey'),
      number: ticketData.number || ticketData.flightNumber || ticketData.busNumber || '',
      from: ticketData.from,
      to: ticketData.to,
      depTime: ticketData.depTime || ticketData.departureTime || 'Flexible',
      arrTime: ticketData.arrTime || ticketData.arrivalTime || 'Flexible',
      durationLabel: ticketData.durationLabel || ticketData.duration || 'Standard',
      price: ticketData.price || 500,
      classes: ticketData.classes || (ticketData.travelClass ? [ticketData.travelClass] : ['Standard']),
      facilities: ticketData.facilities || ticketData.amenities || ['❄️ AC', '🔌 Charging'],
      score: ticketData.score?.overall || ticketData.score || 90,
      statusLabel: 'Recently Inspected Ticket',
      viewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setRecentSeenTicket(formattedTicket);

    setRecentSeenTickets((prev) => {
      const filtered = prev.filter((t) => t.name !== formattedTicket.name);
      return [formattedTicket, ...filtered].slice(0, 6);
    });
  }

  // Select one of the previously seen tickets as current
  function selectRecentTicket(ticket) {
    setRecentSeenTicket(ticket);
  }

  // Function to save a new booking inquiry into context (Confirm ticket)
  function saveBooking(bookingData) {
    setBooking({
      ...bookingData,
      bookingId: 'GS-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed (Demo)',
    });
  }

  // Function to clear/cancel the active booking (Reverts to recent seen ticket before confirmation)
  function cancelBooking() {
    setBooking(null);
  }

  // Clear recent searches history
  function clearRecentSearches() {
    setRecentSearches([]);
  }

  // 3. Expose state and update functions through Provider value
  return (
    <AppContext.Provider
      value={{
        booking,
        saveBooking,
        cancelBooking,
        recentSearches,
        recentSeenTicket,
        recentSeenTickets,
        recordSearch,
        recordSeenTicket,
        selectRecentTicket,
        clearRecentSearches,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom hook for convenient access to AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
