// member 4 - Utils & Sharing
 
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function SharedItinerary() {
  const { id } = useParams()
  const { trips, updateTrip } = useApp()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === Number(id))

  if (!trip) return <div><Navbar /><div className="page"><p>Itinerary not found or is private.</p></div></div>

  const publicUrl = `${window.location.origin}/shared/${trip.id}`
  const copied = () => {
    navigator.clipboard.writeText(publicUrl).catch(() => {})
    alert('Link copied!')
  }
  const totalDays = trip.stops.reduce((s, st) => s + st.days, 0)

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page" style={{ maxWidth: '700px' }}>
        <button className="btn btn-ghost" style={{ padding: '0', marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>

        <div className="card" style={{ marginBottom: '1.5rem', borderColor: trip.isPublic ? 'rgba(74,222,128,0.3)' : 'var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px',
                  background: trip.isPublic ? 'rgba(74,222,128,0.1)' : 'var(--bg3)',
                  color: trip.isPublic ? 'var(--success)' : 'var(--text3)',
                  border: `1px solid ${trip.isPublic ? 'rgba(74,222,128,0.3)' : 'var(--border)'}` }}>
                  {trip.isPublic ? '🌐 Public' : '🔒 Private'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text2)' }}>
                {trip.isPublic ? 'Anyone with the link can view this itinerary' : 'Only you can see this trip'}
              </p>
            </div>
            <button onClick={() => updateTrip(trip.id, { isPublic: !trip.isPublic })}
              className={`btn ${trip.isPublic ? 'btn-outline' : 'btn-primary'}`} style={{ fontSize: '13px', padding: '8px 16px' }}>
              {trip.isPublic ? 'Make Private' : 'Make Public'}
            </button>
          </div>
        </div>

        {trip.isPublic && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '8px' }}>Shareable link</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input readOnly value={publicUrl} style={{ fontSize: '13px', color: 'var(--text2)' }} />
              <button className="btn btn-outline" style={{ flexShrink: 0, padding: '8px 16px', fontSize: '13px' }} onClick={copied}>Copy</button>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              {['Twitter', 'WhatsApp', 'Facebook'].map(s => (
                <button key={s} className="btn btn-ghost" style={{ fontSize: '12px', padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: '4px', background: trip.coverColor, borderRadius: '2px', marginBottom: '1.5rem' }} />

        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px' }}>{trip.name}</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '4px' }}>{trip.description}</p>
        <p style={{ color: 'var(--text3)', fontSize: '13px', marginBottom: '2rem' }}>
          {trip.startDate} → {trip.endDate} · {totalDays} days · {trip.stops.length} cities
        </p>

        {trip.stops.map((stop, i) => (
          <div key={stop.id} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--accent)', color: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', fontFamily: 'var(--font-head)', flexShrink: 0 }}>{i + 1}</span>
              <h2 style={{ fontSize: '17px', fontWeight: 600 }}>{stop.city}, {stop.country}</h2>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{stop.days} days</span>
            </div>
            <div style={{ marginLeft: '36px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {stop.activities.map((act, j) => (
                <span key={j} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', color: 'var(--text2)' }}>{act}</span>
              ))}
            </div>
          </div>
        ))}

        <div className="card" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>📋 Copy This Trip</button>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate(`/budget/${trip.id}`)}>💰 View Budget</button>
        </div>
      </div>
    </div>
  )
}
