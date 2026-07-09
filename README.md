# Real Estate Transaction Management System

## Project Overview

This is a comprehensive Real Estate Transaction Management System built with Next.js 16, React 19, and TypeScript. The system provides a robust backend management interface for managing property listings including new properties, resale properties, and rental properties.

## Features

- **Property Management**: Manage new properties, resale properties, and rental listings
- **Region Filtering**: Infinite-level region tree selection for location-based filtering
- **Responsive Layout**: Modern admin panel with collapsible sidebar and mobile support
- **User Authentication**: Login/logout functionality with token-based authentication
- **API Integration**: Well-structured API layer with mock data support
- **Type Safety**: Full TypeScript support throughout the application

## Project Structure

```
project/
├── app/                    # Next.js App Router (Routing only)
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Dashboard homepage
│   └── globals.css         # Global styles
├── src/                    # Source code (All non-routing code)
│   ├── api/                # API layer
│   │   ├── fetch.ts        # Fetch-based HTTP client
│   │   └── mock.ts         # Mock data for development
│   ├── components/         # Reusable components
│   │   ├── base-dialog/    # Base dialog component
│   │   ├── common-tree/    # Tree component utilities
│   │   └── tree-node/      # Tree node component
│   ├── core/               # Core configuration
│   │   ├── config/         # Application configuration
│   │   └── store/          # State management hooks
│   ├── data/               # Static data (mock data)
│   │   └── regions.ts      # Region tree data
│   ├── layouts/            # Layout components
│   │   ├── header/         # Top navigation bar
│   │   ├── sidebar/        # Side navigation menu
│   │   ├── main-content/   # Main content wrapper
│   │   └── footer/         # Footer component
│   ├── modules/            # Business modules
│   │   └── newhouse/       # Property management module
│   │       ├── mock/       # Module-specific mock data
│   │       ├── models/      # Data models
│   │       ├── store/       # Module state management
│   │       └── utils/       # Module utilities
│   └── utils/              # Global utility functions
│       ├── date-utils.ts   # Date formatting utilities
│       ├── form-utils.ts   # Form handling utilities
│       ├── tree-utils.ts   # Tree data utilities
│       └── validation-utils.ts # Validation utilities
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Installation & Setup

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
# Start development server
npm run dev

# The application will be available at http://localhost:3000
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting & Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (useState, useCallback)
- **HTTP Client**: Native Fetch API
- **Icons**: Lucide React (SVG icons)

## Contact

This is a personal project. For questions or collaboration, please contact:

- Email: wuc939727@gmail.com

## License

This project is for personal use and demonstration purposes.