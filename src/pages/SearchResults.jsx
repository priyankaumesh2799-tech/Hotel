import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import SearchForm from '../components/SearchForm'
import { useBooking } from '../context/useBooking'
import {
  addDays,
  formatDate,
  formatPrice,
  getNights,
  isValidDateRange,
  todayISO,
} from '../utils'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const { rooms } = useBooking()
  const today = todayISO()
  const destination = searchParams.get('destination') || ''
  const checkIn = searchParams.get('checkIn') || addDays(today, 1)
  const checkOut = searchParams.get('checkOut') || addDays(today, 4)
  const guests = Number(searchParams.get('guests') || 2)
  const [roomType, setRoomType] = useState('all')
  const [maxPrice, setMaxPrice] = useState('600')
  const [sort, setSort] = useState('recommended')

  const types = [...new Set(rooms.map((room) => room.type))].sort()
  const nights = getNights(checkIn, checkOut)
  const datesValid = isValidDateRange(checkIn, checkOut) && checkIn >= today
  const guestsValid = Number.isInteger(guests) && guests >= 1

  const filtered = datesValid && guestsValid
    ? rooms.filter((room) => {
        const matchesDestination =
          room.destination.toLowerCase() === destination.toLowerCase() ||
          `${room.destination}, ${room.country}`
            .toLowerCase()
            .includes(destination.toLowerCase())
        return (
          room.available &&
          matchesDestination &&
          room.maxGuests >= guests &&
          (roomType === 'all' || room.type === roomType) &&
          Number(room.price) <= Number(maxPrice)
        )
      })
    : []

  const matchingRooms = [...filtered].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  const clearFilters = () => {
    setRoomType('all')
    setMaxPrice('600')
    setSort('recommended')
  }

  return (
    <>
      <section className="search-page-top">
        <div className="container">
          <span className="eyebrow eyebrow-light">Search results</span>
          <h1>Stays in {destination || 'your destination'}</h1>
          <p>
            {formatDate(checkIn)} - {formatDate(checkOut)} · {nights}{' '}
            {nights === 1 ? 'night' : 'nights'} · {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'}
          </p>
          <SearchForm
            key={`${destination}-${checkIn}-${checkOut}-${guests}`}
            variant="compact"
            initialValues={{ destination, checkIn, checkOut, guests }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container search-layout">
          <aside className="filter-panel panel">
            <div className="panel-heading">
              <h2>Refine results</h2>
              <button type="button" className="text-button" onClick={clearFilters}>
                Reset
              </button>
            </div>
            <label className="form-field">
              <span>Room type</span>
              <select value={roomType} onChange={(event) => setRoomType(event.target.value)}>
                <option value="all">All room types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="range-field">
              <span>
                Max price <strong>{formatPrice(maxPrice)}</strong>
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
            <div className="filter-note">
              <span>Your stay</span>
              <strong>{nights} nights</strong>
              <small>Total for {guests} guests</small>
            </div>
          </aside>

          <div className="rooms-results">
            <div className="results-heading">
              <div>
                <h2>
                  {matchingRooms.length} {matchingRooms.length === 1 ? 'stay' : 'stays'} available
                </h2>
                <p>
                  {datesValid && guestsValid
                    ? `Showing rooms for ${destination} with capacity for ${guests} guests.`
                    : 'Choose valid dates and at least one guest to see matching rooms.'}
                </p>
              </div>
              <label className="sort-field">
                <span>Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            {!datesValid || !guestsValid ? (
              <div className="form-error" role="alert">
                Check-out must be after check-in, dates cannot be in the past and at least
                one guest is required.
              </div>
            ) : null}

            {matchingRooms.length > 0 ? (
              <div className="room-grid">
                {matchingRooms.map((room) => (
                  <div key={room.id}>
                    <RoomCard room={room} />
                    <Link
                      to={`/booking/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                      className="search-book-link"
                    >
                      Reserve for {formatPrice(room.price * nights)} total
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}

            {datesValid && guestsValid && matchingRooms.length === 0 ? (
              <div className="empty-state panel">
                <span className="empty-icon">⌕</span>
                <h2>No rooms found</h2>
                <p>
                  No available rooms match {destination} for {guests} guests with your
                  current filters.
                </p>
                <div className="empty-actions">
                  <button type="button" className="btn btn-primary" onClick={clearFilters}>
                    Clear filters
                  </button>
                  <Link to="/rooms" className="btn btn-ghost">
                    Browse all rooms
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}