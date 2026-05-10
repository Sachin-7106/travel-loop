import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

const cities = ['Paris', 'Tokyo', 'New York', 'London', 'Bali', 'Bangkok', 'Barcelona', 'Rome', 'Dubai', 'Singapore', 'Amsterdam', 'Berlin', 'Seoul', 'Sydney', 'Istanbul']

export default function ItineraryBuilder() {
  const { id } = useParams()
  const { trips, addStop, removeStop, updateTrip } = useApp()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === Number(id))
  const [showForm, setShowForm] = useState(false)
  const [stopForm, setStopForm] = useState({ city: '', country: '', days: '', budget: '', activities: '' })

  if (!trip) return <div className="page"><p>Trip not found</p></div>

  const set = (k, v) => setStopForm(f => ({ ...f, [k]: v }))

  const handleAddStop = () => {
    if (!stopForm.city || !stopForm.days) return
    addStop(trip.id, {
      city: stopForm.city,
      country: stopForm.country,
      days: Number(stopForm.days),
      budget: Number(stopForm.budget) || 0,
      activities: stopForm.activities.split(',').map(a => a.trim()).filter(Boolean)
    })
    setStopForm({ city: '', country: '', days: '', budget: '', activities: '' })
    setShowForm(false)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <button className="btn btn-ghost" style={{ marginBottom: '1rem', padding: '0' }} onClick={() => navigate(-1)}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{trip.name}</h1>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>{trip.startDate} → {trip.endDate}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-outline" onClick={() => navigate(`/itinerary/${trip.id}`)}>View Itinerary</button>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Stop</button>
          </div>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '1.5rem', borderColor: 'var(--accent)', borderStyle: 'solid' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '15px' }}>Add a new stop</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '5px', display: 'block' }}>City *</label>
                <select value={stopForm.city} onChange={e => set('city', e.target.value)}>
                  <option value="">Select city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '5px', display: 'block' }}>Country</label>
                <input placeholder="e.g. France" value={stopForm.country} onChange={e => set('country', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '5px', display: 'block' }}>Days *</label>
                <input type="number" placeholder="3" value={stopForm.days} onChange={e => set('days', e.target.value)} min="1" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '5px', display: 'block' }}>Budget (₹)</label>
                <input type="number" placeholder="5000" value={stopForm.budget} onChange={e => set('budget', e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '5px', display: 'block' }}>Activities (comma separated)</label>
              <input placeholder="Eiffel Tower, Louvre, Seine Cruise" value={stopForm.activities} onChange={e => set('activities', e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={handleAddStop}>Add Stop</button>
            </div>
          </div>
        )}

        {trip.stops.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border2)' }}>
            <p style={{ fontSize: '36px', marginBottom: '1rem' }}>📍</p>
            <h3 style={{ marginBottom: '8px' }}>No stops yet</h3>
            <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '1.5rem' }}>Add cities to build your itinerary</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add First Stop</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {trip.stops.map((stop, i) => (
              <div key={stop.id} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'var(--accent-bg)', border: '1px solid rgba(232,197,71,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--accent)', fontSize: '14px'
                    }}>{i + 1}</div>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: '16px' }}>{stop.city}</h3>
                      <p style={{ fontSize: '13px', color: 'var(--text2)' }}>{stop.country} · {stop.days} day{stop.days !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="tag">₹{(stop.budget || 0).toLocaleString()}</span>
                    <button className="btn btn-ghost" style={{ color: 'var(--danger)', fontSize: '13px', padding: '4px 8px' }}
                      onClick={() => removeStop(trip.id, stop.id)}>Remove</button>
                  </div>
                </div>
                {stop.activities.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {stop.activities.map((act, j) => (
                      <span key={j} style={{
                        background: 'var(--bg3)', border: '1px solid var(--border)',
                        borderRadius: '20px', padding: '4px 12px', fontSize: '12px', color: 'var(--text2)'
                      }}>{act}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
