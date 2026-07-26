export interface RichAiResponse {
  markdownText: string;
  firstPrinciplesExplanation: string;
  socraticHint: string;
  stepByStepSolution: string[];
  keyFormula: string;
  commonTrapWarning: string;
}

export function getRichAiResponse(userQuery: string, userName: string = 'Aspirant', targetRank: number = 500): RichAiResponse {
  const qLower = userQuery.trim().toLowerCase();

  // 1. Casual Greetings & Conversational Queries
  if (/^(hi|hello|hey|greetings|good morning|good evening|who are you|help|thanks|thank you)$/i.test(qLower) || qLower === 'i am' || qLower.startsWith('i am ') || qLower.startsWith("i'm ")) {
    const greetingText = `Hello **${userName}**! 👋 Welcome to your **AI Socratic Tutor**.

I am tuned specifically for **JEE Main & JEE Advanced (Physics, Chemistry, and Mathematics)** targeting AIR ${targetRank}. 

I can help you with:
1. **First-Principles Derivations** (e.g. *Rotational Dynamics, Integration by Parts, VSEPR Geometries*).
2. **NCERT Direct Line-by-Line Edge Cases** & Reaction Mechanisms (*SN1 vs SN2, Cannizzaro, MOT*).
3. **JEE Speed Hacks & Exam Traps** to save time and eliminate calculation mistakes.

*What specific question, equation, or topic would you like to master today?*`;

    return {
      markdownText: greetingText,
      firstPrinciplesExplanation: `I'm ready to help you master any JEE topic using first-principles reasoning and Socratic problem-solving.`,
      socraticHint: `Try asking about a specific problem, e.g. "Explain Thermodynamics First & Second Law" or "How to solve Integration by Parts?"`,
      stepByStepSolution: [
        `1. Ask any specific question or problem statement you find challenging.`,
        `2. Request visual derivations, formula cheat sheets, or NCERT edge cases.`,
        `3. Save key takeaways directly into your Mistake Notebook!`,
      ],
      keyFormula: `JEE Main & Advanced Socratic Mentor Mode Active ⚡`,
      commonTrapWarning: `Tip: Ask specific questions or choose one of the quick topic prompts above!`,
    };
  }

  // 2. THERMODYNAMICS & THERMOCHEMISTRY
  if (qLower.includes('thermodynam') || qLower.includes('first law') || qLower.includes('second law') || qLower.includes('entropy') || qLower.includes('gibbs')) {
    const text = `### 🔥 Thermodynamics: 1st & 2nd Laws (Physical Chemistry)

#### 1. First Law of Thermodynamics (Energy Conservation)
The First Law states that energy cannot be created or destroyed, only transformed:
$$\\Delta U = q + w$$
- **Internal Energy ($\\Delta U$)**: State function dependent solely on temperature for ideal gases ($ \\Delta U = n C_v \\Delta T $).
- **Work Done ($w$)**: For reversible expansion against external pressure $P_{ext}$:
  $$w_{rev} = -\\int P dV = -nRT \\ln\\left(\\frac{V_2}{V_1}\\right)$$

#### 2. Second Law of Thermodynamics & Entropy ($\\Delta S$)
Spontaneity of any physical or chemical process is governed by the total entropy change of the universe:
$$\\Delta S_{total} = \\Delta S_{system} + \\Delta S_{surroundings} > 0 \\quad (\\text{Spontaneous Process})$$
- **System Entropy Change**: $\\Delta S_{sys} = \\int \\frac{dq_{rev}}{T}$
- **Ideal Gas Expansion Entropy**:
  $$\\Delta S = n C_v \\ln\\left(\\frac{T_2}{T_1}\\right) + n R \\ln\\left(\\frac{V_2}{V_1}\\right)$$

#### 3. Gibbs Free Energy ($\\Delta G$) Criteria at Constant $T, P$
$$\\Delta G = \\Delta H - T \\Delta S$$
- $\\Delta G < 0$: Spontaneous process.
- $\\Delta G = 0$: State of chemical/physical equilibrium ($ \\Delta G^\\circ = -RT \\ln K_{eq} $).
- $\\Delta G > 0$: Non-spontaneous (requires external work input).

---
#### ⚡ Key JEE Exam Trap
> **NTA Trap**: Confusing **Isothermal Reversible Expansion** vs **Isothermal Irreversible Expansion**!
> For an ideal gas undergoing isothermal expansion: $\\Delta U = 0$ in both cases, but $w_{rev} = -nRT \\ln(V_2/V_1)$ while $w_{irrev} = -P_{ext}(V_2 - V_1)$. Never mix the work formulas!`;

    return {
      markdownText: text,
      firstPrinciplesExplanation: `Internal energy U is a state function dependent on T. Heat q and work w are path functions. Spontaneity requires ΔS_total > 0 or ΔG_system < 0 at constant T and P.`,
      socraticHint: `Think: What happens to ΔU when an ideal gas expands isothermally into a vacuum (free expansion)?`,
      stepByStepSolution: [
        `Step 1: Identify process type (Isothermal, Adiabatic, Isochoric, or Isobaric) and reversibility.`,
        `Step 2: Calculate q, w, ΔU, and ΔH using path-specific equations.`,
        `Step 3: Compute ΔS_system = q_rev / T and ΔS_surroundings = -q_actual / T.`,
        `Step 4: Verify ΔG = ΔH - T*ΔS to check spontaneity.`,
      ],
      keyFormula: `ΔU = q + w  |  ΔG° = -RT ln(K_eq)  |  w_rev = -nRT ln(V2/V1)`,
      commonTrapWarning: `In free expansion into vacuum (P_ext = 0): w = 0, and for ideal gas ΔU = 0, hence q = 0!`,
    };
  }

  // 3. ROTATIONAL MOTION & RIGID BODY DYNAMICS
  if (qLower.includes('rotat') || qLower.includes('rigid') || qLower.includes('moment of inertia') || qLower.includes('torque') || qLower.includes('angular momentum')) {
    const text = `### 🌀 Rotational Dynamics & Rigid Body Mechanics (Physics)

#### 1. Moment of Inertia ($I$) & Parallel Axis Theorem
Moment of inertia represents rotational inertia: $I = \\int r^2 dm$.
- **Parallel Axis Theorem**: Applies ONLY when starting from the Center of Mass axis ($I_{cm}$):
  $$I_{parallel} = I_{cm} + M d^2$$
- **Perpendicular Axis Theorem** (2D planar bodies only): $I_z = I_x + I_y$.

#### 2. Torque ($\\vec{\\tau}$) & Newton's 2nd Law for Rotation
$$\\vec{\\tau}_{net} = I \\vec{\\alpha} = \\vec{r} \\times \\vec{F}$$

#### 3. Conservation of Angular Momentum ($\\vec{L}$)
When net external torque about a fixed anchor point is zero ($\\vec{\\tau}_{ext} = 0$):
$$\\vec{L}_i = \\vec{L}_f \\implies I_1 \\omega_1 = I_2 \\omega_2$$

#### 4. Pure Rolling Motion Constraint ($v_{cm} = R \\omega$)
For a sphere/cylinder rolling without slipping on a surface:
- Acceleration of point of contact with ground is zero.
- Total Kinetic Energy: $K_{total} = \\frac{1}{2} M v_{cm}^2 + \\frac{1}{2} I_{cm} \\omega^2 = \\frac{1}{2} M v_{cm}^2 \\left(1 + \\frac{k^2}{R^2}\\right)$.

---
#### ⚡ Key JEE Exam Trap
> **NTA Trap**: Applying Parallel Axis Theorem from an arbitrary axis! $I_{new} = I_{old} + Md^2$ is **INVALID** unless $I_{old}$ is explicitly through the Center of Mass!`;

    return {
      markdownText: text,
      firstPrinciplesExplanation: `Rotational motion maps directly to translational motion by replacing mass M with Moment of Inertia I, linear velocity v with angular velocity ω, and force F with torque τ.`,
      socraticHint: `Think: About which point is net external torque zero when a projectile collides with a rod lying on a smooth table?`,
      stepByStepSolution: [
        `Step 1: Draw FBD including normal reaction, weight, friction force, and pseudo forces.`,
        `Step 2: Choose anchor point for Torque. Calculate I about that anchor.`,
        `Step 3: Write Σ F_ext = M*a_cm and Σ τ_cm = I_cm * α.`,
        `Step 4: Apply rolling constraint a_cm = R*α if no slipping occurs.`,
      ],
      keyFormula: `I_parallel = I_cm + M*d^2  |  τ = I*α  |  L = I*ω  |  K_roll = 1/2 M v^2 (1 + k^2/R^2)`,
      commonTrapWarning: `Static friction force in pure rolling does NO work because point of contact has zero instantaneous velocity!`,
    };
  }

  // 4. INTEGRATION & CALCULUS
  if (qLower.includes('integrat') || qLower.includes('calculus') || qLower.includes('derivative') || qLower.includes('parts') || qLower.includes('trigonometr')) {
    const text = `### 📐 Advanced Integration Techniques (Mathematics)

#### 1. Integration by Parts (ILATE Rule)
$$\\int u \\, dv = u v - \\int v \\, du$$
Choose $u$ in order of **ILATE**: **I**nverse, **L**ogarithmic, **A**lgebraic, **T**rigonometric, **E**xponential.

#### 2. King's Property of Definite Integrals
$$\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx$$
- Special Case ($a = 0$): $\\int_0^a f(x) \\, dx = \\int_0^a f(a - x) \\, dx$.
- Essential for eliminating trigonometric powers like $\\sin^n x / (\\sin^n x + \\cos^n x)$.

#### 3. Standard Trigonometric Substitutions
- $\\sqrt{a^2 - x^2} \\implies$ Let $x = a \\sin\\theta$ or $a \\cos\\theta$
- $\\sqrt{a^2 + x^2} \\implies$ Let $x = a \\tan\\theta$
- $\\sqrt{x^2 - a^2} \\implies$ Let $x = a \\sec\\theta$

---
#### ⚡ Key JEE Exam Trap
> **NTA Trap**: Forgetting domain restrictions on substitution! When substituting $x = g(t)$, you MUST change the limits of integration according to $t_1 = g^{-1}(a)$ and $t_2 = g^{-1}(b)$.`;

    return {
      markdownText: text,
      firstPrinciplesExplanation: `Integration is the continuous limit of Riemann summation. Definite integral properties allow simplifying complex integrands via symmetry transformations.`,
      socraticHint: `Think: What happens when you add I = ∫_0^(π/2) (sin x / (sin x + cos x)) dx to itself after applying King's Property?`,
      stepByStepSolution: [
        `Step 1: Check integrand symmetry. Apply King's Property I = ∫_a^b f(a+b-x) dx.`,
        `Step 2: Add original integral I to transformed integral I to get 2I.`,
        `Step 3: Simplify integrand terms (often cancels to 1).`,
        `Step 4: Evaluate 2I = (b - a) => I = (b - a) / 2.`,
      ],
      keyFormula: `∫ u dv = u*v - ∫ v du  |  ∫_0^a f(x)dx = ∫_0^a f(a-x)dx`,
      commonTrapWarning: `When evaluating ∫ f'(x)/f(x) dx = ln|f(x)| + C, do not omit the absolute value sign!`,
    };
  }

  // 5. ORGANIC REACTION MECHANISMS (SN1 vs SN2)
  if (qLower.includes('organic') || qLower.includes('sn1') || qLower.includes('sn2') || qLower.includes('reaction mechanism') || qLower.includes('carbocation')) {
    const text = `### 🧪 Organic Reaction Mechanisms: $S_N1$ vs $S_N2$ (Chemistry)

#### Comparison Table:
| Property | $S_N1$ Mechanism | $S_N2$ Mechanism |
| :--- | :--- | :--- |
| **Kinetics** | First Order: $Rate = k[R-X]$ | Second Order: $Rate = k[R-X][Nu^-]$ |
| **Steps** | 2 Steps via **Carbocation Intermediate** | 1 Step via **Transition State** |
| **Substrate Reactivity** | $3^\circ > 2^\circ > 1^\circ$ (Carbocation stability) | $1^\circ > 2^\circ > 3^\circ$ (Steric hindrance) |
| **Stereochemistry** | **Racemization** (Retention + Inversion) | **100% Walden Inversion** |
| **Solvent** | Polar Protic ($H_2O, EtOH, MeOH$) | Polar Aprotic ($DMSO, DMF, Acetone$) |
| **Nucleophile** | Weak Nucleophile ($H_2O, ROH$) | Strong Nucleophile ($CN^-, I^-, OH^-, RO^-$) |

---
#### ⚡ Key JEE Exam Trap
> **NTA Trap**: Carbocation Rearrangements in $S_N1$! Always check for 1,2-Hydride shifts or 1,2-Methyl shifts to form a more stable $3^\circ$ carbocation before nucleophilic attack!`;

    return {
      markdownText: text,
      firstPrinciplesExplanation: `SN1 proceeds via carbocation formation (rate determining step), allowing rearrangements. SN2 proceeds via concerted backside attack, causing Walden inversion without intermediate formation.`,
      socraticHint: `Think: Why does a polar aprotic solvent like Acetone accelerate SN2 reactions compared to Water?`,
      stepByStepSolution: [
        `Step 1: Analyze substrate degree (1°, 2°, or 3° alkyl halide).`,
        `Step 2: Inspect nucleophile strength (Weak -> SN1, Strong -> SN2).`,
        `Step 3: Check solvent (Polar Protic -> SN1, Polar Aprotic -> SN2).`,
        `Step 4: Draw stereochemistry (Walden Inversion for SN2, Racemic Mixture for SN1).`,
      ],
      keyFormula: `Rate_SN1 = k[RX]  |  Rate_SN2 = k[RX][Nu-]  |  Walden Inversion in SN2`,
      commonTrapWarning: `Neopentyl halide (1° alkyl halide) is extremely unreactive toward SN2 due to severe steric hindrance from the bulky t-butyl group!`,
    };
  }

  // 6. DEFAULT GENERAL ACADEMIC QUERY RESPONSE
  const text = `### 📚 Socratic Breakdown & Guidance for: **${userQuery}**

#### 1. Core Principle & Intuition
To master **${userQuery}**, deconstruct the concept from first principles:
- **Foundational Anchor**: Identify the governing physical conservation laws, mathematical axioms, or chemical equilibrium constraints.
- **Physical Symmetries**: Determine boundary parameters, invariant quantities, and reference frames.

#### 2. Systematic 3-Step Problem-Solving Approach
1. **Analyze Constraints**: Read the problem statement to identify target unknown variables versus given constant parameters.
2. **Apply Core Governing Equation**: Select the precise formula or physical law governing the phenomenon.
3. **Verify Edge Cases**: Test extreme limits (e.g. $t \\to 0$, $T \\to \\infty$, or $x = 0$) to confirm mathematical and physical dimensional consistency.

---
#### ⚡ Recommended Practice Action
- Solve 3–5 Past Year Questions (NTA JEE Main & Advanced) on **${userQuery}** to build automatic pattern recognition.
- If you hit a calculation error, log it into your **Mistake Notebook** for active spaced revision!`;

  return {
    markdownText: text,
    firstPrinciplesExplanation: `Deconstructing "${userQuery}" from first principles: Identify core physical laws, mathematical domain constraints, and chemical stability factors.`,
    socraticHint: `What specific subtopic or equation within "${userQuery}" would you like to derive step-by-step?`,
    stepByStepSolution: [
      `Step 1: Define physical/mathematical parameters and boundary conditions.`,
      `Step 2: Apply fundamental governing equation.`,
      `Step 3: Resolve component equations systematically.`,
      `Step 4: Test dimensional consistency and edge cases.`,
    ],
    keyFormula: `First-Principles Analytical Reasoning Mode Active ⚡`,
    commonTrapWarning: `Always verify units, domain constraints, and physical dimensional consistency before finalizing calculations!`,
  };
}
