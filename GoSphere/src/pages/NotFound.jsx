import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '16px', color: 'var(--accent-cyan)' }}>404</h1>
      <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ maxWidth: '480px', margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
        Oops! The travel route you requested doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
