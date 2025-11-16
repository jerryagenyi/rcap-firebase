
'use client';

import { useState, useMemo } from 'react';
import { mockTeamMembers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Mail, MessageSquare, MoreVertical, Edit, User, Briefcase, Mail as MailIcon, Send, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { User as UserType } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const statusStyles: Record<UserType['status'], string> = {
  Active: 'bg-green-500 text-white',
  Invited: 'bg-yellow-500 text-white',
};

const TeamMemberProfileDialog = ({ member, open, onOpenChange }: { member: UserType; open: boolean; onOpenChange: (open: boolean) => void; }) => {
    const avatar = PlaceHolderImages.find((p) => p.id === member.avatarId);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                 <DialogHeader>
                    <DialogTitle>Team Member Profile</DialogTitle>
                    <DialogDescription>
                        Viewing the profile of {member.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={avatar?.imageUrl} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold">{member.name}</h3>
                            <p className="text-muted-foreground">{member.role}</p>
                            <p className="text-primary font-medium">{member.team}</p>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Status: <Badge className={statusStyles[member.status]}>{member.status}</Badge></span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline">Edit Profile</Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const TeamMemberCard = ({ member }: { member: UserType }) => {
  const avatar = PlaceHolderImages.find((p) => p.id === member.avatarId);
  const userRoles = [...new Set(mockTeamMembers.map(m => m.role))];
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  return (
    <>
      <AlertDialog>
        <Card className="p-6">
          <CardContent className="flex flex-col items-center text-center p-0">
            <div className="relative w-24 h-24">
                <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={avatar?.imageUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge className={`absolute -bottom-1 right-0 border-2 border-card ${statusStyles[member.status]}`}>{member.status}</Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground mt-4">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
            <p className="text-xs text-primary mt-1">{member.team}</p>

            <div className="flex gap-2 mt-6">
              <Dialog>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Mail className="h-5 w-5" />
                </Button>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Send Message to {member.name}</DialogTitle>
                        <DialogDescription>Compose your message below. The recipient will be notified.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="message-subject">Subject</Label>
                            <Input id="message-subject" placeholder="Regarding the recent activity report..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message-body">Message</Label>
                            <Textarea id="message-body" placeholder={`Hi ${member.name.split(' ')[0]}, I wanted to discuss...`} className="min-h-[120px]" />
                        </div>
                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="gradient">
                            <Send className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                    </DialogFooter>
                </DialogContent>
              </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-10 w-10">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>View Profile</DropdownMenuItem>
                        <DialogTrigger asChild>
                           <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Remove User</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Edit Permissions Dialog */}
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Edit Permissions</DialogTitle>
                <DialogDescription>Change the role for {member.name}.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue={member.role}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            {userRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="gradient">Save Changes</Button>
            </DialogFooter>
        </DialogContent>

        {/* Remove User Alert Dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove {member.name} from the team and revoke their access to the RCAP platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, remove user
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
      <TeamMemberProfileDialog member={member} open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const userRoles = [...new Set(mockTeamMembers.map(m => m.role))];
  
  const filteredMembers = useMemo(() => {
    if (!searchQuery) {
      return mockTeamMembers;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return mockTeamMembers.filter(member =>
      member.name.toLowerCase().includes(lowercasedQuery) ||
      member.email.toLowerCase().includes(lowercasedQuery) ||
      member.role.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Team Directory
          </h1>
          <p className="text-muted-foreground">Manage and view team members across the organization.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <UserPlus />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite New Team Member</DialogTitle>
              <DialogDescription>
                Enter the email address and assign a role to send an invitation.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-invite">Role</Label>
                <Select>
                  <SelectTrigger id="role-invite">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="gradient">Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search by name, email, or role..." 
          className="h-12 pl-12 w-full" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
