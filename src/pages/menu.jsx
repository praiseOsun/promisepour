import React, { useState, useCallback } from 'react';
import { getMenuItems } from '../utils/menuStore';
import AdminMenuPanel from '../components/AdminMenuPanel';

const TABS = ['All', 'Parfaits', 'Yoghurts', 'Specials'];

const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState(() => getMenuItems());
  const [activeTab, setActiveTab] = useState('All');
  const [showAdmin, setShowAdmin] = useState(false);
  const [addedItemId, setAddedItemId] = useState(null);

  /** Called by AdminMenuPanel after any change so the grid refreshes instantly */
  const handleMenuUpdated = useCallback(() => {
    setMenuItems(getMenuItems());
  }, []);

  const handleAddToCart = (item) => {
    addToCart?.(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  const filtered =
    activeTab === 'All' ? menuItems : menuItems.filter((i) => i.category === activeTab);

  return (
    <section className="menu-section" aria-labelledby="menu-page-heading">

      {/* ── Page Header ── */}
      <div className="menu-page-header">
        <span className="menu-page-subtitle">Curated For You —</span>
        <h1 id="menu-page-heading" className="menu-page-title">Our Full Menu</h1>
        <p className="menu-page-desc">
          Savour our curated collection of artisan yoghurts and signature layered parfaits, crafted fresh with every order.
        </p>
        <div className="menu-page-divider" aria-hidden="true" />
      </div>

      {/* ── Category Tabs ── */}
      <div className="menu-tabs" role="tablist" aria-label="Filter menu by category">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`menu-tab${activeTab === tab ? ' menu-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
            id={`menu-tab-${tab.toLowerCase()}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Item Grid ── */}
      {filtered.length === 0 ? (
        <div className="menu-empty-state" role="status">
          <span className="menu-empty-icon" aria-hidden="true">🍽</span>
          <p className="menu-empty-title">No items here yet</p>
          <p className="menu-empty-sub">Use the admin panel to add items to this category.</p>
        </div>
      ) : (
        <div className="menu-grid" role="list">
          {filtered.map((item) => {
            const isAdded = addedItemId === item.id;
            return (
              <article key={item.id} className="menu-card" role="listitem">
                {/* Image */}
                <div className="menu-card-img-wrapper">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="menu-card-img-placeholder" aria-hidden="true">
                      <span>🍽</span>
                    </div>
                  )}
                  <span className="menu-category-pill">{item.category}</span>
                </div>

                {/* Content */}
                <div className="menu-card-content">
                  <h3 className="menu-card-title">{item.name}</h3>
                  <p className="menu-card-desc">{item.desc}</p>
                  <div className="menu-card-price">{item.price}</div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`menu-btn-cart${isAdded ? ' menu-btn-cart--added' : ''}`}
                    aria-label={`Add ${item.name} to cart`}
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      <>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Floating Admin Button ── */}
      <button
        className="menu-manage-btn"
        onClick={() => setShowAdmin(true)}
        aria-label="Open menu admin panel"
        id="menu-admin-btn"
        title="Manage Menu (Admin)"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Manage Menu</span>
      </button>

      {/* ── Admin Panel ── */}
      {showAdmin && (
        <AdminMenuPanel
          onClose={() => setShowAdmin(false)}
          onMenuUpdated={handleMenuUpdated}
        />
      )}
    </section>
  );
};

export default Menu;
