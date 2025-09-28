
import React, { useState } from 'react';
import { Flight, EvaluationItem, EvaluationData } from '../types';
import { EVALUATION_ITEM_NAMES } from '../constants';
import ScreenContainer from './ScreenContainer';

interface EvaluationFormProps {
  flight: Flight;
  onSubmit: (data: EvaluationData) => void;
  onBack: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ flight, onSubmit, onBack }) => {
  const [evaluationItems, setEvaluationItems] = useState<EvaluationItem[]>(
    EVALUATION_ITEM_NAMES.map((name, index) => ({
      id: index,
      name,
      score: null,
      reason: '',
    }))
  );
  const [overallComment, setOverallComment] = useState('');

  const handleScoreChange = (id: number, score: number) => {
    setEvaluationItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, score } : item))
    );
  };

  const handleReasonChange = (id: number, reason: string) => {
    setEvaluationItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, reason } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ flight, items: evaluationItems, overallComment });
  };

  const isFormValid = evaluationItems.every(item => item.score !== null);

  return (
    <ScreenContainer title={`${flight.student.name} 様 - ${flight.subjectName} 飛行評価`}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {evaluationItems.map(item => (
            <div key={item.id} className="p-4 border rounded-md bg-gray-50">
              <label className="block text-md font-semibold text-gray-700">{item.name}</label>
              <div className="flex items-center space-x-4 mt-3">
                {[1, 2, 3, 4, 5].map(scoreValue => (
                  <div key={scoreValue} className="flex items-center">
                    <input
                      type="radio"
                      id={`score-${item.id}-${scoreValue}`}
                      name={`score-${item.id}`}
                      value={scoreValue}
                      checked={item.score === scoreValue}
                      onChange={() => handleScoreChange(item.id, scoreValue)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor={`score-${item.id}-${scoreValue}`} className="ml-2 text-gray-700">{scoreValue}</label>
                  </div>
                ))}
              </div>
              {item.score !== null && item.score !== 3 && (
                <div className="mt-4 animate-fade-in">
                  <label htmlFor={`reason-${item.id}`} className="block text-sm font-medium text-yellow-700">
                    AIからの質問：具体的な理由（優れていた点、改善点など）を記入してください
                  </label>
                  <input
                    type="text"
                    id={`reason-${item.id}`}
                    value={item.reason}
                    onChange={(e) => handleReasonChange(item.id, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    placeholder={item.score > 3 ? "例：特に安定していました" : "例：少し不安定でした"}
                  />
                </div>
              )}
            </div>
          ))}
          <div>
            <label htmlFor="overall-comment" className="block text-md font-semibold text-gray-700">
              特記事項（総合所見）
            </label>
            <textarea
              id="overall-comment"
              rows={5}
              value={overallComment}
              onChange={(e) => setOverallComment(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="フライト全体を通じての所見や、次回の課題などを記入します。"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ダッシュボードに戻る
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            評価を確定し、たたき台を生成する
          </button>
        </div>
      </form>
    </ScreenContainer>
  );
};

export default EvaluationForm;
