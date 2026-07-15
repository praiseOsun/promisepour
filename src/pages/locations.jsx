import React, { useState, useCallback } from 'react';
import { getLocations } from '../utils/locationStore';
import AdminLocationPanel from '../components/AdminLocationPanel';

const Locations = () => {
  const [locations, setLocations] = useState(() => getLocations());
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLocationsUpdated = useCallback(() => {
    setLocations(getLocations());
  }, []);

  return (
    <div className="page-container" style={{ position: 'relative' }}>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Our Locations</h1>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--primary-berry)', margin: '0 auto' }}></div>
        <p className="text-muted mt-3">Find a PromisePour store near you or order delivery within our delivery zones.</p>
      </div>

      <div className="row g-4">
        {locations.map((loc) => (
          <div key={loc.id || loc.city} className="col-md-4">
            <div className="card h-100 border-0 rounded-4 p-4" style={{
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-sm)',
              border: loc.active ? '1px solid rgba(158, 27, 70, 0.05)' : 'none',
              opacity: loc.active ? 1 : 0.7
            }}>
              <h5 className="fw-bold mb-2">{loc.city}</h5>
              <p className="text-muted small mb-3">{loc.address}</p>
              <div className="mt-auto">
                <span className="badge" style={{
                  backgroundColor: loc.active ? 'rgba(74, 124, 89, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                  color: loc.active ? 'var(--leaf-green)' : 'var(--text-muted)',
                  fontWeight: '600'
                }}>{loc.active ? 'Open for Orders' : 'Coming Soon'}</span>
                <div className="text-muted small mt-2">Hours: {loc.times}</div>
              </div>
            </div>
          </div>
        ))}
        {locations.length === 0 && (
          <div className="col-12 text-center text-muted my-5">
            <p>No locations available yet.</p>
          </div>
        )}
      </div>

      {/* ── Floating Admin Button ── */}
      <button
        className="menu-manage-btn"
        onClick={() => setShowAdmin(true)}
        aria-label="Open locations admin panel"
        id="locations-admin-btn"
        title="Manage Locations (Admin)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Manage Locations</span>
      </button>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <AdminLocationPanel
          onClose={() => setShowAdmin(false)}
          onLocationsUpdated={handleLocationsUpdated}
        />
      )}
    </div>
  );
};

export default Locations;
