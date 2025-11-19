
'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { UploadCloud, Users, Palette, Building, MoreHorizontal, User as UserIcon, Edit, Trash2, ArrowRight, Info } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { mockOrganisations, mockTeamMembers } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const OrganisationProfile = () => {
    const currentOrg = mockOrganisations[0];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Organisation Profile</CardTitle>
                <CardDescription>Manage your organisation's public details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="orgName">Organisation Name</Label>
                    <Input id="orgName" defaultValue={currentOrg.name} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="orgDescription">Description</Label>
                    <Textarea id="orgDescription" placeholder="A short description of your organisation's mission." className="min-h-[100px]" defaultValue="Overseeing and coordinating national health policies and activities to ensure the well-being of all citizens. The Federal Ministry of Health is the central body for health in the nation."/>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button variant="gradient" className="ml-auto">Save Changes</Button>
            </CardFooter>
        </Card>
    );
};

const OrganisationBranding = () => {
    const [primaryColor, setPrimaryColor] = useState('#7151B3');

    const colorSwatches = [
        '#7151B3', '#53A7EA', '#2ECC71', '#F1C40F', '#E67E22', '#E74C3C', '#34495E', '#1ABC9C'
    ];

    return (
    <Card>
        <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Customize the look and feel for your organisation's members.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="h-20 w-20 rounded-md">
                    <AvatarFallback className="rounded-md">
                        <Building />
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <Button variant="outline" asChild>
                            <span className="flex items-center gap-2">
                                <UploadCloud /> Upload Logo
                            </span>
                        </Button>
                        <Input id="logo-upload" type="file" className="hidden" />
                    </label>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or SVG. Max 800x800px.</p>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-4">
                     <Popover>
                        <PopoverTrigger asChild>
                           <Button variant={'outline'} className="w-auto justify-start text-left font-normal">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-md border" style={{ backgroundColor: primaryColor }} />
                                    <span className="w-28 truncate font-mono text-xs">{primaryColor}</span>
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <div className="grid grid-cols-4 gap-2">
                                {colorSwatches.map(color => (
                                    <Button
                                        key={color}
                                        variant="outline"
                                        size="icon"
                                        className={cn("h-8 w-8 rounded-md", primaryColor === color && "ring-2 ring-ring ring-offset-2")}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setPrimaryColor(color)}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button variant="gradient" className="ml-auto">Save Branding</Button>
        </CardFooter>
    </Card>
)};

const AccessManagement = () => {
    const roles = useMemo(() => {
        const roleCounts = mockTeamMembers.reduce((acc, member) => {
            acc[member.role] = (acc[member.role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(roleCounts).map(([name, count]) => ({ name, count }));
    }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Management</CardTitle>
        <CardDescription>
          Define roles and permissions for your organisation's team members.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {roles.map(role => (
            <div key={role.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                <div>
                    <h4 className="font-semibold">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">{role.count} member(s)</p>
                </div>
                <Button variant="outline" className="mt-2 sm:mt-0">Manage</Button>
            </div>
        ))}
      </CardContent>
       <CardFooter className="border-t pt-6">
        <Button asChild className="ml-auto">
          <Link href="/dashboard/team">
            View All Members <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};


const DangerZone = () => {
    const [challengeInput, setChallengeInput] = useState('');
    const [deleteChallengeInput, setDeleteChallengeInput] = useState('');
    const currentAdmins = mockTeamMembers.filter(m => m.role.includes('Admin') || m.role.includes('Coordinator'));
    const isTransferChallengeMet = challengeInput === 'TRANSFER';
    const isDeleteChallengeMet = deleteChallengeInput === 'DELETE';

    return (
        <Card className="border-destructive/50">
             <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-destructive/80">These actions have significant and permanent consequences.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="font-semibold">Transfer Ownership</p>
                    <p className="text-sm text-muted-foreground">Transfer this organisation to another administrator.</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto">Transfer</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Transfer Organisation Ownership</AlertDialogTitle>
                            <AlertDialogDescription>
                                This is a critical action. You will lose all administrative privileges for this organisation.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4 my-4">
                             <div className="space-y-2">
                                <Label htmlFor="new-owner">Select New Owner</Label>
                                <Select>
                                    <SelectTrigger id="new-owner">
                                        <SelectValue placeholder="Select an administrator" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currentAdmins.map(admin => (
                                            <SelectItem key={admin.id} value={admin.id}>{admin.name} ({admin.email})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="transfer-challenge">To confirm, please type "TRANSFER" below:</Label>
                                <Input 
                                    id="transfer-challenge" 
                                    value={challengeInput}
                                    onChange={(e) => setChallengeInput(e.target.value)}
                                    placeholder="TRANSFER"
                                />
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setChallengeInput('')}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={!isTransferChallengeMet}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                I understand, transfer ownership
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
            <Separator className="bg-destructive/20" />
            <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="font-semibold">Delete this Organisation</p>
                    <p className="text-sm text-muted-foreground">Permanently delete this organisation and all its data.</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full sm:w-auto">Delete Organisation</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Organisation</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action is irreversible. It will permanently delete the organisation, all associated users, activities, and reports.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-2 my-4">
                            <Label htmlFor="delete-challenge">To confirm, please type "DELETE" below:</Label>
                            <Input 
                                id="delete-challenge" 
                                value={deleteChallengeInput}
                                onChange={(e) => setDeleteChallengeInput(e.target.value)}
                                placeholder="DELETE"
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteChallengeInput('')}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={!isDeleteChallengeMet}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                I understand, delete this organisation
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
};


export default function OrganisationSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Organisation Settings
            </h1>
            <p className="text-muted-foreground">
                Manage your organisation's profile, branding, and structure.
            </p>
        </div>
      <div className="space-y-8">
        <OrganisationProfile />
        <OrganisationBranding />
        <AccessManagement />
        <DangerZone />
      </div>
    </div>
  );
}
