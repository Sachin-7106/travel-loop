import { useParams, useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

const COLORS = ['#e8c547', '#60a5fa', '#4ade80', '#f87171', '#a78bfa']

export default function Budget() {
  const { id } = useParams()
  const { trips } = useApp()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === Number(id))

  if (!trip) return <div><Navbar /><div className="page"><p>Trip not found. <button className="btn btn-ghost" style={{color:'var(--accent)'}} onClick={() => navigate('/trips')}>Go to trips</button></p></div></div>

  const totalDays = trip.stops.reduce((s, st) => s + st.days, 0) || 1
  const stopBudgets = trip.stops.map(s => ({ name: s.city, value: s.budget || 0 }))
  const categories = [
    { name: 'Accommodation', value: Math.round((trip.budget || 0) * 0.35) },
    { name: 'Transport', value: Math.round((trip.budget || 0) * 0.25) },
    { name: 'Activities', value: Math.round((trip.budget || 0) * 0.20) },
    { name: 'Food', value: Math.round((trip.budget || 0) * 0.15) },
    { name: 'Misc', value: Math.round((trip.budget || 0) * 0.05) },
  ]
  const avgPerDay = Math.round((trip.budget || 0) / totalDays)
  const remaining = (trip.budget || 0) - (trip.spent || 0)
  const pct = trip.budget ? Math.round(((trip.spent || 0) / trip.budget) * 100) : 0

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page">
        <button className="btn btn-ghost" style={{ padding: '0', marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '0.25rem' }}>Budget Overview</h1>
        <p style={{ color: 'var(--text2)', marginBottom: '2rem', fontSize: '14px' }}>{trip.name}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Budget', value: `₹${(trip.budget || 0).toLocaleString()}`, color: 'var(--accent)' },
            { label: 'Spent', value: `₹${(trip.spent || 0).toLocaleString()}`, color: 'var(--danger)' },
            { label: 'Remaining', value: `₹${remaining.toLocaleString()}`, color: 'var(--success)' },
            { label: 'Avg / Day', value: `₹${avgPerDay.toLocaleString()}`, color: 'var(--text)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-head)', color: s.color }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text2)', marginTop: '4px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>Budget used</p>
            <p style={{ fontSize: '14px', color: pct > 80 ? 'var(--danger)' : 'var(--accent)' }}>{pct}%</p>
          </div>
          <div style={{ height: '8px', background: 'var(--bg3)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '4px', background: pct > 80 ? 'var(--danger)' : 'var(--accent)', width: `${Math.min(pct, 100)}%`, transition: 'width 0.5s' }} />
          </div>
          {pct > 80 && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '8px' }}>⚠️ Over 80% of budget used</p>}
        </div>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Spend by Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categories} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Budget by Stop</h3>
            {stopBudgets.length === 0 ? (
              <p style={{ color: 'var(--text3)', fontSize: '13px' }}>No stops added yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stopBudgets}>
                  <XAxis dataKey="name" tick={{ fill: 'var(--text2)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--text2)', fontSize: 11 }} />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} contentStyle={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} />
                  <Bar dataKey="value" fill="#e8c547" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Category Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map((cat, i) => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[i], flexShrink: 0 }} />
                <span style={{ fontSize: '14px', flex: 1 }}>{cat.name}</span>
                <div style={{ flex: 2, height: '4px', background: 'var(--bg3)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', background: COLORS[i], borderRadius: '2px', width: `${(cat.value / (trip.budget || 1)) * 100}%` }} />
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text2)', minWidth: '80px', textAlign: 'right' }}>₹{cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
