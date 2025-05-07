import { useState, useEffect, useCallback } from 'react';
import { MockRoleService } from '../api/mockRoleService';
import { Role, Permission } from '../api/types';

// Singleton instance
const roleService = new MockRoleService();

export const useRoleService = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const rolesData = await roleService.getRoles();
      const permissionsData = await roleService.getPermissions();

      setRoles(Array.isArray(rolesData) ? rolesData : []);
      setPermissions(Array.isArray(permissionsData) ? permissionsData : []);
      return { roles: rolesData, permissions: permissionsData };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error("Fetch error:", err); // Debug log
      setError(errorMessage);
      return { roles: [], permissions: [] }; // Prevent throwing
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().catch(err => {
      console.error("Failed to fetch initial data:", err);
    });
  }, [fetchData]);

  const updateRolePermissions = useCallback(async (roleId: string, newPermissions: Permission[]) => {
    setIsUpdating(true);
    setError(null);

    try {
      const updatedRole = await roleService.setPermissionsForRole(roleId, newPermissions);

      setRoles(prevRoles =>
        prevRoles.map(role => (role.id === updatedRole.id ? updatedRole : role))
      );

      return updatedRole;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error("Update error:", err); // Debug log
      setError(errorMessage);
      return null; // Prevent throwing
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    roles,
    permissions,
    updateRolePermissions,
    isLoading,
    isUpdating,
    error,
    clearError,
    refetch
  };
};
