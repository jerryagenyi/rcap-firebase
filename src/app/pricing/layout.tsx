
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-lg">HealthLink RCAP</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="gradient" asChild>
                <Link href="#">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="container py-8 text-center text-sm text-muted-foreground">
            <p>© 2025 HealthLink RCAP • v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}
