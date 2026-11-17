import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useBooking } from '../context/useBooking'
import { formatDate, formatPrice } from '../utils'

const statsMeta = [
  { key: 'total', label: 'Total bookings', accent: 'purple' },
  { key: 'confirmed', label: 'Confirmed', accent: 'blue' },
  { key: 'cancelled', label: 'Cancelled', accent: 'rose' },
  { key: 'revenue', label: 'Confirmed revenue', accent: 'green' },
]

export default function AdminDashboard() {
  const { bookings, rooms, updateBookingStatus, notify } = useBooking()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((booking) => booking.status === 'Confirmed').length,
    cancelled: bookings.filter((booking) => booking.status === 'Cancelled').length,
    revenue: bookings
      .filter((booking) => booking.status === 'Confirmed')
      .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0),
  }

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase()
    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        booking.id.toLowerCase().includes(query) ||
        booking.guestName.toLowerCase().includes(query) ||
        booking.roomName.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query)
      return matchesSearch && (status === 'All' || booking.status === status)
    })
  }, [bookings, search, status])

  const recentBookings = filteredBookings.slice(0, 6)

  const handleStatusChange = (booking, nextStatus) => {
    updateBookingStatus(booking.id, nextStatus)
    notify(`Booking ${booking.id} updated to ${nextStatus}.`)
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">
        <header className="admin-header">
          <div>
            <span className="eyebrow">Operations overview</span>
            <h1>Good to see you, Alex.</h1>
            <p>Here is what is happening across the Grandview collection today.</p>
          </div>
          <Link to="/admin/rooms" className="btn btn-primary">
            Add a room
          </Link>
        </header>

        <section className="stat-grid">
          {statsMeta.map((stat) => (
            <article key={stat.key} className={`stat-card stat-${stat.accent}`}>
              <span className="stat-label">{stat.label}</span>
              <strong>{stat.key === 'revenue' ? formatPrice(stats[stat.key]) : stats[stat.key]}</strong>
              <small>
                {stat.key === 'total'
                  ? `${rooms.length} rooms in the collection`
                  : stat.key === 'confirmed'
                    ? 'Ready for arrival'
                    : stat.key === 'cancelled'
                      ? 'Released inventory'
                      : 'From confirmed stays'}
              </small>
            </article>
          ))}
        </section>

        <section className="admin-panel panel">
          <div className="admin-panel-heading">
            <div>
              <span className="eyebrow">Reservations</span>
              <h2>Recent bookings</h2>
            </div>
            <Link to="/admin/bookings" className="text-link">
              Manage all bookings <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="table-toolbar">
            <label className="form-field">
              <span>Search bookings</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Booking ID, guest or room"
              />
            </label>
            <label className="form-field">
              <span>Status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {['All', 'Confirmed', 'Pending', 'Cancelled'].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {recentBookings.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Stay</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <Link to={`/booking-confirmation/${booking.id}`} className="table-link">
                          {booking.id}
                        </Link>
                      </td>
                      <td>
                        <strong>{booking.guestName}</strong>
                        <span className="table-sub">{booking.email}</span>
                      </td>
                      <td>
                        <strong>{booking.roomName}</strong>
                        <span className="table-sub">{booking.roomDestination}</span>
                      </td>
                      <td>
                        <strong>
                          {formatDate(booking.checkIn, { year: undefined })} -{' '}
                          {formatDate(booking.checkOut, { year: undefined })}
                        </strong>
                        <span className="table-sub">{booking.nights} nights</span>
                      </td>
                      <td>{formatPrice(booking.totalPrice)}</td>
                      <td>
                        <select
                          className={`status-select status-${booking.status.toLowerCase()}`}
                          value={booking.status}
                          onChange={(event) =>
                            handleStatusChange(booking, event.target.value)
                          }
                          aria-label={`Status for booking ${booking.id}`}
                        >
                          {['Confirmed', 'Pending', 'Cancelled'].map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <h3>No bookings found</h3>
              <p>Try a different search or status filter.</p>
            </div>
          )}
        </section>

        <div className="admin-bottom-grid">
          <section className="admin-mini-panel panel">
            <span className="eyebrow">Inventory</span>
            <h2>{rooms.length} rooms in the collection</h2>
            <p>
              {rooms.filter((room) => room.available).length} available ·{' '}
              {rooms.filter((room) => !room.available).length} unavailable
            </p>
            <Link to="/admin/rooms" className="btn btn-ghost btn-sm">
              Manage rooms
            </Link>
          </section>
          <section className="admin-mini-panel panel">
            <span className="eyebrow">Revenue</span>
            <h2>{formatPrice(stats.revenue)} confirmed</h2>
            <p>Revenue updates automatically when booking statuses change.</p>
            <Link to="/admin/bookings" className="btn btn-ghost btn-sm">
              Review bookings
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}