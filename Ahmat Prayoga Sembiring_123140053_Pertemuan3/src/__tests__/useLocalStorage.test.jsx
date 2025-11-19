import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should store and retrieve value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))

    expect(result.current[0]).toBe('initial')

    act(() => {
      result.current[1]('updated')
    })

    expect(result.current[0]).toBe('updated')
  })

  it('should persist value in localStorage', () => {
    renderHook(() => useLocalStorage('persist-key', { count: 0 }))

    act(() => {
      const hook = renderHook(() => useLocalStorage('persist-key', null))
      expect(hook.result.current[0]).toEqual({ count: 0 })
    })
  })

  it('should initialize with localStorage value if exists', () => {
    localStorage.setItem('existing-key', JSON.stringify('existing'))

    const { result } = renderHook(() => useLocalStorage('existing-key', 'default'))

    expect(result.current[0]).toBe('existing')
  })
})
