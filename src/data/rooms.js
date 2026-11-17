export const heroImage =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85'

export const destinationImages = {
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  Maldives:
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  Paris:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  Dubai:
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  Santorini:
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
  Kyoto:
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
  Singapore:
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
}

export const roomTypes = [
  'Deluxe Room',
  'Suite',
  'Villa',
  'Penthouse',
  'Cabin',
]

export const amenityOptions = [
  'Free Wi-Fi',
  'Breakfast',
  'Pool Access',
  'Ocean View',
  'Air Conditioning',
  'Room Service',
  'Spa',
  'Private Balcony',
  'Kitchen',
  'Parking',
  'Gym',
  'Airport Transfer',
]

export const initialRooms = [
  {
    id: 'room-bali-ocean',
    name: 'Ocean View Deluxe',
    destination: 'Bali',
    country: 'Indonesia',
    type: 'Deluxe Room',
    price: 189,
    rating: 4.8,
    reviews: 128,
    maxGuests: 2,
    available: true,
    badge: 'Guest favorite',
    description:
      'Wake up to panoramic ocean views in this airy tropical retreat. The room features a private balcony, king-size bed and a rainfall shower.',
    amenities: ['Free Wi-Fi', 'Ocean View', 'Breakfast', 'Air Conditioning', 'Pool Access', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-maldives-villa',
    name: 'Maldives Overwater Villa',
    destination: 'Maldives',
    country: 'Maldives',
    type: 'Villa',
    price: 420,
    rating: 4.9,
    reviews: 94,
    maxGuests: 2,
    available: true,
    badge: 'Luxury pick',
    description:
      'An unforgettable overwater escape with direct lagoon access, a sun deck and floor-to-ceiling glass doors framing the Indian Ocean.',
    amenities: ['Free Wi-Fi', 'Ocean View', 'Breakfast', 'Air Conditioning', 'Pool Access', 'Private Balcony', 'Spa'],
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cf?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-paris-eiffel',
    name: 'Eiffel View Suite',
    destination: 'Paris',
    country: 'France',
    type: 'Suite',
    price: 275,
    rating: 4.7,
    reviews: 156,
    maxGuests: 3,
    available: true,
    badge: 'City favorite',
    description:
      'A refined Parisian suite with Haussmann details, a separate lounge and a balcony made for evening views of the Eiffel Tower.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Air Conditioning', 'Room Service', 'Private Balcony', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-dubai-rose',
    name: 'Desert Rose Suite',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    type: 'Suite',
    price: 230,
    rating: 4.6,
    reviews: 112,
    maxGuests: 4,
    available: true,
    description:
      'A warm, contemporary suite in the heart of downtown Dubai with skyline views, a king bed and a spacious living area.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Pool Access', 'Air Conditioning', 'Parking', 'Gym', 'Airport Transfer'],
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-santorini-cave',
    name: 'Santorini Cave Suite',
    destination: 'Santorini',
    country: 'Greece',
    type: 'Suite',
    price: 210,
    rating: 4.8,
    reviews: 87,
    maxGuests: 2,
    available: true,
    badge: 'Honeymoon pick',
    description:
      'A whitewashed cave suite carved into the caldera with a private plunge pool and a terrace overlooking the Aegean Sea.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Air Conditioning', 'Private Balcony', 'Pool Access', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-kyoto-garden',
    name: 'Kyoto Garden Ryokan',
    destination: 'Kyoto',
    country: 'Japan',
    type: 'Deluxe Room',
    price: 165,
    rating: 4.7,
    reviews: 73,
    maxGuests: 2,
    available: true,
    description:
      'A peaceful Japanese-inspired room with tatami seating, garden views and a deep soaking tub after a day of exploring.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Air Conditioning', 'Spa', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-bali-pool',
    name: 'Infinity Pool Villa',
    destination: 'Bali',
    country: 'Indonesia',
    type: 'Villa',
    price: 320,
    rating: 4.9,
    reviews: 61,
    maxGuests: 4,
    available: true,
    badge: 'Best for groups',
    description:
      'A private two-bedroom villa with an infinity pool overlooking the jungle, outdoor dining and daily breakfast service.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Pool Access', 'Air Conditioning', 'Kitchen', 'Parking', 'Ocean View'],
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'room-singapore-executive',
    name: 'Marina Bay Executive',
    destination: 'Singapore',
    country: 'Singapore',
    type: 'Penthouse',
    price: 195,
    rating: 4.5,
    reviews: 104,
    maxGuests: 2,
    available: false,
    description:
      'A bright high-floor room with skyline views, a work desk, express check-in and access to the rooftop infinity pool.',
    amenities: ['Free Wi-Fi', 'Breakfast', 'Air Conditioning', 'Pool Access', 'Gym', 'Parking', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]