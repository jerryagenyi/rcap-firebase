import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';
import ClientDeveloperMenu from '@/components/layout/dev-menu-client';

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans' 
});

export const metadata: Metadata = {
  title: 'HealthLink RCAP',
  description: 'Risk Communication Activity Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', roboto.variable)}>
        {children}
        <Toaster />
        <ClientDeveloperMenu />
      </body>
    </html>
  );
}
