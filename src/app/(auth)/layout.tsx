import { Logo } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
       <div className="absolute top-8 left-8 flex items-center gap-2 text-lg font-semibold text-primary">
          <Logo className="h-8 w-8" />
          <span>HealthLink RCAP</span>
        </div>
      {children}
    </div>
  );
}
