/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Create the SearchContext object
const SearchContext = createContext();

// 2. Provider component that shares the latest search info for each travel type
export function SearchProvider({ children }) {
  // Latest train search (e.g. { from, to, date })
  const [latestSearch, setLatestSearch] = useState(null);

  // Latest flight search (e.g. { fromCity, toCity, date, adults, travelClass })
  const [latestFlightSearch, setLatestFlightSearch] = useState(null);

  // Latest bus search (e.g. { fromCity, toCity, date, busType })
  const [latestBusSearch, setLatestBusSearch] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        latestSearch,
        setLatestSearch,
        latestFlightSearch,
        setLatestFlightSearch,
        latestBusSearch,
        setLatestBusSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// 3. Custom hook — gives a clear error if used outside the provider
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
}
