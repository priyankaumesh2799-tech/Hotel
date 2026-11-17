export const toISODate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const todayISO = () => toISODate(new Date())

export const addDays = (dateString, days) => {
  const date = new Date(`${dateString}T12:00:00`)
  date.setDate(date.getDate() + Number(days))
  return toISODate(date)
}

export const getNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0
  const start = new Date(`${checkIn}T12:00:00`)
  const end = new Date(`${checkOut}T12:00:00`)
  const diff = Math.ceil((end - start) / 86400000)
  return Number.isFinite(diff) && diff > 0 ? diff : 0
}

export const isValidDateRange = (checkIn, checkOut) =>
  Boolean(checkIn && checkOut && checkOut > checkIn)

export const formatDate = (value, options = {}) => {
  if (!value) return 'Not selected'
  const date = new Date(value.length <= 10 ? `${value}T12:00:00` : value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date)
}

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'G'

export const createBookingId = () => {
  const suffix = Date.now().toString().slice(-6)
  const random = Math.floor(10 + Math.random() * 90)
  return `BK-${suffix}${random}`
}