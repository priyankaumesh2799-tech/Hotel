import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useBooking } from '../context/useBooking'
import { formatDate, formatPrice } from '../utils'

const statuses = ['Confirmed', 'Pending', 'Cancelled']

export default function ManageBookings() {
  const { bookings, updateBookingStatus, notify } = useBooking()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase()
    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        booking.id.toLowerCase().includes(query) ||
        booking.guestName.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.roomName.toLowerCase().includes(query)
      return matchesSearch && (status === 'All' || booking.status === status)
    })
  }, [bookings, search, status])

  const handleStatusChange = (booking, nextStatus) => {
    updateBookingStatus(booking.id, nextStatus)
    notify(`Booking ${booking.id} set to ${nextStatus}.`)
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">
        <header className="admin-header">
          <div>
            <span className="eyebrow">Booking management</span>
            <h1>Manage bookings</h1>
            <p>Search reservations, review guest details and update booking status.</p>
          </div>
          <Link to="/admin" className="btn btn-ghost">
            Back to overview
          </Link>
        </header>

        <section className="mini-stat-row">
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              className={`mini-stat ${status === item ? 'is-active' : ''}`}
              onClick={() => setStatus(status === item ? 'All' : item)}
            >
              <span>{item}</span>
              <strong>{bookings.filter((booking) => booking.status === item).length}</strong>
            </button>
          ))}
          <button
            type="button"
            className={`mini-stat ${status === 'All' ? 'is-active' : ''}`}
            onClick={() => setStatus('All')}
          >
            <span>All bookings</span>
            <strong>{bookings.length}</strong>
          </button>
        </section>

        <section className="admin-panel panel">
          <div className="table-toolbar">
            <label className="form-field">
              <span>Search bookings</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Booking ID, guest, email or room"
              />
            </label>
            <label className="form-field">
              <span>Filter by status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="All">All statuses</option>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredBookings.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table bookings-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Stay</th>
                    <th>Guests</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <Link
                          to={`/booking-confirmation/${booking.id}`}
                          className="table-link"
                        >
                          {booking.id}
                        </Link>
                        <span className="table-sub">{formatDate(booking.createdAt, { year: undefined })}</span>
                      </td>
                      <td>
                        <strong>{booking.guestName}</strong>
                        <span className="table-sub">{booking.email}</span>
                        <span className="table-sub">{booking.phone}</span>
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
                      <td>{booking.guests}</td>
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
                          {statuses.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleStatusChange(booking, 'Cancelled')}
                          disabled={booking.status === 'Cancelled'}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <h3>No bookings found</h3>
              <p>Adjust your search or choose another status filter.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearch('')
                  setStatus('All')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}