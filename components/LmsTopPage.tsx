
import React from 'react';
import ScreenContainer from './ScreenContainer';

interface LmsTopPageProps {
  onNavigate: () => void;
}

const MainMenuButton: React.FC<{ label: string; onClick: () => void; disabled?: boolean }> = ({ label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full md:w-1/3 text-2xl font-bold py-12 px-8 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
  >
    {label}
  </button>
);

const LmsTopPage: React.FC<LmsTopPageProps> = ({ onNavigate }) => {
  return (
    <ScreenContainer title="LMS トップページ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
        <MainMenuButton label="計画" onClick={() => {}} disabled />
        <MainMenuButton label="実行" onClick={onNavigate} />
        <MainMenuButton label="管理" onClick={() => {}} disabled />
      </div>
      <p className="text-center text-gray-500 mt-12">メニューを選択してください。</p>
    </ScreenContainer>
  );
};

export default LmsTopPage;
