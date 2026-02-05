import type { AppState } from '../models/AppState.model'

const TENANT_KEY = 'tenant'
const LANGUAGE_KEY = 'language'
const TOKEN_KEY = 'token'

export const getStoredSettings = (): AppState => {
  return {
    tenant: localStorage.getItem(TENANT_KEY) ?? '',
    language: localStorage.getItem(LANGUAGE_KEY) ?? 'en',
    token: localStorage.getItem(TOKEN_KEY) ?? '',
  }
}

export const saveStoredSettings = (settings: AppState): void => {
  localStorage.setItem(TENANT_KEY, settings.tenant)
  localStorage.setItem(LANGUAGE_KEY, settings.language)
  localStorage.setItem(TOKEN_KEY, settings.token)
}
