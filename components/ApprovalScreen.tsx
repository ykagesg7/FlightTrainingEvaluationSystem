
import React, { useState, useEffect } from 'react';
import { EvaluationData, EvaluationDraft } from '../types';
import { generateEvaluationDraft } from '../services/geminiService';
import ScreenContainer from './ScreenContainer';

interface ApprovalScreenProps {
  evaluationData: EvaluationData;
  onApprove: () => void;
  onEdit: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-700">AIが評価票のたたき台を生成中です...</p>
        <p className="text-gray-500">通常1〜2秒で完了します。</p>
    </div>
);

const ApprovalScreen: React.FC<ApprovalScreenProps> = ({ evaluationData, onApprove, onEdit }) => {
  const [draft, setDraft] = useState<EvaluationDraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    const createDraft = async () => {
      setIsLoading(true);
      const generatedDraft = await generateEvaluationDraft(evaluationData);
      setDraft(generatedDraft);
      setEditedComment(generatedDraft.overallComment);
      setIsLoading(false);
    };
    createDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluationData]);

  if (isLoading) {
    return (
      <ScreenContainer title="日常評価票（AI生成案）">
        <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
        </div>
      </ScreenContainer>
    );
  }

  if (!draft) {
    return (
      <ScreenContainer title="エラー">
        <p>評価票の生成に失敗しました。入力画面に戻ってやり直してください。</p>
        <button onClick={onEdit} className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md">入力に戻る</button>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer title="日常評価票（AI生成案）">
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <h3 className="text-lg font-bold text-blue-800">AIによる計算点数： {draft.score}点</h3>
        </div>
        <div>
          <label htmlFor="ai-comment" className="block text-md font-semibold text-gray-700">
            特記事項（総合所見） - AI生成案
          </label>
          <p className="text-sm text-gray-500 mb-2">以下の内容は自由に編集できます。</p>
          <textarea
            id="ai-comment"
            rows={12}
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
          />
        </div>
      </div>
      <div className="mt-8 pt-6 border-t flex justify-between items-center">
        <button
          type="button"
          onClick={onEdit}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          内容を修正する
        </button>
        <button
          type="button"
          onClick={onApprove}
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          承認してデータベースに登録する
        </button>
      </div>
    </ScreenContainer>
  );
};

export default ApprovalScreen;
