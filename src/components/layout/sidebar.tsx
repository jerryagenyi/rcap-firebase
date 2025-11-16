
'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Logo } from '@/components/icons';
import { navItems } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

const SidebarNavItem = ({ item, pathname }: { item: NavItem; pathname: string }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isParentActive = hasChildren && pathname.startsWith(item.href);

  if (hasChildren) {
    return (
      <Collapsible defaultOpen={isParentActive}>
        <CollapsibleTrigger asChild>
           <SidebarMenuButton
              isActive={isParentActive}
              tooltip={{ children: item.title }}
              className="justify-between"
            >
              <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </div>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
            <SidebarMenuSub>
                {item.children.map(child => {
                  const isHashLink = child.href.includes('#');
                  const isSubActive = isHashLink 
                    ? pathname.startsWith(item.href) && pathname.endsWith(child.href.split('#')[1])
                    : pathname === child.href;

                  return (
                    <SidebarMenuSubItem key={child.href}>
                         <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <a href={child.href}>
                                <child.icon className="h-4 w-4" />
                                <span>{child.title}</span>
                            </a>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )
                })}
            </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuButton
      asChild
      isActive={pathname === item.href}
      tooltip={{ children: item.title }}
      className="justify-start"
    >
      <a href={item.href}>
        <item.icon className="h-5 w-5" />
        <span>{item.title}</span>
        {item.badge && (
          <Badge variant="destructive" className="ml-auto">
            {item.badge}
          </Badge>
        )}
      </a>
    </SidebarMenuButton>
  );
};


export default function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user1');

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="h-16 items-center justify-center p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">HealthLink</h1>
        </div>
        <div className="hidden items-center gap-2 group-data-[collapsible=icon]:flex">
          <Logo className="h-8 w-8" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarNavItem item={item} pathname={pathname} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <div className="flex items-center p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar?.imageUrl} alt="User" />
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold">Federal Admin</p>
            <p className="text-xs text-muted-foreground">admin@rcap.gov</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto group-data-[collapsible=icon]:hidden"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
