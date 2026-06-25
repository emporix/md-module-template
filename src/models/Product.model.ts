export type Localized = Record<string, string>

interface Media {
  url: string
  id: string
}

export interface Product {
  id: string | null
  yrn: string
  code: string
  description?: Localized
  name: Localized
  media: Media[]
  parentVariantId?: string
  productType: string
}
