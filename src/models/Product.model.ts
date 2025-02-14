interface Media {
  url: string
  id: string
}

export interface Product {
  id: string | null
  yrn: string
  code: string
  description?: string
  name: string
  media: Media[]
  parentVariantId?: string
  productType: string
}
