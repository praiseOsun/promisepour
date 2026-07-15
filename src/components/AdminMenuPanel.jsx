import React, { useState, useEffect, useRef } from 'react';
import { getMenuItems, saveMenuItems } from '../utils/menuStore';

const ADMIN_PASSWORD = 'promisepour2026';
const CATEGORIES = ['Parfaits', 'Yoghurts', 'Specials'];
const emptyForm = { name: '', desc: '', price: '', category: 'Parfaits', image: '' };

const AdminMenuPanel = ({ onClose, onMenuUpdated }) => {
  const [view, setView] = useState('password'); // 'password' | 'list' | 'form'
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState('');
  const [saveError, setSaveError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (view === 'list') setItems(getMenuItems());
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
      setView('list');
    } else {
      setPasswordError(true);
      setPasswordInput('');
    }
  };

  /* ── CRUD helpers ── */
  const openAdd = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setImagePreview('');
    setSaveError('');
    setView('form');
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, desc: item.desc, price: item.price, category: item.category, image: item.image });
    setImagePreview(item.image || '');
    setSaveError('');
    setView('form');
  };

  const confirmDelete = (id) => setDeleteConfirm(id);

  const handleDelete = (id) => {
    const updated = items.filter((i) => i.id !== id);
    try {
      saveMenuItems(updated);
      setItems(updated);
      setDeleteConfirm(null);
      onMenuUpdated?.();
    } catch {
      setSaveError('Failed to delete item. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setForm((f) => ({ ...f, image: base64 }));
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price.trim()) {
      setSaveError('Item name and price are required.');
      return;
    }
    let updated;
    if (editingItem) {
      updated = items.map((i) => (i.id === editingItem.id ? { ...i, ...form } : i));
    } else {
      updated = [...items, { id: `item_${Date.now()}`, ...form }];
    }
    try {
      saveMenuItems(updated);
      setItems(updated);
      onMenuUpdated?.();
      setView('list');
    } catch {
      setSaveError('Save failed — image may be too large. Try a smaller photo (under 1 MB).');
    }
  };

  const setField = (field, value) => {
    setSaveError('');
    setForm((f) => ({ ...f, [field]: value }));
  };

  /* ── Render ── */
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
          <p className="admin-pw-sub">Enter your password to manage the menu</p>

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
              Unlock Admin Panel
            </button>
          </form>
          <button type="button" className="admin-cancel-link" onClick={onClose}>Cancel</button>
        </div>
      )}

      {/* ── Admin Drawer ── */}
      {(view === 'list' || view === 'form') && (
        <div className="admin-drawer" role="dialog" aria-modal="true" aria-label="Menu Admin Panel">

          {/* Drawer Header */}
          <div className="admin-drawer-header">
            {view === 'form' && (
              <button
                type="button"
                className="admin-back-btn"
                onClick={() => setView('list')}
                aria-label="Back to item list"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}
            <div className="admin-drawer-title-block">
              <h2 className="admin-drawer-title">
                {view === 'list' ? 'Menu Manager' : editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              {view === 'list' && (
                <span className="admin-item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
              )}
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

          {/* ── LIST VIEW ── */}
          {view === 'list' && (
            <div className="admin-drawer-body">
              <button
                type="button"
                className="admin-btn-primary admin-add-btn"
                onClick={openAdd}
                id="admin-add-item-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Item
              </button>

              {items.length === 0 && (
                <p className="admin-empty-msg">No items yet. Click "Add New Item" to get started.</p>
              )}

              <ul className="admin-item-list" aria-label="Menu items">
                {items.map((item) => (
                  <li key={item.id} className="admin-item-row">
                    <div className="admin-item-thumb-wrap">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="admin-item-thumb" />
                      ) : (
                        <div className="admin-item-thumb-placeholder" aria-hidden="true">🍽</div>
                      )}
                    </div>
                    <div className="admin-item-info">
                      <span className="admin-item-name">{item.name}</span>
                      <div className="admin-item-meta">
                        <span className="admin-cat-pill">{item.category}</span>
                        <span className="admin-item-price">{item.price}</span>
                      </div>
                    </div>
                    <div className="admin-item-actions">
                      {deleteConfirm === item.id ? (
                        <div className="admin-delete-confirm">
                          <span>Delete?</span>
                          <button
                            className="admin-btn-yes"
                            onClick={() => handleDelete(item.id)}
                            aria-label={`Confirm delete ${item.name}`}
                          >Yes</button>
                          <button
                            className="admin-btn-no"
                            onClick={() => setDeleteConfirm(null)}
                            aria-label="Cancel delete"
                          >No</button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="admin-icon-btn admin-icon-btn--edit"
                            onClick={() => openEdit(item)}
                            aria-label={`Edit ${item.name}`}
                            title="Edit"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            className="admin-icon-btn admin-icon-btn--delete"
                            onClick={() => confirmDelete(item.id)}
                            aria-label={`Delete ${item.name}`}
                            title="Delete"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── FORM VIEW ── */}
          {view === 'form' && (
            <div className="admin-drawer-body">
              <form onSubmit={handleFormSave} className="admin-form" noValidate>

                {/* Image Upload */}
                <div className="admin-field">
                  <label className="admin-label">Product Image</label>
                  <div
                    className={`admin-file-drop${imagePreview ? ' admin-file-drop--has-image' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload product image"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="admin-img-preview" />
                    ) : (
                      <div className="admin-file-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Click to upload photo</span>
                        <small>JPG, PNG, WEBP — recommended under 1 MB</small>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="admin-file-input-hidden"
                    id="admin-image-upload"
                    aria-label="Choose product image file"
                  />
                  {imagePreview && (
                    <button
                      type="button"
                      className="admin-remove-img-btn"
                      onClick={() => { setImagePreview(''); setField('image', ''); }}
                    >
                      Remove image
                    </button>
                  )}
                </div>

                {/* Item Name */}
                <div className="admin-field">
                  <label className="admin-label" htmlFor="admin-item-name">Item Name <span aria-hidden="true">*</span></label>
                  <input
                    id="admin-item-name"
                    type="text"
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="e.g. Mango Burst Parfait"
                    required
                  />
                </div>

                {/* Category */}
                <div className="admin-field">
                  <label className="admin-label" htmlFor="admin-item-category">Category <span aria-hidden="true">*</span></label>
                  <select
                    id="admin-item-category"
                    className="admin-input admin-select"
                    value={form.category}
                    onChange={(e) => setField('category', e.target.value)}
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div className="admin-field">
                  <label className="admin-label" htmlFor="admin-item-desc">Description</label>
                  <textarea
                    id="admin-item-desc"
                    className="admin-input admin-textarea"
                    value={form.desc}
                    onChange={(e) => setField('desc', e.target.value)}
                    placeholder="Describe the ingredients and taste…"
                    rows={3}
                  />
                </div>

                {/* Price */}
                <div className="admin-field">
                  <label className="admin-label" htmlFor="admin-item-price">Price <span aria-hidden="true">*</span></label>
                  <input
                    id="admin-item-price"
                    type="text"
                    className="admin-input"
                    value={form.price}
                    onChange={(e) => setField('price', e.target.value)}
                    placeholder="e.g. ₦3,500"
                    required
                  />
                </div>

                {saveError && <p className="admin-error-msg" role="alert">{saveError}</p>}

                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-secondary" onClick={() => setView('list')}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-primary" id="admin-save-item-btn">
                    {editingItem ? 'Save Changes' : 'Add to Menu'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdminMenuPanel;
