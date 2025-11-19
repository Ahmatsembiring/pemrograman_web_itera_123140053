import { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import './BookFilter.css'

export default function BookFilter() {
  const { searchTerm, setSearchTerm, filterStatus, setFilterStatus } = useContext(BookContext)

  return (
    <div className="filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
        >
          Semua
        </button>
        <button
          className={`filter-btn ${filterStatus === 'milik' ? 'active' : ''}`}
          onClick={() => setFilterStatus('milik')}
        >
          Milik
        </button>
        <button
          className={`filter-btn ${filterStatus === 'baca' ? 'active' : ''}`}
          onClick={() => setFilterStatus('baca')}
        >
          Dibaca
        </button>
        <button
          className={`filter-btn ${filterStatus === 'ingin_baca' ? 'active' : ''}`}
          onClick={() => setFilterStatus('ingin_baca')}
        >
          Ingin Dibaca
        </button>
        <button
          className={`filter-btn ${filterStatus === 'beli' ? 'active' : ''}`}
          onClick={() => setFilterStatus('beli')}
        >
          Ingin Dibeli
        </button>
      </div>
    </div>
  )
}
