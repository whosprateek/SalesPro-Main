"use client"

import { memo } from "react"

export const FilterChips = memo(function FilterChips({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-secondary"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
})

FilterChips.displayName = "FilterChips"
