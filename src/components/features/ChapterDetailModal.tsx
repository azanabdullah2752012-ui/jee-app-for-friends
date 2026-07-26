import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge, getSubjectBadgeVariant } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import type { ChapterDetailData } from '../../types';
import { getComprehensiveNotesByChapterId } from '../../services/comprehensiveNotesData';
import { useApp } from '../../app/AppContext';
import {
  Brain,
  FileText,
  Video,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Zap,
  BarChart3,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Layers,
  BookOpen,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface ChapterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterData: ChapterDetailData;
}

export const ChapterDetailModal: React.FC<ChapterDetailModalProps> = ({
  isOpen,
  onClose,
  chapterData,
}) => {
  const { openVideoPlayer } = useApp();
  const [activeTab, setActiveTab] = useState<string>('notes'); // Default to Ultra-Comprehensive Notes
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Expanded Socratic Accordion State
  const [openSocraticIdx, setOpenSocraticIdx] = useState<Record<string, boolean>>({});

  // Subtopic Completion Toggles
  const [subtopicStatus, setSubtopicStatus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    chapterData?.subtopics.forEach((st) => {
      initial[st.id] = st.isCompleted;
    });
    return initial;
  });

  // Practice Level Tab
  const [practiceTab, setPracticeTab] = useState<'basic' | 'main' | 'advanced'>('main');

  if (!isOpen || !chapterData) return null;

  const comprehensiveNotes = getComprehensiveNotesByChapterId(chapterData.id);

  const handleCopyFormula = (id: string, formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  const toggleSubtopic = (id: string) => {
    setSubtopicStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSocratic = (key: string) => {
    setOpenSocraticIdx((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionTabs = [
    { id: 'notes', label: '📚 1-Hour Master Notes' },
    { id: 'concepts', label: '📖 Deep Concepts & Intuition' },
    { id: 'subtopics', label: '🧠 Subtopics' },
    { id: 'formulaSheet', label: '📝 Formulas' },
    { id: 'videoResources', label: '🎥 Videos' },
    { id: 'pyqs', label: '❓ PYQs' },
    { id: 'practice', label: '✅ Practice' },
    { id: 'chapterTest', label: '🎯 Test' },
    { id: 'commonMistakes', label: '⚠ Mistakes' },
    { id: 'tricks', label: '⚡ Tricks' },
    { id: 'progress', label: '📊 Progress' },
    { id: 'revision', label: '⏱ Revision' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={`${chapterData.subject} • ${chapterData.chapterName}`}
      subtitle={`${chapterData.category} • ${chapterData.classLevel}`}
    >
      <div className="space-y-6 select-none">
        
        {/* Header Title & Meta Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={getSubjectBadgeVariant(chapterData.subject)} size="md">
                {chapterData.subject}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">• {chapterData.category}</span>
              <span className="text-[10px] uppercase font-bold text-violet-300 bg-violet-950/80 px-2.5 py-0.5 rounded-full border border-violet-700/50">
                1-Hour Master Manual 📚
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 font-heading">
              {chapterData.chapterName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0B0F19] rounded-xl border border-slate-800 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Mastery Progress</span>
              <div className="text-sm font-bold text-violet-400 font-mono">
                {chapterData.progressTracker.completionPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Sticky 12 Section Navigation Bar */}
        <div className="sticky top-0 z-30 pt-1 pb-3 bg-[#111726]/95 backdrop-blur border-b border-slate-800/80 -mx-6 px-6">
          <div className="flex items-center gap-1.5 p-1 bg-[#0F1626] border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
            {sectionTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION: 📚 ULTRA-COMPREHENSIVE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6 animate-fade-in">
            {/* Overview Banner */}
            <div className="p-5 bg-gradient-to-r from-[#12192E] via-[#161F38] to-[#0F1626] rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-slate-100">
                    Comprehensive Study & Reference Manual
                  </h3>
                </div>
                {comprehensiveNotes && (
                  <span className="text-xs text-amber-300 font-mono bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40 font-bold">
                    ⏱ {comprehensiveNotes.readingTimeMinutes} min thorough read
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {comprehensiveNotes?.overview || chapterData.notes.title}
              </p>
            </div>

            {/* Detailed Note Sections */}
            {comprehensiveNotes ? (
              <div className="space-y-6">
                {comprehensiveNotes.sections.map((sec, idx) => (
                  <div key={idx} className="p-6 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                    <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Layers className="w-4 h-4 text-violet-400" />
                      {sec.sectionTitle}
                    </h4>

                    {/* Paragraph Content */}
                    <div className="space-y-3 text-xs text-slate-200 leading-relaxed">
                      {sec.content.map((p, pIdx) => (
                        <div key={pIdx} className="bg-[#0B0F19] p-4 rounded-xl border border-slate-800/90 leading-relaxed">
                          {p}
                        </div>
                      ))}
                    </div>

                    {/* Key Equations Box */}
                    {sec.keyEquations && sec.keyEquations.length > 0 && (
                      <div className="p-4 bg-[#070A12] rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                        <span className="font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                          Core Key Equations:
                        </span>
                        <div className="space-y-1.5">
                          {sec.keyEquations.map((eq, eqIdx) => (
                            <div key={eqIdx} className="p-2.5 bg-[#0D1322] rounded-lg border border-slate-800 text-emerald-300 font-bold">
                              {eq}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* NCERT Direct Lines */}
                    {sec.ncertHighlights && sec.ncertHighlights.length > 0 && (
                      <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-800/40 space-y-1.5 text-xs">
                        <span className="font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                          NCERT Direct Text Lines & Exam Highlights:
                        </span>
                        <div className="space-y-1 text-emerald-200 italic">
                          {sec.ncertHighlights.map((line, lIdx) => (
                            <p key={lIdx}>"{line}"</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exam Shortcuts */}
                    {sec.examShortcuts && sec.examShortcuts.length > 0 && (
                      <div className="p-4 bg-amber-950/20 rounded-xl border border-amber-800/40 space-y-1.5 text-xs">
                        <span className="font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Exam Speed Hacks & Shortcuts:
                        </span>
                        <div className="space-y-1 text-amber-100 font-mono">
                          {sec.examShortcuts.map((hack, hIdx) => (
                            <p key={hIdx}>• {hack}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback Notes */
              <div className="space-y-4">
                <div className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">High-Yield Summary</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {chapterData.notes.summary.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-800/40 space-y-1.5 text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block">NCERT Direct Highlight Line:</span>
                  <p className="text-emerald-200 italic">{chapterData.notes.ncertHighlight}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 1: 📖 DEEP CONCEPTS & SELF-STUDY INTUITION */}
        {activeTab === 'concepts' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-gradient-to-r from-indigo-950/50 via-[#131B2E] to-violet-950/50 rounded-2xl border border-indigo-800/40 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-400" />
                  Self-Study First-Principles Learning Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Includes visual analogies, step-by-step mathematical proofs, self-study gotchas & Socratic self-tests.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {chapterData.concepts.map((concept, idx) => (
                <div key={concept.id} className="p-6 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-4">
                  {/* Title & Statement */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-violet-950 text-violet-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-violet-800/50">
                        {idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-100">{concept.title}</h4>
                    </div>
                    <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs font-mono text-violet-300 font-bold">
                      "{concept.statement}"
                    </div>
                  </div>

                  {/* 1. First-Principles Intuition (ELI5 Analogy) */}
                  {concept.firstPrinciplesIntuition && (
                    <div className="p-4 bg-gradient-to-r from-amber-950/20 via-[#0B0F19] to-amber-950/10 rounded-xl border border-amber-800/40 space-y-1">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        First-Principles Intuition (Mental Model)
                      </span>
                      <p className="text-xs text-amber-100 leading-relaxed">
                        {concept.firstPrinciplesIntuition}
                      </p>
                    </div>
                  )}

                  {/* 2. Step-by-Step Mathematical Derivation */}
                  {concept.mathematicalDerivation && (
                    <div className="p-4 bg-[#070A12] rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        Rigorous Mathematical Proof & Derivation
                      </span>
                      <div className="space-y-1 text-xs font-mono text-slate-300">
                        {concept.mathematicalDerivation.map((step, sIdx) => (
                          <div key={sIdx} className="p-1.5 bg-[#0D1322] rounded border border-slate-800/60">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Self-Study Gotcha */}
                  {concept.selfStudyGotcha && (
                    <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-800/40 text-xs space-y-1">
                      <span className="font-bold text-rose-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Self-Study Pitfall & Misconception Warning:
                      </span>
                      <p className="text-rose-200">{concept.selfStudyGotcha}</p>
                    </div>
                  )}

                  {/* 4. Socratic Questions Accordion */}
                  {concept.socraticQuestions && concept.socraticQuestions.length > 0 && (
                    <div className="space-y-2 pt-1 border-t border-slate-800">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                        Socratic Self-Test Questions:
                      </span>
                      {concept.socraticQuestions.map((sq, sqIdx) => {
                        const sqKey = `${concept.id}-${sqIdx}`;
                        const isOpen = openSocraticIdx[sqKey];

                        return (
                          <div key={sqIdx} className="bg-[#0B0F19] rounded-xl border border-slate-800 text-xs overflow-hidden">
                            <button
                              onClick={() => toggleSocratic(sqKey)}
                              className="w-full p-3 text-left font-semibold text-slate-200 flex items-center justify-between hover:bg-slate-800/40 transition-colors cursor-pointer"
                            >
                              <span>🤔 {sq.question}</span>
                              {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                            </button>

                            {isOpen && (
                              <div className="p-3 bg-[#070A12] border-t border-slate-800 text-indigo-200 text-xs font-mono animate-fade-in">
                                <span className="font-bold text-indigo-400 block mb-1">Mentor Hint / Answer:</span>
                                {sq.answerHint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: 🧠 SUBTOPICS */}
        {activeTab === 'subtopics' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              Subtopic Checklist & Completion Status
            </h3>

            <div className="space-y-2">
              {chapterData.subtopics.map((st) => {
                const isDone = subtopicStatus[st.id];
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleSubtopic(st.id)}
                    className={clsx(
                      'p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer',
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-200'
                        : 'bg-[#0E1524] border-slate-800 text-slate-200 hover:border-slate-700'
                    )}
                  >
                    <span className="text-xs font-semibold">{st.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase">{isDone ? 'Completed' : 'Pending'}</span>
                      <div
                        className={clsx(
                          'w-5 h-5 rounded-lg border flex items-center justify-center',
                          isDone ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600'
                        )}
                      >
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: 📝 FORMULA SHEET */}
        {activeTab === 'formulaSheet' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Master Formula Sheet & Derived Equations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapterData.formulaSheet.map((f) => (
                <div key={f.id} className="p-4 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-200">{f.title}</h4>
                    <button
                      onClick={() => handleCopyFormula(f.id, f.formula)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                      title="Copy Equation"
                    >
                      {copiedFormulaId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="p-2.5 bg-[#0B0F19] rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 font-bold">
                    {f.formula}
                  </div>
                  <p className="text-[11px] text-slate-400">{f.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: 🎥 VIDEO RESOURCES */}
        {activeTab === 'videoResources' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Video className="w-4 h-4 text-rose-400" />
              Curated Recommended Video Lectures
            </h3>

            <div className="space-y-3">
              {chapterData.videoResources.map((vid) => (
                <div key={vid.id} className="p-4 bg-[#0E1524] rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40 mb-1 inline-block">
                      {vid.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{vid.title}</h4>
                    <p className="text-xs text-slate-400">{vid.channel} • {vid.duration}</p>
                  </div>

                  <Button
                    variant="glow"
                    size="sm"
                    onClick={() => openVideoPlayer(vid.title, vid.url)}
                  >
                    Watch Lecture
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: ❓ PREVIOUS-YEAR QUESTIONS (PYQs) */}
        {activeTab === 'pyqs' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-violet-400" />
              NTA Previous-Year Questions Bank ({chapterData.pyqs.length} Solved)
            </h3>

            <div className="space-y-4">
              {chapterData.pyqs.map((q) => (
                <div key={q.id} className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-violet-300 font-mono">{q.exam} ({q.year})</span>
                  </div>
                  <p className="text-xs font-bold text-slate-100">{q.questionText}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    {q.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={clsx(
                          'p-2.5 rounded-lg border text-xs',
                          idx === q.correctOptionIndex
                            ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-bold'
                            : 'bg-[#0B0F19] border-slate-800'
                        )}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-violet-400">Official NTA Solution:</span>
                    <p>{q.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: ✅ PRACTICE (Basic → Main → Advanced) */}
        {activeTab === 'practice' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Graded Practice Levels
              </h3>

              <div className="flex items-center gap-1 p-1 bg-[#0B0F19] rounded-lg border border-slate-800">
                <button
                  onClick={() => setPracticeTab('basic')}
                  className={clsx('px-3 py-1 rounded text-xs font-semibold cursor-pointer', practiceTab === 'basic' ? 'bg-emerald-600 text-white' : 'text-slate-400')}
                >
                  Basic
                </button>
                <button
                  onClick={() => setPracticeTab('main')}
                  className={clsx('px-3 py-1 rounded text-xs font-semibold cursor-pointer', practiceTab === 'main' ? 'bg-violet-600 text-white' : 'text-slate-400')}
                >
                  JEE Main
                </button>
                <button
                  onClick={() => setPracticeTab('advanced')}
                  className={clsx('px-3 py-1 rounded text-xs font-semibold cursor-pointer', practiceTab === 'advanced' ? 'bg-rose-600 text-white' : 'text-slate-400')}
                >
                  JEE Advanced
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {chapterData.practiceLevels[practiceTab].map((p, idx) => (
                <div key={p.id} className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Problem {idx + 1}</span>
                    <Badge variant={practiceTab === 'advanced' ? 'danger' : 'default'} size="sm">
                      {p.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-100">{p.questionText}</p>
                  <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Solution:</span> {p.solutionSteps.join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 8: 🎯 CHAPTER TEST */}
        {activeTab === 'chapterTest' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-5 bg-gradient-to-r from-violet-950/60 via-[#131B2E] to-indigo-950/60 rounded-2xl border border-violet-800/40 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">{chapterData.chapterTest.title}</h3>
                <p className="text-xs text-slate-400">Time Limit: {chapterData.chapterTest.durationMinutes} Minutes</p>
              </div>
              <Button variant="glow" size="md" onClick={() => alert("Launching 15-Minute Chapter Diagnostic Test...")}>
                Start Chapter Test
              </Button>
            </div>
          </div>
        )}

        {/* SECTION 9: ⚠ COMMON MISTAKES */}
        {activeTab === 'commonMistakes' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Common Pitfalls & Conceptual Mistakes
            </h3>

            <div className="space-y-2">
              {chapterData.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-4 bg-rose-950/20 border border-rose-800/40 rounded-xl text-xs text-rose-200">
                  {m}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 10: ⚡ TRICKS & SHORTCUTS */}
        {activeTab === 'tricks' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              High-Speed Exam Tricks & Hacks
            </h3>

            <div className="space-y-2">
              {chapterData.tricksShortcuts.map((t, idx) => (
                <div key={idx} className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-100 font-mono">
                  {t}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 11: 📊 PROGRESS TRACKER */}
        {activeTab === 'progress' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-400" />
              Chapter Mastery Metrics
            </h3>

            <div className="p-6 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Total Chapter Completion</span>
                  <span className="text-violet-400">{chapterData.progressTracker.completionPercentage}%</span>
                </div>
                <ProgressBar progress={chapterData.progressTracker.completionPercentage} height="md" />
              </div>

              <div className="flex justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
                <span>PYQs Solved: {chapterData.progressTracker.pyqsSolved} / {chapterData.progressTracker.totalPyqs}</span>
                <span>Status: {chapterData.progressTracker.status}</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 12: ⏱ REVISION CHECKLIST */}
        {activeTab === 'revision' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Spaced Repetition Active Recall Schedule
            </h3>

            <div className="space-y-2">
              {chapterData.revisionChecklist.map((r, idx) => (
                <div key={idx} className="p-4 bg-[#0E1524] rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span>{r.step}</span>
                  </div>
                  <Badge variant={r.status === 'Completed' ? 'success' : r.status === 'Due Today' ? 'warning' : 'default'} size="sm">
                    {r.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
