# The Wild Oasis

The Wild Oasis is a modern web application built using React and Vite. This project serves as a practice platform to explore and implement various features and functionalities of a full-stack application.

## Features

- **Authentication**: User login, signup, and password management.
- **Bookings Management**: View, create, update, and delete bookings.
- **Cabins Management**: Manage cabin details with CRUD operations.
- **Dashboard**: Overview of key metrics and data visualizations.
- **Settings**: User and application settings management.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, React Router, Styled Components
- **State Management**: React Query
- **Backend Services**: Supabase
- **Build Tool**: Vite
- **Utilities**: Date-fns, React Hook Form, React Icons, Recharts

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd the-wild-oasis
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

- **public/**: Static assets like images and configuration files.
- **src/**: Main source code directory.
  - **context/**: Context providers for global state management.
  - **data/**: Mock data and assets.
  - **features/**: Feature-specific components and hooks.
  - **hooks/**: Reusable custom hooks.
  - **pages/**: Page components for routing.
  - **services/**: API service files for backend communication.
  - **styles/**: Global and component-specific styles.
  - **ui/**: Reusable UI components.
  - **utils/**: Utility functions and constants.

## Configuration

- **Vite**: Configuration is located in `vite.config.js`.
- **ESLint**: Linting rules are defined in `eslint.config.js`.
- **Netlify**: Deployment configuration is in `netlify.toml`.

## Deployment

This project is configured for deployment on Netlify. Ensure the `netlify.toml` file is correctly set up for your deployment needs.

## License

This project is for practice purposes and does not have a specific license.
