import { Link } from 'react-router-dom'
import { formatPrice } from '../utils'

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card-media">
        <img src={room.images[0]} alt={room.name} loading="lazy" />
        {room.badge ? <span className="room-badge">{room.badge}</span> : null}
        {!room.available ? <span className="room-badge room-badge-muted">Unavailable</span> : null}
      </div>
      <div className="room-card-body">
        <div className="room-card-meta">
          <span className="type-pill">{room.type}</span>
          <span className="rating">
            <span aria-hidden="true">★</span> {Number(room.rating).toFixed(1)}
            <small>({room.reviews})</small>
          </span>
        </div>
        <h3>
          <Link to={`/rooms/${room.id}`}>{room.name}</Link>
        </h3>
        <p className="room-location">
          {room.destination}, {room.country}
        </p>
        <p className="room-description">{room.description}</p>
        <ul className="amenity-chips">
          {room.amenities.slice(0, 3).map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
          {room.amenities.length > 3 ? <li>+{room.amenities.length - 3} more</li> : null}
        </ul>
        <div className="room-card-footer">
          <div className="room-price">
            <strong>{formatPrice(room.price)}</strong>
            <span>/ night</span>
          </div>
          <div className="room-actions">
            <Link to={`/rooms/${room.id}`} className="btn btn-ghost btn-sm">
              View details
            </Link>
            {room.available ? (
              <Link to={`/booking/${room.id}`} className="btn btn-primary btn-sm">
                Book now
              </Link>
            ) : (
              <button type="button" className="btn btn-primary btn-sm" disabled>
                Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}