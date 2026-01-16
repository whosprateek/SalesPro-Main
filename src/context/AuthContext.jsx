"use client"

import { createContext, useState, useContext, useEffect, useCallback } from "react"

const AuthContext = createContext()

const USER_CREDENTIALS = {
  "admin@acme.com": { homeOrg: "org-a", homeRole: "Admin" },
  "agent@acme.com": { homeOrg: "org-a", homeRole: "Agent" },
  "admin@techcorp.com": { homeOrg: "org-b", homeRole: "Admin" },
  "agent@techcorp.com": { homeOrg: "org-b", homeRole: "Agent" },
}

const determineRole = (email, selectedTenant) => {
  const credentials = USER_CREDENTIALS[email]
  if (!credentials) return "Agent"
  if (credentials.homeOrg === selectedTenant) {
    return credentials.homeRole
  }
  return "Agent"
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("auth_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error)
    }
    setHydrated(true)
    setLoading(false)
  }, [])

  const login = useCallback((email, tenant) => {
    const role = determineRole(email, tenant)
    const userData = { email, tenant, role, id: Math.random().toString(36).substr(2, 9) }
    setUser(userData)
    localStorage.setItem("auth_user", JSON.stringify(userData))
  }, [])

  const updateTenantAndRole = useCallback((tenant) => {
    setUser((prevUser) => {
      if (!prevUser) return null
      const newRole = determineRole(prevUser.email, tenant)
      const updatedUser = { ...prevUser, tenant, role: newRole }
      localStorage.setItem("auth_user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading: !hydrated, login, logout, updateTenantAndRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
