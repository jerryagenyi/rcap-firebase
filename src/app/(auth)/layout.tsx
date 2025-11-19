import { Logo } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <header className="absolute top-8 text-center">
        <div className="flex items-center justify-center gap-2">
            <Logo className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-primary">RCAP</h1>
        <p className="text-sm text-muted-foreground">Federal Ministry of Health</p>
        <p className="text-xs text-muted-foreground">Risk Communication Activity Platform</p>
      </header>

      <main className="flex w-full flex-1 items-center justify-center">
        {children}
      </main>

      <footer className="absolute bottom-8 text-center text-xs text-muted-foreground">
        <p>© 2025 Federal Ministry of Health • RCAP v1.0.0</p>
      </footer>
    </div>
  );
}
