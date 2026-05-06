import { useState } from 'react';
import { faqData } from '../data/services';

function FAQ() {
  const [openId, setOpenId] = useState('faq1');

  return (
    <section className="faq-section py-5">
      <div className="container py-xl px-0">
        <div className="row g-5 align-items-start">
          <div className="col-lg-4">
            <h2 className="display-sm fw-bold text-secondary">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="support-box mt-4 faq-support-desktop">
              <h6>Still Need Help?</h6>
              <p className="mb-3">If your question is not listed above, our support team is ready to assist you.</p>
              <button className="btn btn-outline-neutral">Contact Support</button>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="accordion faq-accordion">
              {faqData.map(faq => (
                <div key={faq.id} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${openId !== faq.id ? 'collapsed' : ''}`}
                      type="button"
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${openId === faq.id ? 'show' : ''}`}>
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="support-box mt-4 faq-support-mobile d-none">
              <h6>Still Need Help?</h6>
              <p className="mb-3">If your question is not listed above, our support team is ready to assist you.</p>
              <button className="btn btn-outline-neutral">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
