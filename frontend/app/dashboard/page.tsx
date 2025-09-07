import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mic, Wallet, Shield, Settings } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden rounded-xl border border-border"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url(/dashboard-hero.jpg)',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome to your Dashboard</h1>
            <p className="mt-2 max-w-2xl text-white/90 text-sm sm:text-base">
              Manage your wallet, credentials, loans and sync from a single place.
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Quick access to your identity tools and recent activity.</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="bg-transparent">Back to Home</Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mic className="h-4 w-4"/> Voice Enrollment</CardTitle>
            <CardDescription>Setup or redo your voice profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/enroll"><Button>Enroll Now</Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wallet className="h-4 w-4"/> Wallet</CardTitle>
            <CardDescription>Access your DID wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/wallet"><Button variant="outline" className="bg-transparent">Open Wallet</Button></Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4"/> Credentials</CardTitle>
            <CardDescription>Manage your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/credentials"><Button variant="outline" className="bg-transparent">View Credentials</Button></Link>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-4 w-4"/> Settings</CardTitle>
            <CardDescription>App and privacy preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/settings"><Button variant="secondary">Open Settings</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
