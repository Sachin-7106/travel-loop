import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function Profile() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', language: 'English' })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => { logout(); navigate('/login') }

  const languages = ['English', 'Hindi', 'Tamil', 'Spanish', 'French', 'Japanese', 'Arabic']

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '2rem' }}>Profile & Settings</h1>

        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'var(--accent)', color: '#0d0d0d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '22px', fontFamily: 'var(--font-head)', flexShrink: 0
          }}>{user?.avatar}</div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{user?.name}</h2>
            <p style={{ fontSize: '14px', color: 'var(--text2)' }}>{user?.email}</p>
          </div>
          <button className="btn btn-outline" style={{ marginLeft: 'auto', fontSize: '13px', padding: '7px 14px' }}>Change Photo</button>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1.25rem' }}>Personal Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Full Name</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Language Preference</label>
              <select value={form.language} onChange={e => set('language', e.target.value)}>
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }} onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Saved Destinations</h3>
          {['Paris, France', 'Tokyo, Japan', 'Bali, Indonesia'].map(dest => (
            <div key={dest} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '14px' }}>📍 {dest}</span>
              <button className="btn btn-ghost" style={{ fontSize: '12px', color: 'var(--text3)', padding: '4px 8px' }}>Remove</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Account</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="btn btn-outline" style={{ justifyContent: 'flex-start', fontSize: '14px' }} onClick={handleLogout}>🚪 Logout</button>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', fontSize: '14px', color: 'var(--danger)' }}
              onClick={() => { if (confirm('Are you sure? This cannot be undone.')) handleLogout() }}>
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
