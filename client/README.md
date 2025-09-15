# StageCraft Frontend

React-based frontend application for the StageCraft Event Ticketing & Seat Reservation System.

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **D3.js** - Interactive seat map visualizations
- **Axios** - HTTP client for API calls
- **Jest** - Testing framework

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route-level components
├── hooks/         # Custom React hooks
├── store/         # Redux store and slices
├── services/      # API service functions
├── utils/         # Utility functions
├── assets/        # Static assets (images, icons)
├── App.jsx        # Main app component
└── main.jsx       # Application entry point
```

## Key Features Implementation

### Interactive Seat Maps
- D3.js powered seat visualizations
- Real-time seat availability updates
- Touch and mouse interaction support

### State Management
- Redux Toolkit for global state
- Separate slices for events, seats, user data
- Optimistic updates for better UX

### Responsive Design
- Mobile-first approach with TailwindCSS
- Touch-friendly seat selection
- Accessible UI components

## Development Guidelines

- Use functional components with hooks
- Follow component composition patterns
- Implement proper error boundaries
- Write unit tests for components
- Use semantic HTML and ARIA labels
