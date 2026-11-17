import { Link } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import SearchForm from '../components/SearchForm'
import { useBooking } from '../context/useBooking'
import { featuredHotels } from '../data/hotels'
import { destinationImages, heroImage } from '../data/rooms'

export default function Home() {
  const { rooms, bookings } = useBooking()
  const featuredRooms = rooms.filter((room) => room.available).slice(0, 6)
  const destinations = [...new Set(rooms.map((room) => room.destination))].slice(0, 6)

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow eyebrow-light">The Grandview collection</span>
          <h1>
            Somewhere worth
            <br />
            staying a little longer.
          </h1>
          <p>
            Discover handpicked hotels, suites and private villas in the world's most
            memorable destinations.
          </p>
          <SearchForm />
          <div className="hero-proof">
            <div>
              <strong>4.9/5</strong>
              <span>Guest rating</span>
            </div>
            <div>
              <strong>32</strong>
              <span>Unique stays</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Guest support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured stays</span>
              <h2>Rooms guests keep coming back to</h2>
            </div>
            <Link to="/rooms" className="text-link">
              View all rooms <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="room-grid">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Featured hotels</span>
              <h2>Distinctive places to call home</h2>
            </div>
            <p className="section-lead">
              Each Grandview hotel has its own character, but the same considered service and
              attention to detail.
            </p>
          </div>
          <div className="hotel-grid">
            {featuredHotels.map((hotel) => (
              <Link
                key={hotel.id}
                to={`/search?destination=${encodeURIComponent(hotel.destination)}&guests=2`}
                className="hotel-card"
              >
                <div
                  className="hotel-card-media"
                  style={{ backgroundImage: `url(${hotel.image})` }}
                >
                  <span className="hotel-location">
                    {hotel.destination}, {hotel.country}
                  </span>
                </div>
                <div className="hotel-card-body">
                  <div className="hotel-card-meta">
                    <span className="rating">
                      <span aria-hidden="true">★</span> {hotel.rating}
                    </span>
                    <span>{hotel.rooms} rooms</span>
                  </div>
                  <h3>{hotel.name}</h3>
                  <p>{hotel.description}</p>
                  <span className="hotel-card-link">
                    Explore hotel <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Popular destinations</span>
              <h2>Find your next change of scenery</h2>
            </div>
            <p className="section-lead">
              From island mornings to city evenings, there is a Grandview stay for every
              kind of escape.
            </p>
          </div>
          <div className="destination-grid">
            {destinations.map((destination) => {
              const destinationRooms = rooms.filter(
                (room) => room.destination === destination,
              )
              return (
                <Link
                  key={destination}
                  to={`/search?destination=${encodeURIComponent(destination)}&guests=2`}
                  className="destination-card"
                  style={{
                    backgroundImage: `url(${destinationImages[destination] || heroImage})`,
                  }}
                >
                  <span className="destination-shade" />
                  <span className="destination-copy">
                    <strong>{destination}</strong>
                    <span>
                      {destinationRooms.length}{' '}
                      {destinationRooms.length === 1 ? 'stay' : 'stays'} from{' '}
                      {Math.min(...destinationRooms.map((room) => room.price))}
                    </span>
                  </span>
                  <span className="destination-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container feature-grid">
          <div className="feature-card">
            <span className="feature-icon">01</span>
            <h3>Handpicked properties</h3>
            <p>Every Grandview stay is selected for design, comfort and a genuine sense of place.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">02</span>
            <h3>Simple reservations</h3>
            <p>Clear pricing, flexible dates and a booking flow that takes less than a minute.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">03</span>
            <h3>Here when you need us</h3>
            <p>Our guest team is available around the clock before, during and after your stay.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-panel">
          <div>
            <span className="eyebrow eyebrow-light">Already booked with us?</span>
            <h2>Manage your stay in one place.</h2>
            <p>Review your reservations, check details and make changes when plans shift.</p>
          </div>
          <div className="cta-actions">
            <Link to="/my-bookings" className="btn btn-light">
              View my bookings
            </Link>
            <Link to="/admin" className="btn btn-outline-light">
              Admin dashboard
            </Link>
          </div>
          <span className="cta-count">{bookings.length} bookings in your demo account</span>
        </div>
      </section>
    </>
  )
}