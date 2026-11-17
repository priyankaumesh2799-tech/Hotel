import { useState } from 'react'
import { Link } from 'react-router-dom'
import Notice from '../components/Notice'
import { useBooking } from '../context/useBooking'
import { initials } from '../utils'

const preferenceItems = [
  {
    key: 'bookingUpdates',
    title: 'Booking updates',
    description: 'Receive email confirmations and changes to your reservations.',
  },
  {
    key: 'priceAlerts',
    title: 'Price alerts',
    description: 'Know when a destination you saved has a lower nightly rate.',
  },
  {
    key: 'promotions',
    title: 'Offers and promotions',
    description: 'Seasonal packages, member rates and new property announcements.',
  },
  {
    key: 'smsNotifications',
    title: 'SMS notifications',
    description: 'Get time-sensitive arrival and check-in updates by text message.',
  },
]

export default function Settings() {
  const { settings, updateSettings, notify, profile } = useBooking()
  const [form, setForm] = useState(settings)
  const [notice, setNotice] = useState('')

  const toggle = (key) => {
    setForm((current) => ({ ...current, [key]: !current[key] }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateSettings(form)
    setNotice('Notification preferences saved.')
    notify('Your preferences have been saved.')
  }

  return (
    <>
      <section className="page-hero page-hero-small">
        <div className="container">
          <span className="eyebrow eyebrow-light">Account settings</span>
          <h1>Notification settings</h1>
          <p>Choose how Grandview keeps in touch before and during your stay.</p>
        </div>
      </section>

      <section className="section">
        <div className="container settings-layout">
          <aside className="profile-card panel">
            <span className="avatar avatar-xl">{initials(profile.name)}</span>
            <h2>Account preferences</h2>
            <p className="muted">Manage how you hear from us.</p>
            <nav className="account-links">
              <Link to="/profile">Profile &amp; contact</Link>
              <Link to="/settings" className="is-active">
                Notification settings
              </Link>
              <Link to="/my-bookings">My bookings</Link>
            </nav>
          </aside>

          <div className="settings-main">
            <Notice type="success" onClose={() => setNotice('')}>
              {notice}
            </Notice>

            <form className="panel settings-panel" onSubmit={handleSubmit}>
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Communication</span>
                  <h2>Stay in the loop</h2>
                </div>
                <span className="secure-note">Saved locally</span>
              </div>

              <div className="preference-list">
                {preferenceItems.map((item) => (
                  <label key={item.key} className="preference-row">
                    <span className="preference-copy">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </span>
                    <input
                      type="checkbox"
                      className="switch-input"
                      checked={Boolean(form[item.key])}
                      onChange={() => toggle(item.key)}
                    />
                    <span className="switch" aria-hidden="true">
                      <span />
                    </span>
                  </label>
                ))}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
                <span className="form-hint">
                  You can update these preferences at any time.
                </span>
              </div>
            </form>

            <section className="settings-note panel">
              <span className="eyebrow">Privacy</span>
              <h2>Your data stays on this device</h2>
              <p>
                This demo stores your profile, bookings and room changes in your browser's
                localStorage. No information is sent to a server.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}