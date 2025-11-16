import type { NavItem, Activity, Notification } from "@/lib/types";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  ShieldAlert,
  Syringe,
  UserCheck,
  Bell,
  MessageSquare,
  FileCheck2,
  AlertTriangle,
  Info,
  Palette,
  Database,
  HelpCircle,
  User,
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
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    badge: 3
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCheck,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    children: [
        {
            title: "Account",
            href: "/dashboard/settings",
            icon: User
        },
        {
            title: "Notifications",
            href: "/dashboard/settings",
            icon: Bell
        },
        {
            title: "Appearance",
            href: "/dashboard/settings",
            icon: Palette
        },
        {
            title: "Data & Sync",
            href: "/dashboard/settings",
            icon: Database
        },
        {
            title: "Help",
            href: "/dashboard/settings",
            icon: HelpCircle
        }
    ]
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

export const mockNotifications: Notification[] = [
  {
    id: "NOTIF-001",
    type: "Approval",
    title: "Activity Approved",
    description: "Your activity 'Cholera Prevention Training Workshop' has been approved.",
    timestamp: "2025-12-11T10:00:00Z",
    isRead: false,
    icon: FileCheck2,
    iconColor: "text-green-500"
  },
  {
    id: "NOTIF-002",
    type: "Assignment",
    title: "New Task Assigned",
    description: "You have been assigned to 'Emergency Response - Lassa Fever Outbreak'.",
    timestamp: "2025-12-10T14:30:00Z",
    isRead: false,
    icon: FileCheck2,
    iconColor: "text-blue-500"
  },
  {
    id: "NOTIF-003",
    type: "Alert",
    title: "Urgent: Outbreak Alert",
    description: "A new Cholera outbreak has been reported in Kano State.",
    timestamp: "2025-12-10T09:00:00Z",
    isRead: false,
    icon: AlertTriangle,
    iconColor: "text-red-500"
  },
  {
    id: "NOTIF-004",
    type: "System",
    title: "System Update",
    description: "RCAP has been updated to version 1.1.0.",
    timestamp: "2025-12-09T18:00:00Z",
    isRead: true,
    icon: Info,
    iconColor: "text-primary"
  },
  {
    id: "NOTIF-005",
    type: "Comment",
    title: "New Comment",
    description: "Dr. Aisha added a comment on 'COVID-19 Vaccination Campaign'.",
    timestamp: "2025-12-08T11:45:00Z",
    isRead: true,
    icon: MessageSquare,
    iconColor: "text-gray-500"
  },
];
