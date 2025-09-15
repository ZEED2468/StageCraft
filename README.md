# StageCraft - Event Ticketing & Seat Reservation System

<div align="center">

*Crafting seamless ticketing experiences that work flawlessly under pressure*

</div>

## Overview

StageCraft is a robust, digital-first ticketing and seat reservation platform designed to handle high-demand events like concerts, sports, and theatre performances. Built to thrive under the spotlight of thousands of concurrent users, pay securely, and receive instant QR code tickets without the chaos of traditional ticketing systems.

### Mission

When thousands of fans hit refresh at the same time for that sold-out concert, most systems break. StageCraft is built differently - designed to deliver:

- **For Fans**: Pick seats on live maps, secure payments, instant QR tickets
- **For Organizers**: Real-time sales dashboards, fraud detection, revenue optimization  
- **For Admins**: High-uptime operations, comprehensive analytics, scalable infrastructure

## Key Features

### Core Features (Must-Have)
- **Interactive Seat Map Selection** - Real-time seat availability with visual venue layouts
- **Secure Payment Integration** - Multiple payment gateways with fraud protection
- **QR Code Ticket Generation** - Instant, scannable tickets with validation
- **Live Sales Dashboards** - Real-time analytics and performance tracking
- **Fraud Detection Engine** - Advanced security to prevent duplicate/fake tickets

### Stretch Features (Nice-to-Have)
- **Dynamic Pricing** - AI-driven pricing based on demand patterns
- **Ticket Resale Marketplace** - Secure peer-to-peer ticket transfers
- **VIP Packages** - Premium experiences with enhanced features

## Architecture

### Frontend (`/client`)
- **React.js** with Vite for fast development
- **TailwindCSS** + **shadcn/ui** for modern, responsive UI
- **D3.js** for interactive seat map visualizations
- **Redux Toolkit** for state management
- **Jest** for comprehensive testing

### Backend (`/server`)
- **NestJS** (Node.js + TypeScript) for scalable APIs
- **PostgreSQL** for reliable data persistence
- **Redis** for seat locking and caching
- **JWT** authentication with role-based access
- **REST APIs** with comprehensive documentation

### DevOps & Infrastructure (Coming Soon)
- **AWS** cloud infrastructure with auto-scaling
- **Docker** containerization for consistent deployments
- **GitHub Actions** CI/CD pipelines
- **Prometheus & Grafana** for monitoring
- **Sentry** for error tracking and performance monitoring

## Success Metrics

- **95%+ uptime** during ticket launches
- **99% successful** QR ticket validation
- **<2 minutes** average checkout completion
- **>80% reduction** in fraudulent ticket attempts
- **<1 second** QR code validation at gates

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZEED2468/StageCraft.git
   cd StageCraft
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```


### Development Workflow

The project follows a structured development approach:

```
StageCraft/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Redux store and slices
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
└── README.md
```

## Contributing

We welcome contributions from the community! Please follow these guidelines:

### Branching Strategy

We use **Git Flow** for our branching strategy:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features
- **`feature/*`** - Feature development branches
- **`hotfix/*`** - Critical bug fixes
- **`release/*`** - Release preparation branches

### Creating a Feature Branch

1. **Start from develop branch**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   **Commit Message Convention:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating a Pull Request

1. **Navigate to the repository** on GitHub
2. **Click "New Pull Request"**
3. **Select your branch** as the source and `develop` as the target
4. **Fill out the PR template:**
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Link to any related issues
   - Screenshots for UI changes
   - Testing instructions

5. **Request review** from team members
6. **Address feedback** and update your branch as needed

### Pull Request Guidelines

- **Keep PRs focused** - One feature or fix per PR
- **Write clear descriptions** - Explain what and why, not just what
- **Include tests** - All new code should have appropriate tests
- **Update documentation** - Keep README and code comments current
- **Follow code style** - Use existing patterns and conventions
- **Test thoroughly** - Ensure your changes don't break existing functionality

### Code Review Process

1. **Automated checks** must pass (linting, tests, build)
2. **At least one approval** required from a team member
3. **Address all feedback** before merging
4. **Squash and merge** to keep history clean

### Development Guidelines

#### Frontend (React)
- Use functional components with hooks
- Follow component composition patterns
- Implement proper error boundaries
- Use TypeScript for type safety (when we migrate)
- Write unit tests for components and utilities


#### General
- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused
- Handle errors gracefully
- Log important events and errors

### Development
- Frontend: Vite dev server on `http://localhost:5173`

