import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/useBooking'
import { formatDate, formatPrice } from '../utils'

const statusClass = (status) => status.toLowerCase()

export default function MyBookings() {
  const { bookings, cancelBooking, notify } = useBooking()
  const [filter, setFilter] = useState('All')

  const filteredBookings = useMemo(() => {
    if (filter === 'All') return bookings
    return bookings.filter((booking) => booking.status === filter)
  }, [bookings, filter])

  const handleCancel = (booking) => {
    const confirmed = window.confirm(
      `Cancel booking ${booking.id} for ${booking.roomName}? This cannot be undone.`,
    )
    if (!confirmed) return
    cancelBooking(booking.id)
    notify(`Booking ${booking.id} has been cancelled.`, 'success')
  }

  const activeBookings = bookings.filter((booking) => booking.status !== 'Cancelled').length

  return (
    <>
      <section className="page-hero page-hero-small">
        <div className="container">
          <span className="eyebrow eyebrow-light">Your reservations</span>
          <h1>My bookings</h1>
          <p>Review every stay in one place, from upcoming escapes to past getaways.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="bookings-toolbar">
            <div>
              <h2>{activeBookings} active {activeBookings === 1 ? 'booking' : 'bookings'}</h2>
              <p>Bookings are stored on this device.</p>
            </div>
            <div className="filter-tabs" role="tablist" aria-label="Filter bookings">
              {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={filter === status ? 'is-active' : ''}
                  onClick={() => setFilter(status)}
                  role="tab"
                  aria-selected={filter === status}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="empty-state panel">
              <span className="empty-icon">◇</span>
              <h2>No bookings here yet</h2>
              <p>
                {filter === 'All'
                  ? 'When you reserve a room, your confirmation will appear here.'
                  : `You do not have any ${filter.toLowerCase()} bookings.`}
              </p>
              <Link to="/rooms" className="btn btn-primary">
                Find a room
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {filteredBookings.map((booking) => (
                <article key={booking.id} className="booking-card panel">
                  <div className="booking-card-media">
                    <img src={booking.roomImage} alt={booking.roomName} />
                  </div>
                  <div className="booking-card-body">
                    <div className="booking-card-top">
                      <div>
                        <span className="booking-ref">{booking.id}</span>
                        <h2>{booking.roomName}</h2>
                        <p className="muted">{booking.roomDestination}</p>
                      </div>
                      <span className={`status-badge status-${statusClass(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="booking-meta-grid">
                      <div>
                        <span>Guest</span>
                        <strong>{booking.guestName}</strong>
                        <small>{booking.email}</small>
                      </div>
                      <div>
                        <span>Stay dates</span>
                        <strong>
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </strong>
                        <small>
                          {booking.nights} {booking.nights === 1 ? 'night' : 'nights'} ·{' '}
                          {booking.guests} guests
                        </small>
                      </div>
                      <div>
                        <span>Total</span>
                        <strong>{formatPrice(booking.totalPrice)}</strong>
                        <small>{formatPrice(booking.pricePerNight)} per night</small>
                      </div>
                    </div>

                    <div className="booking-card-actions">
                      <Link
                        to={`/booking-confirmation/${booking.id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        View details
                      </Link>
                      {booking.status !== 'Cancelled' ? (
                        <button
                          type="button"
                          className="btn btn-danger-ghost btn-sm"
                          onClick={() => handleCancel(booking)}
                        >
                          Cancel booking
                        </button>
                      ) : (
                        <span className="cancelled-note">This booking was cancelled</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}