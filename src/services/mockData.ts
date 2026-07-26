import type {
  MistakeItem,
  ResourceItem,
  TaskItem,
  OnboardingState,
  QuestionBreakdownData,
} from '../types';
import { jeeMasterSyllabus } from './jeeMasterSyllabus';

// Default clean initial onboarding state (0 fake mock data)
export const initialOnboardingState: OnboardingState = {
  name: '',
  classLevel: 'Class 11',
  targetExam: 'JEE Advanced 2026',
  dailyStudyHours: 6,
  strongestSubject: 'Physics',
  weakestSubject: 'Chemistry',
  targetRank: 500,
  physicsRating: 5,
  chemistryRating: 5,
  mathsRating: 5,
  physicsCompletion: 0,
  chemistryCompletion: 0,
  mathsCompletion: 0,
  primaryBottleneck: 'Time Management & Speed',
  onboardingCompleted: false,
  isCompleted: false,
  xp: 0,
  level: 1,
};

// Clean initial state with ZERO fake mock tasks
export const initialTasks: TaskItem[] = [];

// Clean initial state with ZERO fake mock mistakes
export const initialMistakes: MistakeItem[] = [];

// Master Syllabus Chapters derived from official NTA JEE Main & Advanced curriculum
export const initialChapters = jeeMasterSyllabus;

// Clean initial state with ZERO fake mock resources
export const initialResources: ResourceItem[] = [];

// Real problem breakdown template for Question Breakdown engine
export const sampleQuestionBreakdown: QuestionBreakdownData = {
  questionText: "A smooth wedge of mass M and angle of inclination θ rests on a smooth horizontal floor. A block of mass m is placed on the inclined surface of the wedge. What horizontal force F must be applied to the wedge so that the block remains stationary relative to the wedge?",
  subject: 'Physics',
  chapter: 'Laws of Motion & Pseudo Forces',
  topic: 'Non-Inertial Reference Frame & Pseudo Force Equilibrium',
  difficulty: 'JEE Advanced',
  givenData: [
    "Mass of wedge = M",
    "Mass of block = m",
    "Angle of inclination = θ",
    "Surface condition: Smooth floor & smooth incline (Friction coefficient μ = 0)",
    "Constraint: Block remains stationary relative to the accelerating wedge"
  ],
  needToFind: "External horizontal force F applied to the wedge-block system",
  requiredConcepts: [
    "Newton's 2nd Law in accelerating (non-inertial) frame",
    "Pseudo Force vector F_p = m * a opposite to system acceleration",
    "Normal reaction vector resolution along and perpendicular to the incline"
  ],
  hints: [
    "Hint 1: If the force F accelerates the wedge to the left with acceleration 'a', shift into the non-inertial reference frame of the wedge.",
    "Hint 2: In the wedge frame, the block experiences a pseudo force F_p = m*a directed horizontally to the right.",
    "Hint 3: For the block to not slide down the incline, balance forces along the inclined plane: m*g*sin(θ) = m*a*cos(θ)."
  ],
  solutionSteps: [
    "Step 1: Compute required acceleration 'a' of the system in the ground frame.",
    "Along the inclined plane: mg sin(θ) = ma cos(θ) => a = g tan(θ).",
    "Step 2: Treat the wedge (M) and block (m) as a combined system of total mass (M + m) moving with acceleration 'a'.",
    "Step 3: Apply Newton's 2nd Law for total system: F = (M + m) * a.",
    "Step 4: Substitute a = g tan(θ): F = (M + m) g tan(θ)."
  ],
  keyTakeaway: "To prevent sliding on a smooth incline, the horizontal acceleration must equal g tan(θ). In system dynamics, compute acceleration from individual constraints first, then apply F = M_total * a."
};
