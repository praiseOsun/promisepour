import React from 'react';

const Build = ({ onNavigate }) => {
  const steps = [
    {
      number: '1',
      title: 'Choose Base',
      desc: 'Yoghurt, Greek Yoghurt or Plant-based',
      image: '/step_base.png',
      bgColor: '#F0E4E6'
    },
    {
      number: '2',
      title: 'Pick Fruits',
      desc: 'Fresh & delicious options',
      image: '/step_fruits.png',
      bgColor: '#E2EDDF'
    },
    {
      number: '3',
      title: 'Add Toppings',
      desc: 'Granola, nuts, seeds & more',
      image: '/step_toppings.png',
      bgColor: '#F3E6D5'
    },
    {
      number: '4',
      title: 'Pick a Sauce',
      desc: 'Honey, Chocolate, Caramel & more',
      image: '/step_sauce.png',
      bgColor: '#FAEACD'
    }
  ];

  return (
    <section className="build-section" aria-labelledby="build-heading">
      <div className="build-card">
        {/* Left text column */}
        <div className="build-left">
          <span className="build-label">CUSTOMIZE IT</span>
          <h2 id="build-heading" className="build-heading">
            Build Your{' '}
            <br />
            Perfect Parfait
            {/* Outlined heart icon */}
            <svg className="build-heart" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 3.5 15.5 3.5 9.5C3.5 6.5 5.5 4.5 8.5 4.5C10.5 4.5 11.5 5.5 12 6.5C12.5 5.5 13.5 4.5 15.5 4.5C18.5 4.5 20.5 6.5 20.5 9.5C20.5 15.5 12 21 12 21Z" stroke="#E8899E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </h2>
          <p className="build-text">
            Choose your base, fruits, toppings and sauce. We'll pour the perfect cup for you!
          </p>
          <button
            onClick={() => onNavigate('build-parfait')}
            className="build-cta"
            aria-label="Start building your custom parfait"
          >
            <svg className="build-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Build Yours Now</span>
          </button>
        </div>

        {/* Right steps row */}
        <div className="build-right">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="build-step">
                <div className="build-step-circle" style={{ backgroundColor: step.bgColor }}>
                  <img
                    src={step.image}
                    alt={`Step ${step.number}: ${step.title}`}
                    className="build-step-img"
                    loading="lazy"
                  />
                </div>
                <h3 className="build-step-name">{step.number}. {step.title}</h3>
                <p className="build-step-desc">{step.desc}</p>
              </div>
              {/* Curvy dashed connector arrow */}
              {idx < steps.length - 1 && (
                <div className="build-arrow" aria-hidden="true">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M2 10C10 2 25 18 38 10" stroke="#C5D4C0" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3"/>
                    <path d="M34 7L38 10L34 13" stroke="#C5D4C0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Build;
