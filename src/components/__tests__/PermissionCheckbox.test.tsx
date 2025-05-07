import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PermissionCheckbox from '../PermissionCheckbox';

describe('PermissionCheckbox', () => {
  const mockPermission = {
    id: 'test-id',
    name: 'Test Permission',
  };

  const mockToggle = jest.fn();

  it('renders permission name correctly', () => {
    render(
      <PermissionCheckbox
        permission={mockPermission}
        isChecked={false}
        onToggle={mockToggle}
      />
    );

    expect(screen.getByText('Test Permission')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <PermissionCheckbox
        permission={mockPermission}
        isChecked={false}
        onToggle={mockToggle}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggle).toHaveBeenCalledWith(mockPermission);
  });

  it('displays as checked when isChecked is true', () => {
    render(
      <PermissionCheckbox
        permission={mockPermission}
        isChecked={true}
        onToggle={mockToggle}
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('disables the checkbox when disabled prop is true', () => {
    render(
      <PermissionCheckbox
        permission={mockPermission}
        isChecked={false}
        onToggle={mockToggle}
        disabled={true}
      />
    );

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});