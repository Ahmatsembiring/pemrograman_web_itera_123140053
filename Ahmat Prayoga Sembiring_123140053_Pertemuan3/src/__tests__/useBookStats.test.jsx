import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { BookProvider, BookContext } from '../context/BookContext'
import { useBookStats } from '../hooks/useBookStats'
import { useContext } from 'react'

describe('useBookStats', () => {
  it('should calculate correct statistics', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>

    const { result: contextResult } = renderHook(() => useContext(BookContext), { wrapper })
    const { result: statsResult } = renderHook(() => useBookStats(), { wrapper })

    // Add some books via context
    const addBooks = () => {
      contextResult.current.addBook({ title: 'Book 1', author: 'Author 1', status: 'milik' })
      contextResult.current.addBook({ title: 'Book 2', author: 'Author 2', status: 'baca' })
      contextResult.current.addBook({ title: 'Book 3', author: 'Author 3', status: 'milik' })
    }

    addBooks()

    // Check stats
    expect(statsResult.current.total).toBe(3)
    expect(statsResult.current.byStatus.milik).toBe(2)
    expect(statsResult.current.byStatus.baca).toBe(1)
  })
})
