import React, { useState, useEffect } from 'react';
import { getBuildOptions, saveBuildOptions } from '../utils/buildStore';

const ADMIN_PASSWORD = 'promisepour2026';

const AdminBuildPanel = ({ onClose, onOptionsUpdated }) => {
  const [view, setView] = useState('password'); // 'password' | 'manage'
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const [options, setOptions] = useState({
    bases: [], fruits: [], crunches: [], drizzles: []
  });

  const [newInputs, setNewInputs] = useState({
    bases: '', fruits: '', crunches: '', drizzles: ''
  });

  useEffect(() => {
    if (view === 'manage') {
      setOptions(getBuildOptions());
    }
  }, [view]);

  // Trap focus inside drawer on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* ── Password ── */
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setPasswordError(false);
      setView('manage');
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  /* ── CRUD helpers ── */
  const handleAdd = (category) => {
    const value = newInputs[category].trim();
    if (!value) return;

    const updatedOptions = {
      ...options,
      [category]: [...options[category], value]
    };

    setOptions(updatedOptions);
    saveBuildOptions(updatedOptions);
    setNewInputs(prev => ({ ...prev, [category]: '' }));
    onOptionsUpdated?.();
  };

  const handleDelete = (category, indexToRemove) => {
    const updatedOptions = {
      ...options,
      [category]: options[category].filter((_, idx) => idx !== indexToRemove)
    };

    setOptions(updatedOptions);
    saveBuildOptions(updatedOptions);
    onOptionsUpdated?.();
  };

  const handleInputChange = (category, value) => {
    setNewInputs(prev => ({ ...prev, [category]: value }));
  };

  const renderCategorySection = (title, categoryKey, placeholder) => (
    <div className="mb-4">
      <h3 className="fw-bold fs-5 mb-3" style={{ color: 'var(--primary-berry)' }}>{title}</h3>
      
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="admin-input"
          value={newInputs[categoryKey]}
          onChange={(e) => handleInputChange(categoryKey, e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd(categoryKey)}
        />
        <button 
          className="admin-btn-primary" 
          style={{ padding: '0 20px', flex: 'none' }}
          onClick={() => handleAdd(categoryKey)}
        >
          Add
        </button>
      </div>

      <ul className="admin-item-list">
        {options[categoryKey].length === 0 ? (
          <li className="text-muted small py-2 text-center border rounded-3 bg-light">No options added yet</li>
        ) : (
          options[categoryKey].map((item, idx) => (
            <li key={idx} className="admin-item-row p-2 px-3">
              <span className="admin-item-name">{item}</span>
              <button
                className="admin-icon-btn admin-icon-btn--delete ms-auto"
                onClick={() => handleDelete(categoryKey, idx)}
                aria-label={`Delete ${item}`}
                title="Delete"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <>
      <div className="admin-overlay" onClick={view === 'password' ? onClose : undefined} aria-hidden="true" />

      {/* ── Password Gate ── */}
      {view === 'password' && (
        <div className="admin-password-card" role="dialog" aria-modal="true" aria-label="Admin Login">
          <div className="admin-pw-icon-ring">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="admin-pw-title">Admin Access</h2>
          <p className="admin-pw-sub">Enter your password to manage parfait options</p>

          <form onSubmit={handlePasswordSubmit} noValidate>
            <div className="admin-pw-input-wrap">
              <input
                id="admin-password-field"
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
                placeholder="Enter password"
                className={`admin-input${passwordError ? ' admin-input--error' : ''}`}
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
            {passwordError && (
              <p className="admin-error-msg" role="alert">Incorrect password. Please try again.</p>
            )}
            <button type="submit" className="admin-btn-primary admin-btn--full">
              Unlock Admin Panel
            </button>
          </form>
          <button type="button" className="admin-cancel-link" onClick={onClose}>Cancel</button>
        </div>
      )}

      {/* ── Admin Drawer ── */}
      {view === 'manage' && (
        <div className="admin-drawer" role="dialog" aria-modal="true" aria-label="Parfait Admin Panel">
          <div className="admin-drawer-header">
            <div className="admin-drawer-title-block">
              <h2 className="admin-drawer-title">Manage Parfait Options</h2>
            </div>
            <button type="button" className="admin-close-btn" onClick={onClose} aria-label="Close admin panel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="admin-drawer-body">
            {renderCategorySection('Yoghurt Bases', 'bases', 'e.g. Vanilla Infused')}
            <hr className="my-4 text-muted opacity-25" />
            {renderCategorySection('Fresh Fruits', 'fruits', 'e.g. Ripe Mango Slices 🥭')}
            <hr className="my-4 text-muted opacity-25" />
            {renderCategorySection('Crunch & Granola', 'crunches', 'e.g. Choco-Oat Crisp')}
            <hr className="my-4 text-muted opacity-25" />
            {renderCategorySection('Drizzles', 'drizzles', 'e.g. Organic Raw Honey')}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBuildPanel;
