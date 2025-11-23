import './BookCard.css'

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

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <span 
          className="book-status"
          style={{ backgroundColor: statusColors[book.status] }}
        >
          {statusLabels[book.status]}
        </span>
      </div>

      <div className="book-author">
        <span className="author-label">Penulis:</span>
        <span className="author-name">{book.author}</span>
      </div>

      <div className="book-actions">
        <button 
          className="btn-edit"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn-delete"
          onClick={() => onDelete(book.id)}
          aria-label={`Delete ${book.title}`}
        >
          🗑️ Hapus
        </button>
      </div>
    </div>
  )
}
