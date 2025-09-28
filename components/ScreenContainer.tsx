
import React from 'react';

interface ScreenContainerProps {
  title: string;
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
};

export default ScreenContainer;
