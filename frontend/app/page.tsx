import { Mic, Shield, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Decentralized Identity
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Your Voice is Your <span className="text-primary">Identity</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            SimbaID uses advanced voice biometrics to create secure, decentralized identities. Access financial
            services, verify credentials, and connect with your community - all with just your voice.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/enroll">
              <Button size="lg" className="text-lg px-8 py-6">
                <Mic className="mr-2 h-5 w-5" />
                Start Voice Enrollment
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Built for Africa, Powered by Voice</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Experience the future of digital identity with culturally-aware design and offline-first functionality.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Mic className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Voice Biometrics</CardTitle>
                <CardDescription>
                  Secure authentication using your unique voice pattern. Works in multiple African languages.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Zero-Knowledge Proofs</CardTitle>
                <CardDescription>
                  Verify your credentials without revealing personal information. Privacy-first by design.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Offline First</CardTitle>
                <CardDescription>
                  Works without internet connection. Sync when connectivity is available.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Access</CardTitle>
                <CardDescription>Connect with local services, microfinance, and community programs.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>DID Wallet</CardTitle>
                <CardDescription>
                  Store and manage your decentralized credentials securely on your device.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Microloan Access</CardTitle>
                <CardDescription>
                  Build reputation and access financial services through verified identity.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-foreground">Ready to Create Your Digital Identity?</h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Join thousands of users across Africa who trust SimbaID for secure, voice-powered digital identity
                management.
              </p>
              <Button size="lg" className="text-lg px-8 py-6">
                <Mic className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
