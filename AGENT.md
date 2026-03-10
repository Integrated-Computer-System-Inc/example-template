# AGENT.md — AI Coding Agent Instructions

This file provides context for AI coding agents working on this project.

## Project Overview

- **Type**: Next.js 16 boilerplate template (App Router, TypeScript)
- **UI Library**: Ant Design v6 + Tailwind CSS v4
- **State Management**: TanStack React Query v5
- **Purpose**: Starting point for new internal applications

## Key Conventions

### Theming — Always Use CSS Variables

Never use hardcoded Tailwind colors like `text-gray-500` or `bg-white`.
Always use theme-aware tokens from `globals.css`:

| Use this | Not this | For |
|---|---|---|
| `text-text` | `text-gray-900` | Primary text (headings, labels) |
| `text-text-info` | `text-gray-500` | Secondary/muted text |
| `bg-background` | `bg-white` | Page & card backgrounds |
| `border-border` | `border-gray-200` | All borders |
| `bg-neutral` | `bg-gray-50` | Hover backgrounds |
| `hover:bg-neutral` | `hover:bg-gray-100` | Hover states |

### File Organization

- **Module pages** go in `app/<module-name>/` with their own `layout.tsx` and `page.tsx`
- **Module-specific components** go in `app/<module-name>/components/`
- **Shared components** go in `components/<ComponentGroup>/`
- **Hooks** go in `hooks/<module-name>/` (e.g. `hooks/items/useItems.ts`)
- **Interfaces** go in `interface/<name>.ts`

### Adding New Modules

Use the CLI script — it scaffolds files and updates the sidebar automatically:

```bash
npm run add-module "Module Name"
```

This creates `app/<module-name>/layout.tsx`, `app/<module-name>/page.tsx`, and adds a sidebar entry.

To remove:

```bash
npm run remove-module "Module Name"
```

### Sidebar

The sidebar (`components/Sidebar.tsx`) uses a `// MODULE_INSERTION_MARKER` comment. The `add-module` script inserts new entries above this marker. Do not remove it.

### Hooks Pattern

Hooks follow the pattern in `hooks/items/useItems.ts`:

- Each hook file has **two versions** of each function:
  1. A commented-out **REAL API version** (using `api.get/post/put/delete`)
  2. An active **MOCK version** (using `console.log` + static data)
- When connecting to a real backend, uncomment the real version and remove the mock
- Always use `queryClient.invalidateQueries` on mutation success

### CRUD Pattern

The CRUD module (`app/crud/`) is the reference implementation:

- `ItemTable.tsx` — Table with search, filter, pagination, action dropdown (view/edit/delete)
- `EditItemDialog.tsx` — Modal with Form for add/edit
- `ViewItemDialog.tsx` — Modal with Descriptions for viewing details
- `ItemFilterPopover.tsx` — Popover with Select filters
- `StatusChip.tsx` — Reusable active/inactive tag
- Delete uses `Modal.confirm` for confirmation

### Modal Usage

- Do **NOT** use `forceRender` on Ant Design `Modal` — it causes SSR hydration mismatches in Next.js
- Use `destroyOnHidden` instead for cleanup
- Always use `centered` and responsive `width` breakpoints

### Component Styling

- Use `'use client'` directive on all interactive components
- Buttons: `rounded-lg h-10` with `border-border` for consistency
- Cards/Tables: `bg-background rounded-2xl border border-border shadow-xl`
- Icons: Use `lucide-react`, size 16-18 for inline, 20-24 for standalone

## Folder Structure

```
example-template/
├── app/                            # Next.js App Router
│   ├── globals.css                 # Global CSS & theme variables (light/dark)
│   ├── layout.tsx                  # Root layout (QueryProvider, ThemeProvider)
│   ├── page.tsx                    # Landing/redirect page
│   ├── login/                      # Login module
│   ├── dashboard/                  # Dashboard module
│   ├── crud/                       # CRUD example module (reference implementation)
│   │   ├── layout.tsx              # Module layout (Sidebar + content area)
│   │   ├── page.tsx                # Module page entry
│   │   └── components/
│   │       └── ItemTable.tsx       # Table with search, filter, CRUD actions
│   └── user-management/            # User management module
├── components/                     # Shared/reusable components
│   ├── Sidebar.tsx                 # Main sidebar (contains MODULE_INSERTION_MARKER)
│   ├── Avatar/
│   │   └── UserAvatar.tsx          # User avatar component
│   ├── Crud/                       # CRUD-related dialogs & filters
│   │   ├── EditItemDialog.tsx      # Add/Edit modal (Form)
│   │   ├── ViewItemDialog.tsx      # View details modal (Descriptions)
│   │   └── ItemFilterPopover.tsx   # Filter popover (category, status)
│   ├── Providers/                  # Context providers
│   │   ├── query-provider.tsx      # TanStack React Query provider
│   │   └── theme-provider.tsx      # Light/dark theme provider
│   ├── Settings/
│   │   └── SettingsModal.tsx       # Settings modal
│   └── Table/
│       └── StatusChip.tsx          # Reusable Active/Inactive tag
├── hooks/                          # Custom React hooks
│   ├── items/
│   │   └── useItems.ts            # CRUD hooks (mock + real API versions)
│   ├── login/
│   │   └── useAuth.ts             # Auth hooks
│   └── sidebar/
│       └── useSidebarExpansion.ts  # Sidebar menu expand/collapse hook
├── interface/                      # TypeScript interfaces
│   ├── item.ts                     # Item type definition
│   └── sidebar.ts                  # MenuItem, MenuGroup types
├── lib/                            # Utilities
│   └── api.ts                      # Axios instance (base URL from env)
├── scripts/                        # CLI helper scripts
│   ├── add-module.js               # Scaffold new module + sidebar entry
│   └── remove-module.js            # Remove module + sidebar entry
├── public/                         # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── AGENT.md                        # This file (AI agent instructions)
└── README.md                       # Project documentation
```
