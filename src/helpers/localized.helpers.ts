import type { Localized } from '../models/Product.model'

export const getLocalizedText = (
  value: Localized | string | undefined,
  language: string
): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[language] ?? value['*'] ?? Object.values(value)[0] ?? ''
}
