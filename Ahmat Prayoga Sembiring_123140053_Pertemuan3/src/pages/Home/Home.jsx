import { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import BookForm from '../../components/BookForm/BookForm'
import BookFilter from '../../components/BookFilter/BookFilter'
import BookList from '../../components/BookList/BookList'
import './Home.css'

export default function Home() {
  const { addBook } = useContext(BookContext)

  return (
    <div className="home-page">
      <section className="add-book-section">
        <h2 className="section-title">Tambah Buku Baru</h2>
        <BookForm onSubmit={addBook} />
      </section>

      <section className="books-section">
        <h2 className="section-title">Kelola Buku</h2>
        <BookFilter />
        <BookList />
      </section>
    </div>
  )
}
