import { useContext, useMemo } from 'react'
import { BookContext } from '../context/BookContext'

/**
 * Custom hook untuk menghitung statistik buku
 * @returns {Object} Statistik buku (total, byStatus, etc)
 */
export function useBookStats() {
  const { books } = useContext(BookContext)

  const stats = useMemo(() => {
    const total = books.length
    const byStatus = {
      milik: books.filter(b => b.status === 'milik').length,
      baca: books.filter(b => b.status === 'baca').length,
      ingin_baca: books.filter(b => b.status === 'ingin_baca').length,
      beli: books.filter(b => b.status === 'beli').length
    }

    return {
      total,
      byStatus,
      percentages: {
        milik: total > 0 ? Math.round((byStatus.milik / total) * 100) : 0,
        baca: total > 0 ? Math.round((byStatus.baca / total) * 100) : 0,
        ingin_baca: total > 0 ? Math.round((byStatus.ingin_baca / total) * 100) : 0,
        beli: total > 0 ? Math.round((byStatus.beli / total) * 100) : 0
      }
    }
  }, [books])

  return stats
}
