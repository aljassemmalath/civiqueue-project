import { useState, useMemo } from 'react';
import { services, serviceCategories } from '../data/services';
import ServiceCard from '../components/ServiceCard';

const CARDS_PER_PAGE = 9;

function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOverlayOpen, setFilterOverlayOpen] = useState(false);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchCat = activeCategory === 'all' || service.category === activeCategory;
      const matchSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredServices.length / CARDS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setFilterOverlayOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getCategoryCount = (catId) => {
    if (catId === 'all') return services.length;
    return services.filter(s => s.category === catId).length;
  };

  const activeLabel = serviceCategories.find(c => c.id === activeCategory)?.label || 'All Services';

  return (
    <section className="services-page">
      <div className="container-fluid px-0 mx-0">
        <div className="page-header auto-padding py-4 mb-4">
          <nav className="breadcrumb">
            <span className="breadcrumb-item active">Services</span>
          </nav>
          <div className="services-header-row d-flex justify-content-between align-items-end">
            <div>
              <h4 className="section-title">Services</h4>
              <p className="section-dsc">Browse and book appointments for government services.</p>
            </div>
            <div className="services-search-row d-flex align-items-center gap-2" style={{ maxWidth: '320px', width: '100%' }}>
              <div className="search-bar flex-grow-1">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <span className="search-suffix">
                  <img src="/assets/images/svg/search-default.svg" className="icon-default" alt="" />
                  <img src="/assets/images/svg/search-active.svg" className="icon-active" alt="" />
                </span>
              </div>
              <button
                className={`mobile-filter-btn d-md-none ${activeCategory !== 'all' ? 'has-filter' : ''}`}
                aria-label="Filter by category"
                onClick={() => setFilterOverlayOpen(true)}
              >
                <i className="bi bi-sliders2"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="row gap-4 auto-padding mx-0">

          {/* ── Desktop sidebar filter ── */}
          <div className="col-auto d-none d-md-block px-0">
            <div className="filter-sidebar">
              <h6 className="fw-semibold mb-3">Filter by Category</h6>
              <ul className="filter-list list-unstyled">
                {serviceCategories.map(cat => (
                  <li
                    key={cat.id}
                    className={activeCategory === cat.id ? 'active' : ''}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <a href="#" onClick={e => e.preventDefault()}>
                      <span className={`filter-icon-wrap ${cat.colorClass || ''}`}>
                        <img src={cat.iconDefault} className="icon-default" alt="" />
                        <img src={cat.iconActive} className="icon-active" alt="" />
                      </span>
                      {cat.label}
                      <span className="badge-count ms-auto">{getCategoryCount(cat.id)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="col px-0">
            {paginatedServices.length > 0 ? (
              <div className="row g-4">
                {paginatedServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="services-empty">
                <i className="bi bi-search"></i>
                <p>No services found. Try a different search or category.</p>
              </div>
            )}

            {filteredServices.length > CARDS_PER_PAGE && (
              <div className="d-flex align-items-center justify-content-between mt-4">
                <p className="services-count mb-0">
                  Showing {(currentPage - 1) * CARDS_PER_PAGE + 1}–{Math.min(currentPage * CARDS_PER_PAGE, filteredServices.length)} of {filteredServices.length} services
                </p>
                <nav className="arrow-pagination">
                  <ul className="arrow-pagination-list">
                    <li className={`arrow-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}>
                        <img src="/assets/images/svg/arrow-left.svg" alt="Previous" />
                      </button>
                    </li>
                    <li className="arrow-item" style={{ pointerEvents: 'none' }}>
                      <span className="page-num">{currentPage} / {totalPages}</span>
                    </li>
                    <li className={`arrow-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}>
                        <img src="/assets/images/svg/arrow-right.svg" alt="Next" />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile filter overlay (slide-up sheet) ── */}
        <div className={`svc-filter-overlay ${filterOverlayOpen ? 'open' : ''}`}>
          <div className="svc-filter-overlay-backdrop" onClick={() => setFilterOverlayOpen(false)}></div>
          <div className="svc-filter-overlay-panel">
            <div className="svc-filter-overlay-header">
              <span className="svc-filter-overlay-title">Filter by Category</span>
              <button className="svc-filter-overlay-close" onClick={() => setFilterOverlayOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <ul className="filter-list svc-filter-overlay-list list-unstyled">
              {serviceCategories.map(cat => (
                <li
                  key={cat.id}
                  className={activeCategory === cat.id ? 'active' : ''}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <a href="#" onClick={e => e.preventDefault()}>
                    <span className={`filter-icon-wrap ${cat.colorClass || ''}`}>
                      <img src={cat.iconDefault} className="icon-default" alt="" />
                      <img src={cat.iconActive} className="icon-active" alt="" />
                    </span>
                    {cat.label}
                    <span className="badge-count ms-auto">{getCategoryCount(cat.id)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Services;
