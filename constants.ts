
import { Student, Flight, EvaluationStatus } from './types';

export const MOCK_STUDENTS: Student[] = [
  { id: 1, name: 'A', photoUrl: 'https://picsum.photos/seed/student1/100/100' },
  { id: 2, name: 'B', photoUrl: 'https://picsum.photos/seed/student2/100/100' },
  { id: 3, name: 'C', photoUrl: 'https://picsum.photos/seed/student3/100/100' },
  { id: 4, name: 'D', photoUrl: 'https://picsum.photos/seed/student4/100/100' },
];

export const MOCK_FLIGHTS: Flight[] = [
  { id: 101, student: MOCK_STUDENTS[0], courseName: '基本操縦（T-4）前期課程', subjectName: 'CP-01', status: EvaluationStatus.NotEntered },
  { id: 102, student: MOCK_STUDENTS[1], courseName: '基本操縦（T-4）前期課程', subjectName: 'CP-05', status: EvaluationStatus.NotEntered },
  { id: 103, student: MOCK_STUDENTS[2], courseName: '事業用操縦士課程', subjectName: 'IP-02', status: EvaluationStatus.Entered },
  { id: 104, student: MOCK_STUDENTS[3], courseName: '計器飛行証明課程', subjectName: 'IFR-08', status: EvaluationStatus.Entered },
  { id: 105, student: MOCK_STUDENTS[0], courseName: '基本操縦（T-4）前期課程', subjectName: 'CP-02', status: EvaluationStatus.Entered },
];

export const EVALUATION_ITEM_NAMES: string[] = [
  '訓練目標（全般）',
  '飛行前作業',
  '離陸',
  '上昇',
  '水平飛行',
  '旋回',
  '降下',
  '着陸',
  '飛行後作業',
  '航空機システム',
  '緊急操作手順',
];