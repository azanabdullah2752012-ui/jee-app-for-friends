import type { TopicMasteryData } from '../types';

export const sampleTopicMasteryData: TopicMasteryData[] = [
  // Topic 1: Physics — Laws of Motion: Pseudo Forces & Non-Inertial Frames
  {
    id: 'topic-p1',
    topicTitle: 'Pseudo Forces in Accelerating Reference Frames',
    subject: 'Physics',
    chapter: 'Laws of Motion & Friction',
    
    // Step 1: Learn
    learnTheory: [
      "In an inertial (non-accelerating) reference frame, Newton's 2nd Law holds directly: ΣF = m*a.",
      "In a non-inertial reference frame accelerating with acceleration 'A_frame', Newton's 2nd Law fails unless a fictitious force called 'Pseudo Force' is added.",
      "The Pseudo Force vector is defined as F_p = -m * A_frame, pointing opposite to the acceleration direction of the observer's reference frame.",
      "Once F_p is added to the Free Body Diagram (FBD), vector equilibrium and relative kinematics can be resolved using standard Newtonian equations."
    ],
    learnFormula: 'F_pseudo = - m * A_frame   ⇒   Σ F_real + F_pseudo = m * a_relative',
    learnVideoTitle: 'Pseudo Forces on Inclined Planes & Accelerating Elevators (HC Verma Breakdown)',
    learnVideoDuration: '25 min video lesson',

    // Step 2: Understand
    understandMindmap: [
      "Identify the Reference Frame: Is the observer inside an accelerating elevator, cart, or rotating centrifuge?",
      "Draw the Frame Acceleration Vector: Note direction and magnitude of A_frame.",
      "Apply Pseudo Force to Mass 'm': Add F_p = m * A_frame pointing directly OPPOSITE to A_frame.",
      "Resolve Force Components: Break forces into axes parallel and perpendicular to the contact surface or motion axis.",
      "Apply Relative Motion Equation: Σ F_axis = m * a_rel."
    ],
    commonTraps: [
      "Trap 1: Applying pseudo force when working in the ground (inertial) frame. (Double counting forces!)",
      "Trap 2: Forgetting that pseudo force acts through the center of mass of the body.",
      "Trap 3: Direction mistake: Pseudo force ALWAYS points opposite to A_frame, regardless of velocity."
    ],
    edgeCases: [
      "Elevator in Free Fall (A_frame = g downward): Pseudo force is m*g upward, canceling gravity -> Effective gravity g_eff = 0.",
      "Accelerating Incline Wedge: Minimum horizontal wedge acceleration for block contact loss (N=0) is a = g * cot(θ)."
    ],

    // Step 3: Check Understanding
    diagnosticQuestions: [
      {
        id: 'diag-p1-1',
        questionText: "An elevator is moving UPWARD with a DECREASING speed (deceleration 'a'). In the reference frame of the elevator, what is the direction of the pseudo force on a passenger of mass m?",
        options: [
          "A) Downward",
          "B) Upward",
          "C) Zero, because the elevator is moving upward",
          "D) Horizontal"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! The elevator is moving upward but decelerating, so its acceleration vector A_frame points DOWNWARD. The pseudo force F_p = -m*A_frame points OPPOSITE to A_frame, which is UPWARD."
      },
      {
        id: 'diag-p1-2',
        questionText: "When is it required to include a pseudo force in a Free Body Diagram?",
        options: [
          "A) Whenever an object is moving in a circle",
          "B) ONLY when observing motion from an accelerating (non-inertial) reference frame",
          "C) Always, whenever any force acts on a mass",
          "D) Whenever velocity is positive"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! Pseudo forces are frame-dependent corrections used exclusively when equations of motion are written from the perspective of an accelerating (non-inertial) frame."
      },
      {
        id: 'diag-p1-3',
        questionText: "A pendulum hangs from the ceiling of a car accelerating rightward with acceleration 'a'. What angle θ does the string make with the vertical in equilibrium relative to the car?",
        options: [
          "A) tan(θ) = g / a",
          "B) tan(θ) = a / g",
          "C) sin(θ) = a / g",
          "D) cos(θ) = a / g"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! In the car frame, forces on the bob are T sin(θ) = m*a (pseudo force left) and T cos(θ) = m*g (gravity down). Dividing gives tan(θ) = a / g."
      }
    ],

    // Step 4: Practice Problems
    practiceProblems: [
      {
        id: 'prac-p1-1',
        questionText: "A pendulum of mass m is suspended from the ceiling of a car moving with a horizontal acceleration 'a'. Find the tension T in the string when the pendulum is in equilibrium position relative to the car.",
        difficulty: 'Medium',
        options: [
          "A) T = m * (g + a)",
          "B) T = m * √(g² + a²)",
          "C) T = m * √(g² - a²)",
          "D) T = m * g * tan(a/g)"
        ],
        correctOptionIndex: 1,
        givenData: [
          "Mass of pendulum bob = m",
          "Horizontal acceleration of car = a (rightward)",
          "Frame: Non-inertial car frame"
        ],
        hints: [
          "Hint 1: Draw FBD of mass m in car frame. Include gravity (mg down) and pseudo force (ma left).",
          "Hint 2: The tension T must balance the vector sum of gravity mg and pseudo force ma.",
          "Hint 3: T² = (mg)² + (ma)²."
        ],
        solutionSteps: [
          "Step 1: Vertical force balance: T cos(θ) = mg.",
          "Step 2: Horizontal force balance: T sin(θ) = ma.",
          "Step 3: Square and add: T² (sin²θ + cos²θ) = m² g² + m² a².",
          "Step 4: T = m * √(g² + a²)."
        ],
        takeaway: "In accelerated frames, effective acceleration g_eff = √(g² + a²). Tension T = m * g_eff."
      },
      {
        id: 'prac-p1-2',
        questionText: "A smooth wedge of inclination angle θ accelerates horizontally with acceleration 'a'. Find the value of 'a' so that a block of mass m placed on the wedge remains stationary relative to the wedge.",
        difficulty: 'JEE Advanced',
        options: [
          "A) a = g * sin(θ)",
          "B) a = g * cos(θ)",
          "C) a = g * tan(θ)",
          "D) a = g * cot(θ)"
        ],
        correctOptionIndex: 2,
        givenData: [
          "Mass of block = m",
          "Wedge angle = θ",
          "Surface: Smooth (frictionless)",
          "Condition: Zero relative sliding motion (a_rel = 0)"
        ],
        hints: [
          "Hint 1: In the wedge frame, pseudo force ma acts horizontally opposite to wedge acceleration.",
          "Hint 2: Resolve forces along the inclined plane surface.",
          "Hint 3: Component of gravity down incline is mg sin(θ). Component of pseudo force up incline is ma cos(θ)."
        ],
        solutionSteps: [
          "Step 1: In wedge frame, set forces along incline to zero: mg sin(θ) = ma cos(θ).",
          "Step 2: Divide both sides by m cos(θ): a = g * sin(θ) / cos(θ) = g tan(θ)."
        ],
        takeaway: "To keep a block stationary on a smooth accelerating incline, horizontal acceleration must equal g tan(θ)."
      }
    ]
  },

  // Topic 2: Mathematics — Quadratic Equations: Location of Roots
  {
    id: 'topic-m1',
    topicTitle: 'Location of Roots & Boundary Inequalities',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations & Expressions',
    
    // Step 1: Learn
    learnTheory: [
      "The real roots α and β of quadratic f(x) = a*x² + b*x + c depend strictly on the Discriminant D = b² - 4ac and vertex x = -b/(2a).",
      "When solving for real parameter ranges (e.g., both roots greater than k), we convert root conditions into 3 geometric boundary conditions.",
      "For a > 0, the parabola opens UPWARD. The value f(k) indicates whether point k lies inside or outside the interval between roots.",
      "Taking the simultaneous intersection (AND) of all 3 conditions yields the exact parameter range."
    ],
    learnFormula: 'Both roots > k  ⇒  (1) D ≥ 0   AND   (2) -b / (2a) > k   AND   (3) a * f(k) > 0',
    learnVideoTitle: 'Location of Roots Masterclass: All 6 Cases Simplified (MathonGo)',
    learnVideoDuration: '30 min video lesson',

    // Step 2: Understand
    understandMindmap: [
      "Identify the Boundary Point 'k': Is the condition roots > k, roots < k, or k lying between roots?",
      "Check Real Roots Existence: Set D = b² - 4ac ≥ 0.",
      "Check Vertex Position: Compare -b/(2a) with k.",
      "Check Boundary Value Sign: Evaluate a * f(k) > 0 or a * f(k) < 0.",
      "Intersect Solution Sets: Find parameter interval where all 3 inequalities hold true."
    ],
    commonTraps: [
      "Trap 1: Forgetting D ≥ 0, assuming f(k) > 0 alone guarantees real roots exist. (The parabola could lie entirely above the x-axis!)",
      "Trap 2: Using strict D > 0 when roots can be equal (α = β > k requires D ≥ 0).",
      "Trap 3: Sign confusion in vertex position -b/(2a)."
    ],
    edgeCases: [
      "Point k lies BETWEEN roots (α < k < β): Required condition is SIMPLY a * f(k) < 0. (Discriminant D > 0 is automatically satisfied!)."
    ],

    // Step 3: Check Understanding
    diagnosticQuestions: [
      {
        id: 'diag-m1-1',
        questionText: "For the quadratic equation x² + 2x + m = 0, both roots are real and distinct. What is the condition on Discriminant D?",
        options: [
          "A) D ≥ 0",
          "B) D > 0",
          "C) D < 0",
          "D) D = 0"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! For real and DISTINCT roots, the Discriminant must be strictly positive: D > 0."
      },
      {
        id: 'diag-m1-2',
        questionText: "If a point k lies strictly BETWEEN the real roots α and β of f(x) = a*x² + b*x + c (with α < k < β), what is the single necessary and sufficient condition?",
        options: [
          "A) a * f(k) > 0",
          "B) a * f(k) < 0",
          "C) -b/(2a) = k",
          "D) D = 0"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! When k lies between the roots of an upward/downward parabola, f(k) has the opposite sign of coefficient 'a'. Thus a * f(k) < 0."
      }
    ],

    // Step 4: Practice Problems
    practiceProblems: [
      {
        id: 'prac-m1-1',
        questionText: "Find the set of values of 'm' for which both roots of the quadratic equation x² - 2mx + m² - 1 = 0 are greater than 2.",
        difficulty: 'Hard',
        options: [
          "A) m > 3",
          "B) m < 1",
          "C) 1 < m < 3",
          "D) m > 2"
        ],
        correctOptionIndex: 0,
        givenData: [
          "Quadratic: f(x) = x² - 2mx + (m² - 1) = 0",
          "a = 1 > 0",
          "Boundary k = 2",
          "Condition: Both roots α, β > 2"
        ],
        hints: [
          "Hint 1: Check D ≥ 0: D = 4m² - 4(m² - 1) = 4 > 0 (always true for all m).",
          "Hint 2: Check vertex: -b/(2a) = 2m / 2 = m > 2.",
          "Hint 3: Check f(2) > 0: f(2) = 4 - 4m + m² - 1 = m² - 4m + 3 > 0."
        ],
        solutionSteps: [
          "Step 1: D = 4 > 0 (satisfied for all m).",
          "Step 2: Vertex condition: m > 2.",
          "Step 3: f(2) > 0 ⇒ m² - 4m + 3 > 0 ⇒ (m - 1)(m - 3) > 0 ⇒ m < 1 or m > 3.",
          "Step 4: Intersect (m > 2) AND (m < 1 or m > 3) ⇒ m > 3."
        ],
        takeaway: "The intersection of vertex condition m > 2 and boundary condition (m < 1 or m > 3) yields m > 3."
      }
    ]
  },

  // Topic 3: Chemistry — Chemical Bonding: Hybridization & VSEPR Theory
  {
    id: 'topic-c1',
    topicTitle: 'Hybridization, VSEPR Geometry & Lone Pair Contraction',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding & Molecular Structure',
    
    // Step 1: Learn
    learnTheory: [
      "Hybridization is the intermixing of atomic orbitals of slightly different energies to form equivalent hybrid orbitals.",
      "Steric Number (SN) determines the electron pair geometry around the central atom: SN = 2 (sp), SN = 3 (sp2), SN = 4 (sp3), SN = 5 (sp3d), SN = 6 (sp3d2).",
      "VSEPR Theory predicts molecular shape based on electron pair repulsion: Lone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair.",
      "Lone pairs occupy more space than bond pairs, causing bond angles to contract from ideal geometric values (e.g. NH3 bond angle is 107° instead of 109.5°)."
    ],
    learnFormula: 'Steric Number (SN) = 1/2 * [ V + M - C + A ]',
    learnVideoTitle: 'VSEPR Theory & Lone Pair Geometries Masterclass (Pankaj Sir)',
    learnVideoDuration: '28 min video lesson',

    // Step 2: Understand
    understandMindmap: [
      "Identify Central Atom: Find valence electrons 'V'.",
      "Count Monovalent Atoms 'M': Add H, F, Cl, Br, I count (Exclude divalent O, S).",
      "Account for Charge: Subtract cationic charge 'C', add anionic charge 'A'.",
      "Calculate Steric Number: SN = 1/2 * (V + M - C + A).",
      "Determine Shape: Shape = Geometry excluding lone pair positions."
    ],
    commonTraps: [
      "Trap 1: Including Oxygen as a monovalent atom when calculating Steric Number. (Oxygen is DIVALENT, M = 0).",
      "Trap 2: Confusing Electron Pair Geometry (includes lone pairs) with Molecular Shape (atoms only).",
      "Trap 3: Placing lone pairs in axial positions in sp3d (trigonal bipyramidal) geometry. (Lone pairs MUST occupy equatorial positions to minimize 90° repulsions!)."
    ],
    edgeCases: [
      "XeF4: Steric Number 6 (sp3d2) with 2 lone pairs -> Square Planar (Lone pairs occupy opposite axial positions).",
      "SF4: Steric Number 5 (sp3d) with 1 lone pair -> See-Saw shape (Lone pair occupies equatorial position)."
    ],

    // Step 3: Check Understanding
    diagnosticQuestions: [
      {
        id: 'diag-c1-1',
        questionText: "What is the molecular shape of XeF4 according to VSEPR theory?",
        options: [
          "A) Tetrahedral",
          "B) Octahedral",
          "C) Square Planar",
          "D) See-Saw"
        ],
        correctOptionIndex: 2,
        explanation: "Correct! Xe has 8 valence e- + 4 F atoms = SN 6 (sp3d2). With 2 lone pairs in axial positions, the molecular shape is Square Planar."
      },
      {
        id: 'diag-c1-2',
        questionText: "In trigonal bipyramidal geometry (sp3d hybridization, e.g. PCl5 or SF4), where do lone pairs preferentially reside?",
        options: [
          "A) Axial positions",
          "B) Equatorial positions",
          "C) Randomly anywhere",
          "D) Center of molecule"
        ],
        correctOptionIndex: 1,
        explanation: "Correct! Equatorial positions have only two 90° repulsions, whereas axial positions experience three 90° repulsions. Lone pairs occupy equatorial positions to minimize repulsion."
      }
    ],

    // Step 4: Practice Problems
    practiceProblems: [
      {
        id: 'prac-c1-1',
        questionText: "Predict the hybridization of the central sulfur atom and molecular shape of SF4.",
        difficulty: 'Medium',
        options: [
          "A) sp3, Tetrahedral",
          "B) sp3d, See-Saw",
          "C) sp3d2, Square Planar",
          "D) sp3d, Trigonal Bipyramidal"
        ],
        correctOptionIndex: 1,
        givenData: [
          "Central Atom = S (Valence e- V = 6)",
          "Monovalent Fluorine atoms M = 4",
          "Charge = 0"
        ],
        hints: [
          "Hint 1: SN = 1/2 * (6 + 4) = 5 -> sp3d hybridization.",
          "Hint 2: 4 bonding pairs + 1 lone pair.",
          "Hint 3: Place 1 lone pair in an equatorial position."
        ],
        solutionSteps: [
          "Step 1: Steric Number = 1/2 * (6 + 4) = 5 (sp3d).",
          "Step 2: 5 electron pairs = Trigonal Bipyramidal geometry.",
          "Step 3: 1 lone pair occupies equatorial position to minimize 90° repulsion.",
          "Step 4: Molecular shape is See-Saw."
        ],
        takeaway: "SN = 5 with 1 lone pair yields sp3d hybridization and See-Saw shape."
      }
    ]
  }
];

export function getTopicMasteryById(id: string): TopicMasteryData | undefined {
  return sampleTopicMasteryData.find((t) => t.id === id);
}
