import { memo } from "react"

const SkeletonLoader = () => (
  <div className="stat-card animate-pulse">
    <div className="h-4 w-24 bg-muted rounded mb-2"></div>
    <div className="h-8 w-16 bg-muted rounded"></div>
  </div>
)

export const StatCard = memo(function StatCard({ icon, label, value, trend = null, loading = false }) {
  if (loading) return <SkeletonLoader />

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </p>
          )}
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  )
})

StatCard.displayName = "StatCard"
