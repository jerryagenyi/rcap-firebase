
'use client';
import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, Search, Trash2 } from "lucide-react";
import { mockActivities } from "@/lib/data";
import ActivitiesList from "./components/activities-data-table";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActivityFilters from "./components/filters";
import PaginationControls from "@/components/shared/pagination-controls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";


export default function ActivitiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery) {
        return mockActivities;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return mockActivities.filter(activity =>
        activity.title.toLowerCase().includes(lowercasedQuery) ||
        activity.organization.toLowerCase().includes(lowercasedQuery) ||
        activity.location.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredActivities.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filteredActivities]);

  const handleSelectActivity = (activityId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedActivities(prev => [...prev, activityId]);
    } else {
      setSelectedActivities(prev => prev.filter(id => id !== activityId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedActivities(paginatedActivities.map(a => a.id));
    } else {
      setSelectedActivities([]);
    }
  };

  const allOnPageSelected = selectedActivities.length > 0 && paginatedActivities.every(a => selectedActivities.includes(a.id));


  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Activity Management
          </h1>
          <p className="text-muted-foreground">
            {filteredActivities.length} activities
          </p>
        </div>
        <Button asChild variant="gradient">
          <Link href="/dashboard/activities/create">
            <PlusCircle />
            Create
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search activities, organizations, locations..."
            className="h-12 pl-12 w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="h-12">
                    <ListFilter className="mr-2 h-5 w-5" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md p-0">
                <SheetHeader className="p-6 pb-0">
                    <SheetTitle>Filter Activities</SheetTitle>
                    <SheetDescription>
                        Refine your activity list using the filters below.
                    </SheetDescription>
                </SheetHeader>
                <ActivityFilters />
            </SheetContent>
        </Sheet>
      </div>
       {selectedActivities.length > 0 && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted border">
          <p className="text-sm font-medium">{selectedActivities.length} selected</p>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Change Status <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Approve</DropdownMenuItem>
                <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                <DropdownMenuItem>Reject</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="destructive" onClick={() => setSelectedActivities([])}>
              <Trash2 className="mr-2" /> Delete
            </Button>
          </div>
        </div>
      )}

      <ActivitiesList 
        data={paginatedActivities}
        selectedActivities={selectedActivities}
        onSelectActivity={handleSelectActivity}
        onSelectAll={handleSelectAll}
        allOnPageSelected={allOnPageSelected}
      />

       <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => {
            setItemsPerPage(Number(value));
            setCurrentPage(1);
        }}
        totalItems={filteredActivities.length}
        itemName="activities"
       />
    </div>
  );
}

    
