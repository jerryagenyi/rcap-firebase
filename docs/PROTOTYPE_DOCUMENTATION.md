# Migration Guide: CCIP from Next.js/React to Vue/Quasar/Laravel

**Objective**: To provide a detailed, step-by-step guide for a development assistant to convert the existing CCIP prototype (Next.js/React) into a Vue.js/Quasar application powered by a Laravel REST API, based on the provided target architecture.

This document serves as the single source of truth for the migration process. It combines the feature-set of the source prototype with the architectural requirements of the target application.

---

## **Phase 1: Project Scaffolding & Initial Setup**

This phase focuses on creating the new Vue/Quasar project and porting over the essential visual and structural elements.

#### **Step 1.1: Initialize New Quasar Project**

Create a new Quasar project using the Vite setup. This will be the home for the new frontend.

1.  Run the Quasar CLI command: `pnpm create quasar`
2.  Select the following options:
    *   **Project name**: `frontend`
    *   **Script type**: TypeScript
    *   **Quasar version**: Quasar v2 with Vite
    *   **Features to install**: Select `Pinia` and `Axios`.
    *   **Linting**: Choose your preferred linter setup.

#### **Step 1.2: Replicate Directory Structure**

Based on the target architecture, create the specified directory structure within the new `frontend/src/` folder. This structure is designed to separate concerns and align with best practices in the Vue ecosystem.

```
frontend/src/
├── boot/
├── components/
├── layouts/
├── pages/
├── router/
├── services/
└── stores/
```

#### **Step 1.3: Port Styling and Theming**

The prototype uses Tailwind CSS with specific HSL color variables. This needs to be mapped to Quasar's SASS variables.

1.  **Map Theme Colors:**
    *   Open the prototype's `src/app/globals.css` to find the source color values.
    *   Open the new Quasar project's `src/css/quasar.variables.sass`.
    *   Update the SASS variables with the prototype's color scheme.

    | Prototype (CSS)                  | Target (SASS)     | Hex Value |
    | :------------------------------- | :---------------- | :-------- |
    | `--primary: 258 56% 56%`         | `$primary`        | `#7151B3` |
    | `--accent: 206 79% 62%`          | `$accent`         | `#53A7EA` |
    | `--background: 257 32% 96%`      | `$background`     | `#F2F0F7` |
    | `--card: 0 0% 100%`              | `$card`           | `#FFFFFF` |
    | `--destructive: 0 84% 60%`       | `$negative`       | `#E74C3C` |
    | `--secondary: 210 40% 96%`       | `$secondary`      | `#F0F2F5` |

2.  **Set Default Font:**
    *   Ensure the **Inter** font is loaded in your Quasar project (e.g., via Google Fonts in your `index.html`).
    *   Set it as the default font family in `src/css/app.scss`.

---

## **Phase 2: Component & Layout Migration**

This phase involves recreating all UI elements from the React prototype using Vue and Quasar components.

#### **Step 2.1: Rebuild Core Layouts**

1.  **AuthLayout (`src/layouts/AuthLayout.vue`):**
    *   **Source:** `src/app/(auth)/layout.tsx`
    *   **Action:** Create a `q-layout` with a central `q-page` using `flex flex-center`. Rebuild the header containing the app logo and title. The SVG from `src/components/icons.tsx` can be converted into a standalone `.vue` component or used directly.

2.  **MainLayout (`src/layouts/MainLayout.vue`):**
    *   **Source:** `src/app/dashboard/layout.tsx`
    *   **Action:** Use a `q-layout` with `q-header`, `q-drawer` (for the sidebar), and `q-page-container`.
    *   **Sidebar:** Convert the prototype's `AppSidebar.tsx` into the content for the `q-drawer`. Use `q-list` and `q-item` for navigation links, and `q-expansion-item` for the collapsible sections ("Future Features", etc.). The navigation structure can be found in `src/lib/data.ts`.
    *   **Header:** Rebuild the header from `Header.tsx` inside the `q-header`. This includes the search bar, role switcher, and user profile dropdown.

