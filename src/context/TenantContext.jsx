"use client"

import { createContext, useState, useContext } from "react"

const TenantContext = createContext()

export const TENANTS = {
  ORG_A: { id: "org-a", name: "Acme", color: "bg-blue-500" },
  ORG_B: { id: "org-b", name: "TechCorp", color: "bg-purple-500" },
}

export function TenantProvider({ children }) {
  const [currentTenant, setCurrentTenant] = useState(TENANTS.ORG_A)

  const switchTenant = (tenantId) => {
    const tenant = Object.values(TENANTS).find((t) => t.id === tenantId)
    if (tenant) {
      setCurrentTenant(tenant)
    }
  }

  return <TenantContext.Provider value={{ currentTenant, switchTenant, TENANTS }}>{children}</TenantContext.Provider>
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider")
  }
  return context
}
