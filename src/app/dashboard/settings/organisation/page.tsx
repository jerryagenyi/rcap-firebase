
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
import { UploadCloud, Users, Palette, Building, MoreHorizontal, User as UserIcon, Edit, Trash2, ArrowRight, Info, Save, X, ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { mockOrganisations, mockTeamMembers } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Checkbox } from '@/components/ui/checkbox';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
        <CardContent className="p-6 space-y-8">
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
            <div className="space-y-4">
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
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Theme Customization</AlertTitle>
                    <AlertDescription>
                        This color will be used as the primary accent for buttons, links, and highlights for all members of your organisation.
                    </AlertDescription>
                </Alert>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button variant="gradient" className="ml-auto">Save Branding</Button>
        </CardFooter>
    </Card>
)};

const AccessManagement = () => {
    const [isManaging, setIsManaging] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [openRoles, setOpenRoles] = useState<Record<string, boolean>>({});

    const userRoles = useMemo(() => {
        const grouped = mockTeamMembers.reduce((acc, member) => {
            if (!acc[member.role]) {
                acc[member.role] = [];
            }
            acc[member.role].push(member);
            return acc;
        }, {} as Record<string, typeof mockTeamMembers>);
        
        return Object.entries(grouped).map(([name, members]) => ({ name, members }));
    }, []);

    const handleSelectMember = (memberId: string) => {
        setSelectedMembers(prev => 
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId)
                : [...prev, memberId]
        );
    };

    const toggleManageMode = () => {
        const nextIsManaging = !isManaging;
        setIsManaging(nextIsManaging);
        setSelectedMembers([]); // Reset selection when toggling mode
        
        if (nextIsManaging) {
            // Open all collapsible sections
            const allOpen = userRoles.reduce((acc, role) => {
                acc[role.name] = true;
                return acc;
            }, {} as Record<string, boolean>);
            setOpenRoles(allOpen);
        } else {
            // Close all
            setOpenRoles({});
        }
    };
    
    const handleOpenChange = (roleName: string, isOpen: boolean) => {
        // Prevent closing when in manage mode
        if (isManaging) return;
        setOpenRoles(prev => ({ ...prev, [roleName]: isOpen }));
    };

    return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
            <CardTitle>Access Management</CardTitle>
            <CardDescription>
                Define roles and permissions for your organisation's team members.
            </CardDescription>
        </div>
        {!isManaging ? (
            <Button variant="outline" onClick={toggleManageMode}>Manage</Button>
        ) : (
            <div className="flex gap-2">
                <Button variant="ghost" onClick={toggleManageMode}>Cancel</Button>
                <Button variant="gradient">Save Changes</Button>
            </div>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {userRoles.map(role => (
            <Collapsible 
                key={role.name}
                open={openRoles[role.name] || false}
                onOpenChange={(isOpen) => handleOpenChange(role.name, isOpen)}
            >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 rounded-t-lg group border-x border-t data-[state=closed]:rounded-b-lg data-[state=closed]:border-b">
                     <h4 className="font-semibold text-lg">{role.name} <span className="text-sm text-muted-foreground font-normal">({role.members.length} members)</span></h4>
                     <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="divide-y border-x border-b rounded-b-lg">
                        {role.members.map((member, index) => {
                            const avatar = PlaceHolderImages.find(p => p.id === member.avatarId);
                            return (
                                <div key={member.id} className="flex items-center gap-3 p-3">
                                    {isManaging && (
                                        <Checkbox 
                                            id={`member-${member.id}`} 
                                            checked={selectedMembers.includes(member.id)}
                                            onCheckedChange={() => handleSelectMember(member.id)}
                                        />
                                    )}
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={avatar?.imageUrl} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.email}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                Remove User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )
                        })}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        ))}
      </CardContent>
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
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 pt-0 sm:p-6 sm:pt-6">
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
