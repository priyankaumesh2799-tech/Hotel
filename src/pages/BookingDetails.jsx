import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import { useBooking } from '../context/useBooking'

export default function BookingDetails() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getRoomById, addBooking, notify } = useBooking()
  const room = getRoomById(roomId)

  if (!room) {
    return (
      <section className="section">
        <div className="container empty-state panel">
          <span className="empty-icon">?</span>
          <h2>Room not found</h2>
          <p>We could not find the room you wanted to book.</p>
          <Link to="/rooms" className="btn btn-primary">
            Browse rooms
          </Link>
        </div>
      </section>
    )
  }

  if (!room.available) {
    return (
      <section className="section">
        <div className="container empty-state panel">
          <span className="empty-icon">!</span>
          <h2>This room is unavailable</h2>
          <p>{room.name} is not accepting new reservations right now.</p>
          <Link to={`/rooms/${room.id}`} className="btn btn-primary">
            View room details
          </Link>
        </div>
      </section>
    )
  }

  const handleConfirm = (booking) => {
    const created = addBooking(booking)
    notify(`Booking ${created.id} confirmed.`)
    navigate(`/booking-confirmation/${created.id}`, { replace: true })
  }

  return (
    <>
      <section className="page-hero page-hero-small">
        <div className="container">
          <nav className="breadcrumb breadcrumb-light" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/rooms">Rooms</Link>
            <span>/</span>
            <span>Booking</span>
          </nav>
          <span className="eyebrow eyebrow-light">Reserve your stay</span>
          <h1>Almost there, {room.destination} is waiting.</h1>
          <p>Confirm your guest details and dates to complete the reservation.</p>
        </div>
      </section>

      <section className="section booking-page">
        <div className="container">
          <BookingForm
            key={room.id}
            room={room}
            initialValues={{
              checkIn: searchParams.get('checkIn') || undefined,
              checkOut: searchParams.get('checkOut') || undefined,
              guests: searchParams.get('guests') || undefined,
            }}
            onConfirm={handleConfirm}
            submitLabel="Confirm booking"
          />
        </div>
      </section>
    </>
  )
}