import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownField from './DropdownField';

const serviceOptions = [
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
    { value: 'vehicle-inspection', label: 'Vehicle Inspection Booking' },
    { value: 'traffic-fine', label: 'Traffic Fine Settlement' },
    { value: 'learners-permit', label: "Learner's Permit Application" },
    { value: 'heavy-vehicle', label: 'Heavy Vehicle License' },
  ]},
  { group: 'Tax & Finance', items: [
    { value: 'annual-tax', label: 'Annual Tax Filing' },
    { value: 'tax-refund', label: 'Tax Refund Inquiry' },
    { value: 'financial-consultation', label: 'Financial Consultation' },
    { value: 'tax-clearance', label: 'Tax Clearance Certificate' },
    { value: 'property-tax', label: 'Property Tax Assessment' },
    { value: 'customs-duty', label: 'Customs Duty Assessment' },
    { value: 'tax-dispute', label: 'Tax Dispute Resolution' },
  ]},
  { group: 'Immigration & Visa', items: [
    { value: 'visa-application', label: 'Visa Application & Renewal' },
    { value: 'residence-permit', label: 'Residence Permit Processing' },
    { value: 'work-permit', label: 'Work Authorization Permit' },
    { value: 'citizenship-interview', label: 'Citizenship Interview Booking' },
    { value: 'family-visa', label: 'Family Reunification Visa' },
    { value: 'student-visa', label: 'Student Visa Application' },
    { value: 'travel-ban', label: 'Travel Ban Inquiry' },
    { value: 'border-pass', label: 'Border Pass Application' },
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

const cityOptions = [
  { value: 'ankara', label: 'Ankara' },
  { value: 'istanbul', label: 'Istanbul' },
  { value: 'izmir', label: 'Izmir' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'bursa', label: 'Bursa' },
  { value: 'adana', label: 'Adana' },
];

const dayOptions = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
];

function FloatingSearch() {
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ service: false, city: false });
  const navigate = useNavigate();

  const handleSearch = () => {
    const newErrors = { service: !service, city: !city };
    if (newErrors.service || newErrors.city) {
      setErrors(newErrors);
      setTimeout(() => setErrors({ service: false, city: false }), 600);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const params = new URLSearchParams();
      params.set('service', service);
      params.set('city', city);
      if (days.length > 0) params.set('days', days.join(','));
      navigate(`/results?${params.toString()}`);
    }, 1800);
  };

  return (
    <div className="floating-rect container position-relative z-3 bg-white border-0 rounded shadow">
      {loading && (
        <div className="fr-loading">
          <div className="fr-loading-spinner"></div>
          <p className="fr-loading-title">Finding available appointments</p>
          <p className="fr-loading-sub">Checking slots across all branches<span className="fr-dots"></span></p>
        </div>
      )}
      <div className="p-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-6 col-lg">
            <label className="form-label">Select Service</label>
            <DropdownField
              placeholder="Choose a service"
              groups={serviceOptions}
              value={service}
              onChange={v => { setService(v); setErrors(e => ({ ...e, service: false })); }}
              searchable
              size="lg"
              error={errors.service}
            />
          </div>
          <div className="col-12 col-md-6 col-lg">
            <label className="form-label">Select a City</label>
            <DropdownField
              placeholder="Choose a city"
              options={cityOptions}
              value={city}
              onChange={v => { setCity(v); setErrors(e => ({ ...e, city: false })); }}
              size="lg"
              error={errors.city}
            />
          </div>
          <div className="col-12 col-md-6 col-lg">
            <label className="form-label">Preferred Days</label>
            <DropdownField
              placeholder="Any day"
              options={dayOptions}
              value={days}
              onChange={setDays}
              multiple
              size="lg"
            />
          </div>
          <div className="col-12 col-md-auto">
            <button
              className="btn btn-primary btn-lg w-100 flex-shrink-0"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i> Find appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FloatingSearch;
