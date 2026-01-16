"use client"

import { useTenant } from "@/context/TenantContext"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export function Header() {
  const { currentTenant, switchTenant, TENANTS } = useTenant()
  const { user, logout, updateTenantAndRole } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setTimeout(() => {
      router.push("/")
    }, 0)
  }

  const handleTenantSwitch = (tenantId) => {
    switchTenant(tenantId)
    updateTenantAndRole(tenantId)
  }

  if (!user) {
    return null
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Tenant Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Tenant</span>
          <select
            value={currentTenant.id}
            onChange={(e) => handleTenantSwitch(e.target.value)}
            className="bg-secondary border border-border rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {Object.values(TENANTS).map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <div className="badge-status bg-secondary text-secondary-foreground">{user.role}</div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
            {user.email?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
