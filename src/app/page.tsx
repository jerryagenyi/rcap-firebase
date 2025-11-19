
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PublicHeader from '@/components/layout/public-header';
import PublicFooter from '@/components/layout/public-footer';


const Feature = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
    <span className="text-lg text-muted-foreground">{children}</span>
  </div>
);

export default function LandingPage() {

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 sm:py-28 text-center">
            <div className="container">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Coordinate Health Activities,
                <br />
                <span className="text-primary">Without the Chaos.</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
                HealthLink RCAP is the central platform for public health organizations to plan, manage, and report on risk communication activities with clarity and efficiency.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/pricing">
                    Get Started for Free <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* App Screenshot */}
          <section className="container py-16">
               <Card className="p-4 shadow-2xl shadow-primary/10">
                   <Image
                      src="https://picsum.photos/seed/dashboard-ss/1200/800"
                      alt="RCAP Dashboard Screenshot"
                      width={1200}
                      height={800}
                      className="rounded-lg"
                      data-ai-hint="app dashboard"
                  />
              </Card>
          </section>

          {/* Features Section */}
          <section className="py-20 sm:py-28">
            <div className="container">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold">A Single Source of Truth</h2>
                <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                  From federal-level planning to on-the-ground field reports, RCAP brings everyone together.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                <Feature>
                  <strong>Centralized Activity Tracking:</strong> Manage every health campaign, from draft to completion, in one place.
                </Feature>
                <Feature>
                  <strong>Hierarchical Organisation Management:</strong> Link federal, state, and local government organisations with clear lines of authority.
                </Feature>
                <Feature>
                  <strong>Real-time Reporting:</strong> Generate instant reports on activity progress, outcomes, and geographic distribution.
                </Feature>
                 <Feature>
                  <strong>Role-Based Access Control:</strong> Ensure team members only see the information relevant to their role, from field officers to national coordinators.
                </Feature>
                  <Feature>
                  <strong>AI-Powered Insights (Coming Soon):</strong> Leverage AI to identify trends, predict risks, and get recommendations for more effective interventions.
                </Feature>
                 <Feature>
                  <strong>Offline Data Sync:</strong> Enable field officers to log activities without an internet connection, with automatic syncing later.
                </Feature>
              </div>
            </div>
          </section>
      </main>
      <PublicFooter />
    </div>
  );
}
