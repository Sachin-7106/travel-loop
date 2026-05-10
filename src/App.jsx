import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyTrips from './pages/MyTrips'
import CreateTrip from './pages/CreateTrip'
import ItineraryBuilder from './pages/ItineraryBuilder'
import ItineraryView from './pages/ItineraryView'
import CitySearch from './pages/CitySearch'
import ActivitySearch from './pages/ActivitySearch'
import Budget from './pages/Budget'
import PackingChecklist from './pages/PackingChecklist'
import SharedItinerary from './pages/SharedItinerary'
import Profile from './pages/Profile'
import TripNotes from './pages/TripNotes'

function PrivateRoute({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/trips" element={<PrivateRoute><MyTrips /></PrivateRoute>} />
      <Route path="/create-trip" element={<PrivateRoute><CreateTrip /></PrivateRoute>} />
      <Route path="/itinerary-builder/:id" element={<PrivateRoute><ItineraryBuilder /></PrivateRoute>} />
      <Route path="/itinerary/:id" element={<PrivateRoute><ItineraryView /></PrivateRoute>} />
      <Route path="/city-search" element={<PrivateRoute><CitySearch /></PrivateRoute>} />
      <Route path="/activity-search" element={<PrivateRoute><ActivitySearch /></PrivateRoute>} />
      <Route path="/budget/:id" element={<PrivateRoute><Budget /></PrivateRoute>} />
      <Route path="/packing/:id" element={<PrivateRoute><PackingChecklist /></PrivateRoute>} />
      <Route path="/shared/:id" element={<PrivateRoute><SharedItinerary /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/notes/:id" element={<PrivateRoute><TripNotes /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
