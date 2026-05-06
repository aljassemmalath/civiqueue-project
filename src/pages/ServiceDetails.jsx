import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const requiredDocs = [
  { num: '01', name: 'Birth Certificate', desc: 'Original or certified copy — must be issued by a recognized civil authority' },
  { num: '02', name: 'Proof of Address', desc: 'Utility bill, bank statement, or lease agreement dated within 3 months' },
  { num: '03', name: 'Passport Photo', desc: '2 recent photos (3.5 × 4.5 cm), white background, taken within 6 months' },
];

const serviceCenters = [
  { name: 'Central Service Center', address: '123 Main Street, Downtown, Capital City', hours: 'Mon–Fri: 8:00 AM – 6:00 PM', status: 'Open Now', statusClass: 'status-success' },
  { name: 'North District Office', address: '456 North Avenue, Capital City', hours: 'Mon–Fri: 8:00 AM – 4:00 PM', status: 'Open Now', statusClass: 'status-success' },
  { name: 'South Regional Center', address: '789 South Boulevard, South Town', hours: 'Mon–Fri: 9:00 AM – 5:00 PM', status: 'Closes at 5 PM', statusClass: 'status-neutral' },
];

const relatedServices = [
  { icon: '/assets/images/svg/passport.svg', title: 'Passport Application', meta: 'Identification · 30 min' },
  { icon: '/assets/images/svg/file-02.svg', title: 'Birth Certificate Issuance', meta: 'Civil Records · 20 min' },
  { icon: '/assets/images/svg/document-validation.svg', title: 'Residence Permit Processing', meta: 'Immigration · 45 min' },
];

const faqs = [
  { id: 'sdFaq1', q: 'How long does it take to receive the card?', a: 'Processing typically takes 5–10 business days after your appointment. You will receive an SMS notification when your card is ready for collection.', open: true },
  { id: 'sdFaq2', q: 'Can I renew an expired ID card?', a: 'Yes. Bring your expired card along with the required documents. There is no penalty for renewing an expired card, but renewing before expiry is recommended.' },
  { id: 'sdFaq3', q: 'What if I lose my ID card?', a: 'File a police report first, then book a replacement appointment. Bring the police report reference number along with your other required documents.' },
];

function ServiceDetails() {
  const [openFaq, setOpenFaq] = useState('sdFaq1');
  const navigate = useNavigate();

  return (
    <>
      <section>
        <div className="page-header auto-padding py-4 mb-4">
          <nav className="breadcrumb">
            <span className="breadcrumb-item"><Link to="/services">Services</Link></span>
            <span className="breadcrumb-item active">Service Details</span>
          </nav>
          <div className="sd-hero-layout">
            <div className="sd-hero-left">
              <h4 className="section-title">National ID Card Issuance</h4>
              <p className="section-dsc">Apply for, renew, or replace your official national identity card at any verified government center.</p>
            </div>
            <div className="sd-hero-right">
              <div className="sd-hero-badges d-flex justify-content-start">
                <span className="status-badge badge-info-reverse"><i className="bi bi-tag-fill"></i> Identification</span>
                <span className="status-badge badge-success-reverse"><span className="status-dot dot-success"></span> Available</span>
              </div>
              <div className="sd-meta-strip">
                <div className="sd-meta-item">
                  <img src="/assets/images/svg/clockOutlineBlue.svg" alt="" width="20" />
                  <div className="info-col">
                    <div className="info-label">Estimated Duration</div>
                    <div className="info-value">15 minutes</div>
                  </div>
                </div>
                <div className="sd-meta-item">
                  <img src="/assets/images/svg/locationOutlineBlue.svg" alt="" width="20" />
                  <div className="info-col">
                    <div className="info-label">Available At</div>
                    <div className="info-value">3 Centers</div>
                  </div>
                </div>
                <div className="sd-meta-item">
                  <img src="/assets/images/svg/filesOutlineBlue.svg" alt="" width="20" />
                  <div className="info-col">
                    <div className="info-label">Documents</div>
                    <div className="info-value">3 Required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="sd-main auto-padding">
        <div className="sd-page-card">
          <div className="row g-4 align-items-start">

            <div className="col-lg-8">
              <div className="sd-section-card mb-4">
                <div className="sd-section-card-header">
                  <img src="/assets/images/svg/details.svg" alt="" width="20" />
                  <h5 className="sd-section-card-title">Service Description</h5>
                </div>
                <div className="sd-section-card-body">
                  <p className="card-text text-muted mb-0">
                    The National ID Card is an official government-issued document that serves as your primary proof of identity within the country. It is required for access to most government services, banking, employment, and travel within national borders.
                  </p>
                </div>
              </div>

              <div className="sd-section-card mb-4">
                <div className="sd-section-card-header">
                  <img src="/assets/images/svg/documents.svg" alt="" width="20" />
                  <h5 className="sd-section-card-title">Required Documents</h5>
                  <span className="status-badge status-info ms-auto">3 items</span>
                </div>
                <div className="sd-section-card-body">
                  <div className="sd-doc-list">
                    {requiredDocs.map(doc => (
                      <div key={doc.num} className="sd-doc-item">
                        <div className="sd-doc-num">{doc.num}</div>
                        <div className="sd-doc-info">
                          <div className="info-col">
                            <div className="info-value mb-1">
                              {doc.name}
                              <span className="status-badge status-danger sd-doc-required-mobile d-none">Required</span>
                            </div>
                            <div className="info-label">{doc.desc}</div>
                          </div>
                        </div>
                        <span className="status-badge status-danger sd-doc-required sd-doc-required-desktop">Required</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sd-section-card mb-4">
                <div className="sd-section-card-header">
                  <img src="/assets/images/svg/building-06.svg" alt="" width="20" />
                  <h5 className="sd-section-card-title">Available Service Centers</h5>
                </div>
                <div className="sd-section-card-body">
                  {serviceCenters.map(center => (
                    <div key={center.name} className="sd-center-item">
                      <div className="sd-card-icon icon-neutral">
                        <img src="/assets/images/svg/location-10.svg" alt="" width="20" />
                      </div>
                      <div className="sd-center-info">
                        <h5>{center.name}</h5>
                        <p><img src="/assets/images/svg/maps.svg" alt="" width="16" /> {center.address}</p>
                        <p className="text-tertiary mt-2"><img src="/assets/images/svg/time.svg" alt="" width="16" /> {center.hours}</p>
                      </div>
                      <div className="sd-center-actions">
                        <span className={`status-badge ${center.statusClass}`}>{center.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sd-section-card mb-0">
                <div className="sd-section-card-header">
                  <img src="/assets/images/svg/FAQ.svg" alt="" width="20" />
                  <h5 className="sd-section-card-title">Frequently Asked Questions</h5>
                </div>
                <div className="sd-section-card-body">
                  <div className="accordion faq-accordion">
                    {faqs.map(faq => (
                      <div key={faq.id} className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${openFaq !== faq.id ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                          >
                            {faq.q}
                          </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${openFaq === faq.id ? 'show' : ''}`}>
                          <div className="accordion-body">{faq.a}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sd-sidebar-sticky">
                <div className="sd-book-card mb-4">
                  <div className="sd-book-card-header">
                    <div className="sd-book-card-icon">
                      <img src="/assets/images/svg/calendar-add-02.svg" alt="" width="22" />
                    </div>
                    <div>
                      <h5 className="sd-book-card-title">Ready to apply?</h5>
                      <p className="sd-book-card-sub">Book a slot at your nearest center</p>
                    </div>
                  </div>
                  <div className="sd-book-meta">
                    <div className="sd-book-meta-row">
                      <div className="info-label"><img src="/assets/images/svg/clockOutlineBlue.svg" alt="" width="16" /> Avg. duration</div>
                      <div className="info-value">15 min</div>
                    </div>
                    <div className="sd-book-meta-row">
                      <div className="info-label"><img src="/assets/images/svg/dollar.svg" alt="" width="16" /> Service fee</div>
                      <div className="info-value">$120</div>
                    </div>
                    <div className="sd-book-meta-row">
                      <div className="info-label"><img src="/assets/images/svg/time-slot.svg" alt="" width="16" /> Earliest slot</div>
                      <div className="info-value">Tomorrow</div>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100 btn-lg mb-3" onClick={() => navigate('/booking')}>
                    <img src="/assets/images/svg/calendar-add-02.svg" alt="" width="20" /> Book an Appointment
                  </button>
                  <div className="sd-tip">
                    <img src="/assets/images/svg/idea.svg" alt="" width="16" />
                    <p><strong>Tip:</strong> Arrive 10 minutes early with all required documents for a smooth process.</p>
                  </div>
                </div>

                <div className="sd-section-card">
                  <div className="sd-section-card-header">
                    <img src="/assets/images/svg/dashboard-square-01.svg" alt="" width="20" />
                    <h5 className="sd-section-card-title">Related Services</h5>
                  </div>
                  <div className="sd-section-card-body">
                    {relatedServices.map(rel => (
                      <Link key={rel.title} to="/services/detail" className="sd-related-item">
                        <div className="sd-related-icon icon-blue">
                          <img src={rel.icon} alt="" width="18" />
                        </div>
                        <div className="sd-related-text">
                          <strong>{rel.title}</strong>
                          <span>{rel.meta}</span>
                        </div>
                        <i className="bi bi-chevron-right sd-related-arrow"></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

export default ServiceDetails;
