
'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const features = [
    { name: 'Role-Based Dashboards', description: 'Tailored views for Federal, State, and LGA levels.' },
    { name: 'Activity Management', description: 'Plan, track, and manage all public health activities.' },
    { name: 'Hierarchical Structure', description: 'Link organisations from national to community levels.' },
    { name: 'Team Directory', description: 'Manage user roles, permissions, and invitations.' },
    { name: 'AI-Powered Reporting', description: 'Generate insightful reports on trends and outcomes.' },
    { name: 'Semiotic Intelligence', description: 'Assess communication risk before deployment.' },
];

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative py-20 sm:py-32 text-center bg-gradient-to-b from-background to-muted/50">
                 <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
                <div className="container relative">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        The Operating System for Public Health
                    </h1>
                    <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
                        RCAP is the all-in-one platform for government agencies, NGOs, and CSOs to coordinate, manage, and analyze risk communication and health activities with unparalleled efficiency and intelligence.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Button asChild size="lg" variant="gradient">
                            <Link href="/dashboard">
                                Get Started <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Feature Showcase */}
            <section className="py-20 sm:py-28">
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">A New Level of Coordination</h2>
                        <p className="mt-4 text-lg text-muted-foreground">From national strategy to community outreach, RCAP unifies every layer of your organisation.</p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <Card key={feature.name} className="p-2">
                                <CardContent className="p-6">
                                    <CheckCircle className="h-8 w-8 text-primary mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
             {/* Call to Action */}
            <section className="py-20 sm:py-28 bg-muted/50">
                <div className="container text-center">
                     <h2 className="text-4xl font-bold">Ready to Transform Your Operations?</h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                        Move beyond spreadsheets and fragmented tools. Embrace a unified, intelligent platform designed for the future of public health.
                     </p>
                     <div className="mt-8">
                        <Button asChild size="lg" variant="gradient">
                             <Link href="/register">Request a Demo</Link>
                        </Button>
                     </div>
                </div>
            </section>
        </div>
    );
}

