import { useState } from 'react'
import Navbar from '../components/Navbar'

const activities = [
  { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', type: 'Sightseeing', cost: 1500, duration: '3h', desc: 'Iconic iron tower with panoramic views of Paris' },
  { id: 2, name: 'Louvre Museum', city: 'Paris', type: 'Culture', cost: 1200, duration: '4h', desc: 'World\'s largest art museum, home to Mona Lisa' },
  { id: 3, name: 'Seine River Cruise', city: 'Paris', type: 'Adventure', cost: 1800, duration: '2h', desc: 'Scenic boat cruise through the heart of Paris' },
  { id: 4, name: 'Shibuya Crossing', city: 'Tokyo', type: 'Sightseeing', cost: 0, duration: '1h', desc: 'World\'s busiest pedestrian crossing' },
  { id: 5, name: 'Senso-ji Temple', city: 'Tokyo', type: 'Culture', cost: 0, duration: '2h', desc: 'Ancient Buddhist temple in Asakusa' },
  { id: 6, name: 'Tsukiji Market Food Tour', city: 'Tokyo', type: 'Food', cost: 2500, duration: '3h', desc: 'Sample fresh sushi and local delicacies' },
  { id: 7, name: 'Central Park Walk', city: 'New York', type: 'Adventure', cost: 0, duration: '2h', desc: 'Stroll through Manhattan\'s iconic green lung' },
  { id: 8, name: 'MoMA Visit', city: 'New York', type: 'Culture', cost: 2000, duration: '3h', desc: 'Museum of Modern Art with world-class collection' },
  { id: 9, name: 'Ubud Rice Terraces', city: 'Bali', type: 'Sightseeing', cost: 500, duration: '4h', desc: 'Stunning UNESCO terraced rice paddies' },
  { id: 10, name: 'Kecak Fire Dance', city: 'Bali', type: 'Culture', cost: 800, duration: '2h', desc: 'Traditional Balinese dance at sunset' },
  { id: 11, name: 'Street Food Tour', city: 'Bangkok', type: 'Food', cost: 1200, duration: '3h', desc: 'Explore Bangkok\'s vibrant street food scene' },
  { id: 12, name: 'Sagrada Familia', city: 'Barcelona', type: 'Culture', cost: 2500, duration: '2h', desc: 'Gaudi\'s unfinished masterpiece basilica' },
]

const types = ['All', 'Sightseeing', 'Culture', 'Food', 'Adventure']

export default function ActivitySearch() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [maxCost, setMaxCost] = useState(5000)
  const [added, setAdded] = useState([])

  const filtered = activities.filter(a => {
    const matchQ = a.name.toLowerCase().includes(query.toLowerCase()) || a.city.toLowerCase().includes(query.toLowerCase())
    const matchT = type === 'All' || a.type === type
    const matchC = a.cost <= maxCost
    return matchQ && matchT && matchC
  })

  const toggle = (id) => setAdded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const typeColors = { Sightseeing: '#e8c547', Culture: '#60a5fa', Food: '#4ade80', Adventure: '#f87171' }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700 }}>Activity Search</h1>
          {added.length > 0 && <span className="tag">{added.length} selected</span>}
        </div>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '14px' }}>Browse and add experiences to your trip</p>

        <input type="text" placeholder="🔍 Search activities or cities..." value={query}
          onChange={e => setQuery(e.target.value)} style={{ marginBottom: '1rem' }} />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
          {types.map(t => (
            <button key={t} onClick={() => setType(t)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
              background: type === t ? typeColors[t] || 'var(--accent)' : 'var(--bg3)',
              color: type === t ? '#0d0d0d' : 'var(--text2)',
              border: type === t ? 'none' : '1px solid var(--border)',
              fontWeight: type === t ? 600 : 400
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '13px', color: 'var(--text2)', whiteSpace: 'nowrap' }}>Max cost: ₹{maxCost.toLocaleString()}</span>
          <input type="range" min="0" max="5000" step="100" value={maxCost}
            onChange={e => setMaxCost(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent)', background: 'none', border: 'none', padding: 0 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {filtered.map(act => (
            <div key={act.id} className="card" style={{
              transition: 'border-color 0.2s',
              borderColor: added.includes(act.id) ? 'rgba(232,197,71,0.4)' : 'var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '3px' }}>{act.name}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text2)' }}>{act.city}</p>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500,
                  background: `${typeColors[act.type]}22`, color: typeColors[act.type], flexShrink: 0
                }}>{act.type}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px', lineHeight: '1.5' }}>{act.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: 'var(--text2)', display: 'flex', gap: '12px' }}>
                  <span>⏱ {act.duration}</span>
                  <span style={{ color: act.cost === 0 ? 'var(--success)' : 'var(--text)' }}>
                    {act.cost === 0 ? 'Free' : `₹${act.cost.toLocaleString()}`}
                  </span>
                </div>
                <button onClick={() => toggle(act.id)} style={{
                  padding: '5px 14px', borderRadius: 'var(--radius-sm)', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
                  background: added.includes(act.id) ? 'var(--accent)' : 'transparent',
                  color: added.includes(act.id) ? '#0d0d0d' : 'var(--text2)',
                  border: `1px solid ${added.includes(act.id) ? 'var(--accent)' : 'var(--border)'}`,
                  transition: 'all 0.2s'
                }}>{added.includes(act.id) ? '✓ Added' : '+ Add'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
