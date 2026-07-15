import React, { useState } from 'react';

const TopPicks = ({ onNavigate, addToCart }) => {
  const [addedItemId, setAddedItemId] = useState(null);

  const topPickProducts = [
    {
      id: 'berry_bliss',
      name: 'Berry Bliss Parfait',
      desc: 'Cashew nut, grape, coconut flakes, almond, strawberries, apply, milky_youghurt',
      price: '₦5,500',
      image: '/berry_bliss.png'
    },
    {
      id: 'vanilla_delight',
      name: 'Vanilla Delight',
      desc: 'Creamy vanilla flavored youghurt',
      price: '₦2,500',
      image: '/vanilla_delight.png'
    },
    {
      id: 'Plain_sweetened',
      name: 'Plain Sweetened',
      desc: 'Creamy sweetened youghurt.',
      price: '₦2,500',
      image: '/plain_sweetened.png'
    },
    {
      id: 'strawberry_dream',
      name: 'Strawberry Dream',
      desc: 'Creamy strawberry flavored yoghurt.',
      price: '₦2,500',
      image: '/milky_yoghurt.png'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItemId(product.id);
    setTimeout(() => {
      setAddedItemId(null);
    }, 1500);
  };

  return (
    <section className="toppicks-section" aria-labelledby="top-picks-heading">
      {/* Header Row */}
      <div className="toppicks-header-row">
        <div className="toppicks-header-left">
          <span className="toppicks-subtitle">Our Favorites —</span>
          <h2 id="top-picks-heading" className="toppicks-title">Top Picks You'll Love</h2>
        </div>
        <span
          onClick={() => onNavigate('menu')}
          className="toppicks-view-all"
          role="button"
          aria-label="View the full menu"
        >
          <span>View Full Menu</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>

      {/* Grid of Product Cards */}
      <div className="toppicks-grid">
        {topPickProducts.map((product) => {
          const isAdded = addedItemId === product.id;
          return (
            <article key={product.id} className="toppicks-card">
              {/* Image Container with Warm Background */}
              <div className="toppicks-img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="toppicks-img"
                  loading="lazy"
                />
              </div>

              {/* Card Details Container */}
              <div className="toppicks-content">
                <h3 className="toppicks-item-title">{product.name}</h3>
                <p className="toppicks-item-desc">{product.desc}</p>
                <div className="toppicks-price">{product.price}</div>

                {/* Interactive Add to Cart CTA */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`toppicks-btn-cart ${isAdded ? 'added' : ''}`}
                  aria-label={`Add ${product.name} to cart`}
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
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6M2 6h18v6H6" />
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
    </section>
  );
};

export default TopPicks;
