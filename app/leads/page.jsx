"use client"

import { useMemo, useState, useCallback, useEffect, Suspense } from "react"
import { useAuth } from "@/context/AuthContext"
import { useTenant } from "@/context/TenantContext"
import { useDebounce } from "@/hooks/useDebounce"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppLayout } from "@/components/AppLayout"
import { DataTable } from "@/components/DataTable"
import { FilterChips } from "@/components/FilterChips"
import { SearchBar } from "@/components/SearchBar"
import { mockLeadsData } from "@/data/mockData"

function LeadsContent() {
  const { user } = useAuth()
  const { currentTenant } = useTenant()
  const [searchInput, setSearchInput] = useState("")
  const searchTerm = useDebounce(searchInput, 300)
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingStatus, setEditingStatus] = useState("")

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      const tenantLeads = mockLeadsData[currentTenant?.id] || []

      // If agent, filter to only assigned leads
      if (user?.role === "Agent") {
        setLeads(tenantLeads.filter((lead) => lead.assignedTo === user.email))
      } else {
        setLeads(tenantLeads)
      }
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentTenant?.id, user?.role, user?.email])

  const statuses = ["All", "New", "Contacted", "Converted"]

  const filteredLeads = useMemo(() => {
    let result = leads

    if (statusFilter !== "All") {
      result = result.filter((lead) => lead.status === statusFilter)
    }

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query),
      )
    }

    return result
  }, [leads, statusFilter, searchTerm])

  const handleStatusChange = useCallback((leadId, newStatus) => {
    setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead)))
    setEditingId(null)
  }, [])

  const columns = ["Name", "Phone", "Email", "Status", "Value", "Assigned To"]

  const renderCell = useCallback(
    (lead) => (
      <>
        <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
        <td className="px-6 py-4 text-foreground">{lead.phone}</td>
        <td className="px-6 py-4 text-muted-foreground">{lead.email}</td>
        <td className="px-6 py-4">
          {user?.role === "Admin" && editingId === lead.id ? (
            <select
              value={editingStatus}
              onChange={(e) => {
                handleStatusChange(lead.id, e.target.value)
              }}
              className="px-3 py-1 border border-border rounded text-sm bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses
                .filter((s) => s !== "All")
                .map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
            </select>
          ) : (
            <span
              className="badge-status cursor-pointer"
              style={{
                backgroundColor:
                  lead.status === "New"
                    ? "rgb(219 234 254)"
                    : lead.status === "Contacted"
                      ? "rgb(254 243 199)"
                      : "rgb(220 252 231)",
                color:
                  lead.status === "New"
                    ? "rgb(30 64 175)"
                    : lead.status === "Contacted"
                      ? "rgb(120 53 15)"
                      : "rgb(22 101 52)",
              }}
              onDoubleClick={
                user?.role === "Admin"
                  ? () => {
                      setEditingId(lead.id)
                      setEditingStatus(lead.status)
                    }
                  : null
              }
            >
              {lead.status}
            </span>
          )}
        </td>
        <td className="px-6 py-4 font-semibold text-foreground">{lead.value}</td>
        <td className="px-6 py-4 text-muted-foreground text-sm">{lead.assignedTo}</td>
      </>
    ),
    [user?.role, editingId, editingStatus, handleStatusChange],
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Leads</h1>
        <p className="text-muted-foreground mt-2">
          {user?.role === "Agent" ? "Your assigned leads" : "Manage and track all leads"}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search leads by name, phone, or email..."
        />

        <div>
          <p className="text-sm font-medium text-foreground mb-3">Status Filter</p>
          <FilterChips filters={statuses} activeFilter={statusFilter} onFilterChange={setStatusFilter} />
        </div>

        {user?.role === "Admin" && (
          <p className="text-xs text-muted-foreground italic">💡 Double-click a status to edit (Admin only)</p>
        )}
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <DataTable columns={columns} data={filteredLeads} loading={loading} renderCell={renderCell} />
      </div>
    </div>
  )
}

function LeadsWrapper() {
  return (
    <Suspense fallback={null}>
      <LeadsContent />
    </Suspense>
  )
}

export default function LeadsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <LeadsWrapper />
      </AppLayout>
    </ProtectedRoute>
  )
}
