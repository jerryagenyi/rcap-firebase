import { Logo } from "@/components/icons";
import PublicFooter from "@/components/layout/public-footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="absolute top-8 left-0 right-0 text-center">
        <div className="flex items-center justify-center gap-2">
            <Logo className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-primary">CCIP</h1>
        <p className="text-sm text-muted-foreground">Federal Ministry of Health</p>
        <p className="text-xs text-muted-foreground">Crisis Communication Intelligence Platform</p>
      </header>

      <main className="flex w-full flex-1 items-center justify-center px-4">
        {children}
      </main>

      <PublicFooter />
    </div>
  );
}
