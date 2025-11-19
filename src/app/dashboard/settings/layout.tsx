
'use client';

import {
  User,
  Building,
  Bell,
  Palette,
  Database,
  HelpCircle,
  CreditCard,
  Network,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const settingsNav = [
  {
    name: 'Account',
    href: '/dashboard/settings/account',
    icon: User,
  },
  {
    name: 'Organisation',
    href: '/dashboard/settings/organisation',
    icon: Building,
  },
  {
    name: 'Hierarchy',
    href: '/dashboard/settings/hierarchy',
    icon: Network,
  },
  {
    name: 'Notifications',
    href: '/dashboard/settings/notifications-preferences',
    icon: Bell,
  },
  {
    name: 'Appearance',
    href: '/dashboard/settings/appearance',
    icon: Palette,
  },
  {
    name: 'Data & Sync',
    href: '/dashboard/settings/data',
    icon: Database,
  },
  {
    name: 'Billing',
    href: '/dashboard/settings/billing',
    icon: CreditCard,
  },
  {
    name: 'Help & Documentation',
    href: '/dashboard/settings/help',
    icon: HelpCircle,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      <nav className="md:col-span-1 sticky top-20">
        <ul className="space-y-1">
          {settingsNav.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                  pathname === item.href && 'bg-muted font-semibold text-primary'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="md:col-span-3">{children}</div>
    </div>
  );
}
