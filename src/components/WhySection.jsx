const benefits = [
  {
    title: 'Reduced Waiting Times',
    description: 'Skip the long queues with pre-booked time slots. Get served on arrival with average wait times under 5 minutes.',
    icon: '/assets/images/svg/speed.svg', cardClass: 'speed-card', iconClass: 'card-icon-primary',
    tags: [{ label: 'Priority access', colorClass: 'why-tag--blue' }, { label: 'Real-time updates', colorClass: 'why-tag--blue' }],
  },
  {
    title: 'Nationwide Coverage',
    description: 'Access services from 320+ centers across the country. Find the nearest branch and book instantly from anywhere.',
    icon: '/assets/images/svg/flag.svg', cardClass: 'coverage-card', iconClass: 'card-icon-success',
    tags: [{ label: '320+ locations', colorClass: 'why-tag--green' }, { label: 'Branch finder', colorClass: 'why-tag--green' }],
  },
  {
    title: 'Trust and Security',
    description: 'Built with government approval and security in mind. Your data is protected with industry-standard encryption.',
    icon: '/assets/images/svg/security-lock.svg', cardClass: 'trust-card', iconClass: 'card-icon-info',
    tags: [{ label: 'Government-approved', colorClass: 'why-tag--info' }, { label: 'Data encryption', colorClass: 'why-tag--info' }],
  },
];

function WhySection() {
  return (
    <section className="why-section py-xl">
      <div className="auto-padding">
        <div className="why-header">
          <span className="showcase-badge d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold mb-3">
            <i className="bi bi-star-fill"></i> Why Choose Us
          </span>
          <h2 className="display-sm fw-bold">Why Use CiviQueue</h2>
          <p className="section-desc">Experience a smarter way to access government services — designed for efficiency, built for everyone.</p>
        </div>
        <div className="why-grid">
          {benefits.map(b => (
            <div key={b.title} className={`card ${b.cardClass}`}>
              <div className="card-header">
                <div className={`card-icon ${b.iconClass}`}>
                  <img src={b.icon} alt="" />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{b.title}</h5>
                <p className="card-text">{b.description}</p>
                <ul className="why-card-tags mt-3">
                  {b.tags.map(t => (
                    <li key={t.label} className={`why-tag ${t.colorClass}`}>
                      <i className="bi bi-check-circle-fill"></i> {t.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhySection;
