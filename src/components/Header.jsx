import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header bg-white fixed-top" style={{ marginTop: '34px' }}>
      <div className="fixed-top d-flex align-items-center justify-content-center gap-2 p-2 text-muted text-xs" style={{ backgroundColor: '#F5F7FA' }}>
        <img src="/assets/images/svg/Speaker.svg" alt="" className="flex-shrink-0" />
        <div className="announcement-ticker">
          <span className="announcement-ticker-text">New biometric passport service now available nationwide.</span>
        </div>
      </div>

      <div className="header-inner auto-padding d-flex align-items-center">
        <Link className="header-logo flex-shrink-0" to="/">
          <img src="/assets/images/svg/logo.svg" alt="CiviQueue" />
        </Link>

        <nav className="nav-menu d-none d-lg-flex">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/help">Help</NavLink>
        </nav>

        <div className="flex-shrink-0 ms-auto d-flex align-items-center gap-2">
          <button
            className="topbar-btn"
            aria-label="Notifications"
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); }}
          >
            <i className="bi bi-bell"></i>
            <span className="notif-badge">3</span>
          </button>

          {/* profile div always in DOM — SCSS uses .open class to show/hide dropdown */}
          <div className={`header-profile ${profileOpen ? 'open' : ''}`} ref={profileRef}>
            <button
              className="header-profile-trigger"
              aria-haspopup="true"
              aria-expanded={profileOpen}
              onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
            >
              <span className="hp-avatar">AK</span>
              <span className="hp-name d-none d-md-block">Aysel Kaya</span>
              <i className="bi bi-chevron-down hp-chevron"></i>
            </button>

            {/* always rendered — visibility handled by SCSS .open class above */}
            <div className="header-profile-dropdown" role="menu">
              <div className="header-profile-info">
                <span className="hp-info-avatar">AK</span>
                <div>
                  <div className="hp-info-name">Aysel Kaya</div>
                  <div className="hp-info-email">aysel.kaya@email.com</div>
                </div>
              </div>
              <div className="header-profile-menu">
                <button
                  className="header-profile-item"
                  role="menuitem"
                  onClick={() => { setProfileOpen(false); navigate('/dashboard'); }}
                >
                  <i className="bi bi-grid-1x2"></i> Dashboard
                </button>
                <div className="header-profile-sep"></div>
                <button
                  className="header-profile-item header-profile-item--danger"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <i className="bi bi-box-arrow-right"></i> Log out
                </button>
              </div>
            </div>
          </div>

          <button
            className={`nav-hamburger d-flex d-lg-none ${mobileNavOpen ? 'open' : ''}`}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(p => !p)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>

        {notifOpen && (
          <>
            <div className="notif-panel-backdrop" onClick={() => setNotifOpen(false)}></div>
            <NotificationPanel onClose={() => setNotifOpen(false)} />
          </>
        )}
      </div>

      {/* Mobile nav backdrop — closes menu when tapped outside */}
      <div
        className={`mobile-nav-backdrop ${mobileNavOpen ? 'open' : ''}`}
        onClick={() => setMobileNavOpen(false)}
      ></div>

      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <nav>
          <NavLink to="/" end onClick={() => setMobileNavOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileNavOpen(false)}>About</NavLink>
          <NavLink to="/services" onClick={() => setMobileNavOpen(false)}>Services</NavLink>
          <NavLink to="/help" onClick={() => setMobileNavOpen(false)}>Help</NavLink>
        </nav>
        <div className="mobile-nav-profile">
          <div className="mobile-nav-user">
            <div className="mobile-nav-avatar">AK</div>
            <div>
              <div className="mobile-nav-name">Aysel Kaya</div>
              <div className="mobile-nav-email">aysel.kaya@email.com</div>
            </div>
          </div>
          <div>
            <Link to="/dashboard" onClick={() => setMobileNavOpen(false)}>
              <i className="bi bi-grid-1x2"></i> Dashboard
            </Link>
            <button className="mobile-nav-danger"><i className="bi bi-box-arrow-right"></i> Log out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
