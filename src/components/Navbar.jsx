import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBooking } from '../context/useBooking'
import { initials } from '../utils'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/rooms', label: 'Rooms' },
  { to: '/my-bookings', label: 'My Bookings' },
  { to: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { profile } = useBooking()

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand" aria-label="Grandview Hotels home">
          <span className="brand-mark">G</span>
          <span className="brand-text">
            Grandview
            <small>Hotels &amp; Resorts</small>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/profile" className="profile-chip" onClick={() => setMenuOpen(false)}>
            <span className="avatar">{initials(profile.name)}</span>
            <span>{profile.name.split(' ')[0]}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}