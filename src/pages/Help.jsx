import { useState, useRef } from 'react';

const topicChips = [
  { href: '#faq-booking', icon: '/assets/images/svg/calendar-add-blue.svg', label: 'Booking Appointments', colorClass: 'topic-chip-icon--primary' },
  { href: '#faq-manage', icon: '/assets/images/svg/calendar-setting-01.svg', label: 'Managing Appointments', colorClass: 'topic-chip-icon--success' },
  { href: '#faq-account', icon: '/assets/images/svg/user-circle-02.svg', label: 'Account & Profile', colorClass: 'topic-chip-icon--info' },
  { href: '#faq-docs', icon: '/assets/images/svg/file-orange.svg', label: 'Documents & Requirements', colorClass: 'topic-chip-icon--warning' },
  { href: '#faq-technical', icon: '/assets/images/svg/settings-red.svg', label: 'Technical Issues', colorClass: 'topic-chip-icon--danger' },
  { href: '#contact', icon: '/assets/images/svg/bubble-chat.svg', label: 'Contact Support', colorClass: 'topic-chip-icon--neutral' },
];

const faqSections = [
  {
    id: 'faq-booking',
    icon: '/assets/images/svg/calendar-add-blue.svg',
    title: 'Booking Appointments',
    subtitle: 'Everything you need to know about creating a new booking.',
    accordionId: 'faqBooking',
    items: [
      { id: 'b1', question: 'How do I book an appointment?', answer: 'Go to the Booking page, select the service you need, choose your preferred branch and available time slot, then confirm your booking. You will receive a confirmation via email or SMS.', open: true },
      { id: 'b2', question: 'Do I need an account to book?', answer: 'Yes, you need a CiviQueue account to complete a booking. Registration is free and takes under two minutes. An account lets you manage, reschedule, and track all your appointments in one place.' },
      { id: 'b3', question: 'How far in advance can I book?', answer: 'You can book appointments up to 60 days in advance. Same-day appointments are available at select branches based on slot availability.' },
      { id: 'b4', question: 'Can I book on behalf of someone else?', answer: 'Yes. During the booking process, you can enter a different person\'s name and national ID as the appointment holder. Both the account holder and the appointee will receive confirmation details.' },
    ],
  },
  {
    id: 'faq-manage',
    icon: '/assets/images/svg/calendar-setting-01.svg',
    title: 'Managing Appointments',
    subtitle: 'How to change or cancel an existing booking.',
    accordionId: 'faqManage',
    items: [
      { id: 'm1', question: 'Can I reschedule my appointment?', answer: 'Yes, you can reschedule your appointment up to 24 hours before the scheduled time. Go to your Dashboard, find the appointment, and click "Reschedule".' },
      { id: 'm2', question: 'How do I cancel a booking?', answer: 'Open your Dashboard, locate the appointment you wish to cancel, and select "Cancel Booking." Cancellations made more than 12 hours in advance are processed immediately.' },
      { id: 'm3', question: 'What if I miss my appointment?', answer: 'If you miss your appointment, it will be marked as a no-show. You can re-book the same service, but frequent no-shows may affect future booking privileges.' },
    ],
  },
  {
    id: 'faq-account',
    icon: '/assets/images/svg/user-circle-02.svg',
    title: 'Account & Profile',
    subtitle: 'Managing your CiviQueue account and personal details.',
    accordionId: 'faqAccount',
    items: [
      { id: 'a1', question: 'How do I update my personal information?', answer: 'Log into your account and navigate to Settings > Profile. You can update your name, contact details, and notification preferences there.' },
      { id: 'a2', question: 'I forgot my password. What should I do?', answer: 'Click "Forgot Password" on the login page and enter your registered email. You will receive a reset link within a few minutes.' },
    ],
  },
  {
    id: 'faq-docs',
    icon: '/assets/images/svg/file-orange.svg',
    title: 'Documents & Requirements',
    subtitle: 'What to bring and how to prepare for your visit.',
    accordionId: 'faqDocs',
    items: [
      { id: 'd1', question: 'What documents do I need to bring?', answer: 'Required documents vary by service. Each booking confirmation email includes a checklist specific to your service. Always bring a valid government-issued ID.' },
      { id: 'd2', question: 'Can I upload documents in advance?', answer: 'Yes. After booking, go to your Dashboard and upload supporting documents under the appointment details. This can reduce your processing time at the branch.' },
    ],
  },
];

