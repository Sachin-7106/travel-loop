// member 4 - Utils & Sharing
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Navbar from '../components/Navbar'

export default function TripNotes() {
  const { id } = useParams()
  const { trips, updateTrip } = useApp()
  const navigate = useNavigate()
  const trip = trips.find(t => t.id === Number(id))
  const [newNote, setNewNote] = useState('')
  const [newTitle, setNewTitle] = useState('')

  if (!trip) return <div><Navbar /><div className="page"><p>Trip not found.</p></div></div>

  const notes = trip.journalNotes || []

  const addNote = () => {
    if (!newNote.trim()) return
    const updated = [...notes, {
      id: Date.now(),
      title: newTitle.trim() || 'Untitled Note',
      content: newNote.trim(),
      timestamp: new Date().toLocaleString(),
      stop: null
    }]
    updateTrip(trip.id, { journalNotes: updated })
    setNewNote('')
    setNewTitle('')
  }

  const deleteNote = (noteId) => {
    updateTrip(trip.id, { journalNotes: notes.filter(n => n.id !== noteId) })
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="page" style={{ maxWidth: '700px' }}>
        <button className="btn btn-ghost" style={{ padding: '0', marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>Trip Notes</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '2rem' }}>{trip.name} · {notes.length} note{notes.length !== 1 ? 's' : ''}</p>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '1rem', color: 'var(--text2)' }}>Add a new note</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Note title (optional)" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <textarea
              placeholder="Write your note here... hotel check-in times, contacts, reminders..."
              value={newNote} onChange={e => setNewNote(e.target.value)}
              style={{ minHeight: '100px', resize: 'vertical' }}
              onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) addNote() }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--text3)' }}>Ctrl+Enter to save</p>
              <button className="btn btn-primary" onClick={addNote} style={{ padding: '8px 20px' }}>Save Note</button>
            </div>
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border2)' }}>
            <p style={{ fontSize: '36px', marginBottom: '1rem' }}>📓</p>
            <p style={{ color: 'var(--text2)', fontSize: '14px' }}>No notes yet. Jot down hotel info, contacts, or reminders.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[...notes].reverse().map(note => (
              <div key={note.id} className="card" style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600 }}>{note.title}</h3>
                  <button className="btn btn-ghost" style={{ color: 'var(--danger)', fontSize: '18px', padding: '0 4px', lineHeight: 1 }}
                    onClick={() => deleteNote(note.id)}>×</button>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text2)', whiteSpace: 'pre-wrap', lineHeight: '1.6', marginBottom: '10px' }}>{note.content}</p>
                <p style={{ fontSize: '11px', color: 'var(--text3)' }}>🕐 {note.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
