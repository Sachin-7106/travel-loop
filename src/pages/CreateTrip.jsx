// Member 2 - Trip Management
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function CreateTrip() {
  const { addTrip } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '', description: '', budget: '' })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.startDate || !form.endDate) { setError('Name and dates are required'); return }
    const trip = addTrip({ ...form, budget: Number(form.budget) || 0 })
    navigate(`/itinerary-builder/${trip.id}`)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page" style={{ maxWidth: '600px' }}>
        <button className="btn btn-ghost" style={{ marginBottom: '1.5rem', padding: '0' }} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '0.5rem' }}>Create a new trip</h1>
        <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '14px' }}>Fill in the details to get started</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Trip Name *</label>
              <input type="text" placeholder="e.g. Europe Summer 2025" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>

            <div className="grid-2">
              <div>
                <label style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Start Date *</label>
                <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>End Date *</label>
                <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Description</label>
              <textarea placeholder="What's this trip about?" value={form.description} onChange={e => set('description', e.target.value)}
                style={{ resize: 'vertical', minHeight: '80px' }} />
            </div>

            <div>
              <label style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Total Budget (₹)</label>
              <input type="number" placeholder="e.g. 50000" value={form.budget} onChange={e => set('budget', e.target.value)} />
            </div>

            <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius-sm)', padding: '1rem', border: '1px dashed var(--border2)' }}>
              <p style={{ fontSize: '13px', color: 'var(--text2)', textAlign: 'center' }}>📷 Cover photo upload (optional — coming soon)</p>
            </div>
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: '13px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Save & Build Itinerary →</button>
          </div>
        </form>
      </div>
    </div>
  )
}
