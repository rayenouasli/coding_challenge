import { Role, Permission, RoleService } from './types';

const demoRoles: Role[] = [
  {
    id: "9faaf9ba-464e-4c68-a901-630fc4de123b",
    name: "User",
    permissions: [],
  },
  {
    id: "346a3cce-49d4-4e3c-bade-a16ed44b98bb",
    name: "Administrator",
    permissions: [],
  },
  {
    id: "6f25f789-72f3-41e2-9561-b30ca19aa225",
    name: "Auditor",
    permissions: [],
  },
];

const demoPermissions: Permission[] = [
  {
    id: "706ee8e3-6034-4f27-ab20-4397ad874a09",
    name: "Read Data",
  },
  {
    id: "72e1c7be-4c2f-4ed1-bc7b-41519b35e429",
    name: "Write Data",
  },
  {
    id: "3add53a6-ede2-4760-8942-dbd08d209d2c",
    name: "Delete Data",
  },
];

const randomTimeout = (): number => {
  const max = 1000;
  const min = 200;
  return Math.random() * (max - min) + min;
};

// Function that simulates a random rejection with error handling
const delayedRandomlyRejectingPromise = <T>(
  handler: () => T,
  simulateError = true
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      // Randomly reject the promise
      if (simulateError && Math.random() > 0.75) {
        return reject(new Error("random error"));
      }
      try {
        // Call the handler function if no error
        resolve(handler());
      } catch (error) {
        // Catch synchronous errors in handler
        reject(error);
      }
    }, randomTimeout());
  });
};

export class MockRoleService implements RoleService {
  private readonly roleState: Role[] = [...demoRoles];
  private readonly permissionState: Permission[] = [...demoPermissions];

  // Returns a promise with the roles
  getRoles(): Promise<Role[]> {
    return delayedRandomlyRejectingPromise(() => [...this.roleState], false)
      .catch((error) => {
        console.error("Error fetching roles:", error.message);
        throw error; // Re-throw error after logging
      });
  }

  // Returns a promise with the permissions
  getPermissions(): Promise<Permission[]> {
    return delayedRandomlyRejectingPromise(() => [...this.permissionState], false)
      .catch((error) => {
        console.error("Error fetching permissions:", error.message);
        throw error; // Re-throw error after logging
      });
  }

  // Sets permissions for a specific role
  setPermissionsForRole(
    roleId: string,
    permissions: Permission[]
  ): Promise<Role> {
    return delayedRandomlyRejectingPromise(() => {
      const toUpdateRoleIndex = this.roleState.findIndex((r) => r.id === roleId);
      if (toUpdateRoleIndex < 0) {
        throw new Error("Role not found");
      }

      // Validate permissions
      const permissionIdsAreValid = permissions.every(
        (permission) => this.permissionState.findIndex((p) => p.id === permission.id) > -1
      );
      if (!permissionIdsAreValid) {
        throw new Error("Invalid permissions");
      }

      // Update the role with new permissions
      this.roleState[toUpdateRoleIndex] = {
        ...this.roleState[toUpdateRoleIndex],
        permissions,
      };
      return this.roleState[toUpdateRoleIndex];
    }).catch((error) => {
      console.error("Error setting permissions for role:", error.message);
      throw error; // Re-throw error after logging
    });
  }
}
