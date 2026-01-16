"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useTenant } from "@/context/TenantContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppLayout } from "@/components/AppLayout"
import { mockAnalyticsData } from "@/data/mockData"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = ["rgb(30, 64, 175)", "rgb(120, 53, 15)", "rgb(22, 101, 52)", "rgb(139, 92, 246)", "rgb(236, 72, 153)"]

function AnalyticsContent() {
  const { user } = useAuth()
  const { currentTenant } = useTenant()
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setAnalytics(mockAnalyticsData[currentTenant?.id] || null)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentTenant?.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!analytics) {
    return <div className="text-center py-12">No analytics data available</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">Sales performance and pipeline analysis</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Total Leads</p>
          <p className="text-2xl font-bold text-foreground">{analytics.totalLeads}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Converted</p>
          <p className="text-2xl font-bold text-foreground">{analytics.convertedLeads}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Conversion Rate</p>
          <p className="text-2xl font-bold text-foreground">{analytics.conversionRate}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">{analytics.totalRevenue}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Avg Deal Size</p>
          <p className="text-2xl font-bold text-foreground">{analytics.averageDealSize}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
              <XAxis dataKey="month" stroke="rgb(107, 114, 128)" />
              <YAxis stroke="rgb(107, 114, 128)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="rgb(30, 64, 175)"
                strokeWidth={2}
                dot={{ fill: "rgb(30, 64, 175)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Lead Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.statusBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.statusBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance */}
        <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Agent Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.agentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(229, 231, 235)" />
              <XAxis dataKey="agent" stroke="rgb(107, 114, 128)" />
              <YAxis stroke="rgb(107, 114, 128)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="rgb(139, 92, 246)" />
              <Bar dataKey="converted" fill="rgb(34, 197, 94)" />
              <Bar dataKey="revenue" fill="rgb(30, 64, 175)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requiredRole="Admin">
      <AppLayout>
        <AnalyticsContent />
      </AppLayout>
    </ProtectedRoute>
  )
}
