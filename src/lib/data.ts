import type { NavItem, Activity } from "@/lib/types";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
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
    badge: 5,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    badge: 2,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCheck,
    badge: 1
  },
];

export const federalDashboardMetrics = [
  {
    title: "Total Activities",
    value: "1,247",
    trend: "+12% this month",
    icon: ClipboardList,
    accentColor: "bg-primary",
    trendColor: "text-green-500",
  },
  {
    title: "Active Outbreaks",
    value: "3",
    trend: "2 under control, 1 active",
    icon: ShieldAlert,
    accentColor: "bg-orange-500",
  },
  {
    title: "Vaccination Coverage",
    value: "67.3%",
    trend: "Target: 70%",
    icon: Syringe,
    accentColor: "bg-green-500",
    progress: 67.3,
  },
  {
    title: "Workers Trained",
    value: "15,892",
    trend: "↑ 1,234 this quarter",
    icon: UserCheck,
    accentColor: "bg-accent",
    trendColor: "text-accent"
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
        title: "COVID-19 Vaccination Campaign - Phase 3",
        status: "Approved",
        organization: "Lagos State Health Department",
        location: "Lagos, Ikeja LGA",
        dateCreated: "2025-10-01",
        lastModified: "2025-12-01",
        description: "Third phase of the statewide COVID-19 vaccination drive.",
        type: "Vaccination Campaign",
    },
    {
        id: "ACT-002",
        title: "Cholera Prevention Training Workshop",
        status: "Submitted",
        organization: "Federal MOH",
        location: "Abuja FCT",
        dateCreated: "2025-11-05",
        lastModified: "2025-11-06",
        description: "Training workshop for healthcare workers on cholera prevention and control.",
        type: "Training Workshop",
    },
    {
        id: "ACT-003",
        title: "Community Health Education - Malaria Prevention",
        status: "Approved",
        organization: "Rivers State MOH",
        location: "Port Harcourt",
        dateCreated: "2025-09-15",
        lastModified: "2025-09-20",
        description: "Educating communities on malaria prevention methods.",
        type: "Health Education",
    },
    {
        id: "ACT-004",
        title: "Emergency Response - Lassa Fever Outbreak",
        status: "Submitted",
        organization: "Ondo State MOH",
        location: "Akure",
        dateCreated: "2025-12-10",
        lastModified: "2025-12-10",
        description: "Rapid response to a reported Lassa Fever outbreak.",
        type: "Emergency Response",
    },
    {
        id: "ACT-005",
        title: "Routine Immunization Campaign",
        status: "Draft",
        organization: "Kano State PHCDA",
        location: "Kano",
        dateCreated: "2025-12-12",
        lastModified: "2025-12-12",
        description: "Planning for the next routine immunization cycle.",
        type: "Immunization",
    },
    {
        id: "ACT-006",
        title: "Disease Surveillance Training",
        status: "Rejected",
        organization: "Oyo State MOH",
        location: "Ibadan",
        dateCreated: "2025-11-20",
        lastModified: "2025-11-22",
        description: "Proposal for disease surveillance training, rejected due to budget issues.",
        type: "Training Workshop",
    },
];
