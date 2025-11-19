
'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { MoreHorizontal, PlusCircle, Search, Link as LinkIcon, Building } from 'lucide-react';
import { mockOrganisations } from '@/lib/data';
import type { Organisation } from '@/lib/types';
import PaginationControls from '@/components/shared/pagination-controls';

const statusStyles: Record<Organisation['status'], string> = {
  Active: 'bg-green-500 text-white',
  Pending: 'bg-yellow-500 text-white',
  Suspended: 'bg-red-500 text-white',
};

const LinkOrganisationDialog = ({ organisation }: { organisation: Organisation }) => {
    const availableParents = mockOrganisations.filter(org => org.level === 'Federal');
    
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Link Organisation</DialogTitle>
                <DialogDescription>
                    Link <span className="font-semibold text-foreground">{organisation.name}</span> to a parent organisation.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="linkage-type">Linkage Type</Label>
                    <Select defaultValue="parent">
                        <SelectTrigger id="linkage-type">
                            <SelectValue placeholder="Select linkage type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="parent">Connect to Parent</SelectItem>
                            <SelectItem value="merge" disabled>Merge with another</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="target-org">Target Organisation</Label>
                    <Select>
                        <SelectTrigger id="target-org">
                            <SelectValue placeholder="Select target organisation" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableParents.map(parent => (
                                <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="gradient">Create Link</Button>
            </DialogFooter>
        </DialogContent>
    );
};


export default function OrganisationsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const filteredOrganisations = useMemo(() => {
        if (!searchQuery) {
            return mockOrganisations;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return mockOrganisations.filter(org =>
            org.name.toLowerCase().includes(lowercasedQuery) ||
            org.level.toLowerCase().includes(lowercasedQuery) ||
            (org.parent && org.parent.toLowerCase().includes(lowercasedQuery))
        );
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredOrganisations.length / itemsPerPage);

    const paginatedOrganisations = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredOrganisations.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage, filteredOrganisations]);
    
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Organisations
          </h1>
          <p className="text-muted-foreground">
            Manage all organisations in the RCAP system.
          </p>
        </div>
        <Button variant="gradient">
          <PlusCircle />
          Create Organisation
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name, level, or parent..."
          className="h-12 pl-12 w-full"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organisation</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Activities</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Parent Organisation</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrganisations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md">
                        <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{org.name}</span>
                  </div>
                </TableCell>
                <TableCell>{org.level}</TableCell>
                <TableCell>{org.members}</TableCell>
                <TableCell>{org.activities}</TableCell>
                <TableCell>
                  <Badge className={statusStyles[org.status]}>{org.status}</Badge>
                </TableCell>
                <TableCell>{org.parent || 'N/A'}</TableCell>
                <TableCell>
                   <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Organisation</DropdownMenuItem>
                             <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    <span>Link Organisation</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Suspend
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <LinkOrganisationDialog organisation={org} />
                    </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
        }}
        totalItems={filteredOrganisations.length}
        itemName="organisations"
      />
    </div>
  );
}

