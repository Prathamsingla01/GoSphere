import { useSelector, useDispatch } from 'react-redux';
import { removeTrip, clearSavedTrips } from '../redux/travelSlice.js';

function SavedTripsModal({ isOpen, onClose, onBookTrip }) {
  // Read saved trips list from Redux store state using useSelector
  const savedTrips = useSelector((state) => state.travel.savedTrips);

  // Get dispatch function to dispatch Redux actions
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-header-row">
          <div>
            <span className="badge-pill">Redux Toolkit State</span>
            <h2 style={{ fontSize: '22px', marginTop: '6px' }}>
              Shortlisted Journeys ({savedTrips.length})
            </h2>
          </div>
          {savedTrips.length > 0 && (
            <button
              className="btn-ghost"
              style={{ fontSize: '12px', padding: '6px 14px' }}
              onClick={() => dispatch(clearSavedTrips())}
            >
              Clear All
            </button>
          )}
        </div>

        {savedTrips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px' }}>
            <p style={{ fontSize: '32px', marginBottom: '8px' }}>📌</p>
            <p style={{ color: 'var(--text-secondary)' }}>No journeys shortlisted yet.</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Click the "★ Save" button on any train, flight, or bus card to add it here.
            </p>
          </div>
        ) : (
          <div className="saved-trips-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="saved-trip-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{trip.icon || '🚀'}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{trip.name}</strong>
                    <span className="badge-pill" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      {trip.mode}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {trip.from} → {trip.to} {trip.price && `| ₹${trip.price}`}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {onBookTrip && (
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                      onClick={() => {
                        onClose();
                        onBookTrip(trip);
                      }}
                    >
                      Book
                    </button>
                  )}
                  <button
                    className="btn-ghost"
                    style={{ padding: '6px 10px', fontSize: '12px', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                    onClick={() => dispatch(removeTrip(trip.id))}
                    title="Remove from saved"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedTripsModal;
