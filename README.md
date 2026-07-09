# Real Estate Management System

## Project Overview

This is a modern Real Estate Management System built with **Next.js + Tailwind CSS + TypeScript**. The system provides a comprehensive backend management interface for managing property listings including new properties, resale properties, and rental properties.

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks
- **Icons**: Lucide React

### Features

- 🏠 **Property Management**: CRUD operations for new properties, resale properties, and rentals
- 🏢 **Developer Management**: Manage developer information with edit and delete capabilities
- 🔍 **Region Filtering**: Infinite-level region tree selection for location-based filtering
- 📱 **Responsive Layout**: Modern admin panel with mobile support
- 🔐 **User Authentication**: Login/logout functionality

### Screenshot

![Real Estate Management System](https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20real%20estate%20management%20dashboard%20admin%20panel%20with%20developer%20list%20table%20and%20navigation%20sidebar%20professional%20UI%20design&image_size=landscape_16_9)

## Project Structure

```
next.js-panel/
├── app/                    # Next.js App Router (Routing)
│   ├── developers/         # Developer related pages
│   ├── newhouses/          # New property pages
│   ├── rentals/            # Rental property pages
│   ├── resale/             # Resale property pages
│   ├── login/              # Login page
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Dashboard homepage
│   └── globals.css         # Global styles
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── table-skeleton/ # Table skeleton loader
│   │   ├── pagination/     # Pagination component
│   │   └── ...
│   ├── layouts/            # Layout components
│   │   ├── header/         # Top navigation bar
│   │   ├── sidebar/        # Side navigation menu
│   │   └── main-content/   # Main content wrapper
│   ├── modules/            # Business modules
│   │   └── newhouse/       # Property management module
│   │       ├── developer/  # Developer management
│   │       ├── mock/       # Mock data
│   │       ├── models/     # Data models
│   │       └── store/      # State management
│   └── ui/                 # UI component library
│       ├── button/         # Button component
│       ├── input/          # Input component
│       ├── card/           # Card component
│       └── ...
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

This project is for personal learning and demonstration purposes only.