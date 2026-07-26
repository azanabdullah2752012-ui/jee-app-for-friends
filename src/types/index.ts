export type SubjectType = 'Physics' | 'Chemistry' | 'Mathematics';

export type ErrorType = 'Conceptual' | 'Calculation' | 'Time Management' | 'Overconfidence' | 'Question Misread';

export interface TaskItem {
  id: string;
  title: string;
  subject: SubjectType;
  topic: string;
  durationMinutes: number;
  completed: boolean;
  type: 'Theory' | 'Practice' | 'Revision' | 'Mock Test';
}

export interface MistakeItem {
  id: string;
  title: string;
  subject: SubjectType;
  chapter: string;
  topic: string;
  errorType: ErrorType;
  whyWrong: string;
  correctApproach: string;
  keyTakeaway: string;
  daysAgo: number;
  dateAdded: string;
  mastered: boolean;
  revisionCount: number;
  nextRevisionDate: string;
}

export interface ChapterProgress {
  id: string;
  name: string;
  subject: SubjectType;
  category: string;
  classLevel: 'Class 11' | 'Class 12';
  weightage: 'High' | 'Medium' | 'Low';
  isAdvancedOnly?: boolean;
  status: 'Mastered' | 'In Progress' | 'Not Started';
  completionPercentage: number;
  theoryCompleted: boolean;
  pyqsSolved: number;
  totalPyqs: number;
  keyFormulaeCount: number;
}

export interface SubjectWorkspaceData {
  subject: SubjectType;
  overallProgress: number;
  pyqsCompleted: number;
  totalPyqs: number;
  mistakesCount: number;
  activeRevisionCount: number;
  chapters: ChapterProgress[];
  formulae: { id: string; title: string; formula: string; explanation: string }[];
}

export interface ResourceItem {
  id: string;
  subject: SubjectType;
  chapter: string;
  title: string;
  type: 'Theory' | 'Video' | 'NCERT' | 'PYQs' | 'Formula Sheet';
  description: string;
  linkText: string;
  durationOrPages: string;
  isHighYield: boolean;
}

export interface OnboardingState {
  name: string;
  classLevel: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper';
  targetExam: 'JEE Main 2026' | 'JEE Advanced 2026' | 'JEE Main 2027' | 'JEE Advanced 2027';
  dailyStudyHours: number;
  strongestSubject: SubjectType;
  weakestSubject: SubjectType;
  targetRank: number;
  physicsRating: number;
  chemistryRating: number;
  mathsRating: number;
  physicsCompletion: number;
  chemistryCompletion: number;
  mathsCompletion: number;
  primaryBottleneck: string;
  onboardingCompleted: boolean;
  isCompleted: boolean;
  xp: number;
  level: number;
}

export interface QuestionBreakdownData {
  questionText: string;
  subject: SubjectType;
  chapter: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'JEE Advanced';
  givenData: string[];
  needToFind: string;
  requiredConcepts: string[];
  hints: string[];
  solutionSteps: string[];
  keyTakeaway: string;
}

export interface DiagnosticQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface PracticeProblem {
  id: string;
  questionText: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'JEE Advanced';
  options: string[];
  correctOptionIndex: number;
  givenData: string[];
  hints: string[];
  solutionSteps: string[];
  takeaway: string;
}

export interface TopicMasteryData {
  id: string;
  topicTitle: string;
  subject: SubjectType;
  chapter: string;
  learnTheory: string[];
  learnFormula: string;
  learnVideoTitle: string;
  learnVideoDuration: string;
  understandMindmap: string[];
  commonTraps: string[];
  edgeCases: string[];
  diagnosticQuestions: DiagnosticQuestion[];
  practiceProblems: PracticeProblem[];
}

export interface ComprehensiveNoteSection {
  sectionTitle: string;
  content: string[];
  keyEquations?: string[];
  ncertHighlights?: string[];
  examShortcuts?: string[];
}

export interface ComprehensiveChapterNotes {
  chapterId: string;
  chapterName: string;
  subject: SubjectType;
  category: string;
  overview: string;
  readingTimeMinutes: number;
  sections: ComprehensiveNoteSection[];
}

export interface ConceptDeepExplanation {
  id: string;
  title: string;
  statement: string;
  firstPrinciplesIntuition: string;
  mathematicalDerivation: string[];
  selfStudyGotcha: string;
  socraticQuestions: { question: string; answerHint: string }[];
}

export interface ChapterDetailData {
  id: string;
  chapterName: string;
  subject: SubjectType;
  category: string;
  classLevel: 'Class 11' | 'Class 12';
  weightage: 'High' | 'Medium' | 'Low';
  concepts: ConceptDeepExplanation[];
  subtopics: { id: string; title: string; isCompleted: boolean }[];
  formulaSheet: { id: string; title: string; formula: string; explanation: string }[];
  notes: {
    title: string;
    summary: string[];
    ncertHighlight: string;
    comprehensiveSections?: ComprehensiveNoteSection[];
  };
  videoResources: { id: string; title: string; channel: string; duration: string; type: string; url: string }[];
  pyqs: { id: string; year: string; exam: 'JEE Main' | 'JEE Advanced'; questionText: string; options: string[]; correctOptionIndex: number; solution: string }[];
  practiceLevels: {
    basic: PracticeProblem[];
    main: PracticeProblem[];
    advanced: PracticeProblem[];
  };
  chapterTest: { title: string; durationMinutes: number; questions: DiagnosticQuestion[] };
  commonMistakes: string[];
  tricksShortcuts: string[];
  progressTracker: { completionPercentage: number; pyqsSolved: number; totalPyqs: number; status: string };
  revisionChecklist: { step: string; daysInterval: string; status: 'Completed' | 'Due Today' | 'Upcoming' }[];
}

export interface AiDoubtRequest {
  prompt: string;
  subject?: SubjectType;
  chapter?: string;
  contextQuestion?: string;
}

export interface AiDoubtResponse {
  firstPrinciplesExplanation: string;
  socraticHint: string;
  stepByStepSolution: string[];
  keyFormula: string;
  commonTrapWarning: string;
}
