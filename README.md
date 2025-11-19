# HealthLink RCAP - Risk Communication Activity Platform

This is a Next.js starter project for **HealthLink RCAP**, a platform designed to streamline the management and coordination of public health activities. It serves as a central hub for various organizational levels, from federal ministries to local field officers, to plan, execute, and report on health-related initiatives.

The platform is built with a modern tech stack including Next.js, React, ShadCN, and Tailwind CSS, providing a responsive and intuitive user experience.

## Target Audience

While initially designed for government health bodies, RCAP is flexible enough to be adopted by:

- **Non-Profit Organisations (NPOs)**: For managing community health programs, grant-funded projects, and volunteer activities.
- **Civil Society Organisations (CSOs)**: To coordinate grassroots campaigns, awareness drives, and local health initiatives. The platform's structure allows a small CSO to start a movement and later link up with larger organizations for broader impact.
- **State and Local Governments**: States or local bodies can adopt the platform independently and later connect to a federal or national hierarchy as it becomes available.

## Key Features

- **Dashboard**: A role-based overview of key metrics, performance trends, and recent activities.
- **Activity Management**: Create, track, and manage health activities from draft to completion.
- **Team Directory**: Manage team members, invite new users, and handle permissions.
- **Organisation Management**: Link organizations in a hierarchy (e.g., Federal > State > LGA), transfer ownership, and manage organizational profiles.
- **AI-Powered Reporting**: Generate insightful reports on activity trends, geographic distribution, and more.

## User Roles & Access Levels

The platform supports a role-based access control (RBAC) system to ensure users only see and do what's relevant to their position.

- **Super Admin (Federal Level)**
  - **Access**: Full system-wide access.
  - **Capabilities**: Can manage all organizations, link states to the federal level, transfer ownership, manage all users, and view national-level reports and analytics. This role is intended for top-level administrators overseeing the entire platform.

- **State Admin / Coordinator**
  - **Access**: Full access within their own state's organization.
  - **Capabilities**: Can manage their state's profile, branding, and team members. They can approve activities submitted by LGAs within their state and manage the hierarchy of LGAs under them. They view state-specific dashboards and reports.

- **LGA / Field Officer**
  - **Access**: Limited to their assigned activities and local area.
  - **Capabilities**: Can create and submit activity reports for approval. They have a focused dashboard showing their assigned tasks, completed work, and pending reports.

- **Data Analyst / Epidemiologist**
  - **Access**: Primarily read-only access to activity and report data.
  - **Capabilities**: Can view and generate reports, analyze trends, and export data for further analysis. They typically do not have permission to create or approve activities.

## Getting Started

To get started with development, take a look at the main dashboard page located at `src/app/dashboard/page.tsx`.
