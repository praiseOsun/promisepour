import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { getEmailSettings } from '../utils/emailStore';
import AdminEmailPanel from '../components/AdminEmailPanel';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sentViaEmailJS, setSentViaEmailJS] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [hasKeys, setHasKeys] = useState(false);

  useEffect(() => {
    // Check if EmailJS is configured
    const settings = getEmailSettings();
    if (settings.serviceId && settings.templateId && settings.publicKey) {
      setHasKeys(true);
    } else {
      setHasKeys(false);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSettingsUpdated = () => {
    const settings = getEmailSettings();
    if (settings.serviceId && settings.templateId && settings.publicKey) {
      setHasKeys(true);
    } else {
      setHasKeys(false);
    }
  };

  const triggerMailtoFallback = (name, email, message, toEmail) => {
    const subject = encodeURIComponent(`PromisePour Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSent(false);
    setSentViaEmailJS(false);

    const settings = getEmailSettings();
    const { serviceId, templateId, publicKey, recipientEmail } = settings;

    if (serviceId && templateId && publicKey) {
      setSubmitting(true);
      
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: recipientEmail,
      };

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then(() => {
          setSubmitting(false);
          setSent(true);
          setSentViaEmailJS(true);
          setForm({ name: '', email: '', message: '' });
        })
        .catch((err) => {
          console.error('EmailJS Error:', err);
          setSubmitting(false);
          setError('Could not deliver directly. Opening your mail app instead...');
          
          // Gracefully fallback to mailto
          setTimeout(() => {
            triggerMailtoFallback(form.name, form.email, form.message, recipientEmail);
            setForm({ name: '', email: '', message: '' });
            setSent(true);
            setError('');
          }, 2000);
        });
    } else {
      // Direct mailto fallback
      triggerMailtoFallback(form.name, form.email, form.message, recipientEmail);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="page-container">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Contact Us</h1>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--primary-berry)', margin: '0 auto' }}></div>
        <p className="text-muted mt-3">We would love to hear from you. Get in touch with us today!</p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-lg-6">
          <div className="card border-0 rounded-4 p-4 p-md-5" style={{ backgroundColor: '#ffffff', boxShadow: 'var(--shadow-md)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0" style={{ color: 'var(--primary-berry)' }}>Send us a message</h4>
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1"
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}
                onClick={() => setShowAdmin(true)}
                title="Manage Email Settings"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Email Settings</span>
              </button>
            </div>

            {sent && (
              <div className="mb-4 p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(78,135,82,0.08)', border: '1px solid rgba(78,135,82,0.2)', color: '#4E8752' }}>
                {sentViaEmailJS ? (
                  <>
                    <strong>✅ Message Sent Successfully!</strong><br />
                    <span style={{ fontSize: '0.9rem' }}>Thank you for reaching out. We will get back to you shortly.</span>
                  </>
                ) : (
                  <>
                    <strong>✅ Your email app should have opened!</strong><br />
                    <span style={{ fontSize: '0.9rem' }}>Just hit Send in your email app and we'll get back to you shortly.</span>
                  </>
                )}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.2)', color: '#dc3545' }}>
                <strong>⚠️ {error}</strong>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control py-2 rounded-3"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control py-2 rounded-3"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Message</label>
                <textarea
                  name="message"
                  className="form-control rounded-3"
                  rows="4"
                  placeholder="Your feedback or query..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn w-100 py-3 rounded-pill fw-bold text-white mt-2"
                style={{ backgroundColor: 'var(--primary-berry)' }}
                disabled={submitting}
              >
                {submitting && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                )}
                {submitting ? 'Sending Message...' : 'Submit Message'}
              </button>
              <p className="text-muted text-center mt-3" style={{ fontSize: '0.8rem' }}>
                {hasKeys 
                  ? 'Your message will be sent directly to us from the browser.' 
                  : 'Clicking submit will open your email app with your message pre-filled.'
                }
              </p>
            </form>
          </div>
        </div>
      </div>


      {/* ── Admin Panel ── */}
      {showAdmin && (
        <AdminEmailPanel
          onClose={() => setShowAdmin(false)}
          onSettingsUpdated={handleSettingsUpdated}
        />
      )}
    </div>
  );
};

export default Contact;


