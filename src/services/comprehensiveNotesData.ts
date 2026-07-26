import type { ComprehensiveChapterNotes } from '../types';

export const comprehensiveNotesLibrary: ComprehensiveChapterNotes[] = [
  // ==========================================
  // ⚛️ PHYSICS: LAWS OF MOTION & FRICTION
  // ==========================================
  {
    chapterId: 'ch-p2',
    chapterName: 'Laws of Motion & Friction',
    subject: 'Physics',
    category: 'Mechanics',
    overview: 'Exhaustive 1-Hour Master Textbook Manual. Covers first-principles Newtonian dynamics, microscopic physical models, vector differential equations of motion, non-inertial frame transformations, Atwood constraint derivations, block-on-block multi-stage friction, and banking of circular curves.',
    readingTimeMinutes: 60,
    sections: [
      {
        sectionTitle: '1. Theoretical Foundations of Newtonian Dynamics & Concept of Inertia',
        content: [
          'Classical mechanics is built upon the fundamental framework established by Sir Isaac Newton in his 1687 work Philosophiae Naturalis Principia Mathematica. The entire theory rests on the concepts of space, time, mass, force, and reference frames.',
          'Physical Intuition of Inertia: Inertia is the intrinsic property of matter by virtue of which a body resists any change in its state of rest or uniform motion along a straight line. Mass is the quantitative measure of inertia. The larger the mass of a body, the greater is its inertia, meaning a larger net external force is required to impart a given acceleration.',
          'Newton First Law (Law of Inertia): "Every body continues in its state of rest, or of uniform motion in a straight line, unless it is compelled to change that state by forces impressed upon it." This law serves two vital purposes: (1) It provides a qualitative definition of Force as an agency that changes or tends to change the state of motion, and (2) It defines an INERTIAL REFERENCE FRAME — a coordinate system in which a body subject to no net external force moves with constant velocity.',
          'Deep Analysis of Inertial Frames: An inertial frame of reference is non-accelerating and non-rotating. For all practical laboratory experiments on Earth, an Earth-fixed coordinate system is approximated as an inertial frame, although Earth revolves around the Sun (centripetal acceleration ≈ 0.006 m/s²) and rotates about its own axis (equatorial acceleration ≈ 0.034 m/s²). For high-precision astronomical and satellite calculations, a heliocentric frame anchored at the solar system center of mass is used.',
          'Newton Second Law (Fundamental Law of Dynamics): "The rate of change of linear momentum of a body is directly proportional to the applied net external force and takes place in the direction in which the force acts." Mathematically, linear momentum vector p = m * v. The second law states: F_ext = dp/dt = d(m * v) / dt.',
          'Derivation of F = ma for Constant Mass System: Applying the product rule of calculus to dp/dt: F_ext = m * (dv/dt) + v * (dm/dt). In classical non-relativistic mechanics where system mass is constant (dm/dt = 0), this reduces to the famous vector equation: F_ext = m * a.',
          'Component Form of Newton Second Law: Because F_ext = m * a is a 3D vector equation, it is equivalent to three independent scalar differential equations along Cartesian axes: Σ Fx = m * d²x/dt² = m * ax, Σ Fy = m * d²y/dt² = m * ay, and Σ Fz = m * d²z/dt² = m * az. Acceleration along any coordinate axis is produced strictly by the net force component acting along THAT SAME axis.',
          'Newton Third Law (Action-Reaction Symmetry): "To every action, there is always an equal and opposite reaction; or the mutual actions of two bodies upon each other are always equal and directed to contrary parts." If body A exerts force F_BA on body B, then body B simultaneously exerts force F_AB on body A such that F_AB = - F_BA.',
          'Crucial Nuances of Newton Third Law: (1) Action and reaction forces act on TWO DIFFERENT BODIES. Therefore, they NEVER cancel out each other when considering the motion of an individual body. (2) Action and reaction are instantaneous and simultaneous; there is no time delay between action and reaction. (3) Action and reaction forces are of the EXACT SAME PHYSICAL NATURE (e.g., if action is a contact normal force, reaction is a contact normal force; if action is gravitational, reaction is gravitational).'
        ],
        keyEquations: [
          'Linear Momentum: p = m * v',
          'Newton 2nd Law (General Calculus Form): F_ext = d(p)/dt = m(dv/dt) + v(dm/dt)',
          'Newton 2nd Law (Constant Mass): Σ F_ext = m * a',
          'Cartesian Vector Components: Σ Fx = m ax , Σ Fy = m ay , Σ Fz = m az',
          'Newton 3rd Law Vector Relation: F_AB = - F_BA',
          'Impulse-Momentum Theorem: J = ∫ [t1 to t2] F(t) dt = Δp = m v_final - m v_initial'
        ],
        ncertHighlights: [
          'NCERT Class 11 Physics Ch 5 (Page 96): "Newton second law is a VECTOR equation. It is equivalent to three scalar equations along orthogonal axes. Force along x-axis affects acceleration along x-axis only and has no effect on motion along y or z axes."',
          'NCERT Class 11 Physics Ch 5 (Page 97): "Force at an instant t determines acceleration at that SAME instant t. Acceleration does not depend on the history of motion of the particle."',
          'NCERT Class 11 Physics Ch 5 (Page 98): "Impulse is defined as the product of force and time duration. For large impact forces acting for extremely short time intervals (such as a bat hitting a ball), impulse J equals the area under the Force vs Time curve."'
        ],
        examShortcuts: [
          '⚡ System Boundary Rule: When analyzing multi-body connected systems (e.g. 3 blocks pushed on a table), you can treat all connected masses as a SINGLE COMBINED SYSTEM of total mass M_total = m1 + m2 + m3 to find common acceleration a = F_ext / M_total.',
          '⚡ Internal Force Rule: Internal forces between parts of a chosen system cancel out in pair sums (by Newton 3rd Law) and must NOT be included in the net force equation for the combined system FBD.'
        ]
      },
      {
        sectionTitle: '2. Exhaustive Analysis of Non-Inertial Reference Frames & Pseudo Forces',
        content: [
          'In many physical scenarios, it is mathematically far more convenient to observe and solve motion from the perspective of an accelerating observer (e.g., inside an accelerating elevator, a banking car, or a rotating turntable). Such frames are called NON-INERTIAL REFERENCE FRAMES.',
          'Theoretical Origin of Pseudo Forces: Let S be an inertial frame and S\' be a non-inertial frame accelerating relative to S with vector acceleration A_frame. Let r be the position vector of a particle of mass m in frame S, and r\' be its position vector in frame S\'.',
          'Kinematic Position Transformation: r = r_frame + r\'. Differentiating twice with respect to time t yields the acceleration relation: a_inertial = A_frame + a_relative, where a_relative is the acceleration of the particle as observed inside the accelerating frame S\'.',
          'Multiplying by particle mass m gives: m * a_inertial = m * A_frame + m * a_relative. By Newton Second Law in the inertial frame S, net real force F_real = m * a_inertial.',
          'Rearranging for the accelerating observer frame S\': F_real - m * A_frame = m * a_relative.',
          'Defining Pseudo Force (F_pseudo = - m * A_frame): By defining F_pseudo as a fictitious force vector of magnitude m * A_frame pointing in the direction opposite to A_frame, the equation inside the non-inertial frame assumes the standard Newtonian form: Σ F_real + F_pseudo = m * a_relative.',
          'Detailed Case Study 1: Apparent Weight inside an Elevator:',
          '  • Case A: Elevator at Rest or Moving with Constant Velocity (A_frame = 0): N - mg = 0 ⇒ N = mg. Apparent weight equals true weight.',
          '  • Case B: Elevator Accelerating Upward with Acceleration "a" (A_frame = +a j^): In elevator frame, pseudo force F_p = m*a acts DOWNWARD. Equation: N - mg - ma = 0 ⇒ N = m(g + a). Observer feels HEAVIER.',
          '  • Case C: Elevator Accelerating Downward with Acceleration "a" (A_frame = -a j^): Pseudo force F_p = m*a acts UPWARD. Equation: N + ma - mg = 0 ⇒ N = m(g - a). Observer feels LIGHTER.',
          '  • Case D: Elevator Cable Snaps (Free Fall, a = g): N = m(g - g) = 0 N. Normal force vanishes completely, resulting in WEIGHTLESSNESS.',
          'Detailed Case Study 2: Block on a Smooth Accelerating Wedge:',
          'A wedge of mass M and inclination angle θ is accelerated horizontally to the left with acceleration "a". A block of mass m rests on the smooth inclined plane of the wedge.',
          'To find the acceleration "a" required such that mass m does not slide relative to the wedge, shift into the non-inertial frame of the accelerating wedge.',
          'In the wedge frame, block m experiences: (1) Real gravity mg downward, (2) Real Normal force N perpendicular to incline, and (3) Pseudo force F_p = m*a directed horizontally to the RIGHT.',
          'Resolving forces ALONG the inclined plane: Gravitational component mg * sin(θ) acts down the incline. Pseudo force component m * a * cos(θ) acts up the incline.',
          'For relative equilibrium along the incline: m * g * sin(θ) = m * a * cos(θ). Dividing by m * cos(θ) yields the exact required wedge acceleration: a = g * tan(θ).'
        ],
        keyEquations: [
          'Kinematic Frame Transformation: a_inertial = A_frame + a_relative',
          'Pseudo Force Vector Definition: F_pseudo = - m * A_frame',
          'Non-Inertial Motion Equation: Σ F_real + F_pseudo = m * a_relative',
          'Elevator Upward Apparent Weight: N = m(g + a)',
          'Elevator Downward Apparent Weight: N = m(g - a)',
          'Accelerating Wedge Constraint Acceleration: a = g * tan(θ)',
          'Accelerating Wedge Normal Reaction: N = m g / cos(θ) = m √(g² + a²)'
        ],
        ncertHighlights: [
          'NCERT Class 11 Physics Ch 5 (Page 102): "Pseudo force is not a real force exerted by any physical body. It is an artifact of using a non-inertial frame. If you write equations of motion from an inertial ground frame, NO pseudo force should ever be drawn."'
        ],
        examShortcuts: [
          '⚡ Pendulum in Accelerating Car Shortcut: In a car accelerating horizontally with "a", the effective acceleration due to gravity is g_eff = √(g² + a²). The bob hangs at an angle θ_eq = tan⁻¹(a / g) relative to vertical. The small-angle oscillation frequency is f = (1 / 2π) * √(g_eff / L).'
        ]
      },
      {
        sectionTitle: '3. Rigorous Constraint Equations: String-Pulley & Virtual Work Principles',
        content: [
          'In complex mechanical linkages involving multiple blocks, strings, and pulleys, the motions of individual bodies are not independent; they are bound by geometric constraints.',
          'Ideal String Assumptions: Strings are assumed to be (1) Inextensible (length L = constant), (2) Massless (linear mass density μ = 0, meaning tension T is uniform along any continuous un-broken segment), and (3) Flexible (cannot withstand compressive stress, T ≥ 0). Pulleys are assumed massless and frictionless.',
          'Virtual Work Principle for Inextensible Strings: Because an ideal string cannot stretch or compress, the net work done by internal tension forces across all connected bodies in any arbitrary virtual displacement is ZERO.',
          'Mathematical Proof of Constraint Relations:',
          '  • Position Constraint: Σ (T_i · x_i) = 0, where T_i is tension vector acting on body i, and x_i is position vector of body i.',
          '  • Velocity Constraint: Differentiating with respect to time: d/dt [ Σ (T_i · x_i) ] = Σ (T_i · v_i) = 0.',
          '  • Acceleration Constraint: Differentiating again with respect to time: d/dt [ Σ (T_i · v_i) ] = Σ (T_i · a_i) = 0.',
          'Step-by-Step Pulley Constraint Example:',
          'Consider a movable pulley P connected to two blocks A and B via a continuous string wrapped around a fixed ceiling pulley. Let x_A, x_B, and x_P be their downward displacements.',
          'Length of string wrapped over movable pulley: (x_A - x_P) + (x_B - x_P) = Constant L.',
          'Simplifying: x_A + x_B - 2 x_P = L. Differentiating twice with respect to time t gives: a_A + a_B - 2 a_P = 0 ⇒ a_P = (a_A + a_B) / 2.',
          'This establishes the general Pulley Kinematic Rule: The acceleration of a movable pulley equals the arithmetic mean of the accelerations of the two string segments passing through it.'
        ],
        keyEquations: [
          'Virtual Work Tension Constraint: Σ (T_i · x_i) = 0',
          'Virtual Power Tension Constraint: Σ (T_i · v_i) = 0',
          'Virtual Acceleration Constraint: Σ (T_i · a_i) = 0',
          'Movable Pulley Kinematic Relation: a_pulley = ½ (a_segment1 + a_segment2)',
          'Standard Atwood System Acceleration: a = [ (m₂ - m₁) / (m₁ + m₂) ] * g',
          'Standard Atwood System String Tension: T = [ (2 m₁ m₂) / (m₁ + m₂) ] * g'
        ],
        ncertHighlights: [
          'NCERT Highlight: "Constraint equations express geometric restrictions on the motion of interconnected systems. The number of independent degrees of freedom equals the total number of coordinates minus the number of constraint equations."'
        ],
        examShortcuts: [
          '⚡ 10-Second Pulley Shortcut: Assign Tension T to the main string segment. Label tensions on all blocks as multiples of T (e.g., T, 2T, 4T). Write Σ T_i * a_i = 0 directly to obtain acceleration ratios instantly without writing lengthy coordinate equations!'
        ]
      },
      {
        sectionTitle: '4. Comprehensive Theory of Friction: Microscopic Model, Regimes & Multi-Block Dynamics',
        content: [
          'Microscopic Physical Origin of Friction: At a microscopic level, even highly polished surfaces exhibit irregular peaks (asperities) and valleys. When two surfaces are placed in contact, real contact occurs ONLY at the microscopic tips of touching asperities. The real contact area A_real is a tiny fraction (often 1/10,000th) of the apparent macroscopic area A_macro.',
          'High local pressure at these micro-junctions causes local plastic deformation and creates strong intermolecular cold welds (van der Waals and metallic bonds). To slide one surface over another, these cold welds must be sheared apart.',
          'Static Friction Regime (f_s): When a small tangential force F_app is applied to a block at rest, the cold welds deform elastically and exert a counter-force f_s that EXACTLY equals F_app in magnitude and opposes it in direction. Static friction is a SELF-ADJUSTING FORCE: 0 ≤ f_s ≤ f_s(max).',
          'Limiting Static Friction (f_s max): As F_app increases, static friction increases linearly until micro-junctions reach their maximum shearing strength. This threshold is Limiting Static Friction: f_s(max) = μ_s * N, where μ_s is the coefficient of static friction and N is the Normal contact reaction force.',
          'Kinetic Friction Regime (f_k): Once F_app exceeds f_s(max), cold welds shear continuously. Sliding begins, and friction drops slightly to a constant value called Kinetic Friction: f_k = μ_k * N, where μ_k is the coefficient of kinetic friction (μ_k < μ_s). Kinetic friction is independent of sliding velocity over a wide range.',
          'Why Friction is Independent of Macroscopic Area: Normal reaction N = P_real * A_real. Since Limiting Friction f_s(max) = τ_shear * A_real, ratio f_s(max) / N = τ_shear / P_real = μ_s. Because local material shear strength τ_shear and yield pressure P_real are intrinsic material constants, μ_s depends ONLY on material nature and surface cleanliness, NOT on macroscopic surface area!',
          'Exhaustive Block-on-Block Friction Protocol (m1 on top of m2 pushed by force F on m2):',
          '  • Step 1: Calculate maximum static friction at contact interface between m1 and m2: f_max = μ_s * m1 * g.',
          '  • Step 2: Assume NO RELATIVE SLIP between m1 and m2. Treat them as a combined system to find common acceleration: a_common = F / (m1 + m2).',
          '  • Step 3: Find required friction force on top block m1 to give it acceleration a_common: f_req = m1 * a_common.',
          '  • Step 4: Compare f_req with f_max:',
          '      - Case A (f_req ≤ f_max): No slipping occurs! Blocks move together with common acceleration a = F / (m1 + m2). Actual static friction f_s = f_req.',
          '      - Case B (f_req > f_max): Relative slipping occurs! Blocks split apart. Kinetic friction f_k = μ_k * m1 * g acts between them.',
          '      - Accel of top block m1: a1 = f_k / m1 = μ_k * g.',
          '      - Accel of bottom block m2: a2 = (F - f_k) / m2.'
        ],
        keyEquations: [
          'Limiting Static Friction Threshold: f_s(max) = μ_s * N',
          'Kinetic Friction Equation: f_k = μ_k * N',
          'Angle of Friction Relation: tan(λ) = f / N  ⇒  tan(λ_max) = μ_s',
          'Angle of Repose Relation: tan(θ_repose) = μ_s',
          'Minimum Pushing Force on Rough Plane: F_min = (μ mg) / √(1 + μ²)',
          'Optimal Push Angle: θ_opt = tan⁻¹(μ) above horizontal'
        ],
        ncertHighlights: [
          'NCERT Class 11 Physics Ch 5 (Page 98): "Friction does not oppose motion; it opposes RELATIVE SLIDING motion. When a car accelerates forward, ground friction on drive wheels acts FORWARD to propel the car!"',
          'NCERT Class 11 Physics Ch 5 (Page 99): "Rolling friction is much smaller than sliding friction (μ_rolling ≈ 0.001 to 0.005). Ball bearings transform sliding friction into rolling friction."'
        ],
        examShortcuts: [
          '⚡ Banking Curve Maximum Speed Hack: On a banked curve of radius R and angle θ with friction coefficient μ, maximum speed without outward skidding is v_max = √ [ g R (tan θ + μ) / (1 - μ tan θ) ]. Minimum speed without inward sliding is v_min = √ [ g R (tan θ - μ) / (1 + μ tan θ) ].'
        ]
      }
    ]
  },

  // ==========================================
  // 🧪 CHEMISTRY: CHEMICAL BONDING & VSEPR
  // ==========================================
  {
    chapterId: 'ch-c14',
    chapterName: 'Chemical Bonding & Molecular Structure',
    subject: 'Chemistry',
    category: 'Inorganic Chemistry',
    overview: 'Exhaustive 1-Hour Master Textbook Manual. Covers Lewis octet theory, formal charges, VSEPR 3D electron pair repulsion geometries, Steric Number calculations, Valence Bond Theory (VBT), hybridization schemes, Molecular Orbital Theory (MOT) bond orders, dipole moments, and hydrogen bonding.',
    readingTimeMinutes: 60,
    sections: [
      {
        sectionTitle: '1. Fundamentals of Chemical Bonding, Formal Charge & Resonance',
        content: [
          'Chemical bonding is driven by the fundamental thermodynamic drive of atoms to lower their potential energy and achieve a stable valence shell electron configuration (usually an octet of 8 valence electrons, mimicking noble gases).',
          'Kossel-Lewis Octet Rule: Atoms achieve stable octets by transferring electrons (ionic bonding) or sharing electron pairs (covalent bonding). Exceptions to Octet Rule: (1) Incomplete octet (e.g. LiCl, BeH2, BF3 with 6 e-), (2) Odd-electron molecules (e.g. NO with 11 valence e-, NO2 with 23 e-), (3) Expanded octet (e.g. PCl5 with 10 e-, SF6 with 12 e-, H2SO4 with 12 e- due to available vacant 3d orbitals).',
          'Formal Charge Concept: Formal charge is the hypothetical charge assigned to an atom in a molecule, assuming all bonding electron pairs are shared equally regardless of electronegativity difference.',
          'Formal Charge Formula: FC = V - L - 1/2 * B, where V = total valence electrons of free atom, L = total non-bonding lone pair electrons, and B = total bonding shared electrons.',
          'Significance of Formal Charge: Structures with lowest formal charges on all atoms and negative formal charges residing on MORE ELECTRONEGATIVE atoms represent the lowest energy, most stable resonance contributors.',
          'Resonance Hybrid & Bond Order: When a single Lewis structure cannot adequately represent a molecule (e.g. O3, CO3²⁻, Benzene), the actual molecule exists as a single static RESONANCE HYBRID of multiple canonical structures.',
          'Resonance Bond Order Formula: Resonance BO = (Total number of bonds between two specific atoms across all canonical forms) / (Total number of canonical structures). For CO3²⁻: BO = (2 + 1 + 1) / 3 = 1.33.'
        ],
        keyEquations: [
          'Formal Charge: FC = V - L - ½ B',
          'Resonance Bond Order = (Total Bonds between Pair) / (Total Canonical Forms)',
          'Dipole Moment Vector: μ = q * d  (1 Debye = 3.33564 × 10⁻³⁰ C·m)'
        ],
        ncertHighlights: [
          'NCERT Class 11 Chemistry Ch 4 (Page 104): "Resonance stabilizes the molecule as energy of resonance hybrid is LOWER than energy of any single canonical structure. Resonance energy = (Actual hybrid energy) - (Energy of most stable canonical structure)."'
        ],
        examShortcuts: [
          '⚡ Carbonate Bond Length Rule: All three C-O bond lengths in CO3²⁻ are EXACTLY EQUAL (129 pm) due to resonance delocalization, lying midway between single C-O (143 pm) and double C=O (122 pm) bond lengths.'
        ]
      },
      {
        sectionTitle: '2. Exhaustive VSEPR Theory: Steric Numbers, 3D Geometries & Lone Pair Repulsions',
        content: [
          'Valence Shell Electron Pair Repulsion (VSEPR) Theory: Proposed by Sidgwick, Powell, Gillespie, and Nyholm, VSEPR dictates that electron pairs surrounding a central atom arrange themselves in 3D space to maximize spatial separation and minimize electrostatic repulsion.',
          'Order of Electron Pair Repulsion Strength: Lone Pair - Lone Pair (lp-lp) > Lone Pair - Bond Pair (lp-bp) > Bond Pair - Bond Pair (bp-bp). Lone pair electrons are under influence of a SINGLE nucleus and occupy larger, more diffuse electron clouds than bonding pairs shared between TWO nuclei.',
          'Steric Number (SN) Calculation Master Formula: SN = 1/2 * [ V + M - C + A ]',
          '  • V = Valence electrons of central atom (Group 1: 1, Gr 2: 2, Gr 13: 3, Gr 14: 4, Gr 15: 5, Gr 16: 6, Gr 17: 7, Gr 18: 8).',
          '  • M = Number of monovalent surrounding atoms (H, F, Cl, Br, I). (Oxygen = 0, Nitrogen = 0).',
          '  • C = Cationic positive charge, A = Anionic negative charge.',
          'Comprehensive Geometry Breakdown by Steric Number:',
          '  • SN = 2 (sp Hybridization): Linear electron geometry. Bond angle = 180°. Examples: BeCl2, CO2, HCN, C2H2.',
          '  • SN = 3 (sp2 Hybridization): Trigonal Planar electron geometry (120°).',
          '      - 0 lp: Trigonal Planar shape (BF3, BCl3, SO3).',
          '      - 1 lp: Bent / V-shaped (SO2, SnCl2, O3). Bond angle reduces from 120° to ~119°.',
          '  • SN = 4 (sp3 Hybridization): Tetrahedral electron geometry (109.5°).',
          '      - 0 lp: Perfect Tetrahedral shape (CH4, CCl4, NH4⁺, SiF4).',
          '      - 1 lp: Trigonal Pyramidal shape (NH3, H3O⁺, PCl3). Bond angle reduces to 107°.',
          '      - 2 lp: Bent / Angular shape (H2O, OF2, SCl2). Bond angle reduces to 104.5°.',
          '  • SN = 5 (sp3d Hybridization): Trigonal Bipyramidal electron geometry.',
          '      - Equatorial Positions (120° apart): 3 positions in horizontal plane. Lone pairs PREFER EQUATORIAL POSITIONS to minimize 90° repulsions!',
          '      - Axial Positions (90° to equatorial plane): 2 positions perpendicular above and below.',
          '      - 0 lp: Trigonal Bipyramidal (PCl5, AsF5).',
          '      - 1 lp: See-Saw shape (SF4, SeF4). Lone pair occupies equatorial position.',
          '      - 2 lp: T-Shaped (ClF3, BrF3). Both lone pairs occupy equatorial positions.',
          '      - 3 lp: Linear shape (XeF2, I3⁻, BrF2⁻). All 3 lone pairs occupy equatorial plane!',
          '  • SN = 6 (sp3d2 Hybridization): Octahedral electron geometry (all 90° angles).',
          '      - Lone pairs PREFER AXIAL POSITIONS (180° apart) to minimize mutual lp-lp repulsion.',
          '      - 0 lp: Perfect Octahedral shape (SF6, SeF6, PF6⁻).',
          '      - 1 lp: Square Pyramidal shape (BrF5, IF5).',
          '      - 2 lp: Square Planar shape (XeF4, ICl4⁻). Lone pairs lie 180° apart above and below the square plane!'
        ],
        keyEquations: [
          'Steric Number Master Equation: SN = ½ [ V + M - C + A ]',
          'Equatorial-Axial Repulsion Count: lp at equatorial = 2 90° lp-bp repulsions; lp at axial = 3 90° lp-bp repulsions'
        ],
        ncertHighlights: [
          'NCERT Class 11 Chemistry Ch 4 (Page 112): "In sp3d hybridization (PCl5), axial P-Cl bonds suffer greater 90° electron repulsion than equatorial P-Cl bonds. Consequently, axial bonds are LONGER (240 pm) and WEAKER than equatorial bonds (202 pm), making PCl5 highly reactive!"'
        ],
        examShortcuts: [
          '⚡ Xe Compound Geometry Super-Hack:',
          '  • XeF2: 2 bp + 3 lp = SN 5 (sp3d Linear)',
          '  • XeF4: 4 bp + 2 lp = SN 6 (sp3d2 Square Planar)',
          '  • XeF6: 6 bp + 1 lp = SN 7 (sp3d3 Distorted Octahedral)',
          '  • XeO3: 3 double bonds (3 σ + 3 π) + 1 lp = SN 4 (sp3 Pyramidal)',
          '  • XeOF4: 5 σ + 1 lp = SN 6 (sp3d2 Square Pyramidal)'
        ]
      },
      {
        sectionTitle: '3. Exhaustive Molecular Orbital Theory (MOT): Energy Diagrams & Bond Order Super-Hacks',
        content: [
          'Molecular Orbital Theory (MOT): Developed by F. Hund and R. S. Mulliken, MOT treats electrons in a molecule as belonging to the entire molecule rather than individual localized atomic bonds.',
          'Linear Combination of Atomic Orbitals (LCAO) Conditions: (1) Combining atomic orbitals must have comparable energies. (2) Combining orbitals must have identical symmetry about the internuclear axis (z-axis). (3) Combining orbitals must overlap to a maximum extent.',
          'Bonding vs Antibonding MOs: Constructive interference (ψ_A + ψ_B) yields a Bonding MO (lower potential energy, electron density concentrated BETWEEN nuclei). Destructive interference (ψ_A - ψ_B) yields an Antibonding MO (*, higher potential energy, nodal plane between nuclei).',
          'Bond Order Definition & Physical Meaning: Bond Order BO = 1/2 * [ N_b - N_a ], where N_b = bonding electrons, N_a = antibonding electrons.',
          'Physical Deductions from Bond Order:',
          '  • BO > 0: Stable molecular entity capable of existence. Higher BO = Greater Bond Dissociation Energy = Shorter Bond Length.',
          '  • BO = 0: Unstable species (e.g. He2 with 2 bonding + 2 antibonding e- ⇒ BO = 0, cannot exist!).',
          '  • Unpaired Electrons: Presence of 1 or more unpaired electrons in MO diagram = PARAMAGNETIC (attracted into magnetic field). All paired electrons = DIAMAGNETIC.',
          'MO Energy Level Sequences:',
          '  • Sequence 1 (For ≤ 14 Electrons: Li2, Be2, B2, C2, N2): σ1s < σ*1s < σ2s < σ*2s < (π2px = π2py) < σ2pz < (π*2px = π*2py) < σ*2pz.',
          '  • Sequence 2 (For > 14 Electrons: O2, F2, Ne2): σ1s < σ*1s < σ2s < σ*2s < σ2pz < (π2px = π2py) < (π*2px = π*2py) < σ*2pz.'
        ],
        keyEquations: [
          'Bond Order: BO = ½ (N_b - N_a)',
          'Magnetic Moment: μ = √[ n(n + 2) ] BM  (n = number of unpaired electrons)',
          'Heteronuclear MO Shift: Lower energy atomic orbital of more electronegative atom contributes more to Bonding MO'
        ],
        ncertHighlights: [
          'NCERT Class 11 Chemistry Ch 4 (Page 125): "The O2 molecule is PARAMAGNETIC with 2 unpaired electrons residing in degenerate antibonding π*2px and π*2py orbitals. Valence Bond Theory incorrectly predicts O2 to be diamagnetic with all paired electrons!"'
        ],
        examShortcuts: [
          '⚡ 10-Second Bond Order Super-Hack (for 10 to 18 electrons):',
          '  • 14 Electrons (N2)    ⇒  BO = 3.0 (Maximum Stability)',
          '  • 13 e- (N2⁺) / 15 e- (O2⁺) ⇒  BO = 2.5',
          '  • 12 e- (C2) / 16 e- (O2)   ⇒  BO = 2.0',
          '  • 11 e- / 17 e- (O2⁻ Superoxide) ⇒  BO = 1.5',
          '  • 10 e- (B2) / 18 e- (F2, O2²⁻ Peroxide) ⇒ BO = 1.0'
        ]
      }
    ]
  },

  // ==========================================
  // 📘 MATHEMATICS: QUADRATIC EQUATIONS
  // ==========================================
  {
    chapterId: 'ch-m9',
    chapterName: 'Quadratic Equations & Location of Roots',
    subject: 'Mathematics',
    category: 'Algebra',
    overview: 'Exhaustive 1-Hour Master Textbook Manual. Covers algebraic foundations of quadratic expressions, Discriminant analysis, Vieta root sum/product relations, Newton-Girard power sums, full 5-case Location of Roots inequality systems, and graph transformation protocols.',
    readingTimeMinutes: 60,
    sections: [
      {
        sectionTitle: '1. Algebraic Foundations, Discriminant Analysis & Vieta Formulas',
        content: [
          'A quadratic equation in one variable x is an algebraic equation of the second degree: f(x) = a x² + b x + c = 0, where a, b, c are real (or complex) coefficients with leading coefficient a ≠ 0.',
          'Geometric Interpretation: The graph of y = f(x) = a x² + b x + c represents a PARABOLA in the Cartesian plane.',
          '  • If a > 0, the parabola opens UPWARD (concave up, has a global minimum at vertex).',
          '  • If a < 0, the parabola opens DOWNWARD (concave down, has a global maximum at vertex).',
          '  • Vertex Coordinates: V = ( -b / 2a , -D / 4a ), where Discriminant D = b² - 4ac.',
          '  • Line of Symmetry: Vertical line x = -b / 2a.',
          'Roots by Quadratic Formula: Completing the square yields roots α, β = [ -b ± √(b² - 4ac) ] / (2a).',
          'Exhaustive Discriminant (D = b² - 4ac) Root Nature Analysis:',
          '  • Case 1 (a, b, c ∈ R and D > 0): Two distinct real roots α ≠ β. Parabola crosses x-axis at two distinct points.',
          '  • Case 2 (a, b, c ∈ R and D = 0): Two equal (coincident) real roots α = β = -b / 2a. Parabola vertex touches x-axis.',
          '  • Case 3 (a, b, c ∈ R and D < 0): No real roots. Roots are complex conjugates α, β = p ± i q (where p = -b/2a, q = √(-D)/2a). Parabola lies ENTIRELY above x-axis (if a > 0) or ENTIRELY below x-axis (if a < 0).',
          '  • Case 4 (a, b, c ∈ Q and D is a perfect square of a rational number): Roots α, β are RATIONAL numbers.',
          '  • Case 5 (a, b, c ∈ Q and D > 0 is NOT a perfect square): Roots α, β are conjugate irrational surds of the form p ± √q.',
          'Vieta Root Relations: Sum of roots α + β = -b/a. Product of roots α * β = c/a. Difference of roots |α - β| = √(D) / |a|.',
          'Newton-Girard Power Sum Theorem: Let S_n = α^n + β^n for the quadratic equation a x² + b x + c = 0. Since α and β satisfy the equation: a α² + b α + c = 0 and a β² + b β + c = 0. Multiplying by α^(n-2) and β^(n-2) and adding yields the exact recurrence relation: a S_n + b S_(n-1) + c S_(n-2) = 0!'
        ],
        keyEquations: [
          'Quadratic Formula: x = (-b ± √D) / (2a)',
          'Discriminant: D = b² - 4ac',
          'Parabola Vertex Coordinates: V = ( -b/2a , -D/4a )',
          'Vieta Relations: α + β = -b/a ,  α β = c/a',
          'Difference of Roots: |α - β| = √D / |a|',
          'Newton-Girard Power Sum Recurrence: a S_n + b S_(n-1) + c S_(n-2) = 0'
        ],
        ncertHighlights: [
          'NCERT Class 11 Mathematics Ch 5: "If coefficients a, b, c are real numbers, complex roots ALWAYS occur in conjugate pairs (p + i q and p - i q). A polynomial equation of odd degree with real coefficients must have AT LEAST ONE real root."'
        ],
        examShortcuts: [
          '⚡ Newton-Girard JEE Advanced Hack: If a = 1, b = -2, c = -1 (x² - 2x - 1 = 0), then S_n - 2 S_(n-1) - S_(n-2) = 0. To evaluate (S10 - 2 S9) / S8, rewrite as S10 - 2 S9 = S8, giving an immediate answer of 1 without ever calculating α or β!'
        ]
      },
      {
        sectionTitle: '2. Exhaustive Location of Roots: Full 5-Case Inequality Protocol',
        content: [
          'Location of Roots problems require determining valid ranges for a parameter (e.g. m) such that roots α, β satisfy specified geometric bounds relative to real constants k, k1, k2.',
          'CASE 1: Both roots are greater than a constant k (α > k and β > k):',
          '  • Condition 1: D ≥ 0 (Ensures real roots exist).',
          '  • Condition 2: Vertex -b/(2a) > k (Ensures parabola line of symmetry is to the right of k).',
          '  • Condition 3: a * f(k) > 0 (Ensures graph at x = k has the same sign as leading coefficient a).',
          'CASE 2: Both roots are less than a constant k (α < k and β < k):',
          '  • Condition 1: D ≥ 0.',
          '  • Condition 2: Vertex -b/(2a) < k.',
          '  • Condition 3: a * f(k) > 0.',
          'CASE 3: Constant k lies STRICTLY between the roots (α < k < β):',
          '  • Single Mandatory Condition: a * f(k) < 0.',
          '  • Note: When a * f(k) < 0, the parabola is guaranteed to cross the x-axis at two distinct points straddling k, which AUTOMATICALLY forces D > 0 without needing a separate D ≥ 0 inequality!',
          'CASE 4: Exactly one root lies in the open interval (k1, k2):',
          '  • Condition: f(k1) * f(k2) < 0 (Graph crosses x-axis between k1 and k2).',
          'CASE 5: Both roots lie strictly inside the open interval (k1, k2) (k1 < α ≤ β < k2):',
          '  • Condition 1: D ≥ 0.',
          '  • Condition 2: k1 < -b/(2a) < k2 (Vertex lies inside interval).',
          '  • Condition 3: a * f(k1) > 0.',
          '  • Condition 4: a * f(k2) > 0.'
        ],
        keyEquations: [
          'Both Roots > k System: (1) D ≥ 0 ∩ (2) -b/(2a) > k ∩ (3) a f(k) > 0',
          'Both Roots < k System: (1) D ≥ 0 ∩ (2) -b/(2a) < k ∩ (3) a f(k) > 0',
          'k Between Roots System: a f(k) < 0',
          'One Root in (k₁, k₂): f(k₁) f(k₂) < 0',
          'Both Roots in (k₁, k₂): (1) D ≥ 0 ∩ (2) k₁ < -b/(2a) < k₂ ∩ (3) a f(k₁) > 0 ∩ (4) a f(k₂) > 0'
        ],
        ncertHighlights: [
          'NCERT Highlight: "The condition a * f(k) < 0 is both necessary and sufficient for k to lie between the roots of a quadratic equation with real coefficients."'
        ],
        examShortcuts: [
          '⚡ Inequality Intersection Rule: Solve each of the numbered conditions independently to get parameter sets S1, S2, S3... The final valid parameter range is the INTERSECTION of all set conditions: S_final = S1 ∩ S2 ∩ S3.'
        ]
      }
    ]
  }
];

export function getComprehensiveNotesByChapterId(chapterId: string): ComprehensiveChapterNotes | undefined {
  return comprehensiveNotesLibrary.find((n) => n.chapterId === chapterId || n.chapterId === `ch-${chapterId}`);
}
