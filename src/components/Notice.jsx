export default function Notice({ type = 'success', children, onClose }) {
  if (!children) return null
  return (
    <div className={`notice notice-${type}`} role="status">
      <span>{children}</span>
      {onClose ? (
        <button type="button" onClick={onClose} aria-label="Dismiss message">
          ×
        </button>
      ) : null}
    </div>
  )
}