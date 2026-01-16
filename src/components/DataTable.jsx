"use client"

import { memo } from "react"

const SkeletonRow = ({ columns }) => (
  <tr className="border-b border-border">
    {columns.map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
      </td>
    ))}
  </tr>
)

export const DataTable = memo(function DataTable({ columns, data, loading = false, onRowClick = null, renderCell }) {
  if (loading) {
    return (
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th key={col} className="text-left px-6 py-3 font-semibold text-muted-foreground">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <SkeletonRow key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th key={col} className="text-left px-6 py-3 font-semibold text-muted-foreground">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="table-row-hover border-b border-border cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {renderCell(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

DataTable.displayName = "DataTable"
