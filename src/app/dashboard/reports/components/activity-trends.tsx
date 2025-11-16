
'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { reportActivityTrends } from "@/lib/data";

const TrendItem = ({ week, activities, date, progress }: { week: string, activities: string, date: string, progress: number }) => (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <div className="space-y-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold">{week}</p>
                <div className="hidden sm:flex items-center gap-4">
                    <p className="font-bold text-primary">{activities}</p>
                    <p className="text-sm text-muted-foreground">{date}</p>
                </div>
            </div>
            <Progress value={progress} className="h-3" indicatorClassName="bg-primary" />
             <div className="flex sm:hidden justify-between items-center pt-1">
                <p className="font-bold text-primary text-sm">{activities}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
            </div>
        </div>
    </div>
);


export default function ActivityTrends() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Activity Trends</CardTitle>
                 <Tabs defaultValue="week" className="w-auto">
                    <TabsList>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {reportActivityTrends.map((trend) => (
                        <TrendItem key={trend.week} {...trend} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
