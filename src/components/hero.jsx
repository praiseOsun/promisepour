import React from 'react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero-wrapper">
      {/* Left Content Column */}
      <div className="hero-left">
        <span className="hero-script">Pour Happiness.</span>
        
        <h1 className="hero-heading">
          Pure Yoghurt.<br />
          Perfect Parfaits.
          <span className="hero-heart-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18 31C18 31 7 24 7 14.5C7 9.5 11 6.5 15.5 7.5C16.8 7.8 17.5 8.5 18 9C18.5 8.5 19.2 7.8 20.5 7.5C25 6.5 29 9.5 29 14.5C29 24 18 31 18 31Z" 
                stroke="#DE3E75" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
              />
            </svg>
          </span>
        </h1>
        
        <p className="hero-desc">
          Creamy, delicious and made with real ingredients.
          Fuel your day the healthy & tasty way.
        </p>
        
        <div className="hero-buttons">
          <button 
            onClick={() => onNavigate('build-parfait')} 
            className="hero-btn-order"
            aria-label="Order delicious parfaits now"
          >
            {/* WhatsApp-styled Chat/Phone bubble icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M12.012 2C6.485 2 2 6.485 2 12.012c0 1.766.457 3.49 1.32 5.02L2 22l5.088-1.312a9.97 9.97 0 004.924 1.325h.004c5.526 0 10.012-4.485 10.012-10.011C22.028 6.486 17.54 2 12.012 2zm6.09 14.51c-.25.706-1.24 1.282-1.71 1.348-.47.065-.93.12-2.937-.692-2.56-1.04-4.17-3.66-4.298-3.83-.128-.17-.988-1.323-.988-2.527 0-1.203.626-1.794.85-2.036.223-.242.49-.301.65-.301.163 0 .326.002.468.008.148.006.348-.057.545.419.198.483.678 1.642.738 1.762.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.253.313-.36.42-.12.12-.245.251-.105.49.14.24.621.92 1.018 1.838.35.31.55.284.757.042.208-.24.898-1.043 1.142-1.402.245-.36.49-.3.826-.18.337.12 2.128 1.002 2.49 1.182.36.18.6.27.684.42.083.15.083.872-.167 1.577z" />
            </svg>
            <span>Order Now</span>
          </button>
          
          <button 
            onClick={() => onNavigate('menu')} 
            className="hero-btn-menu"
            aria-label="View our full parfait and yoghurt menu"
          >
            <span>View Menu</span>
          </button>
        </div>
        
        {/* Sleek Bottom Badges Grid */}
        <div className="hero-badges">
          {/* Badge 1: 100% Natural */}
          <div className="hero-badge-item">
            <div className="hero-badge-icon natural" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 9.5a7 7 0 0 1-8 8.5z"/>
                <path d="M19 2L11 10"/>
              </svg>
            </div>
            <div className="hero-badge-text">
              <span className="hero-badge-title">100%</span>
              <span className="hero-badge-sub">Natural</span>
            </div>
          </div>

          {/* Badge 2: High in Protein */}
          <div className="hero-badge-item">
            <div className="hero-badge-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                <path d="M18 7l-1.5 14H7.5L6 7" />
                <path d="M10 11h4" />
                <path d="M10 15h4" />
              </svg>
            </div>
            <div className="hero-badge-text">
              <span className="hero-badge-title">High in</span>
              <span className="hero-badge-sub">Protein</span>
            </div>
          </div>

          {/* Badge 3: No Refined Sugar */}
          <div className="hero-badge-item">
            <div className="hero-badge-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <div className="hero-badge-text">
              <span className="hero-badge-title">No Refined</span>
              <span className="hero-badge-sub">Sugar</span>
            </div>
          </div>

          {/* Badge 4: Made with Love */}
          <div className="hero-badge-item">
            <div className="hero-badge-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="hero-badge-text">
              <span className="hero-badge-title">Made with</span>
              <span className="hero-badge-sub">Love</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Product Image Column */}
      <div className="hero-right">
        <div className="hero-image-arch">
          <img 
            src="/parfait_hero_cup.png" 
            alt="Delicious Layered PromisePour Parfait Cup with berries and honey granola" 
            className="hero-img" 
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