#### **Step 2.2: Convert UI Primitives (ShadCN to Quasar)**

This is a direct mapping of UI components. The goal is to achieve the same functionality and a similar look and feel.

| Prototype Element (shadcn/ui) | Quasar Equivalent           | Notes                                                              |
| :------------------------------ | :-------------------------- | :----------------------------------------------------------------- |
| `Button.tsx`                    | `q-btn`                     | Use props like `color`, `flat`, `outline`, and `unelevated`.       |
| `Card.tsx`                      | `q-card`, `q-card-section`  | Use sections for header, content, and actions for better structure. |
| `Input.tsx`                     | `q-input`                   | Provides built-in validation, labels, and icon slots.            |
| `Select.tsx`                    | `q-select`                  | Supports filtering, data-binding (`v-model`), and custom options.  |
| `Dialog.tsx`                    | `q-dialog`                  | Quasar dialogs are often controlled programmatically for flexibility. |
| `Avatar.tsx`                    | `q-avatar`                  | Can contain a `q-img` or text for fallbacks.                     |
| `Badge.tsx`                     | `q-badge`, `q-chip`         | `q-chip` is more versatile for tags and user-interactive elements. |
| `Table.tsx`                     | `q-table`                   | A powerful data table with built-in sorting, filtering, and selection. |
| `Tabs.tsx`                      | `q-tabs`, `q-tab-panels`    | Direct equivalent for creating tabbed views.                     |
| `Accordion.tsx`                 | `q-expansion-item`          | For creating collapsible sections like FAQs or settings groups.    |
| `Textarea.tsx`                  | `q-input type="textarea"`   | Use the `type` prop on `q-input`.                                |
| `Checkbox.tsx`                  | `q-checkbox`                | Standard checkbox component.                                     |

**Action:** For each custom component in the prototype (e.g., `MetricCard.tsx`, `RecentActivities.tsx`, `MapCard.tsx`), create a new `.vue` component in `src/components/` and rebuild its structure using the appropriate Quasar components.

---

## **Phase 3: Page, Routing, and State Management**

With layouts and components ready, rebuild the application pages and wire them up to a central state management system.

#### **Step 3.1: Recreate Application Pages**

For each page file in `src/app/(public)/...` and `src/app/dashboard/...`, create a corresponding `.vue` file in your `frontend/src/pages/` directory.

*   **Example:** The activity list at `src/app/dashboard/activities/page.tsx` becomes `src/pages/activities/ActivityList.vue`.
*   Use the component mapping from Phase 2 to rebuild each page's UI.

#### **Step 3.2: Implement State Management with Pinia**

Centralize all application state using Pinia stores.

1.  **Auth Store (`src/stores/useAuthStore.ts`):**
    *   **Responsibility:** Manage user authentication state, user object, and the JWT.
    *   **Actions:** `login`, `logout`, `register`, `fetchUser`.
    *   **Getters:** `isAuthenticated`, `userRole`.
    *   The user object should be populated upon login and on app initialization if a token exists.

2.  **Data Stores (`useActivityStore.ts`, `useOrganisationStore.ts`, etc.):**
    *   **Responsibility:** Fetch and cache data from the Laravel API.
    *   **Action Example:** In `useActivityStore.ts`, create a `fetchActivities` action. This will use your Axios service to make a GET request to the `/api/v1/activities` endpoint and store the result in a `ref()` named `activities`.

#### **Step 3.3: Implement Routing and Navigation Guards**

1.  **Route Definitions (`src/router/routes.ts`):**
    *   Use the prototype's `src/lib/data.ts` (`navItems`) as a reference to define your application's routes.
    *   Associate route paths with your newly created page components.
    *   Use nested routes to handle layouts (e.g., dashboard routes as children of the `MainLayout` component).

2.  **Navigation Guards (`src/router/guards.ts`):**
    *   **`authGuard`:** Before each navigation, check `to.meta.requiresAuth`. If `true` and `useAuthStore().isAuthenticated` is `false`, redirect to the login page.
    *   **`roleGuard`:** Check `to.meta.requiresRole`. If the user's role from the auth store does not match the required roles, redirect them to a default page (like the dashboard or an "access denied" page).

