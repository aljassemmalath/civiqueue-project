import { useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const SERVICES = {
  'national-id':           { name: 'National ID Card Issuance',      cat: 'Passport & ID',      icon: '/assets/images/svg/identity-card.svg', duration: '30 min' },
  'new-passport':          { name: 'New Passport Application',        cat: 'Passport & ID',      icon: '/assets/images/svg/passport.svg',      duration: '30 min' },
  'passport-renewal':      { name: 'Passport Renewal',                cat: 'Passport & ID',      icon: '/assets/images/svg/passport.svg',      duration: '25 min' },
  'birth-cert-records':    { name: 'Birth Certificate Records',       cat: 'Passport & ID',      icon: '/assets/images/svg/identity-card.svg', duration: '20 min' },
  'lost-id':               { name: 'Lost ID Card Replacement',        cat: 'Passport & ID',      icon: '/assets/images/svg/identity-card.svg', duration: '30 min' },
  'id-address-update':     { name: 'ID Card Address Update',          cat: 'Passport & ID',      icon: '/assets/images/svg/identity-card.svg', duration: '20 min' },
  'temp-travel-doc':       { name: 'Temporary Travel Document',       cat: 'Passport & ID',      icon: '/assets/images/svg/passport.svg',      duration: '45 min' },
  'child-passport':        { name: 'Child Passport Application',      cat: 'Passport & ID',      icon: '/assets/images/svg/passport.svg',      duration: '30 min' },
  'senior-id':             { name: 'Senior Citizen ID Card',          cat: 'Passport & ID',      icon: '/assets/images/svg/identity-card.svg', duration: '20 min' },
  'emergency-passport':    { name: 'Emergency Passport Processing',   cat: 'Passport & ID',      icon: '/assets/images/svg/passport.svg',      duration: '60 min' },
  'new-driving-license':   { name: 'New Driving License Application', cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '45 min' },
  'driving-test':          { name: 'Driving Test Booking',            cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '60 min' },
  'license-renewal':       { name: 'License Renewal & Replacement',   cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '30 min' },
  'vehicle-reg':           { name: 'Vehicle Registration & Transfer', cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '30 min' },
  'intl-driving-permit':   { name: 'International Driving Permit',    cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '25 min' },
  'vehicle-inspection':    { name: 'Vehicle Inspection Booking',      cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '45 min' },
  'traffic-fine':          { name: 'Traffic Fine Settlement',         cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '20 min' },
  'learners-permit':       { name: "Learner's Permit Application",    cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '20 min' },
  'heavy-vehicle':         { name: 'Heavy Vehicle License',           cat: 'Driving License',    icon: '/assets/images/svg/car.svg',           duration: '60 min' },
  'annual-tax':            { name: 'Annual Tax Filing',               cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '45 min' },
  'tax-refund':            { name: 'Tax Refund Inquiry',              cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '30 min' },
  'financial-consultation':{ name: 'Financial Consultation',          cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '60 min' },
  'tax-clearance':         { name: 'Tax Clearance Certificate',       cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '30 min' },
  'property-tax':          { name: 'Property Tax Assessment',         cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '45 min' },
  'customs-duty':          { name: 'Customs Duty Assessment',         cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '30 min' },
  'tax-dispute':           { name: 'Tax Dispute Resolution',          cat: 'Tax & Finance',      icon: '/assets/images/svg/taxes.svg',         duration: '60 min' },
  'visa-application':      { name: 'Visa Application & Renewal',      cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '45 min' },
  'residence-permit':      { name: 'Residence Permit Processing',     cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '45 min' },
  'work-permit':           { name: 'Work Authorization Permit',       cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '30 min' },
  'citizenship-interview': { name: 'Citizenship Interview Booking',   cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '60 min' },
  'family-visa':           { name: 'Family Reunification Visa',       cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '45 min' },
  'student-visa':          { name: 'Student Visa Application',        cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '30 min' },
  'travel-ban':            { name: 'Travel Ban Inquiry',              cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '30 min' },
  'border-pass':           { name: 'Border Pass Application',         cat: 'Immigration & Visa', icon: '/assets/images/svg/airplane.svg',      duration: '20 min' },
  'marriage-reg':          { name: 'Marriage Registration',           cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '30 min' },
  'divorce-reg':           { name: 'Divorce Registration',            cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '30 min' },
  'birth-cert':            { name: 'Birth Certificate Issuance',      cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '20 min' },
  'residence-reg':         { name: 'Residence Registration',          cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '20 min' },
  'name-change':           { name: 'Name Change Application',         cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '30 min' },
  'doc-attestation':       { name: 'Legal Document Attestation',      cat: 'Civil Services',     icon: '/assets/images/svg/buildingBranch.svg',duration: '25 min' },
};

const SERVICE_CENTERS = {
  central:     { name: 'Central Government Office',    addr: '123 Republic Avenue, Block A',        hours: 'Mon–Fri  8:00 AM – 4:00 PM' },
  north:       { name: 'North District Office',         addr: '456 North Avenue, Capital City',      hours: 'Mon–Fri  8:00 AM – 4:00 PM' },
  south:       { name: 'South Regional Center',         addr: '789 South Boulevard, South Town',     hours: 'Mon–Fri  9:00 AM – 5:00 PM' },
  east:        { name: 'East Side Service Center',      addr: '22 Eastern Ring Road, East Block',    hours: 'Mon–Sat  8:00 AM – 3:00 PM' },
  west:        { name: 'West End Branch',               addr: '5 West Harbour Road, West Port',      hours: 'Mon–Fri  9:00 AM – 4:00 PM' },
  downtown:    { name: 'Downtown Administrative Hub',   addr: '1 City Square, Ground Floor',         hours: 'Mon–Fri  7:30 AM – 5:00 PM' },
  harbor:      { name: 'Harbor District Office',        addr: 'Pier 3, Harbor Complex',              hours: 'Mon–Fri  8:00 AM – 3:00 PM' },
  university:  { name: 'University Area Center',        addr: '10 Campus Road, University District', hours: 'Mon–Fri  9:00 AM – 4:00 PM' },
  industrial:  { name: 'Industrial Zone Branch',        addr: 'Gate 7, Industrial Park, Zone B',     hours: 'Mon–Thu  7:00 AM – 3:00 PM' },
  airport:     { name: 'Airport Services Center',       addr: 'Terminal 2, Level 1, Gate 18',        hours: 'Mon–Sun  6:00 AM – 10:00 PM' },
  midtown:     { name: 'Midtown Branch',                addr: '88 Midtown Square, Block C',          hours: 'Mon–Fri  8:00 AM – 4:00 PM' },
  northgate:   { name: 'Northgate Office',              addr: '200 Northgate Boulevard',             hours: 'Mon–Fri  9:00 AM – 5:00 PM' },
  southpark:   { name: 'Southpark Center',              addr: 'Southpark Mall, Level 2',             hours: 'Mon–Sat  10:00 AM – 6:00 PM' },
  riverside:   { name: 'Riverside Branch',              addr: '15 Riverside Walk, Block D',          hours: 'Mon–Fri  8:00 AM – 4:00 PM' },
  techquarter: { name: 'Tech Quarter Office',           addr: 'Innovation Hub, 4th Floor',           hours: 'Mon–Fri  9:00 AM – 5:00 PM' },
};

const DAY_CONFIG = {
  mon: { num: 1, label: 'Monday',    times: ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','2:00 PM'],             slotsLeft: 6 },
  tue: { num: 2, label: 'Tuesday',   times: ['9:00 AM','10:00 AM','11:30 AM','1:00 PM','3:00 PM'],                        slotsLeft: 5 },
  wed: { num: 3, label: 'Wednesday', times: ['8:30 AM','9:00 AM','10:00 AM','2:00 PM','3:30 PM','4:00 PM'],               slotsLeft: 6 },
  thu: { num: 4, label: 'Thursday',  times: ['9:00 AM','9:30 AM','11:00 AM','2:30 PM'],                                   slotsLeft: 4 },
  fri: { num: 5, label: 'Friday',    times: ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'], slotsLeft: 8 },
  sat: { num: 6, label: 'Saturday',  times: ['9:00 AM','10:00 AM','11:00 AM'],                                            slotsLeft: 3 },
};

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function nextOccurrence(targetDayNum) {
  const today = new Date();
  const todayN = today.getDay();
  let diff = targetDayNum - todayN;
  if (diff <= 0) diff += 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d;
}

function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const serviceId   = searchParams.get('service')  || '';
  const cityParam   = searchParams.get('city')     || '';
  const daysParam   = searchParams.get('days')     || '';
  const centerParam = searchParams.get('center')   || '';

  const svc    = SERVICES[serviceId]          || null;
  const center = SERVICE_CENTERS[centerParam] || null;

  const summaryTags = useMemo(() => {
    const tags = [];
    if (svc) tags.push({ icon: 'bi-grid-1x2', text: svc.name });
    if (cityParam) tags.push({ icon: 'bi-geo-alt', text: cityParam.charAt(0).toUpperCase() + cityParam.slice(1) });
    if (daysParam) {
      const dayLabels = daysParam.split(',').filter(d => DAY_CONFIG[d]).map(d => DAY_CONFIG[d].label).join(', ');
      if (dayLabels) tags.push({ icon: 'bi-calendar-week', text: dayLabels });
    }
    return tags;
  }, [serviceId, cityParam, daysParam]);

  const results = useMemo(() => {
    if (!serviceId) return [];
    let dayKeys = daysParam ? daysParam.split(',').filter(d => DAY_CONFIG[d]) : [];
    if (dayKeys.length === 0) dayKeys = ['mon', 'wed', 'fri'];
    return dayKeys.map(dayKey => {
      const cfg = DAY_CONFIG[dayKey];
      const date = nextOccurrence(cfg.num);
      return {
        dayKey,
        formatted: `${DAY_NAMES[date.getDay()]}, ${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
        isoDate: date.toISOString().split('T')[0],
        time: cfg.times[0],
        allTimes: cfg.times,
        slotsLeft: cfg.slotsLeft,
      };
    });
  }, [serviceId, daysParam]);

  const totalSlots = results.reduce((sum, r) => sum + r.allTimes.length, 0);

  const buildBookUrl = (r) => {
    const params = new URLSearchParams({
      startStep:     '2',
      service:       serviceId,
      serviceName:   svc?.name || '',
      center:        centerParam,
      centerName:    center?.name || '',
      centerAddr:    center?.addr || '',
      date:          r.isoDate,
      dateFormatted: r.formatted,
      time:          r.time,
    });
    return `/booking?${params.toString()}`;
  };

  return (
    <>
      <div className="results-banner">
        <div className="container">
          <div className="results-summary">
            {summaryTags.map(tag => (
              <span key={tag.text} className="results-summary-tag">
                <i className={`bi ${tag.icon}`}></i>{tag.text}
              </span>
            ))}
            <Link to="/" className="results-summary-edit ms-auto">
              <i className="bi bi-pencil"></i> Edit search
            </Link>
          </div>
        </div>
      </div>

      <div className="results-page">
        <div className="container">

          {!serviceId ? (
            <div className="results-empty">
              <div className="results-empty-icon"><i className="bi bi-calendar-x"></i></div>
              <h4>No appointments found</h4>
              <p>Try adjusting your search — change the service, city, or preferred days.</p>
              <Link to="/" className="btn btn-primary">
                <i className="bi bi-arrow-left"></i> Go back and search again
              </Link>
            </div>
          ) : (
            <>
              <div className="results-page-header">
                <h2 className="results-count">
                  <span>{results.length}</span> day{results.length !== 1 ? 's' : ''} with available appointments
                </h2>
                <p className="results-sub">
                  {totalSlots} total slots across {results.length} day{results.length !== 1 ? 's' : ''} — select a slot to book
                </p>
              </div>

              <div className="row g-4">
                {results.map(r => {
                  const isLow = r.slotsLeft <= 3;
                  return (
                    <div key={r.dayKey} className="col-12 col-md-6 col-xl-4">
                      <div className="result-card">

                        <div className="result-card-top">
                          <div className="card-icon">
                            {svc?.icon
                              ? <img src={svc.icon} alt="" width="36" height="36" />
                              : <i className="bi bi-file-earmark-text" style={{ fontSize: '20px', color: '#1B84E7' }}></i>
                            }
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <p className="result-svc-name">{svc?.name}</p>
                            <p className="result-svc-cat">{svc?.cat}</p>
                          </div>
                          <span className="result-avail-badge">Available</span>
                        </div>

                        <div className="result-details">
                          <div className="result-detail-row">
                            <img src="/assets/images/svg/locationBlue.svg" alt="" width="16" />
                            <div>
                              <span className="result-detail-label">Service Center</span>
                              <span className="result-detail-value">{center?.name || cityParam || 'Any branch'}</span>
                            </div>
                          </div>
                          <div className="result-detail-row">
                            <img src="/assets/images/svg/timeBlue.svg" alt="" width="16" />
                            <div>
                              <span className="result-detail-label">Duration</span>
                              <span className="result-detail-value">{svc?.duration}</span>
                            </div>
                          </div>
                          <div className="result-detail-row">
                            <img src="/assets/images/svg/calendar-blue.svg" alt="" width="16" />
                            <div>
                              <span className="result-detail-label">Date</span>
                              <span className="result-detail-value">{r.formatted}</span>
                            </div>
                          </div>
                          <div className="result-detail-row">
                            <img src="/assets/images/svg/appointmentBlue.svg" alt="" width="16" />
                            <div>
                              <span className="result-detail-label">First available</span>
                              <span className="result-detail-value">{r.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="result-card-footer">
                          <div className="result-slots">
                            <span className={`result-slots-dot ${isLow ? '' : 'plenty'}`}></span>
                            <span>{isLow ? `Only ${r.slotsLeft} slots left` : `${r.slotsLeft} slots available`}</span>
                          </div>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(buildBookUrl(r))}
                          >
                            Book appointment <i className="bi bi-arrow-right"></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Results;
