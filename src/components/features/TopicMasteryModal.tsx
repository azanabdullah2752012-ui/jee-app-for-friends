import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge, getSubjectBadgeVariant } from '../ui/Badge';
import { useApp } from '../../app/AppContext';
import type { TopicMasteryData } from '../../types';
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Dumbbell,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  Video,
  PlusCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface TopicMasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicData: TopicMasteryData;
}

export const TopicMasteryModal: React.FC<TopicMasteryModalProps> = ({
  isOpen,
  onClose,
  topicData,
}) => {
  const { addMistake, openVideoPlayer } = useApp();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Diagnostic Quiz State (Step 3)
  const [selectedDiagAnswers, setSelectedDiagAnswers] = useState<Record<string, number>>({});
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // Practice Problems State (Step 4)
  const [selectedPracticeAnswers, setSelectedPracticeAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [addedMistakes, setAddedMistakes] = useState<Record<string, boolean>>({});

  if (!isOpen || !topicData) return null;

  // Step 3 Diagnostic Score Calculation
  const diagCorrectCount = topicData.diagnosticQuestions.reduce((acc, q) => {
    return selectedDiagAnswers[q.id] === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);
  const diagTotal = topicData.diagnosticQuestions.length;
  const isDiagPassed = diagSubmitted && diagCorrectCount >= Math.ceil(diagTotal * 0.6);

  const steps = [
    { num: 1, label: '1. Learn', icon: BookOpen },
    { num: 2, label: '2. Understand', icon: BrainCircuit },
    { num: 3, label: '3. Check Understanding', icon: CheckCircle2 },
    { num: 4, label: '4. Practice Problems', icon: Dumbbell },
  ];

  const handleDiagSelect = (questionId: string, optionIdx: number) => {
    if (!diagSubmitted) {
      setSelectedDiagAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    }
  };

  const handlePracticeSelect = (problemId: string, optionIdx: number) => {
    setSelectedPracticeAnswers((prev) => ({ ...prev, [problemId]: optionIdx }));
  };

  const handleRevealHint = (problemId: string, maxHints: number) => {
    setRevealedHints((prev) => {
      const current = prev[problemId] || 0;
      return { ...prev, [problemId]: Math.min(current + 1, maxHints) };
    });
  };

  const handleToggleSolution = (problemId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [problemId]: !prev[problemId] }));
  };

  const handleLogMistake = (problem: typeof topicData.practiceProblems[0]) => {
    addMistake({
      title: problem.questionText.slice(0, 60) + '...',
      subject: topicData.subject,
      chapter: topicData.chapter,
      topic: topicData.topicTitle,
      errorType: 'Conceptual',
      whyWrong: 'Selected incorrect option during topic practice grinding session.',
      correctApproach: problem.solutionSteps.join(' '),
      keyTakeaway: problem.takeaway,
    });
    setAddedMistakes((prev) => ({ ...prev, [problem.id]: true }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="space-y-6 select-none">
        
        {/* Header Title & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={getSubjectBadgeVariant(topicData.subject)} size="md">
                {topicData.subject}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">• {topicData.chapter}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100 font-heading">
              {topicData.topicTitle}
            </h2>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-violet-400">Mastery Pipeline</span>
            <p className="text-xs text-slate-400 font-mono">4-Step Guided Mastery</p>
          </div>
        </div>

        {/* 4-Step Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0F1626] p-1.5 rounded-2xl border border-slate-800">
          {steps.map((s) => {
            const isActive = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num as any)}
                className={clsx(
                  'flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <s.icon className="w-4 h-4" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* STEP 1: LEARN */}
        {activeStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            {/* Video Lesson Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/60 via-[#131B2E] to-indigo-950/60 border border-violet-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
                  <Video className="w-4 h-4" />
                  <span>Curated #1 Recommended Lecture</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{topicData.learnVideoTitle}</h3>
                <p className="text-xs text-slate-400">{topicData.learnVideoDuration}</p>
              </div>

              <Button
                variant="glow"
                size="sm"
                onClick={() =>
                  openVideoPlayer(
                    topicData.learnVideoTitle,
                    'https://www.youtube.com/embed/z13-pD43g88'
                  )
                }
              >
                Watch Breakdown
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Core Formula Card */}
            <div className="p-4 bg-[#0B0F19] rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Master Formula & Theorem</span>
              </div>
              <div className="font-mono text-sm md:text-base text-slate-100 bg-[#070A12] p-3 rounded-lg border border-slate-800 font-bold">
                {topicData.learnFormula}
              </div>
            </div>

            {/* Core Theory Bullet Points */}
            <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                High-Yield Theory Essentials
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {topicData.learnTheory.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-violet-400 font-bold">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Step Trigger */}
            <div className="flex justify-end pt-2">
              <Button variant="primary" size="md" onClick={() => setActiveStep(2)}>
                Proceed to Step 2: Understand
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: UNDERSTAND */}
        {activeStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            {/* Visual Mind Map Flow */}
            <div className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                Conceptual Mind Map & Mental Model
              </h3>
              <div className="space-y-2">
                {topicData.understandMindmap.map((stepText, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800/80 text-xs flex items-center gap-3 text-slate-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-indigo-800/50">
                      {idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Student Traps */}
            <div className="p-5 bg-rose-950/20 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Common Traps — "Where 80% of Students Lose Marks"
              </h3>
              <ul className="space-y-2 text-xs text-rose-200">
                {topicData.commonTraps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">⚠️</span>
                    <span className="leading-relaxed">{trap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Edge Cases */}
            <div className="p-5 bg-amber-950/20 rounded-2xl border border-amber-800/40 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Boundary Conditions & Edge Cases
              </h3>
              <ul className="space-y-2 text-xs text-amber-100">
                {topicData.edgeCases.map((ec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-relaxed">{ec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Step Trigger */}
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="md" onClick={() => setActiveStep(1)}>
                Back to Step 1
              </Button>
              <Button variant="primary" size="md" onClick={() => setActiveStep(3)}>
                Proceed to Step 3: Check Understanding
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: CHECK UNDERSTANDING */}
        {activeStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Diagnostic Checkpoint
                </h3>
                <p className="text-xs text-slate-400">
                  Answer these 3 conceptual questions to verify understanding before grinding problem sets.
                </p>
              </div>

              {diagSubmitted && (
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-300">Score</span>
                  <div
                    className={clsx(
                      'text-lg font-mono font-extrabold',
                      isDiagPassed ? 'text-emerald-400' : 'text-rose-400'
                    )}
                  >
                    {diagCorrectCount} / {diagTotal}
                  </div>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {topicData.diagnosticQuestions.map((q, qIdx) => {
                const userSelected = selectedDiagAnswers[q.id];

                return (
                  <div key={q.id} className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs md:text-sm font-bold text-slate-100">
                      Q{qIdx + 1}: {q.questionText}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisOption = userSelected === optIdx;
                        const isCorrectOption = optIdx === q.correctOptionIndex;

                        let btnStyle = 'bg-[#0B0F19] border-slate-800 text-slate-300 hover:border-slate-700';

                        if (diagSubmitted) {
                          if (isCorrectOption) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isThisOption && !isCorrectOption) {
                            btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                          }
                        } else if (isThisOption) {
                          btnStyle = 'bg-violet-950/80 border-violet-500 text-violet-200 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleDiagSelect(q.id, optIdx)}
                            className={clsx('p-3 rounded-xl border text-xs text-left transition-all cursor-pointer', btnStyle)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {diagSubmitted && (
                      <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs text-slate-300 animate-fade-in">
                        <span className="font-bold text-violet-400 block mb-1">Explanation:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Checkpoint Actions */}
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              {!diagSubmitted ? (
                <Button
                  variant="glow"
                  size="md"
                  onClick={() => setDiagSubmitted(true)}
                  disabled={Object.keys(selectedDiagAnswers).length < diagTotal}
                >
                  Submit Diagnostic Checkpoint
                </Button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setDiagSubmitted(false);
                      setSelectedDiagAnswers({});
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retry Checkpoint
                  </Button>

                  <Button
                    variant={isDiagPassed ? 'glow' : 'secondary'}
                    size="md"
                    onClick={() => setActiveStep(4)}
                  >
                    Proceed to Step 4: Practice Problems
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: PRACTICE PROBLEMS */}
        {activeStep === 4 && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-amber-400" />
                  Problem Grinding Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Solve graded PYQs and practice questions with hint reveals and solution breakdowns.
                </p>
              </div>
            </div>

            {/* Problem List */}
            <div className="space-y-6">
              {topicData.practiceProblems.map((prob, pIdx) => {
                const userSelected = selectedPracticeAnswers[prob.id];
                const hintsRevealedCount = revealedHints[prob.id] || 0;
                const isSolVisible = revealedSolutions[prob.id];
                const isMistakeLogged = addedMistakes[prob.id];

                return (
                  <div key={prob.id} className="p-6 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 font-mono">
                        Problem {pIdx + 1} of {topicData.practiceProblems.length}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/50 font-bold">
                        {prob.difficulty}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-100 leading-relaxed">
                      "{prob.questionText}"
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {prob.options.map((opt, optIdx) => {
                        const isThis = userSelected === optIdx;
                        const isCorrect = optIdx === prob.correctOptionIndex;

                        let btnStyle = 'bg-[#0B0F19] border-slate-800 text-slate-300 hover:border-slate-700';

                        if (userSelected !== undefined) {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isThis && !isCorrect) {
                            btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handlePracticeSelect(prob.id, optIdx)}
                            className={clsx('p-3 rounded-xl border text-xs text-left transition-all cursor-pointer', btnStyle)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Progressive Hints Drawer */}
                    <div className="space-y-2 bg-[#0B0F19] p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-400" />
                          Progressive Hints ({hintsRevealedCount} of {prob.hints.length} revealed)
                        </span>

                        {hintsRevealedCount < prob.hints.length && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevealHint(prob.id, prob.hints.length)}
                          >
                            Reveal Hint {hintsRevealedCount + 1}
                          </Button>
                        )}
                      </div>

                      {prob.hints.slice(0, hintsRevealedCount).map((h, hIdx) => (
                        <div key={hIdx} className="p-2.5 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-100 animate-fade-in">
                          <span className="font-bold text-amber-400 mr-2">Hint {hIdx + 1}:</span>
                          {h}
                        </div>
                      ))}
                    </div>

                    {/* Actions: Show Solution & Add Mistake */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleToggleSolution(prob.id)}
                      >
                        {isSolVisible ? 'Hide Solution' : 'Show Full Solution'}
                      </Button>

                      {userSelected !== undefined && userSelected !== prob.correctOptionIndex && (
                        <Button
                          variant={isMistakeLogged ? 'outline' : 'danger'}
                          size="sm"
                          disabled={isMistakeLogged}
                          onClick={() => handleLogMistake(prob)}
                        >
                          {isMistakeLogged ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Logged to Mistake Notebook
                            </>
                          ) : (
                            <>
                              <PlusCircle className="w-3.5 h-3.5" />
                              Log Wrong Attempt to Mistake Notebook
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Full Solution Rendering */}
                    {isSolVisible && (
                      <div className="p-4 bg-[#070A12] border border-violet-800/60 rounded-xl space-y-2 text-xs text-slate-200 font-mono animate-fade-in">
                        <div className="font-bold text-violet-400">Step-by-Step Solution:</div>
                        {prob.solutionSteps.map((step, sIdx) => (
                          <div key={sIdx}>{step}</div>
                        ))}
                        <div className="p-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-emerald-300 font-sans mt-2">
                          <span className="font-bold text-emerald-400">Key Takeaway:</span> {prob.takeaway}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
