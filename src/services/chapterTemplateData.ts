import type { ChapterDetailData } from '../types';

export const sampleChapterDetailData: ChapterDetailData[] = [
  // --- PHYSICS CHAPTER: Laws of Motion & Friction ---
  {
    id: 'ch-p2',
    chapterName: 'Laws of Motion & Friction',
    subject: 'Physics',
    category: 'Mechanics',
    classLevel: 'Class 11',
    weightage: 'High',

    // 1. 📖 Concepts
    concepts: [
      {
        id: 'c-p1',
        title: "Newton's 1st Law (Law of Inertia & Frame Definition)",
        statement: 'A body continues in its state of rest or uniform motion in a straight line unless acted upon by a net external force.',
        firstPrinciplesIntuition: 'Imagine floating in deep intergalactic space far away from any gravity. If you throw a tennis ball, it will glide forever at constant velocity in a straight line. Matter has an inherent stubbornness called INERTIA — it refuses to change velocity unless an external push/pull forces it to.',
        mathematicalDerivation: [
          'Step 1: Net force vector equation: Σ F_ext = d(p)/dt = d(m*v)/dt.',
          'Step 2: If Σ F_ext = 0 and mass m > 0, then d(v)/dt = a = 0.',
          'Step 3: Integrating acceleration a = 0 gives velocity vector v = Constant (both magnitude & direction).'
        ],
        selfStudyGotcha: 'Self-study trap: Thinking a force is needed to keep an object moving. On Earth, objects slow down because hidden friction or air resistance acts on them, NOT because force "runs out".',
        socraticQuestions: [
          {
            question: 'Why do passengers lurch forward when a bus suddenly hits the brakes?',
            answerHint: 'Your lower body stops with the bus due to seat friction, but your upper body retains its forward velocity by Inertia of Motion!'
          }
        ]
      },
    ],

    // 2. 🧠 Subtopics
    subtopics: [
      { id: 'st-1', title: 'Inertial & Non-Inertial Reference Frames', isCompleted: true },
      { id: 'st-2', title: 'Free Body Diagram (FBD) Construction & Vector Resolution', isCompleted: true },
      { id: 'st-3', title: 'Accelerating Elevators & Pseudo Forces', isCompleted: true },
      { id: 'st-4', title: 'Atwood Machine & String-Pulley Constraint Relations', isCompleted: true },
      { id: 'st-5', title: 'Friction on Inclined Planes & Block-on-Block Friction', isCompleted: false },
      { id: 'st-6', title: 'Banking of Curved Roads & Circular Dynamics', isCompleted: false },
    ],

    // 3. 📝 Formula Sheet
    formulaSheet: [
      {
        id: 'f-1',
        title: 'Pseudo Force in Non-Inertial Frame',
        formula: 'F_pseudo = - m * A_frame  ⇒  Σ F_real + F_pseudo = m * a_rel',
        explanation: 'Vector force added in frame accelerating with A_frame pointing opposite to frame acceleration.',
      },
      {
        id: 'f-2',
        title: 'Block on Smooth Accelerating Incline (No Sliding)',
        formula: 'a_horizontal = g * tan(θ)',
        explanation: 'Wedge acceleration required to keep mass m stationary relative to inclined surface.',
      },
    ],

    // 4. 📚 Notes
    notes: {
      title: 'Laws of Motion High-Yield Summary & NCERT Highlights',
      summary: [
        'Always draw FBD isolated from surrounding objects before writing ΣF = ma equations.',
        'Normal force N is NOT always equal to mg (e.g. on inclined plane N = mg cos θ, in accelerating elevator N = m(g ± a)).',
        'Kinetic friction is constant regardless of relative sliding velocity; static friction is self-adjusting from 0 up to μ_s * N.'
      ],
      ncertHighlight: 'NCERT Class 11 Physics Ch 5 Page 98: "Friction does not oppose motion; it opposes RELATIVE motion. Friction can even cause motion, such as walking or a car accelerating forward."'
    },

    // 5. 🎥 Video Resources (Guaranteed Embeddable YouTube Search Links & Video IDs)
    videoResources: [
      {
        id: 'v-1',
        title: 'Laws of Motion & Pseudo Force Complete One-Shot',
        channel: 'Eduniti — Mohit Goenka',
        duration: '1 hr 45 min',
        type: 'One-Shot Crash Course',
        url: 'https://www.youtube.com/embed?listType=search&list=Eduniti+Laws+of+Motion+Physics+JEE',
      },
      {
        id: 'v-2',
        title: 'Block-on-Block Friction Masterclass (Advanced Level)',
        channel: 'Physics Galaxy — Ashish Arora',
        duration: '45 min',
        type: 'Detailed Concept',
        url: 'https://www.youtube.com/embed?listType=search&list=Physics+Galaxy+Block+on+Block+Friction+JEE',
      },
      {
        id: 'v-3',
        title: 'Rotational Motion & Rigid Body Dynamics Full Lecture',
        channel: 'Physics Galaxy',
        duration: '50 min',
        type: 'PYQ Solving',
        url: 'https://www.youtube.com/embed?listType=search&list=Physics+Galaxy+Rotational+Motion+JEE',
      },
    ],

    // 6. ❓ Previous-Year Questions (PYQs)
    pyqs: [
      {
        id: 'pyq-p1',
        year: '2024 Shift 1',
        exam: 'JEE Main',
        questionText: 'A block of mass 2 kg is placed on a rough horizontal surface with μ_s = 0.4. A horizontal force of 5 N is applied to the block. Find the frictional force acting on the block. (g = 10 m/s²)',
        options: ['A) 8 N', 'B) 5 N', 'C) 0 N', 'D) 2 N'],
        correctOptionIndex: 1,
        solution: 'Limiting static friction f_max = μ_s * m * g = 0.4 * 2 * 10 = 8 N. Since applied force (5 N) < f_max (8 N), the block remains static and friction self-adjusts to equal applied force: f = 5 N.',
      },
    ],

    // 7. ✅ Practice Levels
    practiceLevels: {
      basic: [
        {
          id: 'prac-b1',
          questionText: 'What is the acceleration of a 5 kg mass acted upon by two perpendicular forces of 6 N and 8 N?',
          difficulty: 'Easy',
          options: ['A) 2 m/s²', 'B) 4 m/s²', 'C) 1.4 m/s²', 'D) 10 m/s²'],
          correctOptionIndex: 0,
          givenData: ['Mass m = 5 kg', 'Forces F1 = 6 N, F2 = 8 N (perpendicular)'],
          hints: ['Hint 1: Resultant force F_net = √(F1² + F2²).'],
          solutionSteps: ['F_net = √(6² + 8²) = 10 N.', 'a = F_net / m = 10 / 5 = 2 m/s².'],
          takeaway: 'Vector addition of orthogonal forces gives F_net = 10 N.',
        },
      ],
      main: [],
      advanced: [],
    },

    // 8. 🎯 Chapter Test
    chapterTest: {
      title: 'Laws of Motion Diagnostic Sprint (15 Mins)',
      durationMinutes: 15,
      questions: [],
    },

    // 9. ⚠ Common Mistakes
    commonMistakes: [
      "Mistake 1: Forgetting that friction opposes RELATIVE motion, not absolute motion.",
      "Mistake 2: Applying pseudo force in the ground frame (double counting)."
    ],

    // 10. 🧠 Tricks & Shortcuts
    tricksShortcuts: [
      "Shortcut 1: Atwood Machine Acceleration a = (Difference of masses / Sum of masses) * g.",
      "Shortcut 2: String constraint Pulley Rule Σ T·v = 0 gives instant velocity relationships."
    ],

    // 11. 📊 Progress Tracker
    progressTracker: {
      completionPercentage: 68,
      pyqsSolved: 48,
      totalPyqs: 75,
      status: 'In Progress',
    },

    // 12. ⏱ Revision Checklist
    revisionChecklist: [
      { step: '1st Review (24 Hours after learning)', daysInterval: '1 Day', status: 'Completed' },
      { step: '2nd Review (Solve 15 High-Yield PYQs)', daysInterval: '3 Days', status: 'Due Today' },
    ],
  },
];

export function getChapterDetailById(id: string): ChapterDetailData | undefined {
  return sampleChapterDetailData.find((c) => c.id === id || c.id === `ch-${id}`);
}
