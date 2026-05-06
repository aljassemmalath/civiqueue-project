import { Link } from 'react-router-dom';
import StatsStrip from '../components/StatsStrip';
import serviceCenterImage from "../assets/images/serviceCenterImage.png";

const values = [
  { title: 'Trust', description: 'We earn trust by being transparent, secure, and reliable — every interaction, every time.', icon: '/assets/images/svg/shield-01.svg', cardClass: 'speed-card' },
  { title: 'Inclusion', description: 'Designed to be accessible for every citizen regardless of digital literacy or background.', icon: '/assets/images/svg/user-group.svg', cardClass: 'trust-card' },
  { title: 'Efficiency', description: 'We remove unnecessary steps so citizens spend less time on paperwork.', icon: '/assets/images/svg/zap.svg', cardClass: 'coverage-card' },
  { title: 'Innovation', description: 'Continuously improving our platform with feedback from citizens and government partners.', icon: '/assets/images/svg/bulb-charging.svg', cardClass: 'orange-card' },
];

const timeline = [
  { year: '2026', title: 'Today', description: 'Serving 1.2M+ citizens with a 4.8/5 satisfaction score. Mobile app and AI-powered assistance coming soon.', current: true },
  { year: '2024', title: 'Nationwide Rollout', description: 'Full deployment across all government departments — 320+ service centers now live on the platform.' },
  { year: '2022', title: '1 Million Appointments', description: 'CiviQueue reached 1 million bookings. Real-time availability and SMS reminders introduced.' },
  { year: '2021', title: 'Government Partnership', description: 'Official government endorsement secured. Platform expanded to cover 12 departments and 40+ branches nationwide.' },
  { year: '2020', title: 'Pilot Launch', description: 'CiviQueue launched as a pilot program in two cities, covering passport and national ID services with 3 branches.' },
];

const highlights = [
  'Government-approved and officially certified platform',
  'End-to-end encrypted — your data stays private',
  'Real-time slot availability across all branches',
  'Available 24/7 — book when it suits you',
];

function About() {
  return (
    <>
      <section className="about-hero"
        style={{
         background: `url(${serviceCenterImage}) center center / cover no-repeat`
        }}>
        <div className="auto-padding about-hero-inner">
          <h1 className="display-md fw-bold">
            <span className="text-primary">Unified</span> Service Platform
          </h1>
          <p className="text-lg about-hero-sub">
            CiviQueue was built to remove the friction between citizens and the services they need — no more long waits, no confusion, just simple and reliable access.
          </p>
          <div className="about-hero-actions mt-4">
            <Link to="/services" className="btn btn-primary btn-xl">
              Explore Services <i className="bi bi-arrow-right"></i>
            </Link>
            <Link to="/help" className="btn btn-white btn-xl">Get Help</Link>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="about-mv py-xl">
        <div className="auto-padding">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className="about-mv-visual">
                <div className="about-mv-card about-mv-card--mission">
                  <div className="about-mv-card-icon">
                    <img src="/assets/images/svg/target-02.svg" alt="" />
                  </div>
                  <h4>Our Mission</h4>
                  <p>To make government services accessible to every citizen — removing barriers, reducing wait times, and building trust through technology.</p>
                </div>
                <div className="about-mv-card about-mv-card--vision">
                  <div className="about-mv-card-icon">
                    <img src="/assets/images/svg/viewPurple.svg" alt="" />
                  </div>
                  <h4>Our Vision</h4>
                  <p>A future where every citizen can access any government service in minutes, from anywhere — digitally, securely, and without complexity.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-mv-content">
                <span className="showcase-badge d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold mb-2">
                  <img src="/assets/images/svg/information-circle.svg" alt="" width="16" /> Who We Are
                </span>
                <h2 className="display-sm fw-bold text-secondary mt-3 mb-4">
                  Built to bridge the gap between citizens and government
                </h2>
                <p className="text-md text-muted mb-4">
                  CiviQueue started as a response to a simple but persistent problem: people spending hours waiting for services they should be able to access quickly. We partnered with government departments to build a platform that puts citizens first.
                </p>
                <p className="text-md text-muted mb-4">
                  Today, CiviQueue is the official appointment booking system for over 40 government departments, serving more than 1.2 million citizens nationwide. Our platform connects people to services ranging from national ID to tax filing — all in one place.
                </p>
                <div className="about-highlights">
                  {highlights.map(text => (
                    <div key={text} className="about-highlight-item">
                      <img src="/assets/images/svg/checkmark-circle-02.svg" alt="" width="18" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values py-xl">
        <div className="auto-padding">
          <div className="text-center mb-5">
            <span className="showcase-badge d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold mb-2">
              <img src="/assets/images/svg/care.svg" alt="" width="16" /> What We Stand For
            </span>
            <h2 className="display-sm fw-bold text-secondary mt-3">Our core values</h2>
            <p className="text-lg text-muted">The principles that guide every decision we make.</p>
          </div>
          <div className="row g-4">
            {values.map(val => (
              <div key={val.title} className="col-sm-6 col-lg-3">
                <div className={`card ${val.cardClass}`}>
                  <div className="card-header">
                    <div className="card-icon"><img src={val.icon} alt="" width="16" /></div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{val.title}</h5>
                    <p className="card-text">{val.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-timeline py-xl">
        <div className="auto-padding">
          <div className="right-side row g-5 align-items-center">
            <div className="col-lg-5">
              <span className="showcase-badge d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold mb-2 bg-white">
                <img src="/assets/images/svg/directions-01.svg" alt="" width="16" /> Our Journey
              </span>
              <h2 className="display-sm fw-bold text-secondary mt-3 mb-3">
                From pilot to <span className="text-blue">nationwide</span> platform
              </h2>
              <p className="text-muted" style={{ marginRight: '120px' }}>
                What started as a small pilot in one city has grown into the country's primary digital gateway to government services.
              </p>
            </div>
            <div className="col-lg-7">
              <div className="about-timeline-list">
                {timeline.map(item => (
                  <div key={item.year} className={`about-tl-item ${item.current ? 'about-tl-item--current' : ''}`}>
                    <div className="about-tl-dot"></div>
                    <div className="about-tl-year">{item.year}</div>
                    <div className="about-tl-content">
                      <h6>{item.title}</h6>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta py-xl">
        <div className="auto-padding">
          <div className="about-cta-inner">
            <div className="about-cta-orb about-cta-orb--1"></div>
            <div className="about-cta-orb about-cta-orb--2"></div>
            <div className="about-cta-content">
              <h2 className="display-sm fw-bold text-white mb-3">Ready to get started?</h2>
              <p className="text-lg text-white mb-5" style={{ opacity: 0.8 }}>Book your government appointment in minutes — no waiting, no confusion.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link to="/services" className="btn btn-white btn-xl">
                  <img src="/assets/images/svg/Dashboard-white.svg" alt="" width="24" height="24" /> Browse services
                </Link>
                <Link to="/help" className="btn btn-white btn-xl">
                  Get Help <img src="/assets/images/svg/arrowRightWhite.svg" alt="" width="24" height="24" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
