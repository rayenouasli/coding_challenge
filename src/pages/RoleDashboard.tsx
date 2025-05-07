import React, { useEffect } from 'react';
import { useRoleService } from '../hooks/useRoleService';
import { useNotification } from '../context/NotificationContext';
import RoleCard from '../components/RoleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Permission } from '../api/types';

const RoleDashboard: React.FC = () => {
  const {
    roles,
    permissions,
    updateRolePermissions,
    isLoading,
    isUpdating,
    error,
    clearError,
    refetch
  } = useRoleService();

  const { showNotification } = useNotification();

  useEffect(() => {
    if (error) {
      showNotification(error, 'error');
      clearError();
    }
  }, [error, showNotification, clearError]);

  const handleUpdatePermissions = (roleId: string, newPermissions: Permission[]) => {
    updateRolePermissions(roleId, newPermissions);
    showNotification('Permissions updated successfully', 'success');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Role Management Dashboard</h1>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Roles</h2>
        <p className="text-gray-600 mb-6">
          View and manage permissions for each role. Click on a role to expand and edit its permissions.
        </p>

        {roles.length === 0 ? (
          <div className="text-center p-8 text-gray-500">No roles available</div>
        ) : (
          <div className="space-y-4">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                allPermissions={permissions}
                onUpdatePermissions={handleUpdatePermissions}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleDashboard;
