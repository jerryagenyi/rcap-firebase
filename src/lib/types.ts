import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  badge?: number;
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
