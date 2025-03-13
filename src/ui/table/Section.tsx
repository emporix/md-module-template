import { Fragment } from 'react'
import { flexRender, Table } from '@tanstack/react-table'
import { DateFilter } from './DateFilter'

export function renderTableSection(
  table: Table<any>,
  type: 'header' | 'footer',
  showFilters: boolean = false
) {
  const renderColumn = (header: any) => (
    <th
      key={header.id}
      className={`px-2 py-2 text-sm tracking-wider text-left text-gray-500 ${type === 'header' ? 'border-b border-gray-200' : ' border-t'
        }`}
      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
      style={{
        cursor: header.column.getCanSort() ? 'pointer' : 'default',
        width: header.getSize()
      }}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
    >
      <div className='flex gap-2 items-center'>
        {header.isPlaceholder
          ? null
          : flexRender(
            type === 'header' ? header.column.columnDef.header : header.column.columnDef.footer,
            header.getContext()
          )}
        {{
          // asc: <img src='https://i.ibb.co/WvHXVnfW/image.png' />,
          asc: <img className='h-4' src='https://i.ibb.co/ccpmDBdR/image.png' />,
          desc: <img className='h-4' src='https://i.ibb.co/zHX9V4SG/image.png' />,
        }[header.column.getIsSorted() as string] ?? null}
      </div>
    </th>
  );

  if (type === 'header') {
    return (
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Fragment key={headerGroup.id}>
            <tr>
              {headerGroup.headers.map(header => renderColumn(header))}
            </tr>
            {showFilters && (
              <tr>
                {headerGroup.headers.map(header => (
                  <th
                    key={`${header.id}-filter`}
                    className='px-2 py-2 border-b border-gray-200'
                    style={{ width: header.getSize() }}
                  >
                    {header.column.getCanFilter() ? (
                      header.id === 'date' ? (
                        <DateFilter header={header} />
                      ) : (
                        <input
                          value={(header.column.getFilterValue() ?? '') as string}
                          onChange={e => header.column.setFilterValue(e.target.value)}
                          placeholder={`Filter ${header.column.columnDef.header}`}
                          className='px-2 py-1 w-full text-sm border border-gray-300'
                        />
                      )
                    ) : null}
                  </th>
                ))}
              </tr>
            )}
          </Fragment>
        ))}
      </thead>
    );
  } else {
    return (
      <tfoot className='bg-gray-50'>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => renderColumn(header))}
          </tr>
        ))}
      </tfoot>
    );
  }
}
