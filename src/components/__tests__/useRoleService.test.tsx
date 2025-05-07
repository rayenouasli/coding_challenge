import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useRoleService } from '../../hooks/useRoleService';
import { MockRoleService } from '../../api/mockRoleService';

// Mock the MockRoleService
jest.mock('../../api/mockRoleService');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useRoleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it('should return initial state correctly', async () => {
    // Setup mock return values
    const mockGetRoles = jest.fn().mockResolvedValue([
      { id: '1', name: 'Admin', permissions: [] }
    ]);
    const mockGetPermissions = jest.fn().mockResolvedValue([
      { id: '1', name: 'Read' }
    ]);
    
    // @ts-ignore - we're mocking the implementation
    MockRoleService.mockImplementation(() => {
      return {
        getRoles: mockGetRoles,
        getPermissions: mockGetPermissions,
        setPermissionsForRole: jest.fn(),
      };
    });

    const { result, waitFor } = renderHook(() => useRoleService(), { wrapper });

    // Initial state
    expect(result.current.roles).toEqual([]);
    expect(result.current.permissions).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    // Wait for queries to resolve
    await waitFor(() => !result.current.isLoading);

    // After loading
    expect(result.current.roles).toEqual([{ id: '1', name: 'Admin', permissions: [] }]);
    expect(result.current.permissions).toEqual([{ id: '1', name: 'Read' }]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should update role permissions correctly', async () => {
    const mockUpdatedRole = { id: '1', name: 'Admin', permissions: [{ id: '1', name: 'Read' }] };
    const mockSetPermissions = jest.fn().mockResolvedValue(mockUpdatedRole);
    
    // @ts-ignore - we're mocking the implementation
    MockRoleService.mockImplementation(() => {
      return {
        getRoles: jest.fn().mockResolvedValue([
          { id: '1', name: 'Admin', permissions: [] }
        ]),
        getPermissions: jest.fn().mockResolvedValue([
          { id: '1', name: 'Read' }
        ]),
        setPermissionsForRole: mockSetPermissions,
      };
    });

    const { result, waitFor } = renderHook(() => useRoleService(), { wrapper });

    // Wait for initial load
    await waitFor(() => !result.current.isLoading);

    // Update permissions
    await act(async () => {
      result.current.updateRolePermissions('1', [{ id: '1', name: 'Read' }]);
    });

    // Check if the service was called correctly
    expect(mockSetPermissions).toHaveBeenCalledWith('1', [{ id: '1', name: 'Read' }]);
    
    // Check if the state was updated
    await waitFor(() => {
      expect(result.current.roles[0]).toEqual(mockUpdatedRole);
    });
  });
});