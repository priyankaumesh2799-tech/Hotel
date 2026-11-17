import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container empty-state panel">
        <span className="not-found-code">404</span>
        <h1>This page checked out.</h1>
        <p>The page you are looking for may have moved or never existed.</p>
        <div className="empty-actions">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/rooms" className="btn btn-ghost">
            Browse rooms
          </Link>
        </div>
      </div>
    </section>
  )
}