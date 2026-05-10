import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function MyTrips() {
  const { trips, deleteTrip } = useApp()
  const navigate = useNavigate()

  const getDuration = (start, end) => {
    if (!start || !end) return '—'
    const diff = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
    return `${diff} days`
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>My Trips</h1>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>{trips.length} trip{trips.length !== 1 ? 's' : ''} planned</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/create-trip')}>+ Plan New Trip</button>
        </div>

        {trips.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem', border: '1px dashed var(--border2)' }}>
            <p style={{ fontSize: '48px', marginBottom: '1rem' }}>✈️</p>
            <h3 style={{ marginBottom: '8px' }}>No trips yet</h3>
            <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '14px' }}>Start planning your first adventure</p>
            <button className="btn btn-primary" onClick={() => navigate('/create-trip')}>Plan New Trip</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {trips.map(trip => (
              <div key={trip.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ width: '8px', alignSelf: 'stretch', background: trip.coverColor, borderRadius: '4px', flexShrink: 0 }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{trip.name}</h3>
                    {trip.isPublic && <span className="tag" style={{ fontSize: '11px' }}>Public</span>}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '8px' }}>{trip.description || 'No description'}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text3)' }}>
                    <span>📅 {trip.startDate} → {trip.endDate}</span>
                    <span>⏱ {getDuration(trip.startDate, trip.endDate)}</span>
                    <span>📍 {trip.stops.length} stops</span>
                    <span>💰 ₹{(trip.budget || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button className="btn btn-outline" style={{ padding: '7px 14px', fontSize: '13px' }}
                    onClick={() => navigate(`/itinerary/${trip.id}`)}>View</button>
                  <button className="btn btn-outline" style={{ padding: '7px 14px', fontSize: '13px' }}
                    onClick={() => navigate(`/itinerary-builder/${trip.id}`)}>Edit</button>
                  <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: '13px', color: 'var(--danger)' }}
                    onClick={() => { if (confirm('Delete this trip?')) deleteTrip(trip.id) }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
