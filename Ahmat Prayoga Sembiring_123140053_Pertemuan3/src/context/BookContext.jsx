import { createContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Add new book
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now()
    }
    setBooks([...books, newBook])
  }

  // Update existing book
  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ))
  }

  // Delete book
  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  // Get filtered books
  const getFilteredBooks = () => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || book.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getFilteredBooks,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}
