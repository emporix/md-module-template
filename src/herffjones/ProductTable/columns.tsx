import { useCallback } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

export type Product = {
  id: string
  code: string
  name: string
  description: string
  productType: string
  published: boolean
  media: Array<{
    url: string
    contentType: string
    customAttributes: {
      name: string
      width: number
      height: number
    }
  }>
  mixins: {
    productCustomAttributes: {
      inStock: boolean
      brand: string
    }
    powerzoneAttributes: {
      EAN: string
      weight_kg_product: number
      minimum_purchase_to_customer: number
    }
  }
}

const columnHelper = createColumnHelper<Product>()

export const columns = [
  columnHelper.display({
    id: 'image',
    header: 'Image',
    maxSize: 4,
    cell: (props) => {
      const { row } = props
      const className = 'object-contain mx-auto w-8 bg-gray-200'
      const media = row.original.media?.[0]

      return media ? (
        <img
          src={media.url}
          alt={media.customAttributes.name}
          className={className}
        />
      ) : (
        <img className={className} src='https://admin.emporix.io/assets/logo-dark-ClNMg49p.png' />
      )
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('code', {
    header: 'Product Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('productType', {
    header: 'Type',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'price',
    header: 'Price',
    cell: info => info.getValue(),
  }),
  // columnHelper.accessor('published', {
  //   header: 'Published',
  //   cell: info => info.getValue() ? 'Yes' : 'No',
  // }),
  // columnHelper.accessor('mixins.productCustomAttributes.inStock', {
  //   header: 'In Stock',
  //   cell: info => info.getValue() ? 'Yes' : 'No',
  // }),
  // columnHelper.accessor('mixins.powerzoneAttributes.EAN', {
  //   header: 'EAN',
  //   cell: info => info.getValue(),
  // }),
  // columnHelper.accessor('mixins.powerzoneAttributes.weight_kg_product', {
  //   header: 'Weight (kg)',
  //   cell: info => info.getValue(),
  // }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (props) => {
      const { row } = props
      const handleEdit = useCallback(() => {
        alert(`Edit product: ${row.original.name}`)
      }, [row])
      const handleDelete = useCallback(() => {
        if (window.confirm(`Are you sure you want to delete ${row.original.name}?`)) {
          alert(`Deleted product: ${row.original.name}`)
        }
      }, [row])
      return (
        <div className="flex">
          <button
            onClick={handleEdit}
            className="hover:text-blue-800 p-1 text-blue-600 transition-colors"
            title="Edit"
            aria-label="Edit product">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="hover:text-red-800 p-1 text-red-600 transition-colors"
            title="Delete"
            aria-label="Delete product">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    },
  }),
]
