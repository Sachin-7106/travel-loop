import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill all fields'); return }
    if (!isLogin && !name) { setError('Please enter your name'); return }
    login(email, password)
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '2rem', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', left: '-150px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '36px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-1px', marginBottom: '8px' }}>
            traveloop
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '14px' }}>Personalized travel planning made easy</p>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg3)', borderRadius: 'var(--radius-sm)', padding: '4px', marginBottom: '1.5rem' }}>
            {['Login', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => { setIsLogin(i === 0); setError('') }} style={{
                flex: 1, padding: '8px', borderRadius: '6px', fontSize: '14px', fontWeight: 500,
                background: (i === 0) === isLogin ? 'var(--bg2)' : 'transparent',
                color: (i === 0) === isLogin ? 'var(--text)' : 'var(--text2)',
                border: (i === 0) === isLogin ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>{tab}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Full Name</label>
                <input type="text" placeholder="Alex Rivera" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '6px', display: 'block' }}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {isLogin && (
              <div style={{ textAlign: 'right' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '13px', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
            )}

            {error && <p style={{ color: 'var(--danger)', fontSize: '13px' }}>{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px', padding: '12px' }}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '13px', color: 'var(--text3)' }}>
          {isLogin ? "Don't have an account? " : "Already have one? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '13px' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}
