// member 3 - Search & Budget
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const allCities = [
  { name: 'Paris', country: 'France', region: 'Europe', cost: '$$$', popularity: 98, emoji: '🗺️', desc: 'City of light and love' },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', cost: '$$$$', popularity: 96, emoji: '🗼', desc: 'Futuristic meets traditional' },
  { name: 'New York', country: 'USA', region: 'Americas', cost: '$$$$', popularity: 95, emoji: '🗽', desc: 'The city that never sleeps' },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', cost: '$$', popularity: 91, emoji: '🌴', desc: 'Tropical paradise island' },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', cost: '$', popularity: 89, emoji: '🛕', desc: 'Street food capital of Asia' },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', cost: '$$$', popularity: 88, emoji: '🏟️', desc: 'Gaudi and beach vibes' },
  { name: 'Rome', country: 'Italy', region: 'Europe', cost: '$$$', popularity: 87, emoji: '🏛️', desc: 'Eternal city of history' },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', cost: '$$$$', popularity: 85, emoji: '🏙️', desc: 'Ultra-modern luxury hub' },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', cost: '$$$$', popularity: 84, emoji: '🦁', desc: 'Garden city of Asia' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', cost: '$$$', popularity: 83, emoji: '🚲', desc: 'Canals and culture' },
  { name: 'Berlin', country: 'Germany', region: 'Europe', cost: '$$', popularity: 80, emoji: '🐻', desc: 'Art, history and nightlife' },
  { name: 'Seoul', country: 'South Korea', region: 'Asia', cost: '$$$', popularity: 79, emoji: '🏮', desc: 'K-pop, food and tech' },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', cost: '$$$$', popularity: 77, emoji: '🦘', desc: 'Harbor and beaches' },
  { name: 'Istanbul', country: 'Turkey', region: 'Europe/Asia', cost: '$$', popularity: 76, emoji: '🕌', desc: 'Where east meets west' },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', cost: '$$', popularity: 74, emoji: '🛤️', desc: 'Trams, tiles and pasteis' },
]

const regions = ['All', 'Asia', 'Europe', 'Americas', 'Middle East', 'Oceania']
const costs = ['All', '$', '$$', '$$$', '$$$$']

export default function CitySearch() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [cost, setCost] = useState('All')
  const navigate = useNavigate()

  const filtered = allCities.filter(c => {
    const matchQ = c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase())
    const matchR = region === 'All' || c.region.includes(region)
    const matchC = cost === 'All' || c.cost === cost
    return matchQ && matchR && matchC
  })

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '0.5rem' }}>Explore Cities</h1>
        <p style={{ color: 'var(--text2)', marginBottom: '1.5rem', fontSize: '14px' }}>Find your next destination</p>

        <input type="text" placeholder="🔍 Search city or country..." value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ marginBottom: '1rem', fontSize: '15px', padding: '12px 16px' }} />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {regions.map(r => (
            <button key={r} onClick={() => setRegion(r)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
              background: region === r ? 'var(--accent)' : 'var(--bg3)',
              color: region === r ? '#0d0d0d' : 'var(--text2)',
              border: region === r ? 'none' : '1px solid var(--border)',
              fontWeight: region === r ? 600 : 400
            }}>{r}</button>
          ))}
          <div style={{ width: '1px', background: 'var(--border)', margin: '0 4px' }} />
          {costs.map(c => (
            <button key={c} onClick={() => setCost(c)} style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer',
              background: cost === c ? 'var(--bg3)' : 'transparent',
              color: cost === c ? 'var(--accent)' : 'var(--text2)',
              border: `1px solid ${cost === c ? 'var(--accent)' : 'var(--border)'}`,
            }}>{c}</button>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text3)', marginBottom: '1rem' }}>{filtered.length} cities found</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {filtered.map(city => (
            <div key={city.name} className="card" style={{ transition: 'border-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '28px' }}>{city.emoji}</span>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '15px' }}>{city.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text2)' }}>{city.country} · {city.region}</p>
                  </div>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{city.cost}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px' }}>{city.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ height: '4px', borderRadius: '2px', background: 'var(--bg3)', flex: 1, width: '80px' }}>
                    <div style={{ height: '100%', borderRadius: '2px', background: 'var(--accent)', width: `${city.popularity}%` }} />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>{city.popularity}% popular</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '12px' }}
                  onClick={() => navigate('/trips')}>+ Add to Trip</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
