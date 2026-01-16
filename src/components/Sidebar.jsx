"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"
import { useAuth } from "@/context/AuthContext"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(true)

  const navItems = useMemo(() => {
    const items = [
      { href: "/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/leads", label: "Leads", icon: "👥" },
      { href: "/call-logs", label: "Call Logs", icon: "☎️" },
    ]

    if (user?.role === "Admin") {
      items.push(
        { href: "/analytics", label: "Analytics", icon: "📈" },
        { href: "/settings", label: "Settings", icon: "⚙️" },
      )
    }

    return items
  }, [user?.role])

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${isOpen ? "w-64" : "w-20"} min-h-screen flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-4 border-b border-sidebar-border">
        <div className="text-2xl font-bold text-sidebar-primary">📈</div>
        {isOpen && <span className="ml-2 font-bold text-sidebar-foreground">SalesPro</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <span>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-3 p-2 hover:bg-sidebar-accent rounded-md transition-colors text-sidebar-foreground"
        title={isOpen ? "Collapse" : "Expand"}
      >
        {isOpen ? "←" : "→"}
      </button>
    </div>
  )
}
