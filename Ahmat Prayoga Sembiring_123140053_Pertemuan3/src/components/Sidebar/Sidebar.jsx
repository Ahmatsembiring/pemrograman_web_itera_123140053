import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <img src="/image.png" alt="Buku" className="nav-icon" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
          <span className="nav-text">Buku</span>
        </Link>

        <Link to="/stats" className={`nav-item ${isActive('/stats') ? 'active' : ''}`}>
          <img src="/statistik.png" alt="Statistik" className="nav-icon" style={{ width: '80px', objectFit: 'contain' }} />
          <span className="nav-text">Statistik</span>
        </Link>
      </nav>
    </aside>
  );
}
