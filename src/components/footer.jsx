import React, { useState, useCallback } from 'react';
import { getSocials } from '../utils/socialStore';
import AdminSocialPanel from './AdminSocialPanel';

const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [socials, setSocials] = useState(() => getSocials());
  const [showAdmin, setShowAdmin] = useState(false);

  const handleSocialsUpdated = useCallback(() => {
    setSocials(getSocials());
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      alert(`Thank you for subscribing to the PromisePour newsletter! 🍓`);
      setEmail('');
    }
  };

  const handleLinkClick = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case 'tiktok':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        );
      case 'whatsapp':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        );
      case 'x (twitter)':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.73 16h5L9 4H4z" />
            <path d="M4 20l6.76-6.76" />
            <path d="M20 4l-6.76 6.76" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        );
    }
  };

  return (
    <footer className="promisepour-footer" style={{ position: 'relative' }}>
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Column 1: Brand Logo & Socials */}
            <div className="footer-col brand-col">
              <div className="footer-logo" onClick={() => handleLinkClick('home')} style={{ cursor: 'pointer' }}>
                <div className="logo-text-wrapper">
                  <div className="d-flex align-items-center gap-2">
                    <span className="logo-title">PromisePour</span>
                    <div className="logo-graphics">
                      <svg width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Heart-Shaped Apple Outline */}
                        <path 
                          d="M18 31C18 31 7 24 7 14.5C7 9.5 11 6.5 15.5 7.5C16.8 7.8 17.5 8.5 18 9C18.5 8.5 19.2 7.8 20.5 7.5C25 6.5 29 9.5 29 14.5C29 24 18 31 18 31Z" 
                          stroke="var(--primary-berry)" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          fill="none" 
                        />
                        {/* Delicate Inner Fill */}
                        <path 
                          d="M18 26C18 26 10 20.5 10 14.5C10 11 12.5 9 15.5 9.5C16.3 9.7 17 10.3 18 11C19 10.3 19.7 9.7 20.5 9.5C23.5 9 26 11 26 14.5C26 20.5 18 26 18 26Z" 
                          fill="var(--primary-berry)" 
                          opacity="0.15" 
                        />
                        {/* Organic Green Leaf */}
                        <path 
                          d="M18 7C16.5 4.5 14 3.5 11.5 4C12 6.5 14.5 8 16 8" 
                          stroke="var(--leaf-green)" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                        {/* Leaf Center Stroke */}
                        <path 
                          d="M13.5 5.5C14.5 6 15.5 6.8 16 7.5" 
                          stroke="var(--leaf-green)" 
                          strokeWidth="1.2" 
                          strokeLinecap="round" 
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="logo-subtitle">Yoghurt & Parfaits</span>
                </div>
              </div>
              <p className="brand-tagline">Pour Happiness. Every Time.</p>
              
              <div className="social-links">
                {socials.filter(s => s.active).map((social) => (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-icon-link"
                    aria-label={social.platform}
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-links-list">
                <li><span onClick={() => handleLinkClick('menu')} className="footer-link">Menu</span></li>
                <li><span onClick={() => handleLinkClick('build-parfait')} className="footer-link">Build Your Parfait</span></li>
                <li><span onClick={() => handleLinkClick('about')} className="footer-link">About Us</span></li>
                <li><span onClick={() => handleLinkClick('locations')} className="footer-link">Locations</span></li>
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">Contact</span></li>
              </ul>
            </div>

            {/* Column 3: Help */}
            <div className="footer-col">
              <h3 className="footer-heading">Help</h3>
              <ul className="footer-links-list">
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">FAQs</span></li>
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">Delivery & Shipping</span></li>
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">Returns</span></li>
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">Privacy Policy</span></li>
                <li><span onClick={() => handleLinkClick('contact')} className="footer-link">Terms & Conditions</span></li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="footer-col">
              <h3 className="footer-heading">Contact Us</h3>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <a href="tel:+2349012345678" className="contact-link-item">+234 901 234 5678</a>
                </li>
                <li className="footer-contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <a href="mailto:Osunlekepro@gmail.com" className="contact-link-item">Osunlekepro@gmail.com</a>
                </li>
                <li className="footer-contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <a href="https://maps.google.com/?q=Lagos,+Nigeria" target="_blank" rel="noopener noreferrer" className="contact-link-item">Lagos, Nigeria</a>
                </li>
              </ul>
            </div>

            {/* Column 5: Join the Family */}
            <div className="footer-col newsletter-col">
              <h3 className="footer-heading">Join the PromisePour Family</h3>
              <p className="newsletter-desc">Get updates, offers & more.</p>
              <form onSubmit={handleSubscribe} className="footer-subscribe-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-subscribe-input"
                  required
                />
                <button type="submit" className="footer-subscribe-button">Subscribe</button>
              </form>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer Bottom copyright bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-flex">
            <p className="footer-copyright">© {new Date().getFullYear()} PromisePour. All rights reserved.</p>
            <p className="footer-tag">Made with <span className="heart-icon">❤️</span> for a healthier you.</p>
          </div>
        </div>
      </div>

      {/* ── Floating Admin Button for Footer ── */}
      <button
        className="menu-manage-btn"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 10
        }}
        onClick={() => setShowAdmin(true)}
        aria-label="Open social links admin panel"
        id="socials-admin-btn"
        title="Manage Social Links (Admin)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Manage Socials</span>
      </button>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <AdminSocialPanel
          onClose={() => setShowAdmin(false)}
          onSocialsUpdated={handleSocialsUpdated}
        />
      )}
    </footer>
  );
};

export default Footer;
