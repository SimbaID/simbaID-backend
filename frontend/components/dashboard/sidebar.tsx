"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Settings, Wallet, Shield, CreditCard, Database, ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Credentials", href: "/credentials", icon: Shield },
  { name: "Loans", href: "/loans", icon: CreditCard },
  { name: "Sync", href: "/sync", icon: Database },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // restore collapsed state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dashboardSidebarCollapsed")
      if (stored) setCollapsed(stored === "true")
    } catch {}
  }, [])

  // persist collapsed state
  useEffect(() => {
    try {
      localStorage.setItem("dashboardSidebarCollapsed", String(collapsed))
    } catch {}
  }, [collapsed])

  return (
    <div className="hidden md:flex h-full flex-col border-r border-border bg-background">
      <div className="flex items-center justify-between p-3">
        <span className={cn("text-sm font-semibold text-muted-foreground transition-opacity", collapsed && "opacity-0")}>Navigation</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className={cn("flex-1 space-y-1 p-2", collapsed && "px-1")}> 
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link key={name} href={href} className="block">
            <div
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent",
                collapsed && "justify-center px-2",
                pathname.startsWith(href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && <span>{name}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function MobileSidebar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col border-r border-border bg-background">
            <div className="p-4 text-sm font-semibold text-muted-foreground">Navigation</div>
            <nav className="flex-1 space-y-1 p-2">
              {navItems.map(({ name, href, icon: Icon }) => (
                <Link key={name} href={href} className="block">
                  <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <Icon className="h-4 w-4" />
                    <span>{name}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
