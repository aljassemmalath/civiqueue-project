function Hero({ onBookClick }) {
  return (
    <section className="hero w-100 position-relative overflow-hidden">
      <img className="position-absolute top-0 start-0 w-100" src="/assets/images/heroImage.png" alt="hero background" />

      <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center gap-4 text-center w-100 auto-padding">
        <div className="d-flex flex-column align-items-center gap-2">
          <h1 className="display-lg fw-bold position-relative z-1 text-white text-center mt-n5">
            <span className="text-primary">Book </span> Government <br />
            Appointments Easily
          </h1>
          <p className="text-lg text-center fw-light" style={{ color: '#D1D5DB' }}>
            Schedule your visit, avoid waiting, and manage <br />
            your time efficiently.
          </p>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <div className="hero-cta-btns d-flex gap-3">
            <button className="btn btn-white btn-xl">
              <img src="/assets/images/svg/Dashboard-white.svg" alt="" width="24" height="24" />
              Browse services
            </button>
            <button className="btn btn-primary btn-xl" onClick={onBookClick}>
              <img src="/assets/images/svg/calendar.svg" alt="" width="24" height="24" />
              Book an appointment
            </button>
          </div>
          <div>
            <p style={{ color: '#D1D5DB' }}>Secure • Verified • Nationwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
