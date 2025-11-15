import type { NavItem, Activity } from "@/lib/types";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  HeartPulse,
  Syringe,
  UserCheck
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Activities",
    href: "/dashboard/activities",
    icon: ClipboardList,
    badge: 3, // Example for pending approvals
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export const federalDashboardMetrics = [
  {
    title: "Total Activities",
    value: "1,247",
    trend: "+12% this month",
    icon: ClipboardList,
    color: "text-primary",
  },
  {
    title: "Active Outbreaks",
    value: "3",
    trend: "2 under control",
    icon: ShieldAlert,
    color: "text-orange-500",
  },
  {
    title: "Vaccination Coverage",
    value: "67.3%",
    trend: "Target: 70%",
    icon: Syringe,
    color: "text-green-500",
    progress: 67.3,
  },
  {
    title: "Workers Trained",
    value: "15,892",
    trend: "↑ 1,234 this quarter",
    icon: UserCheck,
    color: "text-accent",
  },
];

export const performanceChartData = [
    { date: 'Jan', created: 45, completed: 30 },
    { date: 'Feb', created: 55, completed: 42 },
    { date: 'Mar', created: 70, completed: 60 },
    { date: 'Apr', created: 65, completed: 55 },
    { date: 'May', created: 80, completed: 70 },
    { date: 'Jun', created: 75, completed: 68 },
];

export const activityTypeChartData = [
  { name: 'Vaccination', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Health Ed', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Outreach', value: 250, fill: 'hsl(var(--chart-3))' },
  { name: 'Training', value: 200, fill: 'hsl(var(--chart-4))' },
  { name: 'Surveillance', value: 150, fill: 'hsl(var(--chart-5))' },
];

export const mockActivities: Activity[] = [
    {
        id: "ACT-001",
        title: "Community Health Fair in Lagos",
        status: "Completed",
        organization: "Lagos State MOH",
        location: "Lagos",
        dateCreated: "2023-05-10",
        lastModified: "2023-05-15",
        description: "A large-scale health fair providing free screenings.",
        type: "Community Outreach",
    },
    {
        id: "ACT-002",
        title: "Polio Vaccination Drive - Kano",
        status: "Approved",
        organization: "Kano State PHCDA",
        location: "Kano",
        dateCreated: "2023-06-01",
        lastModified: "2023-06-05",
        description: "State-wide polio vaccination campaign.",
        type: "Vaccination Campaign",
    },
    {
        id: "ACT-003",
        title: "Emergency Response Training",
        status: "Submitted",
        organization: "Federal MOH",
        location: "Abuja",
        dateCreated: "2023-06-20",
        lastModified: "2023-06-20",
        description: "Training for rapid response teams.",
        type: "Training Workshop",
    },
    {
        id: "ACT-004",
        title: "Cholera Awareness in Rivers",
        status: "Draft",
        organization: "Rivers State MOH",
        location: "Rivers",
        dateCreated: "2023-06-22",
        lastModified: "2023-06-22",
        description: "Initial draft for a cholera awareness campaign.",
        type: "Health Education",
    },
    {
        id: "ACT-005",
        title: "Disease Surveillance in Oyo",
        status: "Rejected",
        organization: "Oyo State MOH",
        location: "Oyo",
        dateCreated: "2023-05-18",
        lastModified: "2023-05-22",
        description: "Rejected due to budget constraints.",
        type: "Disease Surveillance",
    },
];
