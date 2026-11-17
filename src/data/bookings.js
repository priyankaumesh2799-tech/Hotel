import { addDays, todayISO } from '../utils'

const base = todayISO()

export const initialBookings = [
  {
    id: 'BK-48291031',
    roomId: 'room-bali-ocean',
    roomName: 'Ocean View Deluxe',
    roomDestination: 'Bali, Indonesia',
    roomImage:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    guestName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 555 0192',
    guests: 2,
    checkIn: addDays(base, 14),
    checkOut: addDays(base, 17),
    nights: 3,
    pricePerNight: 189,
    totalPrice: 567,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'BK-48291032',
    roomId: 'room-paris-eiffel',
    roomName: 'Eiffel View Suite',
    roomDestination: 'Paris, France',
    roomImage:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    guestName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 555 0192',
    guests: 3,
    checkIn: addDays(base, 30),
    checkOut: addDays(base, 33),
    nights: 3,
    pricePerNight: 275,
    totalPrice: 825,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'BK-48291033',
    roomId: 'room-maldives-villa',
    roomName: 'Maldives Overwater Villa',
    roomDestination: 'Maldives',
    roomImage:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    guestName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 555 0192',
    guests: 2,
    checkIn: addDays(base, 7),
    checkOut: addDays(base, 10),
    nights: 3,
    pricePerNight: 420,
    totalPrice: 1260,
    status: 'Cancelled',
    createdAt: new Date().toISOString(),
  },
]