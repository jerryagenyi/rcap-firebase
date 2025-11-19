
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  badge?: number;
  children?: NavItem[];
};

export type ActivityStatus = "Draft" | "Submitted" | "Approved" | "Rejected" | "Completed";

export type Activity = {
  id: string;
  title: string;
  status: ActivityStatus;
  organization: string;
  location: string;
  dateCreated: string;
  lastModified: string;
  description: string;
  type: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarId: string;
  role: string;
  team: string;
  status: 'Active' | 'Invited';
};

export type NotificationType = "Approval" | "Assignment" | "Alert" | "System" | "Comment";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  icon: LucideIcon;
  iconColor: string;
};

export type ReportTemplate = {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
}

export type Organisation = {
    id: string;
    name: string;
    level: 'Federal' | 'State' | 'LGA';
    members: number;
    activities: number;
    status: 'Active' | 'Pending' | 'Suspended';
    parent: string | null;
}
