export interface Lesson {
  id: string;
  title: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface GradeCurriculum {
  gradeId: string; // e.g., "6", "7", "12"
  title: string;
  chapters: Chapter[];
}

export enum ExamType {
  MID_TERM_1 = 'Giữa kỳ 1',
  FINAL_TERM_1 = 'Cuối kỳ 1',
  MID_TERM_2 = 'Giữa kỳ 2',
  FINAL_TERM_2 = 'Cuối kỳ 2',
  TS10 = 'Thi vào 10',
  THPTQG = 'Thi THPT QG'
}

export interface MockExam {
  id: string;
  title: string;
  grade: string; // '6' -> '12' or '9' (for TS10)
  type: ExamType;
  duration: number; // minutes
}