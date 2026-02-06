import { describe, it, expect, vi } from 'vitest'
import { getStoredSettings, saveStoredSettings } from './settings.helpers'

const createMockStorage = () => {
  const store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: vi.fn(),
    removeItem: vi.fn(),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn(),
  }
}

describe('getStoredSettings', () => {
  it('returns stored settings from localStorage', () => {
    const storage = createMockStorage()
    storage.setItem('tenant', 'my-tenant')
    storage.setItem('language', 'de')
    storage.setItem('token', 'jwt-123')
    vi.stubGlobal('localStorage', storage)

    const result = getStoredSettings()

    expect(result).toEqual({
      tenant: 'my-tenant',
      language: 'de',
      token: 'jwt-123',
    })
    vi.unstubAllGlobals()
  })

  it('returns defaults for missing keys', () => {
    const storage = createMockStorage()
    vi.stubGlobal('localStorage', storage)

    const result = getStoredSettings()

    expect(result.tenant).toBe('')
    expect(result.language).toBe('en')
    expect(result.token).toBe('')
    vi.unstubAllGlobals()
  })
})

describe('saveStoredSettings', () => {
  it('writes all settings to localStorage', () => {
    const storage = createMockStorage()
    vi.stubGlobal('localStorage', storage)

    saveStoredSettings({
      tenant: 't1',
      language: 'de',
      token: 'tok',
    })

    expect(storage.getItem('tenant')).toBe('t1')
    expect(storage.getItem('language')).toBe('de')
    expect(storage.getItem('token')).toBe('tok')
    vi.unstubAllGlobals()
  })

  it('does not mutate input', () => {
    const storage = createMockStorage()
    vi.stubGlobal('localStorage', storage)
    const input = { tenant: 'a', language: 'b', token: 'c' }
    const original = { ...input }

    saveStoredSettings(input)

    expect(input).toEqual(original)
    vi.unstubAllGlobals()
  })
})
