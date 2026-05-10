import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function ItineraryView() {
  const { id } = useParams()
  const { trips } = useApp()
  const navigate = useNavigate()
  const [view, setView] = useState('list')
  const trip = trips.find(t => t.id === Number(id))

  if (!trip) return <div className="page"><Navbar /><p>Trip not found</p></div>

  const totalDays = trip.stops.reduce((s, st) => s + st.days, 0)

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <button className="btn btn-ghost" style={{ padding: '0', marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>{trip.name}</h1>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>{trip.startDate} → {trip.endDate} · {totalDays} days · {trip.stops.length} cities</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['list', 'timeline'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '7px 16px', borderRadius: 'var(--radius-sm)', fontSize: '13px', cursor: 'pointer',
                background: view === v ? 'var(--accent)' : 'transparent',
                color: view === v ? '#0d0d0d' : 'var(--text2)',
                border: view === v ? 'none' : '1px solid var(--border)',
                fontWeight: view === v ? 600 : 400,
                textTransform: 'capitalize'
              }}>{v}</button>
            ))}
            <button className="btn btn-outline" style={{ fontSize: '13px', padding: '7px 14px' }}
              onClick={() => navigate(`/itinerary-builder/${trip.id}`)}>Edit</button>
          </div>
        </div>

        {trip.stops.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text2)' }}>No stops added yet. <button className="btn btn-ghost" style={{ color: 'var(--accent)' }} onClick={() => navigate(`/itinerary-builder/${trip.id}`)}>Add stops →</button></p>
          </div>
        ) : view === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {trip.stops.map((stop, i) => (
              <div key={stop.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent)', color: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-head)' }}>{i + 1}</div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{stop.city}</h2>
                    <p style={{ fontSize: '12px', color: 'var(--text2)' }}>{stop.country} · {stop.days} day{stop.days !== 1 ? 's' : ''}</p>
                  </div>
                  <span className="tag" style={{ marginLeft: 'auto' }}>₹{(stop.budget || 0).toLocaleString()}</span>
                </div>

                <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {stop.activities.length === 0 ? (
                    <p style={{ fontSize: '13px', color: 'var(--text3)' }}>No activities added</p>
                  ) : stop.activities.map((act, j) => (
                    <div key={j} className="card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '14px' }}>◆</span>
                      <span style={{ fontSize: '14px' }}>{act}</span>
                    </div>
                  ))}
                </div>
                {i < trip.stops.length - 1 && (
                  <div style={{ marginLeft: '13px', marginTop: '12px', borderLeft: '2px dashed var(--border)', height: '20px' }} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '0', overflowX: 'auto', paddingBottom: '8px', marginBottom: '1.5rem' }}>
              {trip.stops.map((stop, i) => (
                <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: 'var(--accent)', color: '#0d0d0d', borderRadius: 'var(--radius-sm)', padding: '8px 16px', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-head)' }}>{stop.city}</div>
                    <p style={{ fontSize: '11px', color: 'var(--text2)', marginTop: '4px' }}>{stop.days}d</p>
                  </div>
                  {i < trip.stops.length - 1 && (
                    <div style={{ width: '40px', height: '2px', background: 'var(--border2)', margin: '0 4px', marginBottom: '18px' }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {trip.stops.map(stop => (
                <div key={stop.id} className="card">
                  <h3 style={{ fontWeight: 600, marginBottom: '4px' }}>{stop.city}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '10px' }}>{stop.days} days · ₹{(stop.budget || 0).toLocaleString()}</p>
                  {stop.activities.map((a, i) => <p key={i} style={{ fontSize: '13px', color: 'var(--text2)', padding: '4px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>• {a}</p>)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
