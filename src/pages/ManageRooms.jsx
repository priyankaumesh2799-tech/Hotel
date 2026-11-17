import { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import Notice from '../components/Notice'
import { useBooking } from '../context/useBooking'
import { amenityOptions, roomTypes } from '../data/rooms'
import { formatPrice } from '../utils'

const blankForm = {
  name: '',
  type: 'Deluxe Room',
  destination: '',
  country: '',
  price: '189',
  rating: '4.5',
  reviews: '0',
  maxGuests: '2',
  available: true,
  badge: '',
  description: '',
  imagesText: '',
  amenities: [],
}

export default function ManageRooms() {
  const { rooms, addRoom, updateRoom, deleteRoom, notify } = useBooking()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(blankForm)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')

  const openAdd = () => {
    setEditing(null)
    setForm(blankForm)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (room) => {
    setEditing(room)
    setForm({
      name: room.name,
      type: room.type,
      destination: room.destination,
      country: room.country,
      price: String(room.price),
      rating: String(room.rating),
      reviews: String(room.reviews),
      maxGuests: String(room.maxGuests),
      available: room.available,
      badge: room.badge || '',
      description: room.description,
      imagesText: room.images.join('\n'),
      amenities: room.amenities,
    })
    setFormError('')
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const toggleAmenity = (amenity) => {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const images = form.imagesText
      .split('\n')
      .map((image) => image.trim())
      .filter(Boolean)

    if (form.name.trim().length < 3) {
      setFormError('Room name must have at least 3 characters.')
      return
    }
    if (!form.destination.trim()) {
      setFormError('Destination is required.')
      return
    }
    if (Number(form.price) <= 0) {
      setFormError('Nightly price must be greater than zero.')
      return
    }
    if (Number(form.maxGuests) < 1) {
      setFormError('Guest capacity must be at least one.')
      return
    }
    if (images.length === 0) {
      setFormError('Add at least one room image URL.')
      return
    }
    if (form.amenities.length === 0) {
      setFormError('Select at least one amenity.')
      return
    }

    const payload = {
      name: form.name.trim(),
      type: form.type,
      destination: form.destination.trim(),
      country: form.country.trim() || form.destination.trim(),
      price: Number(form.price),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      maxGuests: Number(form.maxGuests),
      available: Boolean(form.available),
      badge: form.badge.trim(),
      description: form.description.trim(),
      images,
      amenities: form.amenities,
    }

    if (editing) {
      updateRoom(editing.id, payload)
      setNotice(`${payload.name} updated.`)
      notify(`${payload.name} updated.`)
    } else {
      addRoom(payload)
      setNotice(`${payload.name} added to the collection.`)
      notify(`${payload.name} added.`)
    }
    closeForm()
  }

  const handleDelete = (room) => {
    const confirmed = window.confirm(
      `Delete ${room.name}? Existing guest bookings will keep their saved room details.`,
    )
    if (!confirmed) return
    deleteRoom(room.id)
    setNotice(`${room.name} deleted.`)
    notify(`${room.name} deleted.`)
  }

  const toggleAvailability = (room) => {
    updateRoom(room.id, { available: !room.available })
    setNotice(
      `${room.name} is now ${room.available ? 'unavailable' : 'available'}.`,
    )
    notify(`${room.name} availability updated.`)
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-content">
        <header className="admin-header">
          <div>
            <span className="eyebrow">Room and pricing management</span>
            <h1>Manage rooms</h1>
            <p>Add new stays, adjust nightly pricing and control availability.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openAdd}>
            Add new room
          </button>
        </header>

        <Notice type="success" onClose={() => setNotice('')}>
          {notice}
        </Notice>

        <section className="admin-panel panel">
          <div className="admin-panel-heading">
            <div>
              <span className="eyebrow">Collection</span>
              <h2>{rooms.length} rooms</h2>
            </div>
            <span className="table-summary">
              {rooms.filter((room) => room.available).length} available
            </span>
          </div>

          {rooms.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table rooms-table">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <div className="table-room">
                          <img src={room.images[0]} alt={room.name} />
                          <div>
                            <strong>{room.name}</strong>
                            <span className="table-sub">{room.badge || 'Grandview stay'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{room.destination}</strong>
                        <span className="table-sub">{room.country}</span>
                      </td>
                      <td>{room.type}</td>
                      <td>{formatPrice(room.price)}</td>
                      <td>★ {Number(room.rating).toFixed(1)}</td>
                      <td>
                        <button
                          type="button"
                          className={`toggle ${room.available ? 'is-on' : ''}`}
                          onClick={() => toggleAvailability(room)}
                          aria-label={`Toggle availability for ${room.name}`}
                          aria-pressed={room.available}
                        >
                          <span />
                        </button>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => openEdit(room)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger-ghost btn-sm"
                            onClick={() => handleDelete(room)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state compact-empty">
              <h3>No rooms in the collection</h3>
              <p>Add your first room to get started.</p>
              <button type="button" className="btn btn-primary" onClick={openAdd}>
                Add room
              </button>
            </div>
          )}
        </section>
      </div>

      {formOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeForm}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={editing ? 'Edit room' : 'Add room'}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">{editing ? 'Edit room' : 'New room'}</span>
                <h2>{editing ? editing.name : 'Add to the collection'}</h2>
              </div>
              <button type="button" className="modal-close" onClick={closeForm} aria-label="Close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              {formError ? (
                <div className="form-error" role="alert">
                  {formError}
                </div>
              ) : null}

              <div className="form-grid">
                <label className="form-field form-field-wide">
                  <span>Room name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Ocean View Suite"
                  />
                </label>
                <label className="form-field">
                  <span>Room type</span>
                  <select
                    value={form.type}
                    onChange={(event) => updateField('type', event.target.value)}
                  >
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-field">
                  <span>Badge</span>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(event) => updateField('badge', event.target.value)}
                    placeholder="Guest favorite"
                  />
                </label>
                <label className="form-field">
                  <span>Destination</span>
                  <input
                    type="text"
                    value={form.destination}
                    onChange={(event) => updateField('destination', event.target.value)}
                    placeholder="Bali"
                  />
                </label>
                <label className="form-field">
                  <span>Country</span>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    placeholder="Indonesia"
                  />
                </label>
                <label className="form-field">
                  <span>Price per night (USD)</span>
                  <input
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={(event) => updateField('price', event.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>Rating</span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={(event) => updateField('rating', event.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>Review count</span>
                  <input
                    type="number"
                    min="0"
                    value={form.reviews}
                    onChange={(event) => updateField('reviews', event.target.value)}
                  />
                </label>
                <label className="form-field">
                  <span>Guest capacity</span>
                  <input
                    type="number"
                    min="1"
                    value={form.maxGuests}
                    onChange={(event) => updateField('maxGuests', event.target.value)}
                  />
                </label>
                <label className="form-field form-field-wide">
                  <span>Description</span>
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={(event) => updateField('description', event.target.value)}
                    placeholder="Describe the room, views and highlights."
                  />
                </label>
                <label className="form-field form-field-wide">
                  <span>Gallery image URLs</span>
                  <textarea
                    rows="4"
                    value={form.imagesText}
                    onChange={(event) => updateField('imagesText', event.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <small>One image URL per line. The first image is the main room photo.</small>
                </label>
              </div>

              <fieldset className="amenity-fieldset">
                <legend>Amenities</legend>
                <div className="amenity-checkboxes">
                  {amenityOptions.map((amenity) => (
                    <label key={amenity} className="check-row">
                      <input
                        type="checkbox"
                        checked={form.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="check-row availability-check">
                <input
                  type="checkbox"
                  checked={form.available}
                  onChange={(event) => updateField('available', event.target.checked)}
                />
                <span>Available for new bookings</span>
              </label>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={closeForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? 'Save changes' : 'Add room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}