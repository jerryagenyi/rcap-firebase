'use client';

import dynamic from 'next/dynamic';

const DeveloperMenu = dynamic(
  () => import('@/components/layout/dev-menu'),
  { ssr: false }
);

export default function ClientDeveloperMenu() {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <DeveloperMenu />;
}
