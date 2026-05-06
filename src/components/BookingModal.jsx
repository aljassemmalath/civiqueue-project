import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DropdownField from './DropdownField';

const serviceGroups = [
  { group: 'Passport & ID', items: [
    { value: 'national-id', label: 'National ID Card Issuance' },
    { value: 'new-passport', label: 'New Passport Application' },
    { value: 'passport-renewal', label: 'Passport Renewal' },
    { value: 'birth-cert-records', label: 'Birth Certificate Records' },
    { value: 'lost-id', label: 'Lost ID Card Replacement' },
    { value: 'id-address-update', label: 'ID Card Address Update' },
    { value: 'temp-travel-doc', label: 'Temporary Travel Document' },
    { value: 'child-passport', label: 'Child Passport Application' },
    { value: 'senior-id', label: 'Senior Citizen ID Card' },
    { value: 'emergency-passport', label: 'Emergency Passport Processing' },
  ]},
  { group: 'Driving License', items: [
    { value: 'new-driving-license', label: 'New Driving License Application' },
    { value: 'driving-test', label: 'Driving Test Booking' },
    { value: 'license-renewal', label: 'License Renewal & Replacement' },
    { value: 'vehicle-reg', label: 'Vehicle Registration & Transfer' },
    { value: 'intl-driving-permit', label: 'International Driving Permit' },
  ]},
  { group: 'Tax & Finance', items: [
    { value: 'annual-tax', label: 'Annual Tax Filing' },
    { value: 'tax-refund', label: 'Tax Refund Inquiry' },
    { value: 'financial-consultation', label: 'Financial Consultation' },
    { value: 'tax-clearance', label: 'Tax Clearance Certificate' },
    { value: 'property-tax', label: 'Property Tax Assessment' },
  ]},
  { group: 'Immigration & Visa', items: [
    { value: 'visa-application', label: 'Visa Application & Renewal' },
    { value: 'residence-permit', label: 'Residence Permit Processing' },
    { value: 'work-permit', label: 'Work Authorization Permit' },
    { value: 'citizenship-interview', label: 'Citizenship Interview Booking' },
    { value: 'family-visa', label: 'Family Reunification Visa' },
  ]},
  { group: 'Civil Services', items: [
    { value: 'marriage-reg', label: 'Marriage Registration' },
    { value: 'divorce-reg', label: 'Divorce Registration' },
    { value: 'birth-cert', label: 'Birth Certificate Issuance' },
    { value: 'residence-reg', label: 'Residence Registration' },
    { value: 'name-change', label: 'Name Change Application' },
    { value: 'doc-attestation', label: 'Legal Document Attestation' },
  ]},
];

const ALL_SERVICE_LABELS = [
  ...serviceGroups.flatMap(g => g.items),
];

function BookingModal({ isOpen, onClose }) {
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleProceed = () => {
    if (!selectedService) return;
    const label = ALL_SERVICE_LABELS.find(i => i.value === selectedService)?.label || '';
    onClose();
    navigate(`/booking?service=${selectedService}&serviceName=${encodeURIComponent(label)}`);
  };

  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/assets/images/svg/calendar-add-blue.svg" alt="" />
          </div>
          <div>
            <h3 className="modal-title">Book an Appointment</h3>
            <p className="modal-sub">Select a service to get started</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="modal-body">
          <label className="form-label mb-2 required">Service</label>
          <DropdownField
            placeholder="Select a service…"
            groups={serviceGroups}
            value={selectedService}
            onChange={setSelectedService}
            searchable
          />
        </div>
        <div className="modal-footer">
          <Link to="/services" className="btn btn-outline-neutral" onClick={onClose}>
            Browse Services
          </Link>
          <button className="btn btn-primary" disabled={!selectedService} onClick={handleProceed}>
            Proceed <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
