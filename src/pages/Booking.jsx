import { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DropdownField from '../components/DropdownField';

const OFFICE_DATA = {
  central:     { name: 'Central Service Center',   address: '123 Republic Avenue, Block A, Floor 2', city: 'ankara' },
  downtown:    { name: 'Downtown Civic Center',    address: '1 Central Plaza, Downtown', city: 'ankara' },
  midtown:     { name: 'Midtown Civil Services',   address: '44 Midtown Square, City Center', city: 'ankara' },
  northgate:   { name: 'Northgate Office',         address: '7 Northgate Drive, North Suburbs', city: 'ankara' },
  north:       { name: 'North District Office',    address: '456 North Avenue, Capital City', city: 'istanbul' },
  east:        { name: 'East Branch Office',       address: '22 Eastern Ring Road, East District', city: 'istanbul' },
  west:        { name: 'West Community Hub',       address: '15 Western Parkway, Westside', city: 'istanbul' },
  harbor:      { name: 'Harbor District Office',   address: '88 Harbor View Drive, Port Area', city: 'istanbul' },
  airport:     { name: 'Airport Services Branch',  address: 'Terminal 2, International Airport', city: 'istanbul' },
  techquarter: { name: 'Tech Quarter Branch',      address: '200 Innovation Way, Tech Quarter', city: 'istanbul' },
  south:       { name: 'South Regional Center',    address: '789 South Boulevard, South Town', city: 'izmir' },
  riverside:   { name: 'Riverside Office',         address: '60 River Road, Riverside', city: 'izmir' },
  southpark:   { name: 'Southpark Center',         address: '19 Park Lane, Southpark District', city: 'antalya' },
  industrial:  { name: 'Industrial Zone Office',   address: '300 Factory Road, Industrial Zone', city: 'bursa' },
  adanasouth:  { name: 'South Regional Center',    address: '15 Commerce Street, Adana', city: 'adana' },
};

const cityOptions = [
  { value: 'ankara', label: 'Ankara' },
  { value: 'istanbul', label: 'Istanbul' },
  { value: 'izmir', label: 'Izmir' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'bursa', label: 'Bursa' },
  { value: 'adana', label: 'Adana' },
];

const timeSlots = {
  Morning: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:30 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
  Evening: ['4:00 PM', '4:30 PM', '5:00 PM'],
};

const unavailableSlots = ['10:00 AM', '11:00 AM', '12:30 PM', '3:30 PM'];

const timeOptions = Object.entries(timeSlots).flatMap(([group, slots]) =>
  slots.map(slot => ({ value: slot, label: slot, group }))
);

const timeGroups = Object.entries(timeSlots).map(([group, slots]) => ({
  group,
  items: slots.map(slot => ({
    value: slot,
    label: unavailableSlots.includes(slot) ? `${slot} — Unavailable` : slot,
    disabled: unavailableSlots.includes(slot),
  })),
}));

const relationshipOptions = [
  { value: 'spouse', label: 'Spouse / Partner' },
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'guardian', label: 'Legal Guardian' },
  { value: 'other-rel', label: 'Other relative' },
];

const DOCS = [
  { id: 0, name: 'Birth Certificate', desc: 'Original or certified copy issued by a recognized civil authority' },
  { id: 1, name: 'Proof of Address', desc: 'Utility bill, bank statement, or lease agreement within the last 3 months' },
  { id: 2, name: 'Passport Photo', desc: '2 recent photos (3.5 × 4.5 cm), white background, taken within 6 months' },
];

const stepInfo = [
  { title: 'Personal info', sub: 'Enter applicant details' },
  { title: 'Booking information', sub: 'Date, location & documents' },
  { title: 'Review & confirm', sub: 'Confirm your booking' },
];

function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedServiceName = searchParams.get('serviceName') || '';
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [applicantType, setApplicantType] = useState('self');
  const [form, setForm] = useState({ fullName: 'Aysel Kaya', nationalId: '•••••••4892', phone: '+90 532 xxx xxxx', email: 'aysel.kaya@email.com' });
  const [otherForm, setOtherForm] = useState({ relationship: '', fullName: '', nationalId: '', dob: '' });

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const [office, setOffice] = useState('');
  const [docs, setDocs] = useState([null, null, null]);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [terms, setTerms] = useState(false);

  const fileRefs = [useRef(), useRef(), useRef()];

  const centerOptions = city
    ? Object.entries(OFFICE_DATA)
        .filter(([, v]) => v.city === city)
        .map(([k, v]) => ({ value: k, label: v.name }))
    : [];

  const step2Valid = date && time && city && office;

  const formatDate = (iso) => {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDocAttach = (idx, file) => {
    if (!file) return;
    setUploadingIdx(idx);
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 15;
      if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(() => { setUploadingIdx(null); setDocs(prev => { const next = [...prev]; next[idx] = { name: file.name, size: file.size }; return next; }); }, 300); }
      setUploadProgress(Math.min(Math.round(progress), 100));
    }, 280);
  };

  const goToStep = (s) => { setStep(s); window.scrollTo(0, 0); };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setConfirmed(true);
    window.scrollTo(0, 0);
  };

  if (confirmed) {
    return (
      <div className="container px-0">
        <main className="booking-layout">
          <div className="booking-panels sd-page-card">
            <div className="wizard-panel active">
              <div className="bk-confirmed-hero">
                <div className="bk-confirmed-circle">
                  <div className="bk-confirmed-icon">
                    <img src="/assets/images/svg/tickWhite.svg" alt="" width="36" />
                  </div>
                </div>
                <h3 className="bk-confirmed-title">Booking Submitted!</h3>
                <p className="bk-confirmed-sub">Your appointment request has been received and is being reviewed by our team.</p>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="alert-card alert-card--warning mb-4">
                    <div className="alert-card-icon-wrap"><i className="bi bi-exclamation-circle"></i></div>
                    <div className="alert-card-content">
                      <div className="alert-card-title">Appointment Under Review</div>
                      <div className="alert-card-text">Your booking is currently pending approval. You will receive a confirmation or update within 24–48 hours via email and SMS to the contact details you provided.</div>
                    </div>
                  </div>

                  {/* <div className="dashboard-card mb-4">
                    <div className="card-header">
                      <h5 className="card-title">Appointment Details</h5>
                      <span className="status-badge status-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <i className="bi bi-clock-history"></i> Pending review
                      </span>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-body">
                      {[
                        ['Service', 'National ID Card Issuance'],
                        ['Service center', office ? OFFICE_DATA[office]?.name : '—'],
                        ['Requested date', formatDate(date)],
                        ['Requested time', time || '—'],
                        ['Applicant', applicantType === 'other' ? 'Someone else' : `Myself (${form.fullName})`],
                        ['Documents', `${docs.filter(Boolean).length} of 3 uploaded`],
                      ].map(([label, value]) => (
                        <div key={label} className="info-row d-flex justify-content-between align-items-start">
                          <span className="info-label">{label}</span>
                          <span className="info-value text-end">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-center">
                {/* <button className="btn btn-outline-neutral"><i className="bi bi-download"></i> Download PDF</button> */}
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}><i className="bi bi-grid-1x2"></i> Go to dashboard</button>
              </div>
            </div>
          </div>
          <VerticalStepper currentStep={4} />
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="page-header auto-padding py-4">
        <nav className="breadcrumb">
          <span className="breadcrumb-item"><Link to="/services">Services</Link></span>
          <span className="breadcrumb-item"><Link to="/services/detail">Service details</Link></span>
          <span className="breadcrumb-item active">Book appointment</span>
        </nav>
        <h4 className="section-title">Book an appointment</h4>
        <p className="section-dsc">Follow the steps to schedule your service appointment.</p>
      </div>

      <div className="container px-0">
        <main className="booking-layout">
          <div className="booking-panels sd-page-card">

            {preselectedServiceName && (
              <div className="selected-service-banner">
                <i className="bi bi-grid-3x3-gap-fill"></i>
                <div>
                  <span className="selected-service-banner-label">Selected service</span>
                  <span className="selected-service-banner-name">{preselectedServiceName}</span>
                </div>
                <Link to="/services" className="selected-service-banner-change">
                  Change service <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            )}

            {step === 1 && (
              <div className="wizard-panel active">
                <div className="dashboard-card">
                  <div className="bk-section">
                    <div className="bk-section-header d-flex flex-column">
                      <div>
                        <h5 className="bk-section-title">Applicant</h5>
                        <p className="bk-section-sub">Is this appointment for yourself or on behalf of someone else?</p>
                      </div>
                      <div className="bk-section-body w-100">
                        <div className="row g-3">
                          {[{ value: 'self', icon: 'bi-person-fill', label: 'Myself', sub: 'I am attending this appointment' }, { value: 'other', icon: 'bi-people-fill', label: 'Someone else', sub: "I'm booking for another person" }].map(opt => (
                            <div key={opt.value} className="col-md-6">
                              <label className="card card-selectable mb-0">
                                <input type="radio" name="applicantType" value={opt.value} className="card-radio" checked={applicantType === opt.value} onChange={() => setApplicantType(opt.value)} />
                                <div className="card-header selectable-card-header align-items-center">
                                  <div className="d-flex gap-3">
                                    <div className="card-header-actions">
                                      <div className="sd-card-icon icon-white"><i className={`bi ${opt.icon}`}></i></div>
                                    </div>
                                    <div>
                                      <h5 className="card-title">{opt.label}</h5>
                                      <p className="card-text mb-0">{opt.sub}</p>
                                    </div>
                                  </div>
                                  <div className="card-radio-ui"></div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bk-divider"></div>

                  <div className="bk-section">
                    <h5 className="bk-section-title">Your Details</h5>
                    <p className="bk-section-sub">Personal information of the account holder</p>
                    <div className="bk-section-body mt-3">
                      <div className="row g-3">
                        {[
                          { id: 'fullName', label: 'Full name', type: 'text', placeholder: 'Enter your full name' },
                          { id: 'nationalId', label: 'National ID number', type: 'text', placeholder: 'Enter your national ID' },
                          { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '+90 5XX XXX XXXX' },
                          { id: 'email', label: 'Email address', type: 'email', placeholder: 'your@email.com' },
                        ].map(field => (
                          <div key={field.id} className="col-md-6">
                            <div className="form-group">
                              <label className="form-label">{field.label} <span className="text-danger">*</span></label>
                              <input className="form-input-filled" type={field.type} placeholder={field.placeholder} value={form[field.id]} onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {applicantType === 'other' && (
                    <>
                      <div className="bk-divider"></div>
                      <div className="bk-section">
                        <h5 className="bk-section-title">Person Being Served</h5>
                        <p className="bk-section-sub">Details of the person who will attend the appointment</p>
                        <div className="bk-section-body mt-3">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Relationship <span className="text-danger">*</span></label>
                                <DropdownField placeholder="Select relationship" options={relationshipOptions} value={otherForm.relationship} onChange={v => setOtherForm(p => ({ ...p, relationship: v }))} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Full name <span className="text-danger">*</span></label>
                                <input className="form-input-filled" type="text" placeholder="Enter their full name" value={otherForm.fullName} onChange={e => setOtherForm(p => ({ ...p, fullName: e.target.value }))} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">National ID number <span className="text-danger">*</span></label>
                                <input className="form-input-filled" type="text" placeholder="Enter their national ID" value={otherForm.nationalId} onChange={e => setOtherForm(p => ({ ...p, nationalId: e.target.value }))} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-label">Date of birth <span className="text-danger">*</span></label>
                                <input className="form-input-filled" type="date" value={otherForm.dob} onChange={e => setOtherForm(p => ({ ...p, dob: e.target.value }))} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="wizard-footer justify-content-end">
                  <button className="btn btn-secondary" onClick={() => goToStep(2)}>
                    <span>Continue</span> <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="wizard-panel active">
                <div className="dashboard-card">
                  <div className="bk-section">
                    <h5 className="bk-section-title">Date & Time</h5>
                    <div className="row g-3 p-0">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Appointment date <span className="text-danger">*</span></label>
                          <div className="date-field-wrap">
                            <img src="/assets/images/svg/calendarLightGrey.svg" alt="" />
                            <span className={`date-display-text ${date ? 'has-value' : ''}`}>{date ? formatDate(date) : 'Choose a date'}</span>
                            <input type="date" className="date-native-input" min={new Date().toISOString().split('T')[0]} value={date} onChange={e => { setDate(e.target.value); setTime(''); }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Appointment time <span className="text-danger">*</span></label>
                          <DropdownField placeholder="Select a time" groups={timeGroups} value={time} onChange={setTime} size="lg" disabled={!date} />
                          {!date && <span className="field-hint"><i className="bi bi-info-circle"></i> Choose appointment date first</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bk-divider"></div>

                  <div className="bk-section">
                    <h5 className="bk-section-title">Service Center</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">City <span className="text-danger">*</span></label>
                          <DropdownField placeholder="Select a city" options={cityOptions} value={city} onChange={v => { setCity(v); setOffice(''); }} size="lg" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Service center <span className="text-danger">*</span></label>
                          <DropdownField placeholder="Select a service center" options={centerOptions} value={office} onChange={setOffice} size="lg" searchable disabled={!city} />
                          {!city && <span className="field-hint"><i className="bi bi-info-circle"></i> Choose a city first</span>}
                        </div>
                      </div>
                    </div>
                    {office && OFFICE_DATA[office] && (
                      <div className="selected-center-info" style={{ display: 'flex' }}>
                        <div className="selected-center-icon"><img src="/assets/images/svg/location-10.svg" alt="" width="18" /></div>
                        <div className="selected-center-details">
                          <span className="selected-center-name">{OFFICE_DATA[office].name}</span>
                          <span className="selected-center-addr">{OFFICE_DATA[office].address}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bk-divider"></div>

                  <div className="bk-section">
                    <h5 className="bk-section-title">Required Documents</h5>
                    <div className="doc-per-field-list">
                      {DOCS.map(doc => (
                        <div key={doc.id} className={`doc-per-field ${docs[doc.id] ? 'has-file' : ''}`}>
                          <div className="doc-per-field-left">
                            <div className="doc-per-field-name">
                              {doc.name}
                              {docs[doc.id]
                                ? <i className="bi bi-check-circle-fill" style={{ color: '#2FBF71', marginLeft: '6px' }}></i>
                                : <span className="doc-field-req">*</span>}
                            </div>
                            <div className="doc-per-field-desc">{doc.desc}</div>
                            <div className="doc-per-field-status">
                              {docs[doc.id]
                                ? <div className="doc-status-file">
                                    <i className="bi bi-file-earmark-check doc-status-check-icon"></i>
                                    <span className="doc-status-name">{docs[doc.id].name}</span>
                                    <span className="doc-status-meta">{(docs[doc.id].size / 1048576).toFixed(1)} MB</span>
                                    <button className="doc-status-remove" type="button" onClick={() => setDocs(prev => { const n = [...prev]; n[doc.id] = null; return n; })}>
                                      <i className="bi bi-x-lg"></i>
                                    </button>
                                  </div>
                                : <span className="doc-status-empty">No file attached</span>}
                            </div>
                          </div>
                          <button type="button" className="doc-per-attach-btn" onClick={() => fileRefs[doc.id].current.click()}>
                            <i className={`bi ${docs[doc.id] ? 'bi-arrow-repeat' : 'bi-paperclip'}`}></i> {docs[doc.id] ? 'Replace' : 'Attach'}
                          </button>
                          <input type="file" ref={fileRefs[doc.id]} hidden accept=".pdf,.jpg,.jpeg,.png" onChange={e => { if (e.target.files[0]) handleDocAttach(doc.id, e.target.files[0]); e.target.value = ''; }} />
                        </div>
                      ))}
                    </div>
                    <p className="doc-per-hint mt-2">PDF, JPG or PNG · max 10 MB per file · all fields mandatory</p>
                  </div>
                </div>

                <div className="wizard-footer">
                  <button className="btn btn-outline-neutral" onClick={() => goToStep(1)}><i className="bi bi-arrow-left"></i> Back</button>
                  <button className="btn btn-secondary" disabled={!step2Valid} onClick={() => goToStep(3)}>
                    <span>Continue</span> <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="wizard-panel active">
                <div className="row g-4">
                  <div className="col-lg-8">
                    <div className="dashboard-card overflow-hidden">
                      {[
                        { label: 'Service', fields: [{ key: 'Service type', val: 'National ID Card Issuance' }], editStep: null },
                        { label: 'Location & date', fields: [{ key: 'City', val: cityOptions.find(c => c.value === city)?.label || '—' }, { key: 'Office', val: office ? OFFICE_DATA[office]?.name : '—' }, { key: 'Address', val: office ? OFFICE_DATA[office]?.address : '—' }, { key: 'Date', val: formatDate(date) }, { key: 'Time', val: time || '—' }], editStep: 2 },
                        { label: 'Personal information', fields: [{ key: 'Appointment for', val: applicantType === 'other' ? 'Someone else' : 'Myself' }, { key: 'Full name', val: form.fullName }, { key: 'National ID', val: form.nationalId }, { key: 'Phone', val: form.phone }, { key: 'Email', val: form.email }], editStep: 1 },
                      ].map(section => (
                        <div key={section.label} className="review-section">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="review-label">{section.label}</span>
                            {section.editStep && <button className="btn btn-tertiary" onClick={() => goToStep(section.editStep)}>Edit</button>}
                          </div>
                          {section.fields.map(f => (
                            <div key={f.key} className="info-row d-flex justify-content-between align-items-start">
                              <span className="info-label">{f.key}</span>
                              <span className="info-value">{f.val}</span>
                            </div>
                          ))}
                        </div>
                      ))}

                      <div className="review-section">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="review-label">Documents</span>
                          <button className="btn btn-tertiary" onClick={() => goToStep(2)}>Edit</button>
                        </div>
                        {DOCS.map((doc, i) => (
                          <div key={doc.id} className="info-row d-flex justify-content-between align-items-start">
                            <span className="info-label">{doc.name}</span>
                            {docs[i]
                              ? <span className="info-value" style={{ color: '#2FBF71', fontWeight: 600 }}><i className="bi bi-check-circle-fill"></i> {docs[i].name}</span>
                              : <span className="info-value" style={{ color: '#CC0C39', fontWeight: 500 }}>Not uploaded</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="terms-check d-flex align-items-start gap-3">
                      <input type="checkbox" id="termsCheck" checked={terms} onChange={e => setTerms(e.target.checked)} />
                      <label htmlFor="termsCheck">I confirm that the information provided is accurate and I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I understand that providing false information may result in appointment cancellation.</label>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="dashboard-card">
                      <div className="card-header"><h5 className="card-title">Booking summary</h5></div>
                      <hr className="card-divider" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2"><span className="info-label">Service fee</span><span className="info-value">$110.00</span></div>
                        <div className="d-flex justify-content-between mb-2"><span className="info-label">Processing fee</span><span className="info-value">$5.00</span></div>
                        <hr className="card-divider" />
                        <div className="d-flex justify-content-between">
                          <span className="info-label">Total</span>
                          <span className="text-secondary" style={{ fontSize: '18px', fontWeight: 700 }}>$115.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="alert-card alert-card-sm alert-card--blue mt-4">
                      <div className="alert-card-content">
                        <div className="alert-card-title">Free cancellation:</div>
                        <div className="alert-card-text">Cancel or reschedule up to 24 hours before your appointment at no extra cost.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wizard-footer">
                  <button className="btn btn-outline-neutral" onClick={() => goToStep(2)}><i className="bi bi-arrow-left"></i> Back</button>
                  <button className="btn btn-secondary" disabled={!terms} onClick={() => setShowConfirmModal(true)}>
                    <i className="bi bi-check-lg"></i> Confirm booking
                  </button>
                </div>
              </div>
            )}

          </div>

          <VerticalStepper currentStep={step} />
        </main>
      </div>

      {uploadingIdx !== null && (
        <div className="modal-overlay open">
          <div className="modal" style={{ maxWidth: '420px' }}>
            <div className="modal-header"><h3 className="modal-title">Uploading document</h3></div>
            <div className="modal-body text-center">
              <i className="bi bi-cloud-arrow-up text-brand" style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#2F2F2F' }}>{DOCS[uploadingIdx]?.name}</p>
              <div className="upload-progress-bar">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <div className="upload-status"><span>{uploadProgress}%</span></div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowConfirmModal(false)}>
          <div className="modal" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ padding: '32px 28px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #D0D5DD', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#6B7280' }}>
                <i className="bi bi-info-circle"></i>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#112B5F', margin: 0 }}>Confirm Application Submission</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Are you sure you want to submit this application?</p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '12px', padding: '20px 28px 28px' }}>
              <button className="btn btn-outline-neutral" style={{ minWidth: '110px' }} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="btn btn-secondary" style={{ minWidth: '120px' }} onClick={handleConfirm}>Submit <i className="bi bi-arrow-right"></i></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VerticalStepper({ currentStep }) {
  return (
    <aside className="booking-stepper">
      <div className="v-stepper d-none d-lg-flex flex-column">
        {stepInfo.map((s, i) => {
          const stepNum = i + 1;
          const isDone = currentStep > stepNum || currentStep === 4;
          const isActive = currentStep === stepNum;
          return (
            <div key={stepNum} className={`v-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`} data-step={stepNum}>
              <div className="v-step-indicator">
                <div className="v-step-dot">
                  <span className="v-step-num">{stepNum}</span>
                  <img src="/assets/images/svg/tickBlue.svg" className="v-step-check" alt="" width="16" />
                </div>
                <div className="v-step-line"></div>
              </div>
              <div className="v-step-label">
                <span className="v-step-title">{s.title}</span>
                <span className="v-step-sub">{s.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="v-step-mobile d-flex d-lg-none align-items-center gap-3">
        <div className={`v-step-mobile-dot ${currentStep === 4 ? 'done' : ''}`}>
          <span className="v-step-mobile-num">{Math.min(currentStep, 3)}</span>
          <i className="bi bi-check-lg v-step-mobile-check"></i>
        </div>
        <div className="v-step-mobile-info">
          <span className="v-step-mobile-counter">{currentStep === 4 ? 'Completed' : `Step ${currentStep} of 3`}</span>
          <span className="v-step-mobile-title">{currentStep === 4 ? 'Booking confirmed' : stepInfo[currentStep - 1]?.title}</span>
        </div>
      </div>
    </aside>
  );
}

export default Booking;