#### **Step 3.4: Connect Pages to Pinia Stores**

In your page components, use the stores to fetch and display data.

*   **Example (`ActivityList.vue`):**
    ```vue
    <script setup lang="ts">
    import { onMounted, computed } from 'vue';
    import { useActivityStore } from '@/stores/useActivityStore';

    const activityStore = useActivityStore();

    // Use a computed property for reactive access to store state
    const activities = computed(() => activityStore.activities);
    const isLoading = computed(() => activityStore.loading);

    // Fetch data when the component is first mounted
    onMounted(() => {
      activityStore.fetchActivities();
    });
    </script>
    ```

---

## **Phase 4: Feature-Specific Migration**

This phase details the migration of complex features from the prototype.

#### **Step 4.1: Authentication Flow (Login, Register)**

*   **Source:** `src/app/(auth)/*`
*   **Target:** `src/pages/AuthLogin.vue`, `src/pages/AuthRegister.vue`
*   **Action:**
    1.  Rebuild the UI for login and registration forms using `q-form` and `q-input`.
    2.  Implement client-side validation using Quasar's `:rules` prop on `q-input`.
    3.  On form submission, call the appropriate action from the `useAuthStore` (e.g., `authStore.login(credentials)`).
    4.  The store will make the API call to the Laravel backend. The `api.ts` Axios interceptor will handle and display any errors (e.g., 422 validation, 401 unauthorized).
    5.  Upon successful login, the `authGuard` will permit navigation to the intended protected page.

#### **Step 4.2: Activity Management (CRUD)**

*   **Source:** `src/app/dashboard/activities/*`
*   **Target:** `src/pages/activities/*`
*   **Action:**
    1.  **List View (`ActivityList.vue`):** Rebuild the UI using `q-table`. Configure the table columns to match the prototype. Use the `selection` prop to enable row selection for bulk actions.
    2.  **Create/Edit Form (`ActivityForm.vue`):** Rebuild the multi-step form.
        *   Replace `zod` schema with Quasar's form validation rules.
        *   The State/LGA dropdowns should be dynamic: when a state is selected, make an API call to fetch its LGAs.
        *   Use the `q-uploader` component for drag-and-drop file attachments. The upload handler should send files to the Laravel backend.
    3.  **Semiotic Analysis:** The "Assess Risk" button should trigger an API call to a Laravel endpoint that orchestrates the AI analysis. Display the returned risk score, issues, and recommendations.

#### **Step 4.3: Team Directory & Invitations**

*   **Source:** `src/app/dashboard/team/page.tsx`
*   **Target:** `src/pages/team/TeamDirectory.vue`
*   **Action:**
    1.  Recreate the grid of user profiles using `q-card`.
    2.  The "Invite Members" dialog (`q-dialog`) should contain a `q-input type="textarea"` for email lists and a `q-uploader` for CSV files.
    3.  On submission, the dialog should call an action in the `useOrganisationStore` which sends the data to the `/api/v1/organisations/{id}/invitations` endpoint.

#### **Step 4.4: AI Report Generation**

*   **Source:** `src/app/dashboard/reports/[reportId]/page.tsx`
*   **Target:** `src/pages/reports/GeneratedReport.vue`
*   **Action:**
    1.  The UI for selecting a report template remains the same.
    2.  When a user clicks to generate a report, the frontend will make a POST request to a new Laravel endpoint (e.g., `/api/v1/reports/generate-ai`).
    3.  The request body will contain the necessary data (e.g., activity data, report type).
    4.  The Laravel backend will be responsible for calling the GenAI service.
    5.  The frontend will display a loading state (`q-spinner`) while waiting for the response and then render the returned report content.

---

This guide provides a comprehensive plan for migrating the CCIP prototype. By following these phases and steps, your development assistant will be able to systematically convert the application while adhering to the target architecture. Good luck!
