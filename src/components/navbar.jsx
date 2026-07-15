import React, { useState } from 'react';

const Navbar = ({ activePage, onNavigate, cart = [] }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'build-parfait', label: 'Build Your Parfait' },
    { id: 'about', label: 'About Us' },
    { id: 'locations', label: 'Locations' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (pageId) => {
    onNavigate(pageId);
    setIsDrawerOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const whatsappNumber = "2349027679677";

  const getWhatsappUrl = () => {
    if (!cart || cart.length === 0) {
      const defaultMsg = encodeURIComponent("Hello PromisePour! I'd like to place an order for delicious yoghurt and parfaits.");
      return `https://wa.me/${whatsappNumber}?text=${defaultMsg}`;
    }

    let message = "Hello PromisePour! I'd like to place an order for:\n\n";
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name} (${item.price})\n`;
    });

    const total = cart.reduce((sum, item) => {
      const priceNum = parseInt(item.price.replace(/[^\d]/g, ''));
      return sum + (priceNum * item.quantity);
    }, 0);

    message += `\nTotal: ₦${total.toLocaleString()}\n\nThank you!`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const whatsappUrl = getWhatsappUrl();

  return (
    <header className="promisepour-header">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span className="announcement-emoji" role="img" aria-label="megaphone">📣</span>
        <span>Slash in delivery fee on Orders Above ₦10,000</span>
      </div>

      {/* Main Navbar */}
      <div className="promisepour-navbar">

        {/* Brand Logo - Left */}
        <div className="logo-container" onClick={() => handleLinkClick('home')}>
          <div className="logo-text-wrapper">
            <div className="d-flex align-items-center gap-2">
              <h1 className="logo-title">PromisePour</h1>
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

        {/* Desktop Navigation Links - Center */}
        <nav>
          <ul className="nav-links-desktop">
            {navItems.map((item) => (
              <li key={item.id}>
                <span
                  onClick={() => handleLinkClick(item.id)}
                  className={`nav-item-link ${activePage === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons & Order CTA - Right */}
        <div className="nav-actions">
          {/* Search Action */}
          <button className="nav-icon-btn search-btn" aria-label="Search">
            <svg className="nav-icon-svg" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
          </button>

          {/* Profile Action */}
          <button className="nav-icon-btn profile-btn" aria-label="Account Profile">
            <svg className="nav-icon-svg" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart Action with Badge - Clicking routes to WhatsApp checkout with dynamic items list */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn cart-btn"
            aria-label={`Shopping Cart with ${cartCount} items`}
            style={{ textDecoration: 'none' }}
          >
            <svg className="nav-icon-svg" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>

          {/* Order Now WhatsApp CTA (Desktop) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.012 2C6.485 2 2 6.485 2 12.012c0 1.766.457 3.49 1.32 5.02L2 22l5.088-1.312a9.97 9.97 0 004.924 1.325h.004c5.526 0 10.012-4.485 10.012-10.011C22.028 6.486 17.54 2 12.012 2zm6.09 14.51c-.25.706-1.24 1.282-1.71 1.348-.47.065-.93.12-2.937-.692-2.56-1.04-4.17-3.66-4.298-3.83-.128-.17-.988-1.323-.988-2.527 0-1.203.626-1.794.85-2.036.223-.242.49-.301.65-.301.163 0 .326.002.468.008.148.006.348-.057.545.419.198.483.678 1.642.738 1.762.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.253.313-.36.42-.12.12-.245.251-.105.49.14.24.621.92 1.018 1.838.35.31.55.284.757.042.208-.24.898-1.043 1.142-1.402.245-.36.49-.3.826-.18.337.12 2.128 1.002 2.49 1.182.36.18.6.27.684.42.083.15.083.872-.167 1.577z" />
            </svg>
            <span>Order Now</span>
          </a>

          {/* Hamburger Mobile Toggle Trigger */}
          <button
            className={`mobile-toggle-btn ${isDrawerOpen ? 'open' : ''}`}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isDrawerOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-out Menu Overlay */}
      <div
        className={`mobile-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      {/* Mobile Sliding Drawer Menu */}
      <div className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <span
                onClick={() => handleLinkClick(item.id)}
                className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          {/* Mobile Profile Link */}
          <span
            className="mobile-nav-link text-muted"
            onClick={() => handleLinkClick('contact')}
            style={{ fontSize: '1rem', border: 'none', cursor: 'pointer' }}
          >
            👤 My Account
          </span>

          {/* Order Now WhatsApp CTA (Mobile) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn justify-content-center"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12.012 2C6.485 2 2 6.485 2 12.012c0 1.766.457 3.49 1.32 5.02L2 22l5.088-1.312a9.97 9.97 0 004.924 1.325h.004c5.526 0 10.012-4.485 10.012-10.011C22.028 6.486 17.54 2 12.012 2zm6.09 14.51c-.25.706-1.24 1.282-1.71 1.348-.47.065-.93.12-2.937-.692-2.56-1.04-4.17-3.66-4.298-3.83-.128-.17-.988-1.323-.988-2.527 0-1.203.626-1.794.85-2.036.223-.242.49-.301.65-.301.163 0 .326.002.468.008.148.006.348-.057.545.419.198.483.678 1.642.738 1.762.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.253.313-.36.42-.12.12-.245.251-.105.49.14.24.621.92 1.018 1.838.35.31.55.284.757.042.208-.24.898-1.043 1.142-1.402.245-.36.49-.3.826-.18.337.12 2.128 1.002 2.49 1.182.36.18.6.27.684.42.083.15.083.872-.167 1.577z" />
            </svg>
            <span>Order Now</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
