import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import RoleDashboard from './pages/RoleDashboard';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <div className="container mx-auto px-4 py-4">
                <h1 className="text-xl font-semibold text-gray-800">Siemens Energy Role Management</h1>
              </div>
            </header>
            <main>
              <RoleDashboard />
            </main>
            <footer className="bg-white shadow-inner mt-auto">
              <div className="container mx-auto px-4 py-4">
                <p className="text-center text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Role Management Dashboard
                </p>
              </div>
            </footer>
          </div>
        </ErrorBoundary>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;