import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Biola',
    text: 'My love, I loved the yoghurt and I enjoyed it so much. My mum loved it too 😍',
    stars: 5,
  },
  {
    id: 2,
    name: 'Marvel',
    text: 'This is very creamy, sweet and thick 🥺❤️ New addiction unlocked 🥺🥺😩😂',
    stars: 5,
  },
];

const StarRating = ({ count }) => (
  <span className="follow-stars" aria-label={`${count} stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
      </svg>
    ))}
  </span>
);

const Follow = () => {

  return (
    <section className="follow-section" aria-labelledby="follow-section-label">
      <div className="follow-grid">

        {/* ── Column 1: Why Choose PromisePour ── */}
        <div className="follow-col follow-why">
          <p className="follow-why-label">WHY CHOOSE PROMISEPOUR?</p>
          <ul className="follow-why-list" aria-label="Reasons to choose PromisePour">
            <li className="follow-why-item">
              <span className="follow-why-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/><path d="M8 12l3 3 5-5"/></svg>
              </span>
              Made with real, fresh ingredients
            </li>
            <li className="follow-why-item">
              <span className="follow-why-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/><path d="M8 12l3 3 5-5"/></svg>
              </span>
              No artificial flavors or preservatives
            </li>
            <li className="follow-why-item">
              <span className="follow-why-icon pink">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/></svg>
              </span>
              High in protein &amp; gut-friendly
            </li>
            <li className="follow-why-item">
              <span className="follow-why-icon pink">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"/></svg>
              </span>
              Made daily with love
            </li>
          </ul>
        </div>

        {/* ── Column 2: What Our Customers Say ── */}
        <div className="follow-col follow-reviews">
          <h2 id="follow-section-label" className="follow-reviews-title">What Our Customers Say</h2>

          <div className="follow-reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="follow-review-card" aria-label={`Review by ${review.name}`}>
                <span className="follow-quote-mark" aria-hidden="true">"</span>
                <p className="follow-review-text">{review.text}</p>
                <div className="follow-reviewer">
                  <span className="follow-reviewer-name">{review.name}</span>
                  <StarRating count={review.stars} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Column 3: Follow Our Journey ── */}
        <div className="follow-col follow-journey">
          <h3 className="follow-journey-title">Follow Our Journey</h3>

          <div className="follow-photo-grid" aria-label="Journey photo gallery">
            <img src="/milky_yoghurt.png"  alt="PromisePour yoghurt parfait" className="follow-photo" loading="lazy" />
            <img src="/step_fruits.png"    alt="Fresh fruits topping"        className="follow-photo" loading="lazy" />
            <img src="/step_sauce.png"     alt="Caramel sauce drizzle"       className="follow-photo" loading="lazy" />
            <img src="/step_base.png"      alt="Yoghurt parfait base"        className="follow-photo" loading="lazy" />
            <img src="/step_toppings.png"  alt="Granola toppings"            className="follow-photo" loading="lazy" />
            {/* 6th cell: the customer drinking yoghurt – small hero shot */}
            <div className="follow-photo follow-photo-drink-wrap">
              <img
                src="/customer_drinking.png"
                alt="Customer enjoying PromisePour yoghurt"
                className="follow-photo-drink"
                loading="lazy"
              />
            </div>
          </div>

          <a
            href="https://www.tiktok.com/@promisepour?_r=1&_t=ZS-96k02OjNXvU"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-tiktok-btn"
            aria-label="Follow PromisePour on TikTok"
          >
            {/* TikTok Icon */}
            <svg className="follow-tiktok-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.77a8.2 8.2 0 0 0 4.79 1.53V6.85a4.85 4.85 0 0 1-1.02-.16z"/>
            </svg>
            Follow Us on TikTok
          </a>
        </div>

      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="follow-cta-banner">
        <div className="follow-cta-left">
          {/* Scooter illustration */}
          <img src="/milky_yoghurt.png" alt="" className="follow-cta-scooter" aria-hidden="true" />
          <div>
            <p className="follow-cta-heading">Craving something amazing?</p>
            <p className="follow-cta-sub">We deliver happiness to your doorstep.</p>
          </div>
        </div>
        <a
          href="https://wa.me/message/promisepour"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-cta-wa-btn"
          aria-label="Order Now on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Order Now on WhatsApp
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Follow;
