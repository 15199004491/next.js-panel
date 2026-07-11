# Real Estate Management System

## Project Overview

This is a modern Real Estate Management System built with **Next.js + Tailwind CSS + TypeScript + ShadCN**. The system provides a comprehensive backend management interface for managing property listings including new properties, resale properties, and rental properties.

### Live Demo

- **Production**: https://next-js-panel-tszd.vercel.app/

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Component Library**: shadcn/ui
- **State Management**: React Hooks
- **Icons**: Lucide React

### Features

- 🏠 **Property Management**: CRUD operations for new properties, resale properties, and rentals
- 🏢 **Developer Management**: Manage developer information with edit and delete capabilities
- 🔍 **Region Filtering**: Infinite-level region tree selection for location-based filtering
- 📱 **Responsive Layout**: Modern admin panel with mobile support
- 🔐 **User Authentication**: Login/logout functionality



### Screenshot

![alt text](image-1.png)

## Project Structure

```
next.js-panel/
├── app/                    # Next.js App Router (Routing)
│   ├── developers/         # Developer related pages
│   │   ├── [id]/           # Developer detail/edit
│   │   │   ├── edit/       # Edit page
│   │   │   └── page.tsx    # Detail page
│   │   └── page.tsx        # List page
│   ├── newhouses/          # New property pages
│   │   ├── [id]/edit/      # Edit page
│   │   └── page.tsx        # List page
│   ├── rentals/            # Rental property pages
│   │   └── page.tsx        # List page
│   ├── resale/             # Resale property pages
│   │   ├── [id]/edit/      # Edit page
│   │   └── page.tsx        # List page
│   ├── login/              # Login page
│   │   └── page.tsx
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Dashboard homepage
│   └── globals.css         # Global styles
├── src/                    # Source code
│   ├── api/                # API utilities
│   │   └── fetch.ts        # HTTP client wrapper
│   ├── components/         # Reusable components
│   │   ├── base-dialog/    # Base dialog wrapper
│   │   ├── common-tree/    # Tree component
│   │   ├── pagination/     # Pagination component
│   │   ├── region-selector/# Region selector component
│   │   ├── table-skeleton/ # Table skeleton loader
│   │   ├── tree-node/      # Tree node component
│   │   ├── back-button.tsx # Back button component
│   │   ├── confirm-dialog.tsx
│   │   ├── form-skeleton.tsx
│   │   └── toast.tsx       # Toast notification component
│   ├── config/             # Configuration files
│   │   └── routeConfig.ts  # Route configuration
│   ├── core/               # Core utilities
│   │   ├── config/         # Core configuration
│   │   └── store/          # State management (AppContext)
│   ├── data/               # Data files
│   │   └── regions.ts      # Region tree data
│   ├── layouts/            # Layout components
│   │   ├── footer/         # Footer component
│   │   ├── header/         # Top navigation bar
│   │   ├── sidebar/        # Side navigation menu
│   │   └── main-content/   # Main content wrapper
│   ├── lib/                # Shared libraries
│   │   ├── format.ts       # Format utilities
│   │   └── utils.ts        # Utility functions
│   ├── modules/            # Business modules
│   │   ├── newhouse/       # New property module
│   │   │   ├── api/        # API interfaces
│   │   │   ├── components/ # Shared components
│   │   │   ├── hooks/      # Custom hooks
│   │   │   ├── mock/       # Mock data
│   │   │   ├── models/     # Data models
│   │   │   ├── pages/      # Page components
│   │   │   └── utils/      # Module utilities
│   │   └── resale/         # Resale property module
│   │       ├── api/        # API interfaces
│   │       ├── components/ # Shared components
│   │       ├── hooks/      # Custom hooks
│   │       ├── mock/       # Mock data
│   │       ├── models/     # Data models
│   │       └── pages/      # Page components
│   ├── ui/                 # UI component library (shadcn)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── skeleton.tsx
│   │   └── table.tsx
│   ├── utils/              # Utility functions
│   │   ├── date-utils.ts
│   │   ├── form-utils.ts
│   │   ├── tree-utils.ts
│   │   └── validation-utils.ts
│   └── providers.tsx       # App providers wrapper
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Environment & Setup

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.6.7

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd next.js-panel

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

After starting the development server, visit http://localhost:3000 to view the application.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Contact

For questions or collaboration, please contact:

- 📧 Email: wuc939727@gmail.com

## License

This project is built from scratch by myself for personal learning and demonstration purposes.