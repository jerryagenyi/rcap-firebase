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
  name: string;
  email: string;
  avatar: string;
  role: string;
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
