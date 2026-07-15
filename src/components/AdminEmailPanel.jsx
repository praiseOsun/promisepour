import React, { useState, useEffect } from 'react';
import { getEmailSettings, saveEmailSettings } from '../utils/emailStore';

const ADMIN_PASSWORD = 'promisepour2026';

const AdminEmailPanel = ({ onClose, onSettingsUpdated }) => {
  const [view, setView] = useState('password'); // 'password' | 'form'
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const [form, setForm] = useState({
    serviceId: '',
    templateId: '',
    publicKey: '',
    recipientEmail: 'osunlekepro@gmail.com'
  });
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (view === 'form') {
      setForm(getEmailSettings());
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
      setView('form');
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    try {
      saveEmailSettings(form);
      setSaveSuccess(true);
      setSaveError('');
      onSettingsUpdated?.();
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1500);
    } catch {
      setSaveError('Save failed. Please check local storage permissions.');
    }
  };

  const setField = (field, value) => {
    setSaveError('');
    setSaveSuccess(false);
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="admin-overlay"
        onClick={view === 'password' ? onClose : undefined}
        aria-hidden="true"
      />

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
          <p className="admin-pw-sub">Enter your password to manage contact form settings</p>

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
            <button type="submit" className="admin-btn-primary admin-btn--full" id="admin-login-btn">
              Unlock Settings
            </button>
          </form>
          <button type="button" className="admin-cancel-link" onClick={onClose}>Cancel</button>
        </div>
      )}

      {/* ── Admin Drawer ── */}
      {view === 'form' && (
        <div className="admin-drawer" role="dialog" aria-modal="true" aria-label="Email Settings Admin Panel">

          {/* Drawer Header */}
          <div className="admin-drawer-header">
            <div className="admin-drawer-title-block">
              <h2 className="admin-drawer-title">Email Delivery Settings</h2>
              <span className="admin-item-count">Configure EmailJS integration</span>
            </div>
            <button
              type="button"
              className="admin-close-btn"
              onClick={onClose}
              aria-label="Close admin panel"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Body */}
          <div className="admin-drawer-body">
            <p className="text-muted small mb-4">
              To send messages directly from the contact form, PromisePour uses <strong>EmailJS</strong>. 
              Leave these fields blank to fall back to the default <code>mailto:</code> link option.
            </p>

            <form onSubmit={handleFormSave} className="admin-form" noValidate>
              
              {/* Service ID */}
              <div className="admin-field">
                <label className="admin-label" htmlFor="admin-email-service">EmailJS Service ID</label>
                <input
                  id="admin-email-service"
                  type="text"
                  className="admin-input"
                  value={form.serviceId}
                  onChange={(e) => setField('serviceId', e.target.value)}
                  placeholder="e.g. service_xxxxxxx"
                />
              </div>

              {/* Template ID */}
              <div className="admin-field">
                <label className="admin-label" htmlFor="admin-email-template">EmailJS Template ID</label>
                <input
                  id="admin-email-template"
                  type="text"
                  className="admin-input"
                  value={form.templateId}
                  onChange={(e) => setField('templateId', e.target.value)}
                  placeholder="e.g. template_xxxxxxx"
                />
              </div>

              {/* Public Key */}
              <div className="admin-field">
                <label className="admin-label" htmlFor="admin-email-public-key">EmailJS Public Key</label>
                <input
                  id="admin-email-public-key"
                  type="text"
                  className="admin-input"
                  value={form.publicKey}
                  onChange={(e) => setField('publicKey', e.target.value)}
                  placeholder="e.g. your_public_key_xxxx"
                />
              </div>

              {/* Fallback Email */}
              <div className="admin-field">
                <label className="admin-label" htmlFor="admin-fallback-email">Fallback Destination Email</label>
                <input
                  id="admin-fallback-email"
                  type="email"
                  className="admin-input"
                  value={form.recipientEmail}
                  onChange={(e) => setField('recipientEmail', e.target.value)}
                  placeholder="osunlekepro@gmail.com"
                  required
                />
                <p className="text-muted small mt-1" style={{ fontSize: '0.75rem' }}>
                  Used as target for mailto: if EmailJS is not configured.
                </p>
              </div>

              {saveError && <p className="admin-error-msg" role="alert">{saveError}</p>}
              {saveSuccess && (
                <p className="text-success small fw-bold mb-3" role="alert">
                  ✅ Settings saved successfully!
                </p>
              )}

              <div className="admin-form-actions">
                <button type="button" className="admin-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary" id="admin-save-settings-btn">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEmailPanel;
