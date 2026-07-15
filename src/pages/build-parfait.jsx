import React, { useState, useEffect } from 'react';
import { getBuildOptions } from '../utils/buildStore';
import AdminBuildPanel from '../components/AdminBuildPanel';

const BuildParfait = () => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    base: '',
    fruits: [],
    crunch: '',
    drizzle: ''
  });
  
  const [options, setOptions] = useState(() => getBuildOptions());
  const [showAdmin, setShowAdmin] = useState(false);

  const toggleFruit = (fruit) => {
    if (selection.fruits.includes(fruit)) {
      setSelection({ ...selection, fruits: selection.fruits.filter(f => f !== fruit) });
    } else {
      setSelection({ ...selection, fruits: [...selection.fruits, fruit] });
    }
  };

  const handleOptionsUpdated = () => {
    setOptions(getBuildOptions());
    // Optional: Reset selections if an option was deleted while selected
    // For simplicity, we just leave it for now.
  };

  return (
    <div className="page-container position-relative">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Build Your Parfait</h1>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--primary-berry)', margin: '0 auto' }}></div>
        <p className="text-muted mt-3">Design your custom jar of bliss exactly the way you love it!</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 rounded-4 p-4 p-md-5" style={{ backgroundColor: '#ffffff', boxShadow: 'var(--shadow-md)' }}>

            {/* Steps navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem', gap: '4px' }}>
              {['1. Base', '2. Fruits', '3. Crunch'].map((t, idx) => (
                <div key={idx} className="fw-bold text-center" style={{
                  color: step === (idx + 1) ? 'var(--primary-berry)' : 'var(--text-muted)',
                  fontSize: '0.82rem',
                  flex: '1',
                  padding: '0 2px',
                  wordBreak: 'break-word'
                }}>
                  {t}
                </div>
              ))}
            </div>

            {/* Step 1: Base */}
            {step === 1 && (
              <div>
                <h5 className="fw-bold mb-3">Choose Your Yoghurt Base:</h5>
                <div className="d-flex flex-column gap-2 mb-4">
                  {options.bases.length === 0 && <p className="text-muted">No bases available.</p>}
                  {options.bases.map((base, idx) => (
                    <label key={idx} className="p-3 rounded-3 border d-flex align-items-center gap-3 cursor-pointer" style={{
                      borderColor: selection.base === base ? 'var(--primary-berry)' : '#e0e0e0',
                      backgroundColor: selection.base === base ? 'rgba(158, 27, 70, 0.02)' : 'transparent',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="base"
                        checked={selection.base === base}
                        onChange={() => setSelection({ ...selection, base })}
                        style={{ accentColor: 'var(--primary-berry)' }}
                      />
                      <span className="fw-semibold">{base}</span>
                    </label>
                  ))}
                </div>
                <button
                  disabled={!selection.base}
                  onClick={() => setStep(2)}
                  className="btn w-100 py-3 rounded-pill fw-bold text-white"
                  style={{ backgroundColor: 'var(--primary-berry)' }}
                >
                  Next Step: Fruits 🍓
                </button>
              </div>
            )}

            {/* Step 2: Fruits */}
            {step === 2 && (
              <div>
                <h5 className="fw-bold mb-3">Select Fruits (Choose multiple):</h5>
                <div className="row g-2 mb-4">
                  {options.fruits.length === 0 && <p className="text-muted ms-2">No fruits available.</p>}
                  {options.fruits.map((fruit, idx) => (
                    <div key={idx} className="col-12 col-sm-6">
                      <div
                        onClick={() => toggleFruit(fruit)}
                        className="p-3 rounded-3 border text-center fw-semibold cursor-pointer"
                        style={{
                          borderColor: selection.fruits.includes(fruit) ? 'var(--primary-berry)' : '#e0e0e0',
                          backgroundColor: selection.fruits.includes(fruit) ? 'rgba(158, 27, 70, 0.04)' : 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        {fruit}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button onClick={() => setStep(1)} className="btn btn-light w-100 py-3 rounded-pill fw-bold">Back</button>
                  <button
                    disabled={selection.fruits.length === 0}
                    onClick={() => setStep(3)}
                    className="btn w-100 py-3 rounded-pill fw-bold text-white"
                    style={{ backgroundColor: 'var(--primary-berry)' }}
                  >
                    Next Step: Crunch ✨
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Crunch */}
            {step === 3 && (
              <div>
                <h5 className="fw-bold mb-3">Add Grains & Drizzle:</h5>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted uppercase">Granola & Grains</label>
                  <select
                    className="form-select py-3 rounded-3 mb-3"
                    value={selection.crunch}
                    onChange={(e) => setSelection({ ...selection, crunch: e.target.value })}
                  >
                    <option value="">Select Granola Option</option>
                    {options.crunches.map((crunch, idx) => (
                      <option key={idx} value={crunch}>{crunch}</option>
                    ))}
                  </select>

                  <label className="form-label small fw-bold text-muted uppercase">Pure Drizzle</label>
                  <select
                    className="form-select py-3 rounded-3"
                    value={selection.drizzle}
                    onChange={(e) => setSelection({ ...selection, drizzle: e.target.value })}
                  >
                    <option value="">Select Drizzle Option</option>
                    {options.drizzles.map((drizzle, idx) => (
                      <option key={idx} value={drizzle}>{drizzle}</option>
                    ))}
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button onClick={() => setStep(2)} className="btn btn-light w-50 py-3 rounded-pill fw-bold">Back</button>
                  <a
                    href={`https://wa.me/2349027679677?text=Hello!%20I'd%20like%20to%20order%20a%20Custom%20Parfait%20with:%0A-%20Base:%20${encodeURIComponent(selection.base)}%0A-%20Fruits:%20${encodeURIComponent(selection.fruits.join(', '))}%0A-%20Granola:%20${encodeURIComponent(selection.crunch)}%0A-%20Drizzle:%20${encodeURIComponent(selection.drizzle)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-50 py-3 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: 'var(--primary-berry)' }}
                  >
                    Order custom via WhatsApp
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      {/* ── Floating Admin / Manage Button ── */}
      <button
        className="menu-manage-btn"
        onClick={() => setShowAdmin(true)}
        aria-label="Open parfait options admin panel"
        id="build-admin-btn"
        title="Manage Parfait Options (Admin)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Manage Options</span>
      </button>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <AdminBuildPanel
          onClose={() => setShowAdmin(false)}
          onOptionsUpdated={handleOptionsUpdated}
        />
      )}
    </div>
  );
};

export default BuildParfait;
