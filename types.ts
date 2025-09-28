
export enum Screen {
  LMS_TOP,
  EXECUTE_MENU,
  FLIGHT_DASHBOARD,
  EVALUATION_FORM,
  APPROVAL_SCREEN,
}

export enum EvaluationStatus {
  NotEntered = '未入力',
  Entered = '入力済',
}

export interface Student {
  id: number;
  name: string;
  photoUrl: string;
}

export interface Flight {
  id: number;
  student: Student;
  courseName: string;
  subjectName: string; // 例: CP-01
  status: EvaluationStatus;
}

export interface EvaluationItem {
  id: number;
  name: string;
  score: number | null;
  reason: string;
}

export interface EvaluationData {
  flight: Flight;
  items: EvaluationItem[];
  overallComment: string;
}

export interface EvaluationDraft {
  score: number;
  overallComment: string;
}
