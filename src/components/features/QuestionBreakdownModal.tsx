import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge, getSubjectBadgeVariant } from '../ui/Badge';
import { useApp } from '../../app/AppContext';
import { Lightbulb, ChevronRight, CheckCircle2, BookOpen, Target, BrainCircuit } from 'lucide-react';

export const QuestionBreakdownModal: React.FC = () => {
  const { isQuestionBreakdownOpen, setIsQuestionBreakdownOpen, activeQuestionBreakdown } = useApp();
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);

  if (!activeQuestionBreakdown) return null;

  const handleRevealNextHint = () => {
    if (revealedHints < activeQuestionBreakdown.hints.length) {
      setRevealedHints((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setRevealedHints(0);
    setShowSolution(false);
  };

  return (
    <Modal
      isOpen={isQuestionBreakdownOpen}
      onClose={() => {
        setIsQuestionBreakdownOpen(false);
        handleReset();
      }}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Header Badge & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Badge variant={getSubjectBadgeVariant(activeQuestionBreakdown.subject)} size="md">
              {activeQuestionBreakdown.subject}
            </Badge>
            <span className="text-xs text-slate-400 font-medium">• {activeQuestionBreakdown.chapter}</span>
            <span className="text-xs text-slate-500 font-medium">• {activeQuestionBreakdown.topic}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-800/50 font-bold">
              {activeQuestionBreakdown.difficulty}
            </span>
          </div>
        </div>

        {/* Question Statement Box */}
        <div className="bg-[#0B0F19] p-5 rounded-xl border border-slate-800/90 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <p className="text-base text-slate-100 leading-relaxed font-medium">
            "{activeQuestionBreakdown.questionText}"
          </p>
        </div>

        {/* Structured Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Given Data */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/70">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Given Data
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeQuestionBreakdown.givenData.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Need To Find */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/70">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Target className="w-4 h-4 text-amber-400" />
              Need To Find
            </h4>
            <p className="text-xs text-amber-200 font-semibold bg-amber-950/30 p-2.5 rounded-lg border border-amber-800/40">
              {activeQuestionBreakdown.needToFind}
            </p>
          </div>
        </div>

        {/* Prerequisites & Required Concepts */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/70">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            Required Concepts & Prerequisites
          </h4>
          <div className="flex flex-wrap gap-2">
            {activeQuestionBreakdown.requiredConcepts.map((concept, idx) => (
              <span key={idx} className="text-xs bg-indigo-950/60 text-indigo-200 border border-indigo-800/50 px-3 py-1 rounded-lg">
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Progressive Hints Engine */}
        <div className="space-y-3 bg-[#0F1626] p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              Progressive Hints ({revealedHints} of {activeQuestionBreakdown.hints.length} revealed)
            </h4>
            {revealedHints < activeQuestionBreakdown.hints.length && (
              <Button size="sm" variant="outline" onClick={handleRevealNextHint}>
                Reveal Hint {revealedHints + 1}
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {activeQuestionBreakdown.hints.slice(0, revealedHints).map((hint, idx) => (
              <div key={idx} className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-100 animate-fade-in">
                <span className="font-bold text-amber-400 mr-2">Hint {idx + 1}:</span>
                {hint}
              </div>
            ))}

            {revealedHints === 0 && (
              <p className="text-xs text-slate-500 italic">
                Stuck? Try revealing Hint 1 to guide your reasoning without spoiling the solution.
              </p>
            )}
          </div>
        </div>

        {/* Complete Solution Section */}
        {showSolution ? (
          <div className="bg-slate-900 p-5 rounded-xl border border-violet-800/60 space-y-3 animate-fade-in">
            <h4 className="text-sm font-bold text-violet-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Full Step-by-Step Solution
            </h4>
            <div className="space-y-2 text-xs text-slate-200 font-mono leading-relaxed bg-[#0B0F19] p-4 rounded-lg border border-slate-800">
              {activeQuestionBreakdown.solutionSteps.map((step, idx) => (
                <div key={idx} className="pb-1 border-b border-slate-800/60 last:border-0">
                  {step}
                </div>
              ))}
            </div>
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/50 rounded-lg text-xs text-emerald-300">
              <span className="font-bold text-emerald-400">Key Takeaway:</span> {activeQuestionBreakdown.keyTakeaway}
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <Button variant="glow" size="md" onClick={() => setShowSolution(true)}>
              Show Full Solution & Takeaway
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
