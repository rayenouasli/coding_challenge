import React, { useState, useEffect } from 'react';
import { Role, Permission } from '../api/types';
import PermissionCheckbox from './PermissionCheckbox';
import LoadingSpinner from './LoadingSpinner';

interface RoleCardProps {
  role: Role;
  allPermissions: Permission[];
  onUpdatePermissions: (roleId: string, permissions: Permission[]) => void;
  isUpdating: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  allPermissions,
  onUpdatePermissions,
  isUpdating,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Initialize selected permissions when role changes
  useEffect(() => {
    setSelectedPermissions(role.permissions);
    setIsDirty(false);
  }, [role]);

  const handleTogglePermission = (permission: Permission) => {
    const isSelected = selectedPermissions.some(p => p.id === permission.id);

    const updatedPermissions = isSelected
      ? selectedPermissions.filter(p => p.id !== permission.id)
      : [...selectedPermissions, permission];

    setSelectedPermissions(updatedPermissions);
    setIsDirty(true);
  };

  const handleSave = () => {
    onUpdatePermissions(role.id, selectedPermissions);
  };

  const handleCancel = () => {
    setSelectedPermissions(role.permissions);
    setIsDirty(false);
  };

  const isPermissionSelected = (permissionId: string) => {
    return selectedPermissions.some(p => p.id === permissionId);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 border border-gray-200">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
          <span className="ml-2 text-sm text-gray-500">
            ({role.permissions.length} permissions)
          </span>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-500 focus:outline-none"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg
              className={`h-5 w-5 transform ${isExpanded ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-700 mb-3">Permissions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPermissions.map((permission) => (
              <PermissionCheckbox
                key={permission.id}
                permission={permission}
                isChecked={isPermissionSelected(permission.id)}
                onToggle={handleTogglePermission}
                disabled={isUpdating}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={handleCancel}
              disabled={!isDirty || isUpdating}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              onClick={handleSave}
              disabled={!isDirty || isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Saving...</span>
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleCard;