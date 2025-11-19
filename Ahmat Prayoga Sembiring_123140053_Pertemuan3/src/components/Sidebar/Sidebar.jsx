import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <Link 
          to="/" 
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
        >
          <span className="nav-icon">📚</span>
          <span className="nav-text">Buku Saya</span>
        </Link>
        <Link 
          to="/stats" 
          className={`nav-item ${isActive('/stats') ? 'active' : ''}`}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-text">Statistik</span>
        </Link>
      </nav>
    </aside>
  )
}
