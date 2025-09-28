
import { EvaluationData, EvaluationDraft } from '../types';

// This is a mock function to simulate calling the Gemini API.
// In a real application, you would replace this with an actual API call.
export const generateEvaluationDraft = async (evaluationData: EvaluationData): Promise<EvaluationDraft> => {
  console.log("Generating draft for:", evaluationData);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { items, overallComment, flight } = evaluationData;
  
  // Calculate a score
  const validScores = items.filter(item => item.score !== null);
  const totalScore = validScores.reduce((sum, item) => sum + (item.score ?? 0), 0);
  const averageScore = validScores.length > 0 ? (totalScore / validScores.length) * 20 : 0; // Scale to 100
  const calculatedScore = Math.round(averageScore);

  // Generate a plausible comment
  let aiComment = `本日の「${flight.subjectName}」訓練において、${flight.student.name}訓練生は訓練目標の達成に向けて真摯に取り組みました。\n\n`;

  const goodPoints = items.filter(item => (item.score ?? 3) > 3);
  if (goodPoints.length > 0) {
    aiComment += "特に優れていた点は以下の通りです：\n";
    goodPoints.forEach(item => {
      aiComment += `- ${item.name}：${item.reason || '安定した操作が見られました。'}\n`;
    });
    aiComment += "\n";
  }

  const improvementPoints = items.filter(item => (item.score ?? 3) < 3);
  if (improvementPoints.length > 0) {
    aiComment += "一方、今後の改善が期待される点は以下の通りです：\n";
    improvementPoints.forEach(item => {
      aiComment += `- ${item.name}：${item.reason || '更なる精度向上が求められます。'}\n`;
    });
    aiComment += "\n";
  }

  if (goodPoints.length === 0 && improvementPoints.length === 0) {
    aiComment += "全体的に安定したパフォーマンスであり、訓練は計画通りに進捗しました。\n\n";
  }
  
  aiComment += `総合所見として、${overallComment || '特筆すべき事項はありません。'} 次回の訓練では、本日明らかになった課題点を重点的に確認し、更なる技能向上を目指します。`;

  return {
    score: calculatedScore,
    overallComment: aiComment,
  };
};
