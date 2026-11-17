import { Link, NavLink } from 'react-router-dom'
import { useBooking } from '../context/useBooking'
import { initials } from '../utils'

const links = [
  { to: '/admin', label: 'Overview', end: true, icon: 'M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z' },
  { to: '/admin/rooms', label: 'Rooms & pricing', icon: 'M4 21V8l8-5 8 5v13h-6v-7h-4v7H4Z' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'M7 3h10a1 1 0 0 1 1 1v17l-6-3-6 3V4a1 1 0 0 1 1-1Z' },
]

export default function AdminSidebar() {
  const { profile, bookings } = useBooking()
  const pendingCount = bookings.filter((booking) => booking.status === 'Pending').length

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <span className="admin-kicker">Admin workspace</span>
        <h2>Grandview</h2>
      </div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `admin-link ${isActive ? 'is-active' : ''}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={link.icon} />
            </svg>
            <span>{link.label}</span>
            {link.label === 'Bookings' && pendingCount > 0 ? (
              <span className="admin-badge">{pendingCount}</span>
            ) : null}
          </NavLink>
        ))}
      </nav>
      <div className="admin-sidebar-bottom">
        <div className="admin-user">
          <span className="avatar">{initials(profile.name)}</span>
          <div>
            <strong>{profile.name}</strong>
            <span>Demo administrator</span>
          </div>
        </div>
        <Link to="/" className="btn btn-ghost btn-sm btn-block">
          Back to website
        </Link>
      </div>
    </aside>
  )
}