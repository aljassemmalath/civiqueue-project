import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cards = [
  {
    number: '01', title: 'Passport & ID',
    description: 'Get fast-tracked access to passport and national ID services at verified government offices.',
    tags: ['New passport', 'Renewal', 'National ID'],
    image: '/assets/images/services/Passport & ID.png',
    icon: '/assets/images/svg/ID.svg',
    features: ['New passport applications', 'Passport renewal & replacement', 'National ID card issuance', 'Emergency travel documents'],
  },
  {
    number: '02', title: 'Driving License',
    description: 'Book appointments for all motor vehicle department services in one place.',
    tags: ['New license', 'Driving test', 'Vehicle reg.'],
    image: '/assets/images/services/Driving license.png',
    icon: '/assets/images/svg/car.svg',
    features: ['New driving license applications', 'License renewal & replacement', 'Vehicle registration & transfers'],
  },
  {
    number: '03', title: 'Tax & Finance',
    description: 'Streamline your financial appointments with the revenue service and tax authorities.',
    tags: ['Tax filing', 'Assessment', 'Refunds'],
    image: '/assets/images/services/Tax & finance.png',
    icon: '/assets/images/svg/taxes.svg',
    features: ['Annual tax filing appointments', 'Tax assessment reviews', 'Refund status & inquiries', 'Financial consultations'],
  },
  {
    number: '04', title: 'Immigration & Visa',
    description: 'Navigate immigration processes with pre-booked appointments at authorized offices.',
    tags: ['Visa', 'Residence', 'Citizenship'],
    image: '/assets/images/services/Immigration & visa.png',
    icon: '/assets/images/svg/airplane.svg',
    features: ['Visa applications & renewals', 'Residence permit processing', 'Work authorization permits', 'Citizenship interviews'],
  },
  {
    number: '05', title: 'Civil Services',
    description: 'Access a wide range of civil administration services including marriage, birth, and municipal records.',
    tags: ['Birth cert.', 'Marriage reg.', 'Municipal'],
    image: '/assets/images/services/Passport & ID.png',
    icon: '/assets/images/svg/buildingBranch.svg',
    features: ['Birth certificate issuance', 'Marriage & divorce registration', 'Death certificate processing', 'Municipal permit applications'],
  },
];

function ServiceShowcase() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="service-showcase py-xl pt-0">
      <div className="container">
        <div className="showcase-header d-flex align-items-end justify-content-between gap-4 mb-5">
          <div className="showcase-header-text">
            <span className="showcase-badge d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill fw-semibold mb-3">
              <i className="bi bi-grid-3x3-gap-fill"></i> Our services
            </span>
            <h2 className="display-sm fw-bold">Service Categories</h2>
            <p className="section-desc">
              From identity documents to financial consultations — book verified appointments across all departments.
            </p>
          </div>
          <div className="showcase-nav flex-shrink-0 d-flex gap-2 pb-1">
            <button className="showcase-nav-btn" disabled={!canScrollLeft} onClick={() => scroll('left')} aria-label="Scroll left">
              <i className="bi bi-arrow-left"></i>
            </button>
            <button className="showcase-nav-btn" disabled={!canScrollRight} onClick={() => scroll('right')} aria-label="Scroll right">
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="showcase-scroll-wrap">
          <div className="showcase-fade showcase-fade--left"></div>
          <div className="showcase-scroll" ref={scrollRef} onScroll={checkScroll}>
            {cards.map(card => <FlipCard key={card.number} card={card} />)}
          </div>
          <div className="showcase-fade showcase-fade--right"></div>
        </div>
      </div>
    </section>
  );
}

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="showcase-card-slot">
      <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="front-image">
              <img src={card.image} alt={card.title} />
              <span className="front-number">{card.number}</span>
              <span className="flip-hint"><i className="bi bi-arrow-repeat"></i></span>
            </div>
            <div className="front-content">
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              <div className="neutral-tags">
                {card.tags.map(tag => <span key={tag} className="neutral-tag">{tag}</span>)}
              </div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="back-icon">
              <img src={card.icon} alt="" width="24" height="24" />
            </div>
            <h4>{card.title}</h4>
            <ul className="back-features">
              {card.features.map(f => <li key={f}><span className="feature-dot"></span> {f}</li>)}
            </ul>
            <Link to="/services" className="btn white-btn" onClick={e => e.stopPropagation()}>
              Browse services <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceShowcase;
