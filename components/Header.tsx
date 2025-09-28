
import React from 'react';
import PlaneIcon from './icons/PlaneIcon';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <PlaneIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              飛行訓練評価システム
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">ようこそ、</span>
            <span className="font-semibold text-gray-800 ml-1">{userName} 様</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