function AccordionSection({ section }) {
  const [openId, setOpenId] = useState(section.items.find(i => i.open)?.id || null);
  return (
    <div className="card-body help-faq-block mb-5" id={section.id}>
      <div className="help-faq-header">
        <div className="help-faq-icon help-faq-icon--white">
          <img src={section.icon} alt="" width="28" height="28" />
        </div>
        <div>
          <h3 className="section-title-sm">{section.title}</h3>
          <p className="section-dsc-sm">{section.subtitle}</p>
        </div>
      </div>
      <div className="accordion faq-accordion mt-4">
        {section.items.map(item => (
          <div key={item.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${openId !== item.id ? 'collapsed' : ''}`}
                type="button"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                {item.question}
              </button>
            </h2>
            <div className={`accordion-collapse collapse ${openId === item.id ? 'show' : ''}`}>
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' });
  };

  return (
    <>
      <section className="help-hero">
        <div className="help-hero-bg">
          <div className="help-hero-orb help-hero-orb--1"></div>
          <div className="help-hero-orb help-hero-orb--2"></div>
        </div>
        <div className="auto-padding help-hero-inner">
          <h1 className="display-md fw-bold mb-2">
            How can we <span className="text-primary">help you?</span>
          </h1>
          <p className="text-lg help-hero-sub mb-4">
            Find answers to common questions, browse guides, or reach out to our support team.
          </p>
          <div className="help-search-wrap">
            <div className="help-search-box">
              <i className="bi bi-search help-search-icon"></i>
              <input
                type="text"
                className="help-search-input"
                placeholder='Search for answers — e.g. "reschedule appointment"'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="help-search-btn">Search</button>
            </div>
            <div className="help-search-suggestions">
              <span>Popular:</span>
              {['Book appointment', 'Reschedule', 'Required documents', 'Cancel booking'].map(tag => (
                <button key={tag} className="help-tag" onClick={() => setSearchQuery(tag)}>{tag}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="help-categories py-xl">
        <div className="auto-padding">
          <div className="topic-track-header mb-4">
            <div>
              <h2 className="display-sm fw-bold text-secondary mb-1">Browse by topic</h2>
              <p className="text-lg text-muted">Find the right section for your question.</p>
            </div>
            <div className="topic-nav-btns d-flex d-md-none">
              <button className="topic-nav-btn" onClick={() => scroll('left')} aria-label="Scroll left">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="topic-nav-btn" onClick={() => scroll('right')} aria-label="Scroll right">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="topic-track-wrap">
            <button className="topic-nav-btn topic-nav-btn--side topic-nav-btn--side-left d-none d-md-flex" onClick={() => scroll('left')} aria-label="Scroll left">
              <i className="bi bi-chevron-left"></i>
            </button>
            <div className="topic-track" ref={trackRef}>
              {topicChips.map(chip => (
                <a key={chip.label} href={chip.href} className="topic-chip">
                  <span className={`topic-chip-icon ${chip.colorClass}`}>
                    <img src={chip.icon} alt="" width="24" height="24" />
                  </span>
                  <span className="topic-chip-label">{chip.label}</span>
                </a>
              ))}
            </div>
            <button className="topic-nav-btn topic-nav-btn--side topic-nav-btn--side-right d-none d-md-flex" onClick={() => scroll('right')} aria-label="Scroll right">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="help-faq py-xl" id="faq-booking">
        <div className="auto-padding">
          {faqSections.map(section => (
            <AccordionSection key={section.id} section={section} />
          ))}
        </div>
      </section>

      <section className="help-contact py-xl" id="contact">
        <div className="auto-padding">
          <div className="text-center mb-5">
            <h2 className="display-sm fw-bold text-secondary mb-2">Still need help?</h2>
            <p className="text-lg text-muted">Our support team is available 7 days a week.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { icon: 'bi-telephone-fill', title: 'Call Us', desc: 'Speak to our support team directly.', info: '1800-CIV-HELP' },
              { icon: 'bi-envelope-fill', title: 'Email Us', desc: 'Send us a message anytime.', info: 'help@civiqueue.gov' },
              { icon: 'bi-geo-alt-fill', title: 'Visit a Branch', desc: 'Find the nearest service center.', info: '320+ locations nationwide' },
            ].map(card => (
              <div key={card.title} className="col-md-4">
                <div className="card p-4 text-center">
                  <div className="card-body">
                    <i className={`bi ${card.icon} text-primary fs-2 mb-3 d-block`}></i>
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.desc}</p>
                    <p className="fw-semibold">{card.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Help;
