"use client"

import { Suspense } from "react"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AppLayout } from "@/components/AppLayout"
import { CallLogsContentWrapper } from "@/components/CallLogsContentWrapper"

function CallLogsPageContent() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Suspense fallback={null}>
          <CallLogsContentWrapper />
        </Suspense>
      </AppLayout>
    </ProtectedRoute>
  )
}

export default function CallLogsPage() {
  return <CallLogsPageContent />
}
