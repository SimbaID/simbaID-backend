import type { ReactNode } from "react"
import Link from "next/link"
import { DashboardSidebar, MobileSidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <MobileSidebar />
            <Link href="/dashboard" className="text-sm font-semibold text-foreground">Dashboard</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0 md:gap-6 px-0 md:px-6 py-4">
        <DashboardSidebar />
        <main className="px-4 md:px-0 py-4">{children}</main>
      </div>
    </div>
  )
}
