import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

const sampleTrips = [
  {
    id: 1,
    name: 'Europe Summer 2025',
    description: 'Backpacking through Western Europe',
    startDate: '2025-06-15',
    endDate: '2025-07-10',
    stops: [
      { id: 1, city: 'Paris', country: 'France', days: 5, activities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'], budget: 800 },
      { id: 2, city: 'Amsterdam', country: 'Netherlands', days: 3, activities: ['Van Gogh Museum', 'Canal Tour'], budget: 500 },
      { id: 3, city: 'Berlin', country: 'Germany', days: 4, activities: ['Brandenburg Gate', 'Museum Island'], budget: 450 },
    ],
    budget: 3000,
    spent: 1750,
    coverColor: '#e8c547',
    isPublic: true,
    notes: 'Pack light! Hostels booked for Paris and Amsterdam.',
    checklist: [
      { id: 1, item: 'Passport', category: 'documents', packed: true },
      { id: 2, item: 'Travel Insurance', category: 'documents', packed: true },
      { id: 3, item: 'Adapter plug', category: 'electronics', packed: false },
      { id: 4, item: 'Laptop', category: 'electronics', packed: false },
      { id: 5, item: 'Hiking shoes', category: 'clothing', packed: false },
    ]
  },
  {
    id: 2,
    name: 'Japan Cherry Blossom',
    description: 'Chasing sakura across Japan',
    startDate: '2025-03-25',
    endDate: '2025-04-08',
    stops: [
      { id: 1, city: 'Tokyo', country: 'Japan', days: 5, activities: ['Shibuya Crossing', 'Senso-ji Temple', 'Akihabara'], budget: 900 },
      { id: 2, city: 'Kyoto', country: 'Japan', days: 4, activities: ['Fushimi Inari', 'Arashiyama Bamboo Grove'], budget: 700 },
    ],
    budget: 2500,
    spent: 2100,
    coverColor: '#e85555',
    isPublic: false,
    notes: 'Book Shinkansen tickets in advance!',
    checklist: [
      { id: 1, item: 'IC Card', category: 'documents', packed: false },
      { id: 2, item: 'Yen Cash', category: 'documents', packed: false },
      { id: 3, item: 'Portable WiFi', category: 'electronics', packed: false },
    ]
  }
]

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [trips, setTrips] = useState(sampleTrips)

  const login = (email, password) => {
    setUser({ id: 1, name: 'Alex Rivera', email, avatar: 'AR' })
    return true
  }

  const logout = () => setUser(null)

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      id: Date.now(),
      stops: [],
      spent: 0,
      coverColor: ['#e8c547', '#4ade80', '#60a5fa', '#e85555', '#a78bfa'][Math.floor(Math.random() * 5)],
      isPublic: false,
      notes: '',
      checklist: []
    }
    setTrips(prev => [newTrip, ...prev])
    return newTrip
  }

  const updateTrip = (id, updates) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(t => t.id !== id))
  }

  const addStop = (tripId, stop) => {
    setTrips(prev => prev.map(t =>
      t.id === tripId
        ? { ...t, stops: [...t.stops, { ...stop, id: Date.now() }] }
        : t
    ))
  }

  const removeStop = (tripId, stopId) => {
    setTrips(prev => prev.map(t =>
      t.id === tripId
        ? { ...t, stops: t.stops.filter(s => s.id !== stopId) }
        : t
    ))
  }

  return (
    <AppContext.Provider value={{ user, login, logout, trips, addTrip, updateTrip, deleteTrip, addStop, removeStop }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
