import { useEffect, useRef, useState } from 'react';

const stats = [
  { target: 1.2, decimals: 1, suffix: 'M+', label: 'Appointments Booked' },
  { target: 320, decimals: 0, suffix: '+', label: 'Service Centers' },
  { target: 65, decimals: 0, suffix: '%', label: 'Waiting Time Reduced' },
  { target: 4.8, decimals: 1, suffix: '/5', label: 'User Satisfaction' },
];

function StatsStrip() {
  const sectionRef = useRef(null);
  const [counted, setCounted] = useState(false);
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          animateCounters();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const animateCounters = () => {
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValues(stats.map(s => eased * s.target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  return (
    <section className="stats-strip" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stats-item">
              <div className="stats-num-wrap">
                <span className="stats-num">{values[i].toFixed(stat.decimals)}</span>
                <span className="stats-suffix">{stat.suffix}</span>
              </div>
              <p className="stats-lbl">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;
