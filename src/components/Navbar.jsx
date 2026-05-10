import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = [
    { to: '/dashboard', label: 'Home' },
    { to: '/trips', label: 'My Trips' },
    { to: '/city-search', label: 'Explore' },
  ]

  return (
    <nav style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/dashboard" style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '20px', color: 'var(--accent)', letterSpacing: '-0.5px' }}>
        traveloop
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {links.map(l => (
          <Link key={l.to} to={l.to} style={{
            fontSize: '14px',
            color: location.pathname === l.to ? 'var(--accent)' : 'var(--text2)',
            fontWeight: location.pathname === l.to ? 500 : 400,
            transition: 'color 0.2s'
          }}>{l.label}</Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/profile" style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--accent)', color: '#0d0d0d',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-head)'
        }}>{user?.avatar}</Link>
        <button className="btn btn-ghost" style={{ fontSize: '13px' }} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}
