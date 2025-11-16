
'use client';
import Link from "next/link";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, Search } from "lucide-react";
import { mockActivities } from "@/lib/data";
import ActivitiesList from "./components/activities-data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ActivityFilters from "./components/filters";


export default function ActivitiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const activityCount = mockActivities.length;
  const totalPages = Math.ceil(activityCount / itemsPerPage);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockActivities.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, activityCount);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Activity Management
          </h1>
          <p className="text-muted-foreground">
            {activityCount} activities
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

      <ActivitiesList data={paginatedActivities} />

       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {activityCount} activities
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="h-9 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
          {[...Array(totalPages)].map((_, i) => (
             <Button 
                key={i} 
                variant="outline" 
                className="h-10 w-10 p-0" 
                data-active={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
          ))}
          <Button variant="outline" className="h-10" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
