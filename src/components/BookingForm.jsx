import { useState } from 'react'
import { useBooking } from '../context/useBooking'
import {
  addDays,
  formatPrice,
  getNights,
  isValidDateRange,
  todayISO,
} from '../utils'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  guests: '2',
  checkIn: '',
  checkOut: '',
}

export default function BookingForm({
  room,
  initialValues = {},
  onConfirm,
  submitLabel = 'Confirm booking',
}) {
  const { profile } = useBooking()
  const today = todayISO()
  const [form, setForm] = useState({
    ...emptyForm,
    fullName: initialValues.fullName || profile.name,
    email: initialValues.email || profile.email,
    phone: initialValues.phone || profile.phone,
    guests: String(initialValues.guests || Math.min(2, room.maxGuests)),
    checkIn: initialValues.checkIn || addDays(today, 1),
    checkOut: initialValues.checkOut || addDays(today, 4),
  })
  const [errors, setErrors] = useState({})

  const nights = getNights(form.checkIn, form.checkOut)
  const total = nights * Number(room.price)

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'checkIn' && (!next.checkOut || next.checkOut <= value)) {
        next.checkOut = addDays(value, 1)
      }
      return next
    })
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter the guest full name.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Enter a valid phone number.'
    }
    const guests = Number(form.guests)
    if (!Number.isInteger(guests) || guests < 1) {
      nextErrors.guests = 'At least one guest is required.'
    } else if (guests > room.maxGuests) {
      nextErrors.guests = `This room accommodates up to ${room.maxGuests} guests.`
    }
    if (!form.checkIn) {
      nextErrors.checkIn = 'Select a check-in date.'
    } else if (form.checkIn < today) {
      nextErrors.checkIn = 'Check-in cannot be in the past.'
    }
    if (!form.checkOut) {
      nextErrors.checkOut = 'Select a check-out date.'
    } else if (!isValidDateRange(form.checkIn, form.checkOut)) {
      nextErrors.checkOut = 'Check-out must be after check-in.'
    }
    if (!room.available) {
      nextErrors.room = 'This room is currently unavailable for new bookings.'
    }
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onConfirm({
      roomId: room.id,
      roomName: room.name,
      roomDestination: `${room.destination}, ${room.country}`,
      roomImage: room.images[0],
      guestName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      guests: Number(form.guests),
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights,
      pricePerNight: Number(room.price),
      totalPrice: total,
    })
  }

  const fieldError = (name) =>
    errors[name] ? <span className="field-error">{errors[name]}</span> : null

  return (
    <form className="booking-form-layout" onSubmit={handleSubmit} noValidate>
      <div className="booking-form-main">
        {Object.keys(errors).length > 0 ? (
          <div className="form-error" role="alert">
            Please review the highlighted fields before confirming.
          </div>
        ) : null}

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Step 1</span>
              <h2>Guest details</h2>
            </div>
            <span className="secure-note">Secure reservation</span>
          </div>
          <div className="form-grid">
            <label className="form-field">
              <span>Full name</span>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => updateField('fullName', event.target.value)}
                placeholder="Alex Morgan"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
              />
              {fieldError('fullName')}
            </label>
            <label className="form-field">
              <span>Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="alex@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {fieldError('email')}
            </label>
            <label className="form-field">
              <span>Phone number</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="+1 555 0192"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
              />
              {fieldError('phone')}
            </label>
            <label className="form-field">
              <span>Guests</span>
              <select
                value={form.guests}
                onChange={(event) => updateField('guests', event.target.value)}
                aria-invalid={Boolean(errors.guests)}
              >
                {Array.from({ length: room.maxGuests }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? 'guest' : 'guests'}
                    </option>
                  ),
                )}
              </select>
              {fieldError('guests')}
            </label>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Step 2</span>
              <h2>Stay details</h2>
            </div>
          </div>
          <div className="form-grid">
            <label className="form-field">
              <span>Check-in</span>
              <input
                type="date"
                value={form.checkIn}
                min={today}
                onChange={(event) => updateField('checkIn', event.target.value)}
                aria-invalid={Boolean(errors.checkIn)}
              />
              {fieldError('checkIn')}
            </label>
            <label className="form-field">
              <span>Check-out</span>
              <input
                type="date"
                value={form.checkOut}
                min={addDays(form.checkIn || today, 1)}
                onChange={(event) => updateField('checkOut', event.target.value)}
                aria-invalid={Boolean(errors.checkOut)}
              />
              {fieldError('checkOut')}
            </label>
          </div>
          {fieldError('room')}
        </section>
      </div>

      <aside className="booking-summary panel">
        <img src={room.images[0]} alt={room.name} />
        <span className="type-pill">{room.type}</span>
        <h2>{room.name}</h2>
        <p className="muted">
          {room.destination}, {room.country}
        </p>

        <dl className="summary-list">
          <div>
            <dt>Check-in</dt>
            <dd>{form.checkIn || 'Select date'}</dd>
          </div>
          <div>
            <dt>Check-out</dt>
            <dd>{form.checkOut || 'Select date'}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{form.guests}</dd>
          </div>
          <div>
            <dt>Price per night</dt>
            <dd>{formatPrice(room.price)}</dd>
          </div>
          <div>
            <dt>Nights</dt>
            <dd>{nights}</dd>
          </div>
        </dl>

        <div className="summary-total">
          <div>
            <span>Total price</span>
            <small>Taxes and fees included</small>
          </div>
          <strong>{formatPrice(total)}</strong>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          {submitLabel}
        </button>
        <p className="summary-note">
          No payment is collected in this demo. Your reservation is saved locally.
        </p>
      </aside>
    </form>
  )
}