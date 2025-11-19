// src/components/layout/dev-menu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { TestTube2, X, Home, CreditCard } from 'lucide-react';
import { navItems } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

const DeveloperMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const publicPages = [
    { href: '/', title: 'Landing Page', icon: Home },
    { href: '/pricing', title: 'Pricing Page', icon: CreditCard },
  ];

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-56 rounded-lg border bg-card p-2 shadow-lg"
            >
              <h3 className="px-2 py-1.5 text-sm font-semibold">Public Pages</h3>
              <ul className="space-y-1">
                {publicPages.map((item) => (
                    <li key={item.href}>
                        <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        asChild
                        >
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </Link>
                        </Button>
                    </li>
                ))}
              </ul>

              <Separator className="my-2" />

              <h3 className="px-2 py-1.5 text-sm font-semibold">Dashboard Views</h3>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="default"
              variant="default"
              className="h-12 w-auto rounded-full px-4 shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X /> : <TestTube2 />}
                </motion.div>
              </AnimatePresence>
              <span className="ml-2">{isOpen ? 'Close' : 'View Switcher'}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle View Switcher</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default DeveloperMenu;
