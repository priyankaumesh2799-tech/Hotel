import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notice from '../components/Notice'
import { useBooking } from '../context/useBooking'
import { formatDate, initials } from '../utils'

export default function Profile() {
  const { profile, bookings, saveProfile, notify } = useBooking()
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  })
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Enter a valid phone number.'
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    saveProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    })
    setNotice('Profile saved successfully.')
    notify('Your profile has been updated.')
  }

  const confirmedBookings = bookings.filter((booking) => booking.status === 'Confirmed').length

  return (
    <>
      <section className="page-hero page-hero-small">
        <div className="container">
          <span className="eyebrow eyebrow-light">Guest account</span>
          <h1>My profile</h1>
          <p>Keep your contact details current so we can make every stay seamless.</p>
        </div>
      </section>

      <section className="section">
        <div className="container profile-layout">
          <aside className="profile-card panel">
            <span className="avatar avatar-xl">{initials(profile.name)}</span>
            <h2>{profile.name}</h2>
            <p className="muted">{profile.email}</p>
            <span className="member-pill">Grandview guest</span>
            <div className="profile-stats">
              <div>
                <strong>{bookings.length}</strong>
                <span>Total bookings</span>
              </div>
              <div>
                <strong>{confirmedBookings}</strong>
                <span>Confirmed</span>
              </div>
            </div>
            <nav className="account-links">
              <Link to="/profile" className="is-active">
                Profile &amp; contact
              </Link>
              <Link to="/settings">Notification settings</Link>
              <Link to="/my-bookings">My bookings</Link>
            </nav>
          </aside>

          <div className="profile-main">
            <Notice type="success" onClose={() => setNotice('')}>
              {notice}
            </Notice>

            <section className="panel profile-form-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Personal information</span>
                  <h2>Edit profile</h2>
                </div>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <label className="form-field form-field-wide">
                    <span>Full name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name ? <span className="field-error">{errors.name}</span> : null}
                  </label>
                  <label className="form-field">
                    <span>Email address</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? <span className="field-error">{errors.email}</span> : null}
                  </label>
                  <label className="form-field">
                    <span>Phone number</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
                  </label>
                  <label className="form-field form-field-wide">
                    <span>Address</span>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(event) => updateField('address', event.target.value)}
                      placeholder="Street, city, state"
                    />
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Save profile
                  </button>
                  <span className="form-hint">Saved in localStorage on this device.</span>
                </div>
              </form>
            </section>

            <section className="profile-note panel">
              <span className="eyebrow">Reservation snapshot</span>
              <h2>Recent stay</h2>
              {bookings[0] ? (
                <div className="recent-stay-row">
                  <img src={bookings[0].roomImage} alt={bookings[0].roomName} />
                  <div>
                    <strong>{bookings[0].roomName}</strong>
                    <span>
                      {bookings[0].roomDestination} ·{' '}
                      {formatDate(bookings[0].checkIn)}
                    </span>
                  </div>
                  <Link
                    to={`/booking-confirmation/${bookings[0].id}`}
                    className="btn btn-ghost btn-sm"
                  >
                    View
                  </Link>
                </div>
              ) : (
                <p className="muted">No reservations yet. Your next stay will appear here.</p>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  )
}