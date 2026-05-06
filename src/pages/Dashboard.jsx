import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import DropdownField from '../components/DropdownField';

const sidebarLinks = [
  { id: 'dashboard',     label: 'Dashboard',        section: 'Main',    iconDefault: '/assets/images/svg/dashboard-outline.svg',    iconActive: '/assets/images/svg/dashboard-solid.svg' },
  { id: 'appointments',  label: 'My appointments',  section: 'Main',    iconDefault: '/assets/images/svg/appointments-outline.svg', iconActive: '/assets/images/svg/appointments-solid.svg' },
  { id: 'documents',     label: 'Documents',        section: 'Main',    iconDefault: '/assets/images/svg/files-outline.svg',        iconActive: '/assets/images/svg/files-solid.svg' },
  { id: 'settings',      label: 'Settings',         section: 'Account', iconDefault: '/assets/images/svg/settings-outline.svg',     iconActive: '/assets/images/svg/settings-solid.svg' },
  // { id: 'help',          label: 'Help center',      section: 'Account', iconDefault: '/assets/images/svg/help-outline.svg',         iconActive: '/assets/images/svg/help-solid.svg' },
];

const allAppointments = [
  { id: 1, month: 'MAY', day: '8',  time: '9:00 AM',  weekday: 'Thursday', status: 'Pending approval', statusClass: 'status-warning', title: 'Driving License Renewal',    location: 'North District Office',    category: 'Licensing',     tab: 'upcoming' },
  { id: 2, month: 'APR', day: '12', time: '10:00 AM', weekday: 'Saturday', status: 'Confirmed',        statusClass: 'status-success', title: 'Passport Renewal',            location: 'Central Branch',           category: 'Passport & ID', tab: 'upcoming' },
  { id: 3, month: 'APR', day: '20', time: '2:30 PM',  weekday: 'Sunday',   status: 'Confirmed',        statusClass: 'status-success', title: 'Tax Return Filing',           location: 'Revenue Office — Floor 2', category: 'Tax & Finance', tab: 'upcoming' },
  { id: 4, month: 'MAR', day: '28', time: '11:00 AM', weekday: 'Friday',   status: 'Completed',        statusClass: 'status-success', title: 'National ID Renewal',         location: 'Central Service Center',   category: 'Passport & ID', tab: 'completed' },
  { id: 5, month: 'MAR', day: '14', time: '9:30 AM',  weekday: 'Friday',   status: 'Cancelled',        statusClass: 'status-danger',  title: 'Vehicle Registration',        location: 'North District Office',    category: 'Licensing',     tab: 'cancelled' },
  { id: 6, month: 'FEB', day: '22', time: '3:00 PM',  weekday: 'Saturday', status: 'Completed',        statusClass: 'status-success', title: 'Birth Certificate Issuance',  location: 'South Regional Center',    category: 'Civil Services',tab: 'completed' },
  { id: 7, month: 'FEB', day: '5',  time: '1:00 PM',  weekday: 'Thursday', status: 'Completed',        statusClass: 'status-success', title: 'Residence Registration',      location: 'Central Service Center',   category: 'Civil Services',tab: 'completed' },
  { id: 8, month: 'JAN', day: '18', time: '10:30 AM', weekday: 'Saturday', status: 'Cancelled',        statusClass: 'status-danger',  title: 'Tax Clearance Certificate',   location: 'Revenue Office',           category: 'Tax & Finance', tab: 'cancelled' },
];

const allDocuments = [
  { id: 1, name: 'National_ID_scan.pdf',       uploaded: 'Apr 5, 2026',  linked: 'Passport renewal', size: '2.4 MB', icon: 'bi-file-earmark-person',      iconClass: 'icon-blue',    expiry: 'valid',    category: 'id' },
  { id: 2, name: 'Passport_photo_1.jpg',       uploaded: 'Apr 5, 2026',  linked: 'Passport renewal', size: '1.1 MB', icon: 'bi-file-earmark-image',       iconClass: 'icon-success', expiry: 'valid',    category: 'photos' },
  { id: 3, name: 'Income_statement_2025.pdf',  uploaded: 'Mar 20, 2026', linked: 'Tax filing',       size: '3.8 MB', icon: 'bi-file-earmark-spreadsheet', iconClass: 'icon-blue',    expiry: 'valid',    category: 'financial' },
  { id: 4, name: 'Tax_receipts_2025.pdf',      uploaded: 'Mar 18, 2026', linked: 'Tax filing',       size: '5.2 MB', icon: 'bi-file-earmark-text',        iconClass: 'icon-blue',    expiry: 'expiring', category: 'financial' },
  { id: 5, name: 'Driving_theory_cert.pdf',    uploaded: 'Feb 28, 2026', linked: 'Driving test',     size: '890 KB', icon: 'bi-file-earmark-medical',     iconClass: 'icon-success', expiry: 'valid',    category: 'other' },
  { id: 6, name: 'Passport_copy.pdf',          uploaded: 'Jan 10, 2026', linked: 'Visa application', size: '4.1 MB', icon: 'bi-file-earmark-pdf',         iconClass: 'icon-info',    expiry: 'expired',  category: 'id' },
];

function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [apptTab, setApptTab] = useState('upcoming');
  const [apptFilterOpen, setApptFilterOpen] = useState(false);

  const navigate = (page) => { setActivePage(page); setSidebarOpen(false); window.scrollTo(0, 0); };
  const openDetail = (appt) => { setSelectedAppt(appt); setActivePage('appt-detail'); setSidebarOpen(false); window.scrollTo(0, 0); };

  const mainLinks = sidebarLinks.filter(l => l.section === 'Main');
  const accountLinks = sidebarLinks.filter(l => l.section === 'Account');

  const tabCounts = {
    upcoming: allAppointments.filter(a => a.tab === 'upcoming').length,
    completed: allAppointments.filter(a => a.tab === 'completed').length,
    cancelled: allAppointments.filter(a => a.tab === 'cancelled').length,
  };

  return (
    <div className="dash-layout">
      <div className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <aside className={`dash-sidebar d-flex flex-column flex-shrink-0 ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav flex-grow-1 d-flex flex-column">
          <div className="sidebar-section">
            <span className="sidebar-section-label">Main</span>
            {mainLinks.map(link => (
              <button key={link.id} className={`sidebar-link ${activePage === link.id || (activePage === 'appt-detail' && link.id === 'appointments') ? 'active' : ''}`} onClick={() => navigate(link.id)}>
                <img src={link.iconDefault} className="icon-default" alt="" />
                <img src={link.iconActive} className="icon-active" alt="" />
                <span>{link.label}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-section">
            <span className="sidebar-section-label">Account</span>
            {accountLinks.map(link => (
              <button key={link.id} className={`sidebar-link ${activePage === link.id ? 'active' : ''}`} onClick={() => navigate(link.id)}>
                <img src={link.iconDefault} className="icon-default" alt="" />
                <img src={link.iconActive} className="icon-active" alt="" />
                <span>{link.label}</span>
              </button>
            ))}
          </div>
          <div className="sidebar-bottom">
            <div className="d-flex d-lg-none align-items-center gap-2 px-2 py-3" style={{ borderTop: '1px solid #DDE6F0', marginBottom: '4px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#1B84E7,#0A4582)', color: '#fff', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AK</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#112B5F' }}>Aysel Kaya</div>
                <div style={{ fontSize: '11px', color: '#8FA3BC' }}>aysel.kaya@email.com</div>
              </div>
            </div>
            <button className="sidebar-link logout">
              <img src="/assets/images/svg/logout.svg" className="icon-default" alt="" />
              <span>Sign out</span>
            </button>
          </div>
        </nav>
      </aside>

      <button className="mobile-toggle d-lg-none position-fixed bottom-0 end-0 z-3" onClick={() => setSidebarOpen(p => !p)}>
        <i className="bi bi-layout-sidebar"></i>
      </button>

      <div className="right-side-dash">
        <div className="dash-main">
          <main>

            {/* ── DASHBOARD HOME ─────────────────────────── */}
            {activePage === 'dashboard' && (
              <section className="page-section active">
                <div className="page-content">
                  <nav className="breadcrumb"><span className="breadcrumb-item active">Dashboard</span></nav>
                  <div className="welcome-card mb-4">
                    <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
                      <div>
                        <h2 className="mb-2">Welcome back, Aysel</h2>
                        <p>You have 3 upcoming appointments this month.</p>
                        <div className="countdown">Next appointment in <strong style={{ marginLeft: '4px' }}>2 days, 14 hours</strong></div>
                      </div>
                      <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>
                        <i className="bi bi-plus-lg"></i> New booking
                      </button>
                    </div>
                  </div>

                  <div className="row g-3 mb-4">
                    {[
                      { val: '12', label: 'Total booked',  icon: '/assets/images/svg/CalendarallBooked.svg',    iconClass: 'card-icon-primary', valClass: '' },
                      { val: '8',  label: 'Completed',     icon: '/assets/images/svg/appointment-completed.svg', iconClass: 'card-icon-success', valClass: 'text-success' },
                      { val: '3',  label: 'Upcoming',      icon: '/assets/images/svg/appointment-upcoming.svg',  iconClass: 'card-icon-info',    valClass: 'text-info' },
                      { val: '1',  label: 'Cancelled',     icon: '/assets/images/svg/appointment-canceled.svg',  iconClass: '',                  valClass: 'text-muted' },
                    ].map(s => (
                      <div key={s.label} className="col-6 col-lg-3">
                        <div className="dashboard-box d-flex flex-row justify-content-between align-items-center">
                          <div><div className={`stat-val ${s.valClass}`}>{s.val}</div><div className="stat-label">{s.label}</div></div>
                          <div className={`card-icon ${s.iconClass}`}><img src={s.icon} alt="" /></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row g-4">
                    <div className="col-lg-8">
                      <div className="dashboard-card">
                        <div className="card-header">
                          <h5 className="card-title">Upcoming appointments</h5>
                          <button className="btn btn-outline-neutral btn-sm" onClick={() => navigate('appointments')}>View all</button>
                        </div>
                        <hr className="card-divider" />
                        <div className="card-body">
                          <div className="appt-grid appt-grid--2">
                            {allAppointments.filter(a => a.tab === 'upcoming').map(appt => (
                              <ApptCard key={appt.id} appt={appt} onClick={() => openDetail(appt)} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="dashboard-card">
                        <div className="card-header">
                          <h5 className="card-title">Recent activity</h5>
                        </div>
                        <hr className="card-divider" />
                        <div className="card-body">
                          <div className="timeline-item">
                            <div className="timeline-dot icon-success"><img src="/assets/images/svg/tickBlue.svg" alt=""/></div>
                            <div className="timeline-content"><h6>Passport renewal confirmed</h6><p>Your appointment has been confirmed.</p><span className="timeline-time">2 hours ago</span></div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot icon-blue"><img src="/assets/images/svg/tickBlue.svg" alt=""/></div>
                            <div className="timeline-content"><h6>Document uploaded</h6><p>National ID scan added to your profile.</p><span className="timeline-time">Yesterday</span></div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot icon-warning"><img src="/assets/images/svg/notification-purple.svg" alt=""/></div>
                            <div className="timeline-content"><h6>Reminder sent</h6><p>Tax appointment reminder for Apr 20.</p><span className="timeline-time">2 days ago</span></div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-dot icon-info"><img src="/assets/images/svg/appointment-turq.svg" alt=""/></div>
                            <div className="timeline-content"><h6>New booking created</h6><p>Driving license test — Apr 15, 2:30 PM.</p><span className="timeline-time">3 days ago</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ── MY APPOINTMENTS ────────────────────────── */}
            {activePage === 'appointments' && (
              <section className="page-section active">
                <div className="page-content">
                  <nav className="breadcrumb">
                    <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={() => navigate('dashboard')}>Dashboard</span>
                    <span className="breadcrumb-item active">My Appointments</span>
                  </nav>
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                      <h4 className="section-title mb-1">My Appointments</h4>
                      <p className="section-dsc mb-0">All your booked government service appointments.</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-neutral d-md-none" onClick={() => setApptFilterOpen(true)}>
                        <i className="bi bi-funnel"></i> Filter
                      </button>
                      <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>
                        <i className="bi bi-plus-lg"></i> New booking
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-card">
                    <div className="card-header flex-wrap gap-2">
                      <div className="custom-tabs d-none d-md-flex">
                        <button className={`custom-tab tab-primary ${apptTab === 'upcoming' ? 'active' : ''}`} onClick={() => setApptTab('upcoming')}>
                          Upcoming <span className="badge">{tabCounts.upcoming}</span>
                        </button>
                        <button className={`custom-tab tab-success ${apptTab === 'completed' ? 'active' : ''}`} onClick={() => setApptTab('completed')}>
                          Completed <span className="badge">{tabCounts.completed}</span>
                        </button>
                        <button className={`custom-tab tab-neutral ${apptTab === 'cancelled' ? 'active' : ''}`} onClick={() => setApptTab('cancelled')}>
                          Cancelled <span className="badge">{tabCounts.cancelled}</span>
                        </button>
                      </div>
                      <div className="d-md-none">
                        <span className="fw-semibold text-sm" style={{ textTransform: 'capitalize' }}>{apptTab}</span>
                        <span className="ms-2 status-badge status-info">{tabCounts[apptTab]}</span>
                      </div>
                    </div>
                    <hr className="card-divider" />
                    <div className="card-body">
                      {allAppointments.filter(a => a.tab === apptTab).length === 0 ? (
                        <div className="text-center py-5 text-muted">
                          <i className="bi bi-calendar-x fs-1 d-block mb-3"></i>
                          <p>No {apptTab} appointments.</p>
                        </div>
                      ) : (
                        <div className="appt-grid appt-grid--3">
                          {allAppointments.filter(a => a.tab === apptTab).map(appt => (
                            <ApptCard key={appt.id} appt={appt} onClick={() => openDetail(appt)} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ── APPOINTMENT DETAIL ─────────────────────── */}
            {activePage === 'appt-detail' && selectedAppt && (
              <AppointmentDetail
                appt={selectedAppt}
                onBack={() => navigate('appointments')}
                onHome={() => navigate('dashboard')}
                onCancelConfirm={() => navigate('appointments')}
              />
            )}

            {/* ── DOCUMENTS ──────────────────────────────── */}
            {activePage === 'documents' && (
              <DocumentsPage onHome={() => navigate('dashboard')} onNewBooking={() => setBookingOpen(true)} />
            )}

            {/* ── SETTINGS ───────────────────────────────── */}
            {activePage === 'settings' && <SettingsPage onHome={() => navigate('dashboard')} />}

            {/* ── HELP ───────────────────────────────────── */}
            {/* {activePage === 'help' && (
              <section className="page-section active">
                <div className="page-content">
                  <nav className="breadcrumb">
                    <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={() => navigate('dashboard')}>Dashboard</span>
                    <span className="breadcrumb-item active">Help Center</span>
                  </nav>
                  <h4 className="section-title mb-1">Help Center</h4>
                  <p className="section-dsc mb-4">Find answers or get in touch with our support team.</p>
                  <div className="row g-4 mb-4">
                    {[
                      { icon: 'bi-book', title: 'Documentation', desc: 'Browse guides and step-by-step instructions for all services.', action: 'Browse docs' },
                      { icon: 'bi-chat-dots', title: 'Live Chat', desc: 'Chat with a support agent Monday – Friday, 8 AM – 6 PM.', action: 'Start chat' },
                      { icon: 'bi-telephone', title: 'Phone Support', desc: 'Call 1800-CIV-HELP for urgent assistance.', action: '1800-CIV-HELP' },
                    ].map(card => (
                      <div key={card.title} className="col-md-4">
                        <div className="dashboard-card h-100 text-center">
                          <div className="card-body py-4">
                            <i className={`bi ${card.icon} text-primary d-block mb-3`} style={{ fontSize: '32px' }}></i>
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text text-muted text-sm mb-3">{card.desc}</p>
                            <button className="btn btn-outline-neutral btn-sm">{card.action}</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dashboard-card">
                    <div className="card-header"><h5 className="card-title">Quick answers</h5></div>
                    <hr className="card-divider" />
                    <div className="card-body">
                      {[
                        { q: 'How do I cancel an appointment?', a: 'Go to My Appointments, open the appointment you want to cancel, and click "Cancel Appointment". Cancellations must be made at least 12 hours in advance.' },
                        { q: 'How do I reschedule?', a: 'Open the appointment from My Appointments and click "Reschedule". You can change the date and time up to 24 hours before your original slot.' },
                        { q: 'Where can I find my confirmation email?', a: 'Check the inbox of your registered email address. If not found, check your spam folder or contact support.' },
                      ].map((item, i) => (
                        <div key={item.q} style={{ borderBottom: i < 2 ? '1px solid #EDF3FA' : 'none', paddingBottom: '16px', marginBottom: i < 2 ? '16px' : 0 }}>
                          <div className="fw-semibold text-sm mb-1">{item.q}</div>
                          <div className="text-muted text-sm">{item.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )} */}

          </main>
        </div>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── Mobile appointments filter modal ── */}
      {apptFilterOpen && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setApptFilterOpen(false)}>
          <div className="modal" style={{ maxWidth: '340px' }}>
            <div className="modal-header">
              <div className="modal-icon"><i className="bi bi-funnel" style={{ fontSize: '18px', color: '#1B84E7' }}></i></div>
              <div><h3 className="modal-title">Filter appointments</h3><p className="modal-sub">Select a view</p></div>
              <button className="modal-close" onClick={() => setApptFilterOpen(false)}><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="modal-body py-2">
              {[
                { key: 'upcoming', label: 'Upcoming', color: '#1B84E7', bg: 'rgba(27,132,231,0.08)' },
                { key: 'completed', label: 'Completed', color: '#2FBF71', bg: 'rgba(47,191,113,0.08)' },
                { key: 'cancelled', label: 'Cancelled', color: '#6B7280', bg: 'rgba(107,114,128,0.08)' },
              ].map(opt => (
                <button
                  key={opt.key}
                  className="d-flex align-items-center justify-content-between w-100 border-0 px-3 py-3 text-start"
                  style={{ background: apptTab === opt.key ? opt.bg : 'transparent', borderRadius: '8px', cursor: 'pointer', fontWeight: apptTab === opt.key ? 600 : 400, color: apptTab === opt.key ? opt.color : '#374151', marginBottom: '4px', transition: 'background 0.15s' }}
                  onClick={() => { setApptTab(opt.key); setApptFilterOpen(false); }}
                >
                  <span>{opt.label}</span>
                  <span style={{ background: apptTab === opt.key ? opt.color : '#E5E7EB', color: apptTab === opt.key ? '#fff' : '#6B7280', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{tabCounts[opt.key]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Documents Page ────────────────────────────────────────────────────────────

const docTabs = [
  { key: 'all',       label: 'All',           count: allDocuments.length },
  { key: 'id',        label: 'ID & Passport', count: allDocuments.filter(d => d.category === 'id').length },
  { key: 'financial', label: 'Financial',     count: allDocuments.filter(d => d.category === 'financial').length },
  { key: 'photos',    label: 'Photos',        count: allDocuments.filter(d => d.category === 'photos').length },
  { key: 'other',     label: 'Other',         count: allDocuments.filter(d => d.category === 'other').length },
];

const expiryLabels = {
  valid:    { label: 'Valid',        className: 'expiry-badge expiry-valid' },
  expiring: { label: 'Expires soon', className: 'expiry-badge expiry-expiring' },
  expired:  { label: 'Expired',      className: 'expiry-badge expiry-expired' },
};

function DocumentsPage({ onHome }) {
  const [docs, setDocs] = useState(allDocuments);
  const [activeTab, setActiveTab] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [previewTarget, setPreviewTarget] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const visibleDocs = activeTab === 'all' ? docs : docs.filter(d => d.category === activeTab);

  const handleDelete = () => {
    setDocs(prev => prev.filter(d => d.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <section className="page-section active">
      <div className="page-content">
        <nav className="breadcrumb">
          <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={onHome}>Home</span>
          <span className="breadcrumb-item active">Documents</span>
        </nav>
        <div className="section-title-row">
          <div><h2 className="section-title" >My documents</h2><p>Upload and manage your government documents.</p></div>
          <button className="btn btn-primary" onClick={() => setUploadOpen(true)}><i className="bi bi-upload"></i> Upload new</button>
        </div>

        {/* <div className="d-flex gap-2 mb-3 flex-wrap">
          {docTabs.map(tab => (
            <button
              key={tab.key}
              className={`tab-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div> */}

        <div className="row g-3">
          {visibleDocs.map(doc => {
            const expiry = expiryLabels[doc.expiry];
            return (
              <div key={doc.id} className="col-md-6 col-lg-4">
                <div className="doc-card">
                  <div className={`doc-icon ${doc.iconClass}`}><i className={`bi ${doc.icon}`}></i></div>
                  <h5>{doc.name}</h5>
                  <div className="doc-details">
                    <span>Uploaded: {doc.uploaded}</span>
                    <span>Linked to: {doc.linked}</span>
                    <span>Size: {doc.size}</span>
                  </div>
                  <div className="doc-footer">
                    <span className={expiry.className}>{expiry.label}</span>
                    <div className="d-flex gap-1">
                      <button className="btn btn-icon btn-outline-neutral" title="Preview" onClick={() => setPreviewTarget(doc)}><i className="bi bi-eye"></i></button>
                      <button className="btn btn-icon btn-outline-neutral" title="Download"><i className="bi bi-download"></i></button>
                      <button className="btn btn-icon btn-outline-neutral" title="Delete" onClick={() => setDeleteTarget(doc)}><i className="bi bi-trash3 text-danger"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload modal */}
      {uploadOpen && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setUploadOpen(false)}>
          <div className="modal" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div className="modal-icon"><i className="bi bi-cloud-arrow-up" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
              <div><h3 className="modal-title">Upload document</h3><p className="modal-sub">PDF, JPG or PNG · max 10 MB</p></div>
              <button className="modal-close" onClick={() => setUploadOpen(false)}><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="modal-body">
              <div
                className="text-center py-5 px-4"
                style={{ border: `2px dashed ${dragOver ? '#1B84E7' : '#D0D5DD'}`, borderRadius: '12px', background: dragOver ? 'rgba(27,132,231,0.04)' : '#FAFAFA', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); }}
              >
                <i className="bi bi-cloud-arrow-up d-block mb-3" style={{ fontSize: '40px', color: dragOver ? '#1B84E7' : '#AEB6C2' }}></i>
                <p className="fw-semibold text-sm mb-1" style={{ color: '#374151' }}>Drag & drop a file here</p>
                <p className="text-muted text-xs mb-3">or click to browse from your device</p>
                <button className="btn btn-outline-neutral btn-sm">Browse files</button>
              </div>
              <div className="mt-3">
                <label className="form-label">Document name</label>
                <input className="form-input-filled" type="text" placeholder="Enter a label for this document" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-neutral" onClick={() => setUploadOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setUploadOpen(false)}><i className="bi bi-cloud-arrow-up"></i> Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="modal" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ padding: '32px 28px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#FEF1F3', border: '1.5px solid #FAB1C2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#CC0C39' }}>
                <i className="bi bi-trash3"></i>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#112B5F', margin: 0 }}>Delete document?</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: '12px', padding: '20px 28px 28px' }}>
              <button className="btn btn-outline-neutral" style={{ minWidth: '110px' }} onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="btn btn-danger" style={{ minWidth: '130px' }} onClick={handleDelete}><i className="bi bi-trash3"></i> Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {previewTarget && (
        <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setPreviewTarget(null)}>
          <div className="modal" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div className="modal-icon"><i className="bi bi-file-earmark-text" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
              <div style={{ minWidth: 0 }}>
                <h3 className="modal-title text-truncate">{previewTarget.name}</h3>
                <p className="modal-sub">{previewTarget.size} · Uploaded {previewTarget.uploaded}</p>
              </div>
              <button className="modal-close" onClick={() => setPreviewTarget(null)}><i className="bi bi-x-lg"></i></button>
            </div>
            <div className="modal-body text-center py-4">
              <div style={{ background: '#F5F7FA', borderRadius: '12px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <i className={`bi ${previewTarget.icon}`} style={{ fontSize: '52px', color: '#1B84E7' }}></i>
                <p className="text-muted text-sm mb-0">{previewTarget.name}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-neutral" onClick={() => setPreviewTarget(null)}>Close</button>
              <button className="btn btn-primary"><i className="bi bi-download"></i> Download</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Settings Page ─────────────────────────────────────────────────────────────

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className={`toggle-track ${on ? 'on' : ''}`} onClick={() => setOn(p => !p)}>
      <div className="toggle-thumb"></div>
    </div>
  );
}

function SettingsPage({ onHome }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Europe/Istanbul');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [textDir, setTextDir] = useState('ltr');

  const canDelete = deletePassword.length >= 6 && deleteConfirmText === 'DELETE';

  return (
    <section className="page-section active">
      <div className="page-content">
        <nav className="breadcrumb">
          <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={onHome}>Home</span>
          <span className="breadcrumb-item active">Settings</span>
        </nav>
        <div className="section-title-row">
          <div>
            <h5 className="section-title">Profile settings</h5>
            <p className="section-dsc">Manage your account and preferences.</p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8 d-flex flex-column gap-4">

            {/* Personal info */}
            <div className="dashboard-card">
              <div className="card-header">
                <h5 className="card-title">Personal information</h5>
                <button className="btn btn-outline-neutral btn-sm">Edit</button>
              </div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6"><label className="form-label">Full name</label><input className="form-input-filled" defaultValue="Aysel Kaya" /></div>
                  <div className="col-md-6"><label className="form-label">Email address</label><input className="form-input-filled" defaultValue="aysel.kaya@email.com" /></div>
                  <div className="col-md-6"><label className="form-label">Phone number</label><input className="form-input-filled" defaultValue="+90 532 xxx xxxx" /></div>
                  <div className="col-md-6"><label className="form-label">National ID</label><input className="form-input-filled" defaultValue="•••••••4892" readOnly /></div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Notification preferences</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                {[
                  { label: 'Email notifications', sub: 'Receive booking confirmations and reminders via email', defaultOn: true },
                  { label: 'SMS notifications', sub: 'Get text message reminders before appointments', defaultOn: true },
                  { label: 'Push notifications', sub: 'Browser push notifications for real-time updates', defaultOn: false },
                  { label: 'Marketing emails', sub: 'News about new services and features', defaultOn: false },
                ].map(pref => (
                  <div key={pref.label} className="pref-row d-flex align-items-center justify-content-between">
                    <div className="pref-info"><h6>{pref.label}</h6><p>{pref.sub}</p></div>
                    <Toggle defaultOn={pref.defaultOn} />
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="dashboard-card">
              <div className="card-header">
                <h5 className="card-title">Security</h5>
                <span className="settings-security-badge"><i className="bi bi-patch-check-fill"></i> Account secured</span>
              </div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="settings-security-row">
                  <div className="pref-info"><h6>Password</h6><p>Last changed 3 months ago</p></div>
                  <button className="btn btn-outline-neutral btn-sm" onClick={() => setShowPasswordModal(true)}>Change</button>
                </div>
                <div className="settings-security-row">
                  <div className="pref-info"><h6>Two-factor authentication</h6><p>Adds a verification step each time you sign in</p></div>
                  <button className="btn btn-outline-neutral btn-sm" onClick={() => setShowTwoFAModal(true)}>Enable</button>
                </div>
                <div className="settings-security-row">
                  <div className="pref-info"><h6>Active sessions</h6><p>2 devices currently signed in</p></div>
                  <button className="btn btn-outline-neutral btn-sm">View</button>
                </div>
                <div className="settings-last-login">
                  <i className="bi bi-clock-history"></i>
                  Last sign-in &nbsp;·&nbsp; <strong>Today, 9:14 AM</strong> &nbsp;·&nbsp; Istanbul, TR &nbsp;·&nbsp; Chrome on Windows
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Language &amp; Region</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Display language</label>
                    <DropdownField placeholder="Select language" options={[{ value: 'en', label: 'English (US)' }, { value: 'tr', label: 'Türkçe' }, { value: 'ar', label: 'العربية' }, { value: 'fr', label: 'Français' }, { value: 'de', label: 'Deutsch' }]} value={language} onChange={setLanguage} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Timezone</label>
                    <DropdownField placeholder="Select timezone" options={[{ value: 'Europe/Istanbul', label: 'Europe / Istanbul (UTC+3)' }, { value: 'Europe/London', label: 'Europe / London (UTC+0)' }, { value: 'America/New_York', label: 'America / New York (UTC−5)' }, { value: 'Asia/Dubai', label: 'Asia / Dubai (UTC+4)' }]} value={timezone} onChange={setTimezone} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date format</label>
                    <DropdownField placeholder="Select format" options={[{ value: 'DD/MM/YYYY', label: 'DD / MM / YYYY' }, { value: 'MM/DD/YYYY', label: 'MM / DD / YYYY' }, { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }]} value={dateFormat} onChange={setDateFormat} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Text direction</label>
                    <DropdownField placeholder="Select direction" options={[{ value: 'ltr', label: 'Left to right (LTR)' }, { value: 'rtl', label: 'Right to left (RTL)' }]} value={textDir} onChange={setTextDir} />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button className="btn btn-secondary btn-sm"><i className="bi bi-check-lg"></i> Save preferences</button>
                </div>
              </div>
            </div>

            {/* Delete account */}
            <div className="alert-card alert-card--danger">
              <div className="alert-card-icon-wrap"><i className="bi bi-exclamation-circle"></i></div>
              <div className="alert-card-content">
                <div className="alert-card-title">Delete account</div>
                <div className="alert-card-text">Permanently delete your account and all associated data. This action cannot be undone.</div>
                <div>
                  <button className="btn btn-danger btn-sm w-auto" onClick={() => setShowDeleteModal(true)}>
                    <i className="bi bi-trash3"></i> Delete my account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 d-flex flex-column gap-4">
            <div className="dashboard-card settings-profile-card w-100">
              <div className="card-body w-100 p-4 text-center">
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#1B84E7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 600, margin: '0 auto 14px' }}>AK</div>
                <h5 style={{ fontSize: '18px', fontWeight: 600, color: '#2F2F2F', marginBottom: '2px' }}>Aysel Kaya</h5>
                <p className="text-muted" style={{ fontSize: '13px', marginBottom: '16px' }}>Member since March 2026</p>
                <button className="btn btn-outline-neutral btn-sm bg-white">Change photo</button>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Account stats</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="info-row"><span className="info-label">Total bookings</span><span className="info-value">12</span></div>
                <div className="info-row"><span className="info-label">Documents</span><span className="info-value">6</span></div>
                <div className="info-row"><span className="info-label">Last login</span><span className="info-value">Today</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Password modal */}
        {showPasswordModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowPasswordModal(false)}>
            <div className="modal" style={{ maxWidth: '420px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-key" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Change Password</h3><p className="modal-sub">Choose a strong, unique password</p></div>
                <button className="modal-close" onClick={() => setShowPasswordModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3"><label className="form-label">Current password</label><input className="form-input-filled" type="password" placeholder="••••••••" /></div>
                <div className="form-group mb-3"><label className="form-label">New password</label><input className="form-input-filled" type="password" placeholder="••••••••" /></div>
                <div className="form-group"><label className="form-label">Confirm new password</label><input className="form-input-filled" type="password" placeholder="••••••••" /></div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowPasswordModal(false)}>Update password</button>
              </div>
            </div>
          </div>
        )}

        {/* 2FA modal */}
        {showTwoFAModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowTwoFAModal(false)}>
            <div className="modal" style={{ maxWidth: '440px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-shield-lock" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Two-Factor Authentication</h3><p className="modal-sub">Secure your account with 2FA</p></div>
                <button className="modal-close" onClick={() => setShowTwoFAModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="alert-card alert-card--blue mb-4" style={{ padding: '12px 14px' }}>
                  <div className="alert-card-content">
                    <div className="alert-card-text">Scan the QR code below with your authenticator app (e.g. Google Authenticator, Authy), then enter the 6-digit code to confirm.</div>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div style={{ width: '148px', height: '148px', borderRadius: '12px', background: '#F5F7FA', border: '2px dashed #D0D5DD', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-qr-code" style={{ fontSize: '60px', color: '#AEB6C2' }}></i>
                  </div>
                  <p className="text-muted text-xs mt-2 mb-0">Scan with your authenticator app</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Verification code <span className="text-danger">*</span></label>
                  <input className="form-input-filled" type="text" placeholder="Enter 6-digit code" maxLength={6} style={{ letterSpacing: '0.2em', textAlign: 'center', fontSize: '20px' }} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowTwoFAModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowTwoFAModal(false)}><i className="bi bi-shield-check"></i> Enable 2FA</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete account modal */}
        {showDeleteModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowDeleteModal(false)}>
            <div className="modal" style={{ maxWidth: '440px' }}>
              <div className="modal-header">
                <div className="modal-icon" style={{ background: '#FEF1F3', border: '1px solid #FAB1C2' }}><i className="bi bi-trash3" style={{ fontSize: '18px', color: '#CC0C39' }}></i></div>
                <div><h3 className="modal-title">Delete account</h3><p className="modal-sub">This action is permanent and irreversible</p></div>
                <button className="modal-close" onClick={() => { setShowDeleteModal(false); setDeletePassword(''); setDeleteConfirmText(''); }}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="alert-card alert-card--danger mb-4" style={{ padding: '12px 14px' }}>
                  <div className="alert-card-content">
                    <div className="alert-card-text">Deleting your account will permanently remove all your appointments, documents, and personal data. <strong>This cannot be undone.</strong></div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Enter your password to confirm</label>
                  <input className="form-input-filled" type="password" placeholder="••••••••" value={deletePassword} onChange={e => setDeletePassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Type <strong>DELETE</strong> to confirm</label>
                  <input className="form-input-filled" type="text" placeholder="DELETE" value={deleteConfirmText} onChange={e => setDeleteConfirmText(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => { setShowDeleteModal(false); setDeletePassword(''); setDeleteConfirmText(''); }}>Cancel</button>
                <button className="btn btn-danger" disabled={!canDelete} onClick={() => setShowDeleteModal(false)}>
                  <i className="bi bi-trash3"></i> Delete account
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

// ── Appointment Detail ────────────────────────────────────────────────────────

const cancelReasons = [
  { value: 'schedule-conflict', label: 'Schedule conflict' },
  { value: 'no-longer-needed', label: 'Service no longer needed' },
  { value: 'wrong-booking', label: 'Wrong date/time selected' },
  { value: 'health', label: 'Health or emergency reasons' },
  { value: 'other', label: 'Other' },
];

const rescheduleSlots = {
  Morning: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:30 AM', '11:30 AM'],
  Afternoon: ['12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
  Evening: ['4:00 PM', '4:30 PM', '5:00 PM'],
};
const unavailableReschedule = ['10:00 AM', '11:00 AM', '12:30 PM', '3:30 PM'];

const submittedDocs = [
  { num: '01', name: 'Birth Certificate',  desc: 'Original or certified copy — issued by a recognized civil authority', file: 'BirthCertificate.pdf',  size: '1.2 MB' },
  { num: '02', name: 'Proof of Address',   desc: 'Utility bill, bank statement, or lease agreement within 3 months',   file: 'ProofOfAddress.pdf',   size: '0.8 MB' },
  { num: '03', name: 'Passport Photo',     desc: '2 recent photos (3.5 × 4.5 cm), white background, within 6 months', file: 'PassportPhoto.jpg',    size: '0.4 MB' },
];

const timelineSteps = {
  upcoming: [
    { label: 'Booked',         icon: 'tick',      state: 'done' },
    { label: 'Pending review', icon: 'hourglass', state: 'current' },
    { label: 'Confirmed',      icon: '3',         state: '' },
    { label: 'Visit',          icon: '4',         state: '' },
  ],
  completed: [
    { label: 'Booked',    icon: 'tick', state: 'done' },
    { label: 'Confirmed', icon: 'tick', state: 'done' },
    { label: 'Visited',   icon: 'tick', state: 'done' },
    { label: 'Completed', icon: 'tick', state: 'done' },
  ],
  cancelled: [
    { label: 'Booked',    icon: 'tick', state: 'done' },
    { label: 'Cancelled', icon: 'x',   state: 'cancelled' },
    { label: 'Confirmed', icon: '3',   state: '' },
    { label: 'Visit',     icon: '4',   state: '' },
  ],
};

function StepDot({ step }) {
  if (step.icon === 'tick')     return <img src="/assets/images/svg/tickBlue.svg" width="14" alt="" />;
  if (step.icon === 'hourglass') return <i className="bi bi-hourglass-split" style={{ fontSize: '11px' }}></i>;
  if (step.icon === 'x')        return <i className="bi bi-x-lg" style={{ fontSize: '11px' }}></i>;
  return <span>{step.icon}</span>;
}

function AppointmentDetail({ appt, onBack, onHome, onCancelConfirm }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelNote, setCancelNote] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [showDocModal, setShowDocModal] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  const steps = timelineSteps[appt.tab] || timelineSteps.upcoming;
  const isPending = appt.status === 'Pending approval';
  const isUpcoming = appt.tab === 'upcoming';
  const isCompleted = appt.tab === 'completed';

  const locationAddresses = {
    'North District Office': '456 North Avenue, Capital City',
    'Central Branch': '123 Republic Avenue, Block A, Floor 2',
    'Revenue Office — Floor 2': '88 Commerce Street, Revenue Tower, Floor 2',
    'Central Service Center': '123 Republic Avenue, Block A, Floor 2',
    'South Regional Center': '789 South Boulevard, South Town',
    'Revenue Office': '88 Commerce Street, Revenue Tower',
  };
  const address = locationAddresses[appt.location] || '—';

  return (
    <section className="page-section active">
      <div className="page-content">
        <nav className="breadcrumb">
          <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={onHome}>Home</span>
          <span className="breadcrumb-item" style={{ cursor: 'pointer' }} onClick={onBack}>My appointments</span>
          <span className="breadcrumb-item active">Appointment details</span>
        </nav>

        <div className="d-flex align-items-center gap-2 mb-4">
          <button className="btn btn-ghost" onClick={onBack} style={{ fontSize: '18px' }}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h2 className="text-secondary mb-0" style={{ fontSize: '22px', fontWeight: 700 }}>Appointment details</h2>
          {isUpcoming && (
            <div className="ms-auto d-flex gap-2">
              <button className="btn btn-outline-neutral btn-sm d-none d-lg-flex" onClick={() => setShowRescheduleModal(true)}>
                <i className="bi bi-arrow-repeat"></i> Reschedule
              </button>
              <button className="btn btn-sm d-none d-lg-flex" style={{ background: '#FEF1F3', color: '#CC0C39', border: '1px solid #FAB1C2' }} onClick={() => setShowCancelModal(true)}>
                <i className="bi bi-x-lg"></i> Cancel
              </button>
              <div className="position-relative d-flex d-lg-none">
                <MobileActionMenu onReschedule={() => setShowRescheduleModal(true)} onCancel={() => setShowCancelModal(true)} />
              </div>
            </div>
          )}
          {isCompleted && (
            <div className="ms-auto d-flex gap-2">
              <button className="btn btn-outline-neutral btn-sm d-none d-lg-flex" onClick={() => setShowReceiptModal(true)}>
                <i className="bi bi-receipt"></i> Receipt
              </button>
            </div>
          )}
        </div>

        <div className="row g-4">

          {/* Timeline card */}
          <div className="col-lg-8">
            <div className="dashboard-card">
              <div className="card-header">
                <h5 className="card-title">{appt.title}</h5>
                <span className={`status-badge ${appt.statusClass}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  {appt.status}
                </span>
              </div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="progress-timeline w-100 timeline-desktop-only">
                  {steps.map((step, i) => (
                    <div key={i} className={`progress-step ${step.state}`}>
                      <div className="step-dot"><StepDot step={step} /></div>
                      <div className="step-label">
                        {step.label === 'Visit' ? `Visit on ${appt.month} ${appt.day}` : step.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="timeline-mobile-compact d-none">
                  <div className="tmc-step">
                    <div className={`tmc-dot ${isPending ? 'tmc-dot--pending' : appt.tab === 'completed' ? 'tmc-dot--done' : 'tmc-dot--cancelled'}`}>
                      {isPending ? <i className="bi bi-hourglass-split"></i> : appt.tab === 'completed' ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}
                    </div>
                    <div className="tmc-info">
                      <span className="tmc-label">{isPending ? 'Pending review' : appt.tab === 'completed' ? 'Completed' : 'Cancelled'}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-neutral btn-sm tmc-btn" onClick={() => setShowTimelineModal(true)}>
                    View timeline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="col-lg-4 d-none d-lg-block">
            <div className="dashboard-card h-100 d-flex align-items-center justify-content-center">
              <div className="card-body w-100 p-0">
                {isUpcoming ? (
                  <div className="row g-2 justify-content-center">
                    <div className="col-6">
                      <button className="quick-action d-flex flex-column align-items-center text-center w-100 border-0 bg-transparent" onClick={() => setShowRescheduleModal(true)}>
                        <div className="qa-icon mb-2" style={{ background: '#FFF7ED', color: '#EA580C' }}><i className="bi bi-arrow-repeat"></i></div>
                        <span className="qa-label">Reschedule</span>
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="quick-action d-flex flex-column align-items-center text-center w-100 border-0 bg-transparent" onClick={() => setShowQrModal(true)}>
                        <div className="qa-icon mb-2" style={{ background: '#EEF2FF', color: '#4F46E5' }}><i className="bi bi-qr-code"></i></div>
                        <span className="qa-label">View QR</span>
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="quick-action d-flex flex-column align-items-center text-center w-100 border-0 bg-transparent" onClick={() => setShowCancelModal(true)}>
                        <div className="qa-icon mb-2" style={{ background: '#FEF2F2', color: '#DC2626' }}><i className="bi bi-x-lg"></i></div>
                        <span className="qa-label">Cancel</span>
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="quick-action d-flex flex-column align-items-center text-center w-100 border-0 bg-transparent">
                        <div className="qa-icon mb-2" style={{ background: '#F0FDF4', color: '#16A34A' }}><i className="bi bi-download"></i></div>
                        <span className="qa-label">Download</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <button className="btn btn-outline-neutral w-100 mb-2" onClick={() => setShowReceiptModal(true)}><i className="bi bi-receipt"></i> View receipt</button>
                    <button className="btn btn-outline-neutral w-100" onClick={() => setShowQrModal(true)}><i className="bi bi-qr-code"></i> QR code</button>
                    <button className="btn btn-outline-neutral w-100 mt-2"><i className="bi bi-arrow-repeat"></i> Book again</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Appointment information */}
          <div className="col-lg-8">
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Appointment information</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                {[
                  ['Service',          appt.title],
                  ['Service center',   appt.location],
                  ['Requested date',   `${appt.weekday}, ${appt.month} ${appt.day}, 2026`],
                  ['Requested time',   appt.time],
                  ['Applicant',        'Aysel Kaya'],
                  ['Reference',        isUpcoming && isPending ? null : `CQ-2026${appt.month}${appt.day}-4892`],
                ].map(([label, value]) => (
                  <div key={label} className="info-row">
                    <span className="info-label">{label}</span>
                    {value === null
                      ? <span className="info-value" style={{ color: '#9CA3AF', fontStyle: 'italic' }}>Assigned after approval</span>
                      : <span className="info-value">{value}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="col-lg-4">
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Location</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                <div style={{ background: '#f3f4f6', borderRadius: '12px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <i className="bi bi-geo-alt" style={{ fontSize: '32px', color: '#AEB6C2' }}></i>
                </div>
                <h6 style={{ fontSize: '14px', fontWeight: 600, color: '#2F2F2F', marginBottom: '2px' }}>{appt.location}</h6>
                <p className="text-muted" style={{ fontSize: '13px', margin: 0 }}>{address}</p>
              </div>
            </div>
          </div>

          {/* Submitted documents */}
          <div className="col-12">
            <div className="dashboard-card">
              <div className="card-header"><h5 className="card-title">Submitted documents</h5></div>
              <hr className="card-divider" />
              <div className="card-body">
                <div className="sd-doc-list">
                  {submittedDocs.map(doc => (
                    <div key={doc.num} className="sd-doc-item">
                      <div className="sd-doc-num">{doc.num}</div>
                      <div className="sd-doc-info">
                        <div className="info-col">
                          <div className="info-value mb-1">{doc.name}</div>
                          <div className="info-label">{doc.desc}</div>
                        </div>
                      </div>
                      <button className="btn btn-outline-neutral btn-sm" onClick={() => setShowDocModal(doc)}>
                        <i className="bi bi-eye"></i> View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel modal */}
        {showCancelModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowCancelModal(false)}>
            <div className="modal" style={{ maxWidth: '460px' }}>
              <div className="modal-header">
                <div className="modal-icon" style={{ background: '#FEF1F3', border: '1px solid #FAB1C2' }}><i className="bi bi-x-circle" style={{ fontSize: '18px', color: '#CC0C39' }}></i></div>
                <div>
                  <h3 className="modal-title">Cancel Appointment</h3>
                  <p className="modal-sub">{appt.title} · {appt.month} {appt.day}</p>
                </div>
                <button className="modal-close" onClick={() => setShowCancelModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="alert-card alert-card--warning mb-4" style={{ padding: '10px 14px' }}>
                  <div className="alert-card-content">
                    <div className="alert-card-text">Cancellations made less than 12 hours before the appointment may not be refunded.</div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Reason for cancellation <span className="text-danger">*</span></label>
                  <DropdownField placeholder="Select a reason" options={cancelReasons} value={cancelReason} onChange={setCancelReason} />
                </div>
                <div className="form-group">
                  <label className="form-label">Additional notes <span className="text-muted" style={{ fontSize: '11px' }}>(optional)</span></label>
                  <textarea className="form-input-filled" rows={3} placeholder="Any additional information..." value={cancelNote} onChange={e => setCancelNote(e.target.value)} style={{ resize: 'vertical', minHeight: '80px' }}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowCancelModal(false)}>Keep appointment</button>
                <button className="btn btn-danger" disabled={!cancelReason} onClick={() => { setShowCancelModal(false); onCancelConfirm(); }}>
                  <i className="bi bi-x-lg"></i> Cancel appointment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reschedule modal */}
        {showRescheduleModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowRescheduleModal(false)}>
            <div className="modal" style={{ maxWidth: '480px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-calendar-event" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Reschedule Appointment</h3><p className="modal-sub">Choose a new date and time</p></div>
                <button className="modal-close" onClick={() => setShowRescheduleModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="dashboard-card mb-3" style={{ background: '#F8FAFE', border: '1px solid #DDE6F0', padding: '12px 16px', borderRadius: '10px', boxShadow: 'none' }}>
                  <div className="text-xs text-muted mb-1">Current schedule</div>
                  <div className="d-flex gap-3 align-items-center">
                    <span className="fw-semibold text-sm" style={{ color: '#112B5F' }}>{appt.weekday}, {appt.month} {appt.day}, 2026</span>
                    <span className="status-badge status-info">{appt.time}</span>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label className="form-label">New date <span className="text-danger">*</span></label>
                  <input type="date" className="form-input-filled" min={new Date().toISOString().split('T')[0]} value={rescheduleDate} onChange={e => { setRescheduleDate(e.target.value); setRescheduleTime(''); }} />
                </div>
                <div className="form-group">
                  <label className="form-label mb-2">New time <span className="text-danger">*</span></label>
                  {Object.entries(rescheduleSlots).map(([group, slots]) => (
                    <div key={group} className="mb-3">
                      <div className="text-xs fw-semibold text-muted mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group}</div>
                      <div className="d-flex flex-wrap gap-2">
                        {slots.map(slot => {
                          const unavail = unavailableReschedule.includes(slot);
                          const selected = rescheduleTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={unavail}
                              onClick={() => !unavail && setRescheduleTime(slot)}
                              className={`time-slot ${selected ? 'selected' : ''} ${unavail ? 'unavailable' : ''}`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
                <button className="btn btn-primary" disabled={!rescheduleDate || !rescheduleTime} onClick={() => setShowRescheduleModal(false)}>
                  Confirm reschedule <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR modal */}
        {showQrModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowQrModal(false)}>
            <div className="modal" style={{ maxWidth: '380px', textAlign: 'center' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-qr-code" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Appointment QR Code</h3><p className="modal-sub">{appt.title}</p></div>
                <button className="modal-close" onClick={() => setShowQrModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body py-4">
                <div className="bk-qr-wrap mx-auto" style={{ width: '180px', height: '180px' }}>
                  <i className="bk-qr-icon bi bi-qr-code"></i>
                </div>
                <p className="bk-qr-hint mt-3">Show this QR code at the service center on your appointment day</p>
                <div className="d-flex justify-content-center mt-3">
                  <span className="bk-ref-badge">
                    <i className="bi bi-hash"></i> CQ-2026{appt.month}{appt.day}-4892
                  </span>
                </div>
              </div>
              <div className="modal-footer" style={{ justifyContent: 'center', gap: '12px' }}>
                <button className="btn btn-outline-neutral" onClick={() => setShowQrModal(false)}>Close</button>
                <button className="btn btn-primary"><i className="bi bi-download"></i> Download QR</button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt modal */}
        {showReceiptModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowReceiptModal(false)}>
            <div className="modal" style={{ maxWidth: '440px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-receipt" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Appointment Receipt</h3><p className="modal-sub">{appt.title}</p></div>
                <button className="modal-close" onClick={() => setShowReceiptModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-xs text-muted">Reference</span>
                  <span className="fw-semibold text-sm">CQ-2026{appt.month}{appt.day}-4892</span>
                </div>
                <hr style={{ borderColor: '#EDF3FA', margin: '0 0 14px' }} />
                {[
                  ['Service', appt.title],
                  ['Service center', appt.location],
                  ['Date', `${appt.weekday}, ${appt.month} ${appt.day}, 2026`],
                  ['Time', appt.time],
                  ['Applicant', 'Aysel Kaya'],
                  ['Status', appt.status],
                ].map(([label, val]) => (
                  <div key={label} className="info-row d-flex justify-content-between">
                    <span className="info-label">{label}</span>
                    <span className="info-value">{val}</span>
                  </div>
                ))}
                <hr style={{ borderColor: '#EDF3FA', margin: '14px 0' }} />
                <div className="d-flex justify-content-between">
                  <span className="info-label">Service fee</span>
                  <span className="info-value">$110.00</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="info-label">Processing fee</span>
                  <span className="info-value">$5.00</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="fw-bold" style={{ fontSize: '14px' }}>Total</span>
                  <span className="fw-bold text-secondary" style={{ fontSize: '16px' }}>$115.00</span>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowReceiptModal(false)}>Close</button>
                <button className="btn btn-primary"><i className="bi bi-download"></i> Download PDF</button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline modal */}
        {showTimelineModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowTimelineModal(false)}>
            <div className="modal" style={{ maxWidth: '400px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-diagram-3" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">Appointment Timeline</h3><p className="modal-sub">{appt.title}</p></div>
                <button className="modal-close" onClick={() => setShowTimelineModal(false)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body py-3">
                {steps.map((step, i) => (
                  <div key={i} className="d-flex align-items-start gap-3 mb-4" style={{ position: 'relative' }}>
                    {i < steps.length - 1 && (
                      <div style={{ position: 'absolute', left: '17px', top: '36px', width: '2px', height: 'calc(100% + 8px)', background: step.state === 'done' ? '#1B84E7' : '#E5E7EB' }}></div>
                    )}
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', zIndex: 1, background: step.state === 'done' ? '#1B84E7' : step.state === 'current' ? '#FFF8EC' : step.state === 'cancelled' ? '#FEF1F3' : '#F4F6F9', color: step.state === 'done' ? '#fff' : step.state === 'current' ? '#F79009' : step.state === 'cancelled' ? '#CC0C39' : '#9CA3AF', border: `2px solid ${step.state === 'done' ? '#1B84E7' : step.state === 'current' ? '#F79009' : step.state === 'cancelled' ? '#CC0C39' : '#E5E7EB'}` }}>
                      <StepDot step={step} />
                    </div>
                    <div className="flex-grow-1 pt-1">
                      <div className="fw-semibold text-sm" style={{ color: step.state === '' ? '#9CA3AF' : '#2F2F2F' }}>
                        {step.label === 'Visit' ? `Visit on ${appt.month} ${appt.day}` : step.label}
                      </div>
                      <div className="text-xs text-muted mt-1">
                        {step.state === 'done' ? 'Completed' : step.state === 'current' ? 'In progress' : step.state === 'cancelled' ? 'Cancelled' : 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary w-100" onClick={() => setShowTimelineModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Document preview modal */}
        {showDocModal && (
          <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && setShowDocModal(null)}>
            <div className="modal" style={{ maxWidth: '480px' }}>
              <div className="modal-header">
                <div className="modal-icon"><i className="bi bi-file-earmark-text" style={{ fontSize: '20px', color: '#1B84E7' }}></i></div>
                <div><h3 className="modal-title">{showDocModal.name}</h3><p className="modal-sub">{showDocModal.file} · {showDocModal.size}</p></div>
                <button className="modal-close" onClick={() => setShowDocModal(null)}><i className="bi bi-x-lg"></i></button>
              </div>
              <div className="modal-body text-center py-4">
                <div style={{ background: '#F5F7FA', borderRadius: '12px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <i className="bi bi-file-earmark-check" style={{ fontSize: '48px', color: '#1B84E7' }}></i>
                  <p className="text-muted text-sm mb-0">{showDocModal.file}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-neutral" onClick={() => setShowDocModal(null)}>Close</button>
                <button className="btn btn-primary"><i className="bi bi-download"></i> Download</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function MobileActionMenu({ onReschedule, onCancel }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-outline-neutral btn-sm" onClick={() => setOpen(p => !p)}>
        <i className="bi bi-three-dots"></i>
      </button>
      {open && (
        <div className="mobile-action-dropdown" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 200, background: '#fff', border: '1px solid #EDF3FA', borderRadius: '10px', boxShadow: '0 8px 24px rgba(17,43,95,0.12)', minWidth: '160px', padding: '6px 0' }}>
          <button className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-sm" style={{ cursor: 'pointer' }} onClick={() => { setOpen(false); onReschedule(); }}>
            <i className="bi bi-arrow-repeat"></i> Reschedule
          </button>
          <hr style={{ margin: '4px 0', borderColor: '#EDF3FA' }} />
          <button className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-sm" style={{ cursor: 'pointer', color: '#CC0C39' }} onClick={() => { setOpen(false); onCancel(); }}>
            <i className="bi bi-x-circle"></i> Cancel booking
          </button>
        </div>
      )}
    </>
  );
}

function ApptCard({ appt, onClick }) {
  return (
    <div className="appt-box-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="appt-box-top">
        <div className="appt-box-date-wrap">
          <div className="appt-box-cal appt-box-cal--primary">
            <span className="cal-month">{appt.month}</span>
            <span className="cal-day">{appt.day}</span>
          </div>
          <div className="appt-box-time-wrap">
            <div className="appt-box-time">{appt.time}</div>
            <div className="appt-box-weekday">{appt.weekday}</div>
          </div>
        </div>
        <span className={`status-badge ${appt.statusClass}`}>{appt.status}</span>
      </div>
      <div className="appt-box-body">
        <h5 className="appt-box-title">{appt.title}</h5>
        <div className="appt-box-location">
          <img src="/assets/images/svg/locationGreyOutline.svg" alt="" width="13" height="13" /> {appt.location}
        </div>
      </div>
      <div className="appt-box-footer">
        <span className="appt-box-cat">{appt.category}</span>
        <div className="appt-box-arrow">
          <img src="/assets/images/svg/arrow-right-02.svg" alt="" width="15" height="15" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
