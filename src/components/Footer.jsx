import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-light">
            <span className="brand-mark">G</span>
            <span className="brand-text">
              Grandview
              <small>Hotels &amp; Resorts</small>
            </span>
          </Link>
          <p>Thoughtful stays in remarkable places, with a little more room to unwind.</p>
          <div className="social-row" aria-label="Social media">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              IG
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              FB
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/rooms">All rooms</Link>
          <Link to="/search?destination=Bali">Bali stays</Link>
          <Link to="/search?destination=Maldives">Maldives villas</Link>
          <Link to="/my-bookings">My bookings</Link>
        </div>

        <div>
          <h3>Company</h3>
          <Link to="/admin">Admin dashboard</Link>
          <Link to="/profile">Guest profile</Link>
          <Link to="/settings">Preferences</Link>
          <span>Grandview Collection</span>
        </div>

        <div>
          <h3>Contact</h3>
          <span>hello@grandviewhotels.com</span>
          <span>+1 (800) 555-0148</span>
          <span>88 Harbour Road, Miami, FL</span>
          <span>Open daily, 8am - 10pm</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {currentYear} Grandview Hotels. All rights reserved.</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  )
}