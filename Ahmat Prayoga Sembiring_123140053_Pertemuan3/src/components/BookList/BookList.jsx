import { useContext, useState } from 'react'
import { BookContext } from '../../context/BookContext'
import BookCard from '../BookCard/BookCard'
import BookForm from '../BookForm/BookForm'
import './BookList.css'

export default function BookList() {
  const { getFilteredBooks, updateBook, deleteBook } = useContext(BookContext)
  const [editingId, setEditingId] = useState(null)
  const [editingBook, setEditingBook] = useState(null)

  const filteredBooks = getFilteredBooks()

  const handleEdit = (book) => {
    setEditingId(book.id)
    setEditingBook(book)
  }

  const handleUpdateBook = (updatedData) => {
    updateBook(editingId, updatedData)
    setEditingId(null)
    setEditingBook(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingBook(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(id)
    }
  }

  if (editingId) {
    return (
      <div className="book-list">
        <h2 className="list-title">Edit Buku</h2>
        <BookForm 
          initialData={editingBook} 
          onSubmit={handleUpdateBook}
          onCancel={handleCancelEdit}
        />
      </div>
    )
  }

  return (
    <div className="book-list">
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📚</p>
          <p className="empty-text">Belum ada buku</p>
          <p className="empty-subtext">Mulai tambahkan buku ke koleksi Anda</p>
        </div>
      ) : (
        <>
          <h2 className="list-title">Daftar Buku ({filteredBooks.length})</h2>
          <div className="books-grid">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
