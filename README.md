# Role Management Dashboard

A production-ready role management dashboard built for Siemens Energy's code challenge. This application allows users to view and manage role permissions in an intuitive interface.

## Features

- View all available roles and their assigned permissions
- Expand/collapse role details for a cleaner interface
- Modify permissions for each role with immediate visual feedback
- Toast notifications for success/error states
- Optimistic UI updates with error handling
- Responsive design that works on desktop and mobile devices
- Robust error handling with retry mechanism
- Loading states for improved user experience

## Technologies Used

- **React**: UI library
- **TypeScript**: Static typing for safer code
- **React Query**: Data fetching and state management
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Accessible UI components
- **Hero Icons**: SVG icons

## Project Structure

```
role-dashboard/
├── src/
│   ├── api/              # API and service layer
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # Entry point
│   └── styles/           # Global styles
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/rayenouasli/coding_challenge.git
   cd role-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Build for Production

```bash
npm run build
# or
yarn build
```

## Design Decisions

### State Management with React Query

I chose React Query for state management because it provides:
- Built-in caching and invalidation
- Automatic refetching
- Loading and error states
- Easy mutation handling
- Retry logic for failed requests

This is particularly useful for handling the mock service's random failures.

### Component Architecture

- **RoleDashboard**: Main container component that orchestrates data fetching and state management
- **RoleCard**: Displays individual roles and their permissions, handling local state for editing
- **PermissionCheckbox**: Reusable component for displaying and toggling permissions
- **ToastNotification**: UI component for showing temporary notifications

### Error Handling

The application includes comprehensive error handling:
- Error boundaries for catching and displaying React errors
- Toast notifications for API errors
- Automatic retries for failed requests
- User-friendly error messages

### Accessibility

The UI is built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Sufficient color contrast
- Focus management

## Future Improvements

- Add comprehensive unit and integration tests
- Implement user authentication
- Add role creation and deletion functionality
- Implement permission groups for easier management
- Add search and filtering capabilities
- Add role history/audit log
- Implement data persistence with a real backend