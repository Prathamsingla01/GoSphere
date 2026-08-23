import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Train from './pages/Train.jsx'
import Flight from './pages/Flight.jsx'
import Bus from './pages/Bus.jsx'

function App() {
  return (
    <Router>
      <div id="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/train" element={<Train />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/bus" element={<Bus />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
