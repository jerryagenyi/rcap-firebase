import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type MetricCardProps = {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  color?: string;
  progress?: number;
};

export default function MetricCard({
  title,
  value,
  trend,
  icon: Icon,
  color = 'text-primary',
  progress,
}: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary to-accent" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn('h-5 w-5', color)} />
      </CardHeader>
      <CardContent>
        <div className="animate-count-up text-3xl font-bold text-foreground">
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{trend}</p>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2 h-2" />
        )}
      </CardContent>
    </Card>
  );
}
