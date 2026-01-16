import Link from "next/link"
import { memo } from "react"

export const QuickActionCard = memo(function QuickActionCard({ icon, title, description, href }) {
  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-primary transition-all cursor-pointer group">
        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
})

QuickActionCard.displayName = "QuickActionCard"
