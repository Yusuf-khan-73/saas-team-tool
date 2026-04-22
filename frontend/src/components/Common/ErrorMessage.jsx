import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <FaExclamationTriangle className="text-red-500 h-5 w-5 mr-2" />
        <p className="text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;