"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function AccessDeniedPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-lg flex items-center justify-center text-4xl">🔒</div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>

        {/* Details */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-sm text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Role:</span>
            <span className="font-semibold text-foreground">{user?.role || "Guest"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Required Role:</span>
            <span className="font-semibold text-foreground">Administrator</span>
          </div>
          <div className="pt-2 border-t border-border flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-semibold text-destructive">Unauthorized</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4">
          <Link href="/dashboard">
            <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-medium">
              Back to Dashboard
            </button>
          </Link>
          <a href="/" className="text-primary hover:text-primary/80 transition-colors font-medium text-sm">
            Return to Login
          </a>
        </div>
      </div>
    </div>
  )
}
