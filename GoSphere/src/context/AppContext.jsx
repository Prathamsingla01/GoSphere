/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Create the Context object
export const AppContext = createContext();

// 2. Create the Provider component to wrap the application
export function AppProvider({ children }) {
  // Shared state: stores the confirmed travel booking inquiry (null = unconfirmed)
  const [booking, setBooking] = useState(null);

  // Shared state: recent searches performed across Train, Flight, Bus (empty by default)
  const [recentSearches, setRecentSearches] = useState([]);

  // Shared state: list of recently seen/inspected tickets (empty by default)
  const [recentSeenTickets, setRecentSeenTickets] = useState([]);

  // Shared state: active recent seen ticket (null until user interacts)
  const [recentSeenTicket, setRecentSeenTicket] = useState(null);

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
