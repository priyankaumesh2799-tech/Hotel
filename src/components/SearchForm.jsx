import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/useBooking'
import { addDays, isValidDateRange, todayISO } from '../utils'

export default function SearchForm({ variant = 'hero', initialValues = {} }) {
  const navigate = useNavigate()
  const { rooms } = useBooking()
  const listId = useId()
  const today = todayISO()
  const [form, setForm] = useState({
    destination: initialValues.destination || '',
    checkIn: initialValues.checkIn || addDays(today, 1),
    checkOut: initialValues.checkOut || addDays(today, 4),
    guests: String(initialValues.guests || 2),
  })
  const [error, setError] = useState('')

  const destinations = [...new Set(rooms.map((room) => room.destination))].sort()

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'checkIn' && (!next.checkOut || next.checkOut <= value)) {
        next.checkOut = addDays(value, 1)
      }
      return next
    })
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.destination.trim()) {
      setError('Please choose a destination to search.')
      return
    }
    if (!form.checkIn || !form.checkOut) {
      setError('Please select both check-in and check-out dates.')
      return
    }
    if (form.checkIn < today) {
      setError('Check-in cannot be in the past.')
      return
    }
    if (!isValidDateRange(form.checkIn, form.checkOut)) {
      setError('Check-out must be after check-in.')
      return
    }
    if (Number(form.guests) < 1) {
      setError('Guest count must be at least one.')
      return
    }

    const params = new URLSearchParams({
      destination: form.destination.trim(),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: String(form.guests),
    })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form className={`search-form search-form-${variant}`} onSubmit={handleSubmit} noValidate>
      {error ? (
        <div className="form-error search-error" role="alert">
          {error}
        </div>
      ) : null}

      <label className="search-field search-field-destination">
        <span>Destination</span>
        <span className="input-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <input
            type="text"
            list={listId}
            value={form.destination}
            onChange={(event) => updateField('destination', event.target.value)}
            placeholder="City or destination"
            autoComplete="off"
          />
        </span>
      </label>
      <datalist id={listId}>
        {destinations.map((destination) => (
          <option key={destination} value={destination} />
        ))}
      </datalist>

      <label className="search-field">
        <span>Check-in</span>
        <span className="input-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          <input
            type="date"
            value={form.checkIn}
            min={today}
            onChange={(event) => updateField('checkIn', event.target.value)}
          />
        </span>
      </label>

      <label className="search-field">
        <span>Check-out</span>
        <span className="input-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          <input
            type="date"
            value={form.checkOut}
            min={addDays(form.checkIn || today, 1)}
            onChange={(event) => updateField('checkOut', event.target.value)}
          />
        </span>
      </label>

      <label className="search-field search-field-guests">
        <span>Guests</span>
        <span className="input-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5M17.5 20a5.5 5.5 0 0 0-3-4.9" />
          </svg>
          <input
            type="number"
            min="1"
            max="8"
            value={form.guests}
            onChange={(event) => updateField('guests', event.target.value)}
          />
        </span>
      </label>

      <button type="submit" className="btn btn-primary search-submit">
        <span>Search stays</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </button>
    </form>
  )
}