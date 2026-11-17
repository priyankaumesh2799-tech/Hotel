import { Link, useParams } from 'react-router-dom'
import { useBooking } from '../context/useBooking'
import { formatDate, formatPrice } from '../utils'

export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const { bookings } = useBooking()
  const booking = bookings.find((item) => item.id === bookingId)

  if (!booking) {
    return (
      <section className="section">
        <div className="container empty-state panel">
          <span className="empty-icon">?</span>
          <h2>Booking not found</h2>
          <p>This confirmation link is not valid or the booking was removed.</p>
          <Link to="/my-bookings" className="btn btn-primary">
            View my bookings
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section confirmation-page">
      <div className="container confirmation-wrap">
        <div className="confirmation-card panel">
          <div className="confirmation-mark" aria-hidden="true">
            ✓
          </div>
          <span className="eyebrow">Reservation confirmed</span>
          <h1>Your stay is booked.</h1>
          <p className="confirmation-lead">
            A confirmation has been saved for {booking.guestName}. We look forward to
            welcoming you to {booking.roomDestination}.
          </p>

          <div className="confirmation-id">
            <span>Booking ID</span>
            <strong>{booking.id}</strong>
          </div>

          <div className="confirmation-grid">
            <div className="confirmation-block">
              <h2>Guest</h2>
              <dl className="summary-list">
                <div>
                  <dt>Full name</dt>
                  <dd>{booking.guestName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{booking.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{booking.phone}</dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{booking.guests}</dd>
                </div>
              </dl>
            </div>

            <div className="confirmation-block">
              <h2>Stay</h2>
              <dl className="summary-list">
                <div>
                  <dt>Room</dt>
                  <dd>{booking.roomName}</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>{booking.roomDestination}</dd>
                </div>
                <div>
                  <dt>Check-in</dt>
                  <dd>{formatDate(booking.checkIn)}</dd>
                </div>
                <div>
                  <dt>Check-out</dt>
                  <dd>{formatDate(booking.checkOut)}</dd>
                </div>
                <div>
                  <dt>Nights</dt>
                  <dd>{booking.nights}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="confirmation-room">
            <img src={booking.roomImage} alt={booking.roomName} />
            <div>
              <span className="type-pill">{booking.status}</span>
              <h3>{booking.roomName}</h3>
              <p>
                {booking.nights} nights at {formatPrice(booking.pricePerNight)} per night
              </p>
            </div>
          </div>

          <div className="confirmation-total">
            <div>
              <span>Total paid at property</span>
              <small>All taxes and fees included</small>
            </div>
            <strong>{formatPrice(booking.totalPrice)}</strong>
          </div>

          <div className="confirmation-actions">
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link to="/my-bookings" className="btn btn-ghost">
              View my bookings
            </Link>
            <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
              Print confirmation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}