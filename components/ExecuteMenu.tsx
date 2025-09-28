
import React from 'react';
import ScreenContainer from './ScreenContainer';

interface ExecuteMenuProps {
  onNavigate: () => void;
}

const SubMenuCard: React.FC<{ title: string; description: string; onClick: () => void; disabled?: boolean }> = ({ title, description, onClick, disabled }) => (
  <div
    onClick={!disabled ? onClick : undefined}
    className={`p-6 rounded-lg shadow-md border transition-all ${
      disabled 
      ? 'bg-gray-100 cursor-not-allowed' 
      : 'bg-white hover:shadow-xl hover:border-blue-500 cursor-pointer transform hover:-translate-y-1'
    }`}
  >
    <h3 className={`text-xl font-bold ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>{title}</h3>
    <p className="text-gray-500 mt-2">{description}</p>
  </div>
);


const ExecuteMenu: React.FC<ExecuteMenuProps> = ({ onNavigate }) => {
  return (
    <ScreenContainer title="実行メニュー">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <SubMenuCard title="学科" description="学科訓練の計画と評価" onClick={() => {}} disabled />
        <SubMenuCard title="飛行" description="飛行訓練の評価入力" onClick={onNavigate} />
        <SubMenuCard title="その他" description="その他の訓練項目" onClick={() => {}} disabled />
      </div>
    </ScreenContainer>
  );
};

export default ExecuteMenu;
