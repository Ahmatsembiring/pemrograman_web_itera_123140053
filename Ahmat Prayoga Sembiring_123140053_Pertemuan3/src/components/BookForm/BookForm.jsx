import { useState } from 'react'
import './BookForm.css'

export default function BookForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    author: '',
    status: 'ingin_baca'
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error untuk field saat user mengetik
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku tidak boleh kosong'
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Penulis tidak boleh kosong'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
    
    // Reset form jika tidak dalam mode edit
    if (!initialData) {
      setFormData({
        title: '',
        author: '',
        status: 'ingin_baca'
      })
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Judul Buku *</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul buku"
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis *</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Masukkan nama penulis"
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="milik">Saya Milik</option>
          <option value="baca">Sudah Dibaca</option>
          <option value="ingin_baca">Ingin Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData ? 'Perbarui Buku' : 'Tambah Buku'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}
