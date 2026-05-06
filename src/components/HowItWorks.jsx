import { Link } from 'react-router-dom';

const steps = [
  { number: 1, icon: '/assets/images/svg/searching-lightblue.svg', title: 'Choose a Service', description: 'Browse our catalog and select the government service you need assistance with.' },
  { number: 2, icon: '/assets/images/svg/calendar-add-lightgreen.svg', title: 'Pick Date & Location', description: 'Select your preferred branch, date, and time slot that works best for your schedule.' },
  { number: 3, icon: '/assets/images/svg/verified-lightpurple.svg', title: 'Visit & Get Served', description: 'Show up at your scheduled time with the required documents and skip the queue entirely.' },
];

function HowItWorks({ onBookClick }) {
  return (
    <section className="hiw-section py-xl">
      <div className="hiw-bg-pattern">
        <div className="hiw-orb-1"></div>
        <div className="hiw-orb-2"></div>
      </div>
      <div className="hiw-inner auto-padding">
        <div className="hiw-header">
          <div className="hiw-badge">
            <i className="bi bi-lightning-charge-fill"></i> Simple Process
          </div>
          <h2 className="display-sm fw-bold">How It Works</h2>
          <p className="section-desc">Book your government service appointment in three easy steps — fast, simple, and hassle-free.</p>
        </div>

        <div className="hiw-steps">
          <div className="hiw-connector"></div>
          {steps.map(step => (
            <div key={step.number} className={`hiw-step hiw-step--${step.number}`}>
              <div className="hiw-step-number">{step.number}</div>
              <div className="hiw-step-card">
                <div className="hiw-step-icon">
                  <img src={step.icon} alt="" width="28" height="28" />
                </div>
                <h5>{step.title}</h5>
                <p>{step.description}</p>
                <ul className="hiw-mini-features"></ul>
              </div>
            </div>
          ))}
        </div>

        <div className="hiw-cta d-flex align-items-center justify-content-center flex-wrap gap-3">
          <button onClick={onBookClick} className="btn btn-primary btn-xl">
            Book an Appointment <i className="bi bi-arrow-right"></i>
          </button>
          <Link to="/services" className="btn btn-white btn-xl">
            Explore Services <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
