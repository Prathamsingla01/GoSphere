# GoSphere 🌍

GoSphere is a responsive front-end travel booking web application developed for **Front End Engineering-II (25CSE0203)**. It allows users to compare and explore three primary modes of transportation — Trains, Flights, and Buses — with interactive travel scores, route details, and booking inquiry capabilities.

---

## Technologies Used

- **React 19** — Functional components and hooks (`useState`, `useContext`)
- **Vite** — Fast modern frontend build tool and dev server
- **React Router DOM (v7)** — Client-side declarative routing and navigation
- **React Context API** — Global state management for active travel booking inquiries
- **Redux Toolkit & React-Redux** — Centralized state management for shortlisted / saved journeys
- **Vanilla CSS** — Custom styling, dark mode theme, and responsive layouts
- **Lucide React** — Travel and UI icons

---

## Getting Started

### 1. Installation

Navigate to the project directory and install the required dependencies:

```bash
cd GoSphere
npm install
```

### 2. Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to the local URL (typically `http://localhost:5173/`).

### 3. Production Build

To test and compile the production bundle:

```bash
npm run build
```

---

## Evaluation 2 Technical Implementation

### A. Navigation & Page Structure (`react-router-dom`)
- **Route Definitions (`src/App.jsx`)**: Configured with `BrowserRouter`, `Routes`, and `Route` for client-side navigation without full-page reloads.
  - `/` — **Home Page** (`src/pages/Home.jsx`): Hero section, mode comparison cards, and travel assistant.
  - `/train` — **Train Page** (`src/pages/Train.jsx`): Railway routes, travel score breakdown, sorting, and booking.
  - `/flight` — **Flight Page** (`src/pages/Flight.jsx`): Flight search, airline cards, badges, and route modal.
  - `/bus` — **Bus Page** (`src/pages/Bus.jsx`): Intercity bus schedules, comfort ratings, and boarding points.
  - `*` — **404 Not Found Page** (`src/pages/NotFound.jsx`): Graceful fallback for invalid routes with a return link to Home.
- **Shared Navigation Bar (`src/components/Navbar.jsx`)**: Uses `NavLink` with dynamic active class styling (`isActive`) to highlight the current page.

### B. React Context API (`src/context/AppContext.jsx` & `src/context/TicketContext.jsx`)
- **Purpose**: Global state management that dynamically handles travel reservation lifecycles across pages without prop drilling:
  - **Before Ticket Confirmation**: Context API tracks and displays **recent searches** (`recentSearches`) and the **most recently seen / inspected ticket** (`recentSeenTicket`), with options to switch between inspected tickets or proceed with instant confirmation.
  - **After Ticket Confirmation**: Upon completing the booking form, Context API transitions to store and display the active **confirmed reservation** (`booking`) with booking ID, passenger details, route, fare breakdown, and verifiable digital pass.
  - **Cancellation / Reset**: Calling `cancelBooking()` clears `booking` and seamlessly restores the before-confirmation view displaying recent searches.
- **Context Definition**: `createContext()` creates `AppContext` (aliased as `TicketContext` in `TicketContext.jsx`).
- **Provider Component (`AppProvider`)**: Manages `booking`, `recentSearches`, `recentSeenTicket`, and `recentSeenTickets` using React `useState`, exposing:
  - `saveBooking(bookingData)` — Confirms ticket and records reservation.
  - `cancelBooking()` — Clears confirmed booking back to recent searches view.
  - `recordSearch(searchData)` — Records search queries across Train, Flight, and Bus.
  - `recordSeenTicket(ticketData)` — Records viewed/inspected journey.
  - `selectRecentTicket(ticket)` — Switches active seen ticket preview.
- **Application Wrapper (`src/App.jsx`)**: Wraps the route tree with `<AppProvider>`.
- **Consumer Components**:
  - `src/components/ActiveBookingBanner.jsx`: Uses `useContext(AppContext)` to render the dual-state ticket banner on the Home page under the Hero section.
  - `src/components/Navbar.jsx`: Uses `useAppContext()` to render live Context API status badge (`👁 Recent: [Ticket]` before confirmation, `✓ Confirmed ([ID])` after confirmation).
  - `src/components/BookingForm.jsx`: Calls `saveBooking()` to record confirmed client-side reservations into Context API.
  - `src/pages/Train.jsx`, `src/pages/Flight.jsx`, `src/pages/Bus.jsx`: Call `recordSearch()` and `recordSeenTicket()` upon searching and viewing journeys.

### C. Redux Toolkit (`src/redux/`)
- **Purpose**: Manages user-shortlisted journeys across Train, Flight, and Bus options.
- **Slice (`src/redux/travelSlice.js`)**: Created with `createSlice`, initial state `{ savedTrips: [] }`, and reducers:
  - `saveTrip`: Adds a journey to the shortlist (preventing duplicates).
  - `removeTrip`: Removes a journey by ID.
  - `clearSavedTrips`: Empties the shortlist.
- **Store (`src/redux/store.js`)**: Configured using `configureStore` with `travelReducer`.
- **Store Provider (`src/App.jsx`)**: Wraps the application with `<Provider store={store}>` from `react-redux`.
- **Reading State**: `useSelector` in `Navbar.jsx` (displays counter badge `★ Saved (N)`) and `SavedTripsModal.jsx`.
- **Dispatching Actions**: `useDispatch` in `Train.jsx`, `Flight.jsx`, `Bus.jsx` ("★ Save" button) and `SavedTripsModal.jsx` ("Remove" / "Clear All").

### D. Form Handling (`src/components/BookingForm.jsx`)
- **Controlled Inputs**: Inputs for `fullName`, `email`, `phone`, `passengers`, `travelDate`, and `travelClass` are managed via React `useState`.
- **Form Submission**: Uses `<form onSubmit={handleSubmit}>` with `e.preventDefault()` to stop browser page reloads.
- **Client-Side Validation**:
  - Verifies all required fields are filled.
  - Validates email format (contains `@` and `.`).
  - Validates phone number length (at least 10 digits).
  - Validates positive passenger count (`passengers >= 1`).
- **User Feedback**: Displays clear inline error messages under invalid fields, and a success confirmation message upon valid submission.
- **Form Reset**: Automatically resets fields and updates Context API state upon successful submission.

---

## Note on Scope

This is a front-end college demonstration project. Bookings and search results represent client-side simulated data; no real backend booking APIs, external payment gateways, or live airline databases are attached.
