import { notifications } from '../data/services';

function NotificationPanel({ onClose }) {
  const todayNotifs = notifications.filter(n => n.section === 'Today');
  const earlierNotifs = notifications.filter(n => n.section === 'Earlier');

  return (
    <aside className="notif-panel open">
      <div className="notif-panel-header">
        <div className="notif-panel-title">
          <h5>Notifications</h5>
          <span className="notif-unread-count">3</span>
        </div>
        <div className="notif-panel-actions">
          <button className="notif-mark-read">Mark all read</button>
          <button className="notif-panel-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div className="notif-panel-body">
        <p className="notif-section-label">Today</p>
        {todayNotifs.map(notif => (
          <NotifItem key={notif.id} notif={notif} />
        ))}
        <p className="notif-section-label">Earlier</p>
        {earlierNotifs.map(notif => (
          <NotifItem key={notif.id} notif={notif} />
        ))}
      </div>

      <div className="notif-panel-footer">
        <a href="#" className="notif-footer-link">
          View all notifications
          <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    </aside>
  );
}

function NotifItem({ notif }) {
  return (
    <div className={`notif-item ${notif.unread ? 'unread' : ''}`}>
      <div className="notif-icon-wrap">
        <div className="notif-icon" style={{ background: notif.iconBg, color: notif.iconColor }}>
          <i className={`bi ${notif.icon}`}></i>
        </div>
        {notif.unread && <span className="notif-dot"></span>}
      </div>
      <div className="notif-content">
        <h6>{notif.title}</h6>
        <p>{notif.message}</p>
        <span className="notif-time">{notif.time}</span>
      </div>
    </div>
  );
}

export default NotificationPanel;
