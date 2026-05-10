import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

const popularCities = [
  { name: 'Tokyo', country: 'Japan', emoji: '🗼', cost: '$$$$' },
  { name: 'Paris', country: 'France', emoji: '🗺️', cost: '$$$' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', cost: '$$' },
  { name: 'New York', country: 'USA', emoji: '🗽', cost: '$$$$' },
  { name: 'Bangkok', country: 'Thailand', emoji: '🛕', cost: '$' },
  { name: 'Barcelona', country: 'Spain', emoji: '🏟️', cost: '$$$' },
]

export default function Dashboard() {
  const { user, trips } = useApp()
  const navigate = useNavigate()
  const upcomingTrips = trips.slice(0, 3)
  const totalBudget = trips.reduce((s, t) => s + (t.budget || 0), 0)
  const totalSpent = trips.reduce((s, t) => s + (t.spent || 0), 0)

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px' }}>
            Hey, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text2)' }}>Ready for your next adventure?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Trips', value: trips.length },
            { label: 'Total Budget', value: `₹${totalBudget.toLocaleString()}` },
            { label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}` },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-head)', color: 'var(--accent)' }}>{stat.value}</p>
              <p style={{ fontSize: '13px', color: 'var(--text2)', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Recent Trips</h2>
          <button className="btn btn-outline" style={{ fontSize: '13px', padding: '7px 14px' }} onClick={() => navigate('/trips')}>View all</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {upcomingTrips.map(trip => (
            <div key={trip.id} className="card" style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
              onClick={() => navigate(`/itinerary/${trip.id}`)}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ height: '6px', background: trip.coverColor, borderRadius: '3px', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{trip.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px' }}>{trip.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{trip.stops.length} stops · {trip.startDate}</span>
                <span className="tag">₹{(trip.budget || 0).toLocaleString()}</span>
              </div>
            </div>
          ))}

          <div className="card" style={{
            cursor: 'pointer', border: '1px dashed var(--border2)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '140px', gap: '8px', transition: 'border-color 0.2s'
          }}
            onClick={() => navigate('/create-trip')}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
          >
            <span style={{ fontSize: '28px', color: 'var(--accent)' }}>+</span>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Plan New Trip</p>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1rem' }}>Explore Destinations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {popularCities.map(city => (
              <div key={city.name} className="card" style={{ textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onClick={() => navigate('/city-search')}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{city.emoji}</div>
                <p style={{ fontWeight: 600, fontSize: '14px' }}>{city.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text2)' }}>{city.country}</p>
                <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '4px' }}>{city.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
