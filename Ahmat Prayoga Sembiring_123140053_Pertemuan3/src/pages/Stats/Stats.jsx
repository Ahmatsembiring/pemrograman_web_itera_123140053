import { useBookStats } from '../../hooks/useBookStats'
import './Stats.css'

const statusLabels = {
  milik: 'Saya Milik',
  baca: 'Sudah Dibaca',
  ingin_baca: 'Ingin Dibaca',
  beli: 'Ingin Dibeli'
}

const statusColors = {
  milik: '#4faeef',
  baca: '#10b981',
  ingin_baca: '#f59e0b',
  beli: '#ef4444'
}

export default function Stats() {
  const stats = useBookStats()

  return (
    <div className="stats-page">
      <h1 className="page-title">Statistik Buku</h1>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Buku</h3>
          <p className="stat-number">{stats.total}</p>
        </div>

        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="stat-card">
            <div className="stat-header">
              <h3>{label}</h3>
              <span 
                className="status-dot"
                style={{ backgroundColor: statusColors[key] }}
              ></span>
            </div>
            <p className="stat-number">{stats.byStatus[key]}</p>
            <div className="stat-bar">
              <div 
                className="stat-fill"
                style={{
                  width: `${stats.percentages[key]}%`,
                  backgroundColor: statusColors[key]
                }}
              ></div>
            </div>
            <p className="stat-percentage">{stats.percentages[key]}%</p>
          </div>
        ))}
      </div>

      <div className="stats-details">
        <h2>Ringkasan</h2>
        <ul className="summary-list">
          <li>Total koleksi buku: <strong>{stats.total}</strong></li>
          <li>Buku yang sudah dibaca: <strong>{stats.byStatus.baca}</strong></li>
          <li>Buku yang ingin dibaca: <strong>{stats.byStatus.ingin_baca}</strong></li>
          <li>Buku yang ingin dibeli: <strong>{stats.byStatus.beli}</strong></li>
        </ul>
      </div>
    </div>
  )
}
