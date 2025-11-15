import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import DeveloperMenu from '@/components/layout/dev-menu';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
      <body className={cn('font-body antialiased', inter.variable)}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'development' && <DeveloperMenu />}
      </body>
    </html>
  );
}
