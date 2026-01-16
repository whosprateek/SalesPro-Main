"use client"

import { memo, useCallback } from "react"

export const DateFilter = memo(function DateFilter({ value, onChange }) {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">Filter by Date</label>
      <input
        type="date"
        value={value}
        onChange={handleChange}
        className="px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
    </div>
  )
})

DateFilter.displayName = "DateFilter"
