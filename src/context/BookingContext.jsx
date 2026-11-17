import { useEffect, useState } from 'react'
import { initialRooms } from '../data/rooms'
import { initialBookings } from '../data/bookings'
import { createBookingId } from '../utils'
import { BookingContext } from './bookingContextInstance'

const defaultProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 555 0192',
  address: '221 Ocean Drive, Miami, FL',
}

const defaultSettings = {
  bookingUpdates: true,
  priceAlerts: false,
  promotions: true,
  smsNotifications: false,
}

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      return
    }
  }, [key, value])

  return [value, setValue]
}

export function BookingProvider({ children }) {
  const [rooms, setRooms] = usePersistentState('grandview-rooms', initialRooms)
  const [bookings, setBookings] = usePersistentState(
    'grandview-bookings',
    initialBookings,
  )
  const [profile, setProfile] = usePersistentState('grandview-profile', defaultProfile)
  const [settings, setSettings] = usePersistentState(
    'grandview-settings',
    defaultSettings,
  )
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
  }

  const getRoomById = (id) => rooms.find((room) => room.id === id)

  const addRoom = (room) => {
    const newRoom = {
      ...room,
      id: room.id || `room-${Date.now()}`,
    }
    setRooms((current) => [newRoom, ...current])
    return newRoom
  }

  const updateRoom = (id, changes) => {
    setRooms((current) =>
      current.map((room) => (room.id === id ? { ...room, ...changes } : room)),
    )
  }

  const deleteRoom = (id) => {
    setRooms((current) => current.filter((room) => room.id !== id))
  }

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: createBookingId(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    }
    setBookings((current) => [newBooking, ...current])
    return newBooking
  }

  const cancelBooking = (id) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status: 'Cancelled' } : booking,
      ),
    )
  }

  const updateBookingStatus = (id, status) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
    )
  }

  const saveProfile = (nextProfile) => {
    setProfile((current) => ({ ...current, ...nextProfile }))
  }

  const updateSettings = (changes) => {
    setSettings((current) => ({ ...current, ...changes }))
  }

  const value = {
    rooms,
    bookings,
    profile,
    settings,
    toast,
    setToast,
    notify,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
    addBooking,
    cancelBooking,
    updateBookingStatus,
    saveProfile,
    updateSettings,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}