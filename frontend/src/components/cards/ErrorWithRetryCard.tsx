import React from 'react';

interface ErrorWithRetryCardProps {
  error: string;
  onRetry: () => void;
}

const ErrorWithRetryCard: React.FC<ErrorWithRetryCardProps> = ({ error, onRetry }) => {
  return (
    <div className="w-full min-w-full flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="text-red-600 font-semibold mb-2 text-center">{error}</div>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorWithRetryCard;
