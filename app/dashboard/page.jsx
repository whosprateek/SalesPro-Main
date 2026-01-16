"use client"

import { useMemo, useState, useEffect, Suspense } from "react"
import { useAuth } from "@/context/AuthContext"
import { useTenant } from "@/context/TenantContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppLayout } from "@/components/AppLayout"
import { StatCard } from "@/components/StatCard"
import { QuickActionCard } from "@/components/QuickActionCard"
import { mockDashboardStats } from "@/data/mockData"

function DashboardContent() {
  const { user } = useAuth()
  const { currentTenant } = useTenant()
  const [loading, setLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [currentTenant])

  const stats = useMemo(() => {
    return mockDashboardStats[currentTenant.id]
  }, [currentTenant.id])

  const quickActions = [
    {
      icon: "👥",
      title: "Manage Leads",
      description: "View and update lead information",
      href: "/leads",
    },
    {
      icon: "☎️",
      title: "Call Logs",
      description: "Track all customer interactions",
      href: "/call-logs",
    },
    {
      icon: "📊",
      title: "Reports",
      description: "View performance analytics",
      href: "#",
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: user?.role === "Admin" ? "Configure your workspace" : "View profile settings",
      href: user?.role === "Admin" ? "/settings" : "#",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          {currentTenant.name} • {user?.role === "Admin" ? "Administrator" : "Sales Agent"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="Total Leads" value={stats.totalLeads} loading={loading} />
        <StatCard icon="🎯" label="Open Leads" value={stats.openLeads} loading={loading} />
        <StatCard icon="☎️" label="Calls Today" value={stats.callsToday} loading={loading} />
        <StatCard icon="📈" label="Conversion Rate" value={`${stats.conversionRate}%`} loading={loading} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="font-medium text-foreground">New lead added: Acme Corp</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            <span className="badge-status bg-secondary text-secondary-foreground">New</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Call completed with TechStart Inc</p>
              <p className="text-sm text-muted-foreground">5 hours ago</p>
            </div>
            <span className="badge-status bg-green-100 text-green-700">Completed</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-foreground">Lead status updated: Global Industries</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
            <span className="badge-status bg-blue-100 text-blue-700">Updated</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Suspense fallback={null}>
          <DashboardContent />
        </Suspense>
      </AppLayout>
    </ProtectedRoute>
  )
}
