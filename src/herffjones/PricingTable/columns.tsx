import { useCallback } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

export type PriceList = {
  id: string
  name: {
    en: string
  }
  currency: string
  siteCode: string
  validity: Record<string, unknown>
}

const columnHelper = createColumnHelper<PriceList>()

export const columns = [
  columnHelper.display({
    id: 'name',
    header: 'Name',
    cell: info => {
      const pricelist = info.row.original;
      return pricelist.name?.en || 'Unnamed';
    },
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('siteCode', {
    header: 'Region',
    cell: info => info.getValue(),
  }),
  columnHelper.display({
    id: 'country',
    header: 'Country',
    cell: () => 'USA',
  }),
  columnHelper.display({
    id: 'validity',
    header: 'Validity',
    cell: () => 'Always valid',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (props) => {
      const { row } = props
      const name = row.original.name?.en || 'Unnamed';

      const handleEdit = useCallback(() => {
        alert(`Edit price list: ${name}`)
      }, [name])

      const handleDelete = useCallback(() => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
          alert(`Deleted price list: ${name}`)
        }
      }, [name])

      return (
        <div className="flex">
          <button
            onClick={handleEdit}
            className="hover:text-blue-800 p-1 text-blue-600 transition-colors"
            title="Edit"
            aria-label="Edit price list">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="hover:text-red-800 p-1 text-red-600 transition-colors"
            title="Delete"
            aria-label="Delete price list">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
    },
  }),
]
