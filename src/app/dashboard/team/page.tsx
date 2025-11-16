
'use client';

import { mockTeamMembers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Mail, MessageSquare, MoreVertical, Edit, User, Briefcase, Mail as MailIcon } from 'lucide-react';
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

const statusStyles: Record<UserType['status'], string> = {
  Active: 'bg-green-500 text-white',
  Invited: 'bg-yellow-500 text-white',
};

const TeamMemberCard = ({ member }: { member: UserType }) => {
  const avatar = PlaceHolderImages.find((p) => p.id === member.avatarId);
  const userRoles = [...new Set(mockTeamMembers.map(m => m.role))];
  
  return (
    <Dialog>
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
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <MessageSquare className="h-5 w-5" />
              </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-10 w-10">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DialogTrigger asChild>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Remove User</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* View Profile Dialog */}
        <DialogContent className="sm:max-w-md">
            <DialogHeader className="items-center text-center">
                 <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={avatar?.imageUrl} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                <DialogDescription>{member.role}</DialogDescription>
                 <Badge variant="secondary" className="w-fit">{member.team}</Badge>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                    <MailIcon className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline">{member.email}</a>
                </div>
                 <div className="flex items-center gap-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">{member.status}</p>
                </div>
            </div>
            <DialogFooter className="sm:justify-between flex-row-reverse sm:flex-row-reverse">
                <Button type="button" variant="gradient">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Close</Button>
                </DialogClose>
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
    </Dialog>
  );
};

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Team Directory
          </h1>
          <p className="text-muted-foreground">Manage and view team members across the organization.</p>
        </div>
        <Button variant="gradient">
          <UserPlus />
          Invite Member
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by name, email, or role..." className="h-12 pl-12 w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockTeamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
