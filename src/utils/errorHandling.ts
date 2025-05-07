/**
 * Formats an error message from different error types
 */
export const formatErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return 'An unexpected error occurred';
  };
  
  /**
   * Converts an error into a more user-friendly message
   */
  export const getUserFriendlyErrorMessage = (error: unknown): string => {
    const message = formatErrorMessage(error);
    
    // Handle specific error cases
    if (message.includes('role not found')) {
      return 'The selected role could not be found. Please refresh and try again.';
    }
    
    if (message.includes('invalid permissions')) {
      return 'One or more selected permissions are invalid. Please try again.';
    }
    
    if (message.includes('random error')) {
      return 'The operation failed due to a temporary error. Please try again.';
    }
    
    // Default message
    return 'An error occurred. Please try again or contact support.';
  };