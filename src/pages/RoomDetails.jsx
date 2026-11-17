import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { useBooking } from '../context/useBooking'
import { addDays, formatPrice, todayISO } from '../utils'

export default function RoomDetails() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const { rooms } = useBooking()
  const room = rooms.find((item) => item.id === roomId)
  const [activeImage, setActiveImage] = useState(0)

  if (!room) {
    return (
      <section className="section">
        <div className="container empty-state panel">
          <span className="empty-icon">?</span>
          <h2>Room not found</h2>
          <p>This room may have been removed from the collection.</p>
          <Link to="/rooms" className="btn btn-primary">
            Browse rooms
          </Link>
        </div>
      </section>
    )
  }

  const checkIn = searchParams.get('checkIn') || addDays(todayISO(), 1)
  const checkOut = searchParams.get('checkOut') || addDays(todayISO(), 4)
  const guests = searchParams.get('guests') || 2
  const relatedRooms = rooms
    .filter((item) => item.id !== room.id && item.available)
    .sort((a, b) => {
      if (a.destination === room.destination && b.destination !== room.destination) return -1
      if (b.destination === room.destination && a.destination !== room.destination) return 1
      return b.rating - a.rating
    })
    .slice(0, 3)

  const bookParams = new URLSearchParams({ checkIn, checkOut, guests })

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/rooms">Rooms</Link>
            <span>/</span>
            <span>{room.name}</span>
          </nav>
          <div className="detail-title-row">
            <div>
              <span className="eyebrow">
                {room.type} · {room.destination}, {room.country}
              </span>
              <h1>{room.name}</h1>
            </div>
            <span className="rating rating-large">
              <span aria-hidden="true">★</span> {Number(room.rating).toFixed(1)}
              <small>{room.reviews} reviews</small>
            </span>
          </div>
        </div>
      </section>

      <section className="container detail-content">
        <div className="detail-gallery">
          <div className="gallery-main">
            <img src={room.images[activeImage]} alt={`${room.name} view ${activeImage + 1}`} />
            {room.badge ? <span className="room-badge">{room.badge}</span> : null}
          </div>
          <div className="gallery-thumbs">
            {room.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={index === activeImage ? 'is-active' : ''}
                onClick={() => setActiveImage(index)}
                aria-label={`Show image ${index + 1}`}
              >
                <img src={image} alt={`${room.name} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <section className="detail-section">
              <h2>About this stay</h2>
              <p>{room.description}</p>
              <div className="detail-facts">
                <div>
                  <span>Guests</span>
                  <strong>Up to {room.maxGuests}</strong>
                </div>
                <div>
                  <span>Room type</span>
                  <strong>{room.type}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{room.destination}</strong>
                </div>
                <div>
                  <span>Availability</span>
                  <strong className={room.available ? 'text-success' : 'text-danger'}>
                    {room.available ? 'Available to book' : 'Currently unavailable'}
                  </strong>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>What this room offers</h2>
              <ul className="detail-amenities">
                {room.amenities.map((amenity) => (
                  <li key={amenity}>
                    <span aria-hidden="true">✓</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h2>Good to know</h2>
              <div className="info-grid">
                <div className="info-card">
                  <strong>Check-in</strong>
                  <span>From 3:00 PM</span>
                </div>
                <div className="info-card">
                  <strong>Check-out</strong>
                  <span>Before 11:00 AM</span>
                </div>
                <div className="info-card">
                  <strong>Cancellation</strong>
                  <span>Free up to 48 hours before arrival</span>
                </div>
                <div className="info-card">
                  <strong>Children</strong>
                  <span>Welcome with extra bed on request</span>
                </div>
              </div>
            </section>
          </div>

          <aside className="booking-widget panel">
            <div className="booking-widget-price">
              <strong>{formatPrice(room.price)}</strong>
              <span>/ night</span>
            </div>
            <p className="muted">Includes taxes and fees</p>
            <div className="booking-widget-facts">
              <div>
                <span>Check-in</span>
                <strong>{checkIn}</strong>
              </div>
              <div>
                <span>Check-out</span>
                <strong>{checkOut}</strong>
              </div>
              <div>
                <span>Guests</span>
                <strong>{guests}</strong>
              </div>
              <div>
                <span>Capacity</span>
                <strong>{room.maxGuests} guests max</strong>
              </div>
            </div>
            {room.available ? (
              <Link to={`/booking/${room.id}?${bookParams.toString()}`} className="btn btn-primary btn-block">
                Book now
              </Link>
            ) : (
              <button type="button" className="btn btn-primary btn-block" disabled>
                Currently unavailable
              </button>
            )}
            <span className="booking-widget-note">You will not be charged yet</span>
          </aside>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2>Other stays you might like</h2>
            </div>
            <Link to="/rooms" className="text-link">
              All rooms <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="room-grid">
            {relatedRooms.map((relatedRoom) => (
              <RoomCard key={relatedRoom.id} room={relatedRoom} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}