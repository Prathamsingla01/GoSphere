/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Create the Context object
export const AppContext = createContext();

// 2. Create the Provider component to wrap the application
export function AppProvider({ children }) {
  // Shared state: stores the active travel booking inquiry
  const [booking, setBooking] = useState(null);

  // Function to save a new booking inquiry into context
  function saveBooking(bookingData) {
    setBooking({
      ...bookingData,
      bookingId: 'GS-' + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toLocaleDateString(),
      status: 'Confirmed (Demo)',
    });
  }

  // Function to clear/cancel the active booking
  function cancelBooking() {
    setBooking(null);
  }

  // 3. Expose state and update functions through Provider value
  return (
    <AppContext.Provider value={{ booking, saveBooking, cancelBooking }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom hook for convenient access to AppContext
export function useAppContext() {
  return useContext(AppContext);
}
