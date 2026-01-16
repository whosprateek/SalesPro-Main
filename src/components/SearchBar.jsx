"use client"

import { memo, useCallback } from "react"

export const SearchBar = memo(function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
    </div>
  )
})

SearchBar.displayName = "SearchBar"
