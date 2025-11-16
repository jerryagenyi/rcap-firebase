
'use client';
import { Bell, Search, Wifi, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { navItems, mockNotifications } from '@/lib/data';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => item.href === pathname)?.title || 'Dashboard';
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user1');
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const recentNotifications = mockNotifications.slice(0, 3);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card/80 px-4 backdrop-blur-lg md:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>

      <h1 className="hidden text-xl font-semibold md:block">{pageTitle}</h1>

      <div className="flex w-full items-center gap-2 md:ml-auto md:w-auto">
        <div className="flex items-center gap-2 text-sm text-green-500">
          <Wifi size={16} />
          <span className="hidden md:inline">Online</span>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search activities..."
            className="w-full rounded-full bg-background pl-9 md:w-[200px] lg:w-[320px] h-10"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10">
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="destructive">{unreadCount} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {recentNotifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex items-start gap-3">
                  <div className="mt-1">
                     <notif.icon className={cn("h-5 w-5", notif.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notif.description}
                    </p>
                     <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                   {!notif.isRead && <div className="h-2 w-2 rounded-full bg-primary mt-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/notifications" className="justify-center">
                <Button variant="outline" className="w-full h-9">View all notifications</Button>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar?.imageUrl} alt="User avatar" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
