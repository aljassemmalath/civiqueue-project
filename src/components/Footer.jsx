import { Link } from 'react-router-dom';
import whiteLogo from '../assets/images/svg/whiteLogo.svg';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="auto-padding">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="footer-brand">
              <img src={whiteLogo} alt="CiviQueue" height="32" className="mb-3" />
              <p className="text-sm">The official government appointment booking platform — fast, secure, and available 24/7.</p>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-links">
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><a href="#">Branches</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Legal</h6>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="footer-heading">Contact</h6>
            <ul className="footer-links">
              <li><Link to="/help">Support Center</Link></li>
              <li><a href="#">1800-CIV-HELP</a></li>
              <li><a href="#">help@civiqueue.gov</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="text-sm mb-0">&copy; 2026 CiviQueue. All rights reserved. An official government digital service.</p>
          <div className="footer-social">
            <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
