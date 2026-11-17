import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useBooking } from './context/useBooking'
import { BookingProvider } from './context/BookingContext'
import AdminDashboard from './pages/AdminDashboard'
import BookingConfirmation from './pages/BookingConfirmation'
import BookingDetails from './pages/BookingDetails'
import Home from './pages/Home'
import ManageBookings from './pages/ManageBookings'
import ManageRooms from './pages/ManageRooms'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import RoomDetails from './pages/RoomDetails'
import Rooms from './pages/Rooms'
import SearchResults from './pages/SearchResults'
import Settings from './pages/Settings'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function Toast() {
  const { toast, setToast } = useBooking()

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <span className="toast-mark" aria-hidden="true">
        {toast.type === 'success' ? '✓' : '!'}
      </span>
      <span>{toast.message}</span>
      <button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  )
}

function Shell() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking/:roomId" element={<BookingDetails />} />
          <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<ManageRooms />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Shell />
      </BookingProvider>
    </BrowserRouter>
  )
}