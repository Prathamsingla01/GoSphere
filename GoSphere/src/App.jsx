import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { AppProvider } from './context/AppContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ActiveBookingBanner from './components/ActiveBookingBanner.jsx';

import Home from './pages/Home.jsx';
import Train from './pages/Train.jsx';
import Flight from './pages/Flight.jsx';
import Bus from './pages/Bus.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    // Redux Toolkit Provider gives entire app access to Redux store
    <Provider store={store}>
      {/* SearchContext Provider shares latest search info across pages */}
      <SearchProvider>
      {/* Context API Provider gives entire app access to shared booking context */}
      <AppProvider>
        <Router>
          <div id="app-container">
            <Navbar />
            {/* Visual banner for Context API shared booking state */}
            <ActiveBookingBanner />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/train" element={<Train />} />
                <Route path="/flight" element={<Flight />} />
                <Route path="/bus" element={<Bus />} />
                {/* 404 Route for handling invalid URLs */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
      </SearchProvider>
    </Provider>
  );
}

export default App;
