
'use client';

import { useState } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { UploadCloud, Users, Palette, Building, ChevronRight, MoreHorizontal, User as UserIcon, Edit, Trash2 } from 'lucide-react';
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
    const [primaryColor, setPrimaryColor] = useState('hsl(var(--primary))');

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
            <div className="flex items-center gap-6">
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
                                    <span className="w-20 truncate font-mono text-xs">{primaryColor}</span>
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
    const roles = {
        'Administrators': mockTeamMembers.filter(m => m.role.includes('Admin') || m.role.includes('Coordinator')),
        'State Coordinators': mockTeamMembers.filter(m => m.role === 'State Coordinator'),
        'Field Officers': mockTeamMembers.filter(m => m.role === 'Field Officer'),
    };
    const roleKeys = Object.keys(roles);

    const [openAccordions, setOpenAccordions] = useState<string[]>([]);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    
    const handleManageClick = () => {
        setIsBulkMode(true);
        setOpenAccordions(roleKeys);
    };

    const handleDoneClick = () => {
        setIsBulkMode(false);
        setOpenAccordions([]);
        setSelectedMembers([]);
    };

    const handleSelectMember = (memberId: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectedMembers(prev => [...prev, memberId]);
        } else {
            setSelectedMembers(prev => prev.filter(id => id !== memberId));
        }
    };

    return (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Access Management</CardTitle>
                <CardDescription>Define roles and permissions for your team.</CardDescription>
            </div>
            {!isBulkMode ? (
                <Button variant="outline" onClick={handleManageClick}>
                    Manage Team <Users className="ml-2" />
                </Button>
            ) : (
                <Button variant="secondary" onClick={handleDoneClick}>Done</Button>
            )}
        </CardHeader>
        <CardContent>
             <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
                {roleKeys.map((role) => {
                    const members = roles[role as keyof typeof roles];
                    return (
                        <AccordionItem value={role} key={role}>
                            <AccordionTrigger className="rounded-lg border p-4 text-base font-medium hover:no-underline [&[data-state=open]]:border-primary [&[data-state=open]]:bg-primary/5">
                                <div className="flex items-center justify-between w-full">
                                    <p className="font-medium">{role}</p>
                                    <Badge variant="secondary">{members.length} Members</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-4">
                                <div className="space-y-3">
                                    {members.map(member => {
                                        const avatar = PlaceHolderImages.find((p) => p.id === member.avatarId);
                                        return (
                                            <div key={member.id} className="flex items-center gap-3 rounded-md p-2 -m-2 hover:bg-muted">
                                                {isBulkMode && (
                                                    <Checkbox 
                                                        id={`select-${member.id}`} 
                                                        onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                                                        checked={selectedMembers.includes(member.id)}
                                                    />
                                                )}
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={avatar?.imageUrl} alt={member.name} />
                                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <UserIcon className="mr-2 h-4 w-4" /> View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit Permissions
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Remove User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
             </Accordion>
        </CardContent>
         {isBulkMode && selectedMembers.length > 0 && (
            <CardFooter className="bg-muted/50 p-4 border-t flex items-center justify-between">
                <p className="text-sm font-medium">{selectedMembers.length} member(s) selected</p>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive"><Trash2 className="mr-2" /> Remove Selected</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently remove {selectedMembers.length} member(s) from the team. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
                                Yes, remove {selectedMembers.length} member(s)
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        )}
    </Card>
)};

const SubOrganisations = () => {
    const subOrgs = mockOrganisations.filter(org => org.parent);
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Sub-Organisations</CardTitle>
                    <CardDescription>Manage connected state and LGA-level organisations.</CardDescription>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/organisations">
                        Link Organisation <ChevronRight className="ml-2" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subOrgs.map(org => (
                            <TableRow key={org.id}>
                                <TableCell className="font-medium">{org.name}</TableCell>
                                <TableCell>{org.level}</TableCell>
                                <TableCell>{org.members}</TableCell>
                                <TableCell><Badge variant={org.status === 'Active' ? 'default' : 'destructive'}>{org.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const DangerZone = () => {
    const [challengeInput, setChallengeInput] = useState('');
    const currentAdmins = mockTeamMembers.filter(m => m.role.includes('Admin') || m.role.includes('Coordinator'));
    const isChallengeMet = challengeInput === 'TRANSFER';

    return (
        <Card className="border-destructive/50">
             <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-destructive/80">These actions have significant and permanent consequences.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <div>
                    <p className="font-semibold">Transfer Ownership</p>
                    <p className="text-sm text-muted-foreground">Transfer this organisation to another administrator.</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Transfer</Button>
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
                                disabled={!isChallengeMet}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                I understand, transfer ownership
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
        <SubOrganisations />
        <DangerZone />
      </div>
    </div>
  );
}
