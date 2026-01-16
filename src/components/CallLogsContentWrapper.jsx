"use client"

import { useMemo, useState, useCallback, useEffect } from "react"
import { useTenant } from "@/context/TenantContext"
import { DataTable } from "@/components/DataTable"
import { SearchBar } from "@/components/SearchBar"
import { DateFilter } from "@/components/DateFilter"
import { mockCallLogsData } from "@/data/mockData"

export function CallLogsContentWrapper() {
  const { currentTenant } = useTenant()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [callLogs, setCallLogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setCallLogs(mockCallLogsData[currentTenant.id] || [])
      setCurrentPage(1)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentTenant.id])

  const itemsPerPage = 10

  const filteredLogs = useMemo(() => {
    let result = callLogs

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()
      result = result.filter(
        (log) => log.leadName.toLowerCase().includes(query) || log.outcome.toLowerCase().includes(query),
      )
    }

    if (dateFilter) {
      result = result.filter((log) => log.date === dateFilter)
    }

    return result
  }, [callLogs, searchTerm, dateFilter])

  const paginatedLogs = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return filteredLogs.slice(startIdx, startIdx + itemsPerPage)
  }, [filteredLogs, currentPage])

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)

  const handlePageChange = useCallback(
    (newPage) => {
      setCurrentPage(Math.max(1, Math.min(newPage, totalPages)))
    },
    [totalPages],
  )

  const columns = ["Lead Name", "Date & Time", "Duration", "Outcome"]

  const getOutcomeColor = (outcome) => {
    const outcomes = {
      Interested: "rgb(220 252 231)",
      "Callback scheduled": "rgb(254 243 199)",
      "Not interested": "rgb(254 226 226)",
      "Needs follow-up": "rgb(219 234 254)",
      Qualified: "rgb(240 253 250)",
      "Proposal sent": "rgb(243 244 246)",
    }
    const textColors = {
      Interested: "rgb(22 101 52)",
      "Callback scheduled": "rgb(120 53 15)",
      "Not interested": "rgb(127 29 29)",
      "Needs follow-up": "rgb(30 64 175)",
      Qualified: "rgb(16 92 73)",
      "Proposal sent": "rgb(55 65 81)",
    }
    return { bg: outcomes[outcome] || "rgb(243 244 246)", text: textColors[outcome] || "rgb(55 65 81)" }
  }

  const renderCell = useCallback((log) => {
    const colors = getOutcomeColor(log.outcome)
    return (
      <>
        <td className="px-6 py-4 font-medium text-foreground">{log.leadName}</td>
        <td className="px-6 py-4 text-foreground">
          <div className="text-sm">{log.date}</div>
          <div className="text-xs text-muted-foreground">{log.time}</div>
        </td>
        <td className="px-6 py-4 text-foreground">{log.duration}</td>
        <td className="px-6 py-4">
          <span className="badge-status" style={{ backgroundColor: colors.bg, color: colors.text }}>
            {log.outcome}
          </span>
        </td>
      </>
    )
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Call Logs</h1>
        <p className="text-muted-foreground mt-2">Track all customer interactions and outcomes</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by lead name or outcome..." />
          <DateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedLogs.length} of {filteredLogs.length} call logs
        </p>
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <DataTable columns={columns} data={paginatedLogs} loading={loading} renderCell={renderCell} />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    pageNum === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "border border-border hover:bg-muted"
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
