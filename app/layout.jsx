import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext"
import { TenantProvider } from "@/context/TenantContext"
import { PageTransition } from "@/components/PageTransition"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "SalesPro - Multi-Tenant CRM Platform",
  description: "Manage leads, track calls, and grow your business with SalesPro's powerful CRM dashboard",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <AuthProvider>
          <TenantProvider>
            <PageTransition>{children}</PageTransition>
          </TenantProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
