# Instagram Stories Feature

A simplified version of Instagram Stories built with React and TypeScript. This application allows users to view a series of stories with automatic progression and manual navigation.

## Features

- Mobile-optimized design
- Horizontally scrollable story list
- Automatic story progression (5 seconds)
- Manual navigation (tap left/right)
- Smooth transitions
- End-to-end testing

## Tech Stack

- React.js with TypeScript
- Vite for build tooling
- Cypress for E2E testing
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd instagram-stories
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Run tests
```bash
# Run unit tests
npm test

# Run E2E tests
npm run cypress
```

## Design Choices

### Performance Optimization
- Lazy loading of images
- CSS transitions for smooth animations
- Efficient state management using React hooks
- Preloading of next story for seamless transitions

### Scalability
- Modular component architecture
- TypeScript for type safety and maintainability
- Reusable components and utilities
- Clear separation of concerns

## Deployment

The application is deployed at: [Deployment URL]

## Project Structure

```
src/
  ├── components/        # Reusable UI components
  ├── hooks/            # Custom React hooks
  ├── types/            # TypeScript type definitions
  ├── data/            # Story data and mock APIs
  ├── styles/          # Global styles and CSS modules
  ├── utils/           # Utility functions
  └── tests/           # Test files
```
