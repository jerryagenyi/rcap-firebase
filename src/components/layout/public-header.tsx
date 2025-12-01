'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/login', label: 'Sign In' },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="text-2xl font-bold">CCIP</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="gradient" asChild size="lg">
            <Link href="#">Contact Sales</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                    <div className="p-6">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <Logo className="h-10 w-10" />
                            <span className="text-2xl font-bold">CCIP</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <SheetClose asChild key={link.href}>
                                    <Link href={link.href} className="text-lg font-medium text-foreground hover:text-primary">
                                        {link.label}
                                    </Link>
                                </SheetClose>
                            ))}
                             <Button variant="gradient" asChild size="lg" className="mt-4">
                                <Link href="#">Contact Sales</Link>
                            </Button>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
