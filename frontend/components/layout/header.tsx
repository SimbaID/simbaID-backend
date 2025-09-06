"use client"

import { useState } from "react"
import { Menu, Mic, Shield, Wallet, CreditCard, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SyncStatusIndicator } from "@/components/offline/sync-status-indicator"
import Link from "next/link"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Wallet", href: "/wallet" },
    { name: "Credentials", href: "/credentials" },
    { name: "Loans", href: "/loans" },
    { name: "Sync", href: "/sync" },
    { name: "Enroll", href: "/enroll" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">SimbaID</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <SyncStatusIndicator variant="compact" />
          <Link href="/wallet">
            <Button variant="outline" size="sm">
              <Wallet className="mr-2 h-4 w-4" />
              Wallet
            </Button>
          </Link>
          <Link href="/enroll">
            <Button size="sm">
              <Mic className="mr-2 h-4 w-4" />
              Enroll Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SimbaID</span>
              </Link>

              {/* Mobile Sync Status */}
              <div className="px-2">
                <SyncStatusIndicator variant="compact" />
              </div>

              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link href="/wallet">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Wallet
                  </Button>
                </Link>
                <Link href="/loans">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Loans
                  </Button>
                </Link>
                <Link href="/sync">
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                    <Database className="mr-2 h-4 w-4" />
                    Sync
                  </Button>
                </Link>
                <Link href="/enroll">
                  <Button className="w-full" onClick={() => setIsOpen(false)}>
                    <Mic className="mr-2 h-4 w-4" />
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
