import { Link } from 'react-router-dom';
import { serviceCategories } from '../data/services';

function ServiceCard({ service }) {
  const category = serviceCategories.find(c => c.id === service.category);
  return (
    <div className="col-12 col-sm-6 col-xl-4 service-card">
      <div className="card">
        <div className="card-header d-flex flex-row justify-content-between">
          <div className="card-icon">
            <img src={`/assets/images/svg/${service.icon}`} alt="" />
          </div>
          <span className={category?.badgeClass}>{category?.label}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{service.title}</h5>
          <p className="card-text">{service.description}</p>
        </div>
        <div className="card-footer">
          <Link to="/services/detail" className="btn-tertiary">View Details →</Link>

        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
