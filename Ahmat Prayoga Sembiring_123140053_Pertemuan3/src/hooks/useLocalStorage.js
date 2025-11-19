import { useState, useEffect } from 'react'

/**
 * Custom hook untuk menyimpan dan retrieve data dari localStorage
 * @param {string} key - Kunci penyimpanan
 * @param {*} initialValue - Nilai default
 * @returns {Array} [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`[v0] Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage ketika state berubah
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`[v0] Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
