import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { BookProvider, BookContext } from '../context/BookContext'
import { useContext } from 'react'

describe('BookContext', () => {
  it('should add a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.addBook({ title: 'Test Book', author: 'Test Author', status: 'ingin_baca' })
    })

    expect(result.current.books).toHaveLength(1)
    expect(result.current.books[0].title).toBe('Test Book')
  })

  it('should update a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    let bookId
    act(() => {
      result.current.addBook({ title: 'Test Book', author: 'Test Author', status: 'ingin_baca' })
      bookId = result.current.books[0].id
    })

    act(() => {
      result.current.updateBook(bookId, { title: 'Updated Title' })
    })

    expect(result.current.books[0].title).toBe('Updated Title')
  })

  it('should delete a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    let bookId
    act(() => {
      result.current.addBook({ title: 'Test Book', author: 'Test Author', status: 'ingin_baca' })
      bookId = result.current.books[0].id
    })

    act(() => {
      result.current.deleteBook(bookId)
    })

    expect(result.current.books).toHaveLength(0)
  })

  it('should filter books by status', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.addBook({ title: 'Book 1', author: 'Author 1', status: 'milik' })
      result.current.addBook({ title: 'Book 2', author: 'Author 2', status: 'baca' })
      result.current.setFilterStatus('milik')
    })

    const filtered = result.current.getFilteredBooks()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].status).toBe('milik')
  })

  it('should search books by title and author', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useContext(BookContext), { wrapper })

    act(() => {
      result.current.addBook({ title: 'React Guide', author: 'John Doe', status: 'ingin_baca' })
      result.current.addBook({ title: 'Vue Guide', author: 'Jane Smith', status: 'ingin_baca' })
      result.current.setSearchTerm('React')
    })

    const filtered = result.current.getFilteredBooks()
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('React Guide')
  })
})
