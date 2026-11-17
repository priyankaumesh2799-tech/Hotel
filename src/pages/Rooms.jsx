import { useState } from 'react'
import RoomCard from '../components/RoomCard'
import { useBooking } from '../context/useBooking'
import { formatPrice } from '../utils'

export default function Rooms() {
  const { rooms } = useBooking()
  const [query, setQuery] = useState('')
  const [destination, setDestination] = useState('all')
  const [roomType, setRoomType] = useState('all')
  const [maxPrice, setMaxPrice] = useState('600')
  const [availableOnly, setAvailableOnly] = useState(true)

  const destinations = [...new Set(rooms.map((room) => room.destination))].sort()
  const types = [...new Set(rooms.map((room) => room.type))].sort()

  const search = query.trim().toLowerCase()
  const filteredRooms = rooms.filter((room) => {
    const matchesQuery =
      !search ||
      room.name.toLowerCase().includes(search) ||
      room.destination.toLowerCase().includes(search) ||
      room.description.toLowerCase().includes(search)
    const matchesDestination = destination === 'all' || room.destination === destination
    const matchesType = roomType === 'all' || room.type === roomType
    const matchesPrice = Number(room.price) <= Number(maxPrice)
    const matchesAvailability = !availableOnly || room.available
    return matchesQuery && matchesDestination && matchesType && matchesPrice && matchesAvailability
  })

  const resetFilters = () => {
    setQuery('')
    setDestination('all')
    setRoomType('all')
    setMaxPrice('600')
    setAvailableOnly(true)
  }

  return (
    <>
      <section className="page-hero page-hero-small">
        <div className="container">
          <span className="eyebrow eyebrow-light">Room collection</span>
          <h1>Find a room that feels like you.</h1>
          <p>
            Browse every Grandview room, suite and villa. Filter by destination, room
            type and nightly budget to find your perfect stay.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container rooms-layout">
          <aside className="filter-panel panel">
            <div className="panel-heading">
              <h2>Filter rooms</h2>
              <button type="button" className="text-button" onClick={resetFilters}>
                Reset
              </button>
            </div>

            <label className="form-field">
              <span>Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Room name or city"
              />
            </label>

            <label className="form-field">
              <span>Destination</span>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                <option value="all">All destinations</option>
                {destinations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Room type</span>
              <select
                value={roomType}
                onChange={(event) => setRoomType(event.target.value)}
              >
                <option value="all">All room types</option>
                {types.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="range-field">
              <span>
                Max nightly price <strong>{formatPrice(maxPrice)}</strong>
              </span>
              <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </label>

            <label className="check-row">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(event) => setAvailableOnly(event.target.checked)}
              />
              <span>Available rooms only</span>
            </label>
          </aside>

          <div className="rooms-results">
            <div className="results-heading">
              <div>
                <h2>{filteredRooms.length} rooms found</h2>
                <p>
                  Prices are per night in USD. {availableOnly ? 'Showing available stays.' : 'Including unavailable stays.'}
                </p>
              </div>
            </div>
            {filteredRooms.length > 0 ? (
              <div className="room-grid">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="empty-state panel">
                <span className="empty-icon">0</span>
                <h2>No rooms match those filters</h2>
                <p>Try widening your budget or choosing a different destination.</p>
                <button type="button" className="btn btn-primary" onClick={resetFilters}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}