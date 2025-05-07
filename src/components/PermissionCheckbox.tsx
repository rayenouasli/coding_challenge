import React from 'react';
import { Permission } from '../api/types';

interface PermissionCheckboxProps {
  permission: Permission;
  isChecked: boolean;
  onToggle: (permission: Permission) => void;
  disabled?: boolean;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({
  permission,
  isChecked,
  onToggle,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        id={`permission-${permission.id}`}
        checked={isChecked}
        onChange={() => onToggle(permission)}
        disabled={disabled}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
      />
      <label
        htmlFor={`permission-${permission.id}`}
        className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'} cursor-pointer`}
      >
        {permission.name}
      </label>
    </div>
  );
};

export default PermissionCheckbox;