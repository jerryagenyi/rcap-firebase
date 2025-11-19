
'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="text-2xl font-bold">RCAP</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button variant="gradient" asChild size="lg">
            <Link href="#">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
