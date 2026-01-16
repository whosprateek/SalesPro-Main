"use client"

import { useAuth } from "@/context/AuthContext"
import { useTenant } from "@/context/TenantContext"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppLayout } from "@/components/AppLayout"
import { useState, Suspense } from "react"

function SettingsContent() {
  const { user } = useAuth()
  const { currentTenant, TENANTS } = useTenant()
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    companyName: currentTenant.name,
    email: user?.email || "",
    phone: "+1-555-0000",
    industry: "Technology",
    teamSize: "11-50",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const permissions = {
    Admin: ["View all leads", "Edit lead status", "Manage team", "Access settings", "View analytics"],
    Agent: ["View assigned leads", "Log calls", "Update own records", "View team analytics"],
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and organization settings</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          ✓ Settings saved successfully
        </div>
      )}

      {/* Organization Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">Organization Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
            <select
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Manufacturing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Team Size</label>
            <select
              value={formData.teamSize}
              onChange={(e) => handleChange("teamSize", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>51-100</option>
              <option>100+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">Account Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Role Permissions */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">Role Permissions</h2>
        <p className="text-sm text-muted-foreground">
          Current Role: <span className="font-semibold text-foreground">{user?.role}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(permissions).map(([role, perms]) => (
            <div
              key={role}
              className={`p-4 rounded-lg border ${
                role === user?.role ? "border-primary bg-primary/5" : "border-border bg-muted/30"
              }`}
            >
              <h3 className="font-semibold text-foreground mb-3">{role} Permissions</h3>
              <ul className="space-y-2">
                {perms.map((perm, idx) => (
                  <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                    <span className="text-lg">✓</span>
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredRole="Admin">
      <AppLayout>
        <Suspense fallback={null}>
          <SettingsContent />
        </Suspense>
      </AppLayout>
    </ProtectedRoute>
  )
}
