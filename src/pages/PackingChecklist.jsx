// Member 4 - Utils & Sharing
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

const categories = ['clothing', 'documents', 'electronics', 'toiletries', 'other']
const categoryEmoji = { clothing: '👕', documents: '📄', electronics: '🔌', toiletries: '🪥', other: '📦' }

export default function PackingChecklist() {
  const { id } = useParams()
  const { trips, updateTrip } = useApp()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === Number(id))
  const [newItem, setNewItem] = useState('')
  const [newCat, setNewCat] = useState('other')

  if (!trip) return <div><Navbar /><div className="page"><p>Trip not found.</p></div></div>

  const checklist = trip.checklist || []
  const packed = checklist.filter(i => i.packed).length

  const addItem = () => {
    if (!newItem.trim()) return
    const updated = [...checklist, { id: Date.now(), item: newItem.trim(), category: newCat, packed: false }]
    updateTrip(trip.id, { checklist: updated })
    setNewItem('')
  }

  const togglePacked = (itemId) => {
    const updated = checklist.map(i => i.id === itemId ? { ...i, packed: !i.packed } : i)
    updateTrip(trip.id, { checklist: updated })
  }

  const removeItem = (itemId) => {
    updateTrip(trip.id, { checklist: checklist.filter(i => i.id !== itemId) })
  }

  const resetAll = () => {
    updateTrip(trip.id, { checklist: checklist.map(i => ({ ...i, packed: false })) })
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page" style={{ maxWidth: '700px' }}>
        <button className="btn btn-ghost" style={{ padding: '0', marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700 }}>Packing Checklist</h1>
          <button className="btn btn-ghost" style={{ fontSize: '13px', color: 'var(--text3)' }} onClick={resetAll}>Reset all</button>
        </div>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '2rem' }}>{trip.name} · {packed}/{checklist.length} packed</p>

        <div style={{ height: '4px', background: 'var(--bg3)', borderRadius: '2px', marginBottom: '2rem' }}>
          <div style={{ height: '100%', background: 'var(--success)', borderRadius: '2px', width: checklist.length ? `${(packed / checklist.length) * 100}%` : '0%', transition: 'width 0.3s' }} />
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '10px' }}>Add new item</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="e.g. Sunscreen" value={newItem} onChange={e => setNewItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()} style={{ flex: 2 }} />
            <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ flex: 1 }}>
              {categories.map(c => <option key={c} value={c}>{categoryEmoji[c]} {c}</option>)}
            </select>
            <button className="btn btn-primary" onClick={addItem} style={{ flexShrink: 0, padding: '10px 18px' }}>Add</button>
          </div>
        </div>

        {categories.map(cat => {
          const items = checklist.filter(i => i.category === cat)
          if (items.length === 0) return null
          return (
            <div key={cat} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text2)', marginBottom: '10px', textTransform: 'capitalize' }}>
                {categoryEmoji[cat]} {cat}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {items.map(item => (
                  <div key={item.id} className="card" style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
                    opacity: item.packed ? 0.6 : 1, transition: 'opacity 0.2s'
                  }}>
                    <button onClick={() => togglePacked(item.id)} style={{
                      width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, cursor: 'pointer',
                      background: item.packed ? 'var(--success)' : 'transparent',
                      border: `2px solid ${item.packed ? 'var(--success)' : 'var(--border2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#0d0d0d', fontSize: '12px', fontWeight: 700, transition: 'all 0.2s'
                    }}>{item.packed ? '✓' : ''}</button>
                    <span style={{ flex: 1, fontSize: '14px', textDecoration: item.packed ? 'line-through' : 'none' }}>{item.item}</span>
                    <button className="btn btn-ghost" style={{ padding: '2px 6px', fontSize: '16px', color: 'var(--text3)' }}
                      onClick={() => removeItem(item.id)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {checklist.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border2)' }}>
            <p style={{ fontSize: '36px', marginBottom: '1rem' }}>🎒</p>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Nothing packed yet. Start adding items above!</p>
          </div>
        )}
      </div>
    </div>
  )
}
