import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BookForm from '../components/BookForm/BookForm'

describe('BookForm', () => {
  it('should render form fields', () => {
    const mockSubmit = vi.fn()
    render(<BookForm onSubmit={mockSubmit} />)

    expect(screen.getByLabelText(/Judul Buku/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status Buku/i)).toBeInTheDocument()
  })

  it('should show error on empty submission', () => {
    const mockSubmit = vi.fn()
    render(<BookForm onSubmit={mockSubmit} />)

    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i })
    fireEvent.click(submitBtn)

    expect(mockSubmit).not.toHaveBeenCalled()
    expect(screen.getByText(/Judul buku tidak boleh kosong/i)).toBeInTheDocument()
  })

  it('should call onSubmit with form data', () => {
    const mockSubmit = vi.fn()
    render(<BookForm onSubmit={mockSubmit} />)

    const titleInput = screen.getByLabelText(/Judul Buku/i)
    const authorInput = screen.getByLabelText(/Penulis/i)
    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i })

    fireEvent.change(titleInput, { target: { value: 'Test Book' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.click(submitBtn)

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
      status: 'ingin_baca'
    })
  })
})
