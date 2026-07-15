import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>About Us</h1>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--primary-berry)', margin: '0 auto' }}></div>
      </div>

      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <div className="p-4 rounded-4" style={{
            background: 'linear-gradient(135deg, #FCF8F5 0%, #FAF3EC 100%)',
            border: '1px solid rgba(158, 27, 70, 0.05)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 className="fw-bold mb-3" style={{ color: 'var(--primary-berry)', fontFamily: 'var(--font-serif)' }}>Our Philosophy</h3>
            <p className="text-muted leading-relaxed">
              At **PromisePour**, we believe that premium quality is a priority. We are committed to serving products crafted with the absolute finest ingredients: naturally thick, nutrient-dense yogurt bases, fresh organic berries, clean roasted nuts, and high-quality premium honey.
            </p>
            <p className="text-muted leading-relaxed mb-0">
              No artificial additives, no thickeners, no shortcuts. Just wholesome goodness poured into every single cup.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <h4 className="fw-bold mb-3">Our Core Promises</h4>
          <ul className="list-unstyled d-flex flex-column gap-3">
            {[
              { title: "Pure Organic Milk", desc: "Sourced sustainably from selected local organic farms." },
              { title: "Layered Daily Freshness", desc: "Each jar is assembled by hand just before delivery." },
              { title: "Unmatched Craftsmanship", desc: "Balanced flavours designed by our master yoghurt chefs." }
            ].map((p, idx) => (
              <li key={idx} className="d-flex align-items-start gap-3">
                <span className="fs-4">❤️</span>
                <div>
                  <h6 className="fw-bold m-0">{p.title}</h6>
                  <small className="text-muted">{p.desc}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
