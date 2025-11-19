
'use client';

import { Check, X, ShieldQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';


const TIER_FEATURES = {
    free: [
        { feature: "Members", value: "Up to 100", included: true },
        { feature: "Activity Tracking", value: "Basic", included: true },
        { feature: "Reporting", value: "Standard", included: true },
        { feature: "Notifications", value: "Basic", included: true },
        { feature: "Support", value: "Community", included: true },
        { feature: "Advanced Analytics", value: false, included: false },
        { feature: "AI-Powered Insights", value: false, included: false, comingSoon: true },
        { feature: "AI Report Generation", value: false, included: false, comingSoon: true },
        { feature: "AI Activity Recommendations", value: false, included: false, comingSoon: true },
        { feature: "Priority Support", value: false, included: false },
        { feature: "Custom Integrations", value: false, included: false },
    ],
    premium: [
        { feature: "Members", value: "Unlimited", included: true },
        { feature: "Activity Tracking", value: "Advanced", included: true },
        { feature: "Reporting", value: "Advanced", included: true },
        { feature: "Notifications", value: "Advanced & SMS", included: true },
        { feature: "Support", value: "Priority", included: true },
        { feature: "Advanced Analytics", value: true, included: true },
        { feature: "AI-Powered Insights", value: true, included: true, comingSoon: true },
        { feature: "AI Report Generation", value: true, included: true, comingSoon: true },
        { feature: "AI Activity Recommendations", value: true, included: true, comingSoon: true },
        { feature: "Priority Support", value: true, included: true },
        { feature: "Custom Integrations", value: true, included: true },
    ]
}

const FAQS = [
    {
        question: "Can we switch plans later?",
        answer: "Yes, you can upgrade from the Free to the Premium plan at any time. Your data and activities will be seamlessly migrated."
    },
    {
        question: "What happens if we exceed 100 members on the Free plan?",
        answer: "You will be prompted to upgrade to the Premium plan to add more members. Your existing members will not be affected, but you won't be able to add new ones until you upgrade."
    },
    {
        question: "What does 'AI-Powered Insights' include?",
        answer: "This upcoming feature will use artificial intelligence to analyze your activity data, identify trends, predict potential outbreaks, and suggest the most effective communication strategies, helping you make data-driven decisions faster."
    },
    {
        question: "Do you offer discounts for non-profits?",
        answer: "Yes, we offer special pricing for registered non-profit and civil society organizations. Please contact our sales team for more information."
    }
]


export default function PricingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="py-20 sm:py-28 text-center bg-background">
                <div className="container">
                    <h1 className="text-5xl font-bold tracking-tight">Choose Your Plan</h1>
                    <p className="mt-4 text-xl text-muted-foreground">Start for free, and scale with AI-powered features as you grow.</p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 sm:py-24 bg-muted/40">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Tier */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-3xl">Free</CardTitle>
                                <Badge variant="outline">For New Networks</Badge>
                            </div>
                            <CardDescription>For small teams and organizations getting started.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                            <ul className="space-y-3">
                                {TIER_FEATURES.free.filter(f => f.included).map(item => (
                                    <li key={item.feature} className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-green-500" />
                                        <span><strong>{item.value}</strong> {item.feature !== 'Members' && item.feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full" size="lg" asChild>
                                <Link href="/login">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Tier */}
                    <Card className="flex flex-col border-2 border-primary shadow-2xl shadow-primary/10">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-3xl text-primary">Premium</CardTitle>
                                <Badge variant="gradient">Best Value</Badge>
                            </div>
                            <CardDescription>For large organizations needing advanced analytics and AI.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <p className="text-4xl font-bold">Custom</p>
                             <ul className="space-y-3">
                                {TIER_FEATURES.premium.filter(f => f.value !== false).map(item => (
                                    <li key={item.feature} className="flex items-center gap-3">
                                        <Check className="h-5 w-5 text-primary" />
                                        <span>
                                            <strong>{item.value === true ? '' : `${item.value} `}</strong>{item.feature}
                                            {item.comingSoon && <Badge variant="secondary" className="ml-2">Coming Soon</Badge>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="gradient" className="w-full" size="lg">Contact Sales</Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

             {/* Feature Comparison */}
            <section className="py-20 sm:py-28">
                <div className="container max-w-6xl">
                    <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-6 text-left text-lg font-semibold">Features</th>
                                    <th className="p-6 w-48 text-center text-lg font-semibold">Free</th>
                                    <th className="p-6 w-48 text-center text-lg font-semibold text-primary">Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TIER_FEATURES.free.map((_, index) => {
                                    const freeFeature = TIER_FEATURES.free[index];
                                    const premiumFeature = TIER_FEATURES.premium[index];
                                    return (
                                        <tr key={freeFeature.feature} className="border-b last:border-none">
                                            <td className="p-5 font-medium">{freeFeature.feature}</td>
                                            <td className="p-5 text-center">
                                                {freeFeature.included ? (
                                                    <span className="font-semibold">{freeFeature.value}</span>
                                                ) : (
                                                    <X className="h-6 w-6 text-muted-foreground mx-auto" />
                                                )}
                                            </td>
                                            <td className="p-5 text-center">
                                                <div className="flex items-center justify-center gap-2 font-semibold text-primary">
                                                     {premiumFeature.included ? (
                                                        <>
                                                        {premiumFeature.value === true ? <Check className="h-6 w-6" /> : <span>{premiumFeature.value}</span>}
                                                        {premiumFeature.comingSoon && <Badge variant="secondary" className="text-xs">Coming Soon</Badge>}
                                                        </>
                                                    ) : (
                                                        <X className="h-6 w-6 text-muted-foreground mx-auto" />
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section className="py-20 sm:py-28 bg-muted/40">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about our plans.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map(faq => (
                             <AccordionItem value={faq.question} key={faq.question}>
                                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </>
    )
}
