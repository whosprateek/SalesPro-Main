"use client"

import { useAuth } from "@/context/AuthContext"
import { useTenant } from "@/context/TenantContext"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { user, login } = useAuth()
  const { TENANTS } = useTenant()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [selectedTenant, setSelectedTenant] = useState("org-a")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogin = (e) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      try {
        login(email, selectedTenant)
        setLoading(false)
      } catch (err) {
        setError("Login failed. Please try again.")
        setLoading(false)
      }
    }, 600)
  }

  const demoLogins = [
    { email: "admin@acme.com", tenant: "org-a" },
    { email: "agent@acme.com", tenant: "org-a" },
    { email: "admin@techcorp.com", tenant: "org-b" },
    { email: "agent@techcorp.com", tenant: "org-b" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white text-xl font-bold">
                📈
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground">SalesPro</h1>
            <p className="text-sm text-muted-foreground">Multi-Tenant CRM Platform</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                disabled={loading}
              />
            </div>

            {/* Tenant Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
              <select
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                disabled={loading}
              >
                {Object.values(TENANTS).map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Demo Credentials</span>
            </div>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-2">
            {demoLogins.map((demo, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEmail(demo.email)
                  setSelectedTenant(demo.tenant)
                }}
                className="w-full text-sm text-primary hover:text-primary/80 border border-border rounded-lg px-3 py-2 transition-all hover:bg-muted"
              >
                {demo.email.includes("admin") ? "👨‍💼" : "👤"} {demo.email}
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            This is a frontend-only demo. No real authentication required.
          </p>
        </div>
      </div>
    </div>
  )
}
