
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { UploadCloud, Users, Palette, Building, ChevronRight } from 'lucide-react';
import { mockOrganisations } from '@/lib/data';

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
                    <Textarea id="orgDescription" placeholder="A short description of your organisation's mission." className="min-h-[100px]" />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button variant="gradient" className="ml-auto">Save Changes</Button>
            </CardFooter>
        </Card>
    );
};

const OrganisationBranding = () => (
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
                    <div className="h-10 w-16 rounded-md border" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                    <Input placeholder="#6366f1" className="max-w-xs" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button variant="gradient" className="ml-auto">Save Branding</Button>
        </CardFooter>
    </Card>
);

const AccessManagement = () => (
     <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Access Management</CardTitle>
                <CardDescription>Define roles and permissions for your team.</CardDescription>
            </div>
            <Button asChild variant="outline">
                <Link href="/dashboard/team">
                    Manage Team <Users className="ml-2" />
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="font-medium">Administrators</p>
                    <Badge variant="secondary">3 Members</Badge>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="font-medium">State Coordinators</p>
                    <Badge variant="secondary">8 Members</Badge>
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <p className="font-medium">Field Officers</p>
                    <Badge variant="secondary">34 Members</Badge>
                </div>
            </div>
        </CardContent>
    </Card>
);

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
      </div>
    </div>
  );
}
