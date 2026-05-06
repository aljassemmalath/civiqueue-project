import { useState } from 'react';
import Hero from '../components/Hero';
import FloatingSearch from '../components/FloatingSearch';
import ServiceShowcase from '../components/ServiceShowcase';
import HowItWorks from '../components/HowItWorks';
import WhySection from '../components/WhySection';
import StatsStrip from '../components/StatsStrip';
import FAQ from '../components/FAQ';
import BookingModal from '../components/BookingModal';

function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Hero onBookClick={() => setBookingOpen(true)} />
      <FloatingSearch />
      <ServiceShowcase />
      <HowItWorks onBookClick={() => setBookingOpen(true)} />
      <WhySection />
      <StatsStrip />
      <FAQ />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

export default Home;
