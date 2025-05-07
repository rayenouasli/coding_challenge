import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type NotificationType = 'success' | 'error' | 'info';

interface ToastNotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg border-l-4 ${getBackgroundColor()} max-w-md`}>
      <div className="flex justify-between items-center">
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;