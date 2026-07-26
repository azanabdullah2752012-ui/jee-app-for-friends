import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import {
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Trophy,
  Zap,
  Tag,
  Check,
  Search,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import {
  QUESTION_BUNDLES,
  getQuestionBankStats,
  searchQuestionBank,
  type QuestionBundle,
  type QuestionItem,
} from '../services/questionBankStore';

export const StorePage: React.FC = () => {
  const stats = getQuestionBankStats();

  const [bundles, setBundles] = useState<QuestionBundle[]>(QUESTION_BUNDLES);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample Question Preview Modal State
  const [activePreviewQuestion, setActivePreviewQuestion] = useState<QuestionItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Purchased Bundle Modal State
  const [purchasedBundle, setPurchasedBundle] = useState<QuestionBundle | null>(null);

  const handlePurchase = (bundleId: string) => {
    setBundles((prev) =>
      prev.map((b) => (b.id === bundleId ? { ...b, isUnlocked: true } : b))
    );
    const bought = bundles.find((b) => b.id === bundleId);
    if (bought) {
      setPurchasedBundle({ ...bought, isUnlocked: true });
    }
  };

  const sampleQuestions = searchQuestionBank(searchQuery, selectedSubject, 12);

  const filteredBundles = bundles.filter(
    (b) => selectedSubject === 'All' || b.subject === selectedSubject || b.subject === 'All'
  );

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto">
      {/* Hero Store Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-violet-950/80 via-[#131C30] to-indigo-950/80 p-6 md:p-8 rounded-3xl border border-violet-800/40 shadow-2xl relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-700/50 text-xs font-bold text-violet-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>10,000 Practice Question Bank Store</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-100 leading-tight">
            Bulk Question Bundles for High-Volume Practice
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Practice NTA JEE Main & Advanced questions in bulk. Unlock the <strong className="text-amber-400">10,000 Question Mega Pack for ₹4,000</strong> with complete derivations & PYQs.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <Trophy className="w-4 h-4 text-amber-400" />
              {stats.total.toLocaleString()} Total Questions
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {stats.pyqCount.toLocaleString()}+ NTA PYQs (2018–2025)
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 font-bold text-violet-300">
              <Zap className="w-4 h-4 text-violet-400" />
              {stats.advancedCount.toLocaleString()}+ Advanced Problems
            </span>
          </div>
        </div>

        {/* Mega Pack Promo Badge */}
        <div className="shrink-0 p-5 bg-[#0A0E1A]/90 border border-amber-500/40 rounded-2xl space-y-3 z-10 max-w-xs text-center shadow-xl">
          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-700">
            Best Value Bundle
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-100">10,000 Mega Question Pack</h3>
            <div className="flex items-baseline justify-center gap-2 mt-1">
              <span className="text-2xl font-extrabold text-amber-400 font-mono">₹4,000</span>
              <span className="text-xs text-slate-500 line-through font-mono">₹12,000</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Save 66% • Includes Physics, Chemistry & Maths</p>
          </div>

          <Button
            variant="glow"
            size="sm"
            onClick={() => handlePurchase('bundle-10k-mega')}
            className="w-full justify-center"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Unlock 10k Bundle (₹4,000)</span>
          </Button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Physics', 'Chemistry', 'Mathematics'].map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                selectedSubject === subj
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-[#0E1524] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {subj === 'All' ? 'All Question Bundles' : subj}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, chapters, or questions..."
            className="w-full bg-[#0E1524] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* QUESTION BUNDLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBundles.map((bundle) => (
          <Card
            key={bundle.id}
            padding="lg"
            className={`space-y-4 relative ${
              bundle.isFeatured ? 'border-amber-500/50 bg-[#121A2D]' : 'border-slate-800 bg-[#0E1524]'
            }`}
          >
            {bundle.isFeatured && (
              <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] shadow-md uppercase tracking-wider">
                FEATURED 10K MEGA PACK
              </span>
            )}

            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={bundle.subject === 'Physics' ? 'physics' : bundle.subject === 'Chemistry' ? 'chemistry' : 'maths'} size="sm">
                    {bundle.subject}
                  </Badge>
                  <span className="text-xs text-amber-400 font-bold font-mono">
                    {bundle.questionCount.toLocaleString()} Questions
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{bundle.title}</h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl font-extrabold text-amber-400 font-mono block">
                  ₹{bundle.priceInr.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 line-through font-mono">
                  ₹{bundle.originalPriceInr.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{bundle.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-violet-400" />
                {bundle.pyqRatio}
              </span>

              <div className="flex items-center gap-2">
                {bundle.isUnlocked ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-xs flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    Unlocked & Ready
                  </span>
                ) : (
                  <Button
                    variant={bundle.isFeatured ? 'glow' : 'outline'}
                    size="sm"
                    onClick={() => handlePurchase(bundle.id)}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Buy Bundle (₹{bundle.priceInr.toLocaleString()})</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* SAMPLE QUESTION BANK PREVIEWER */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              Practice & Preview 10,000 Question Bank Dataset
            </h3>
            <p className="text-xs text-slate-400">
              Select any question to solve, choose options (A, B, C, D), and view step-by-step derivations.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Showing {sampleQuestions.length} of {stats.total.toLocaleString()} Questions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setActivePreviewQuestion(q);
                setSelectedOption(null);
                setShowExplanation(false);
              }}
              className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <Badge variant={q.subject === 'Physics' ? 'physics' : q.subject === 'Chemistry' ? 'chemistry' : 'maths'} size="sm">
                  {q.subject}
                </Badge>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {q.difficulty}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200 group-hover:text-violet-300 transition-colors line-clamp-2">
                {q.questionText}
              </h4>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                <span>{q.chapter}</span>
                {q.isPyq && <span className="text-emerald-400 font-bold">NTA PYQ {q.pyqYear}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SAMPLE QUESTION SOLVING MODAL */}
      {activePreviewQuestion && (
        <Modal
          isOpen={!!activePreviewQuestion}
          onClose={() => setActivePreviewQuestion(null)}
          maxWidth="2xl"
          title={`📝 Question ${activePreviewQuestion.id} — ${activePreviewQuestion.subject}`}
          subtitle={`${activePreviewQuestion.chapter} (${activePreviewQuestion.difficulty})`}
        >
          <div className="space-y-5 select-none">
            {/* Question Text */}
            <div className="p-4 bg-[#070A12] rounded-xl border border-slate-800 text-xs text-slate-100 font-medium leading-relaxed">
              {activePreviewQuestion.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Select Correct Option:</span>
              {activePreviewQuestion.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const isCorrect = i === activePreviewQuestion.correctAnswerIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(i)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? showExplanation
                          ? isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-violet-600/30 border-violet-500 text-white'
                        : 'bg-[#0E1524] border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>
                      <strong className="font-mono text-violet-400 mr-2">({String.fromCharCode(65 + i)})</strong>
                      {opt}
                    </span>
                    {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExplanation((prev) => !prev)}
                disabled={selectedOption === null && !showExplanation}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{showExplanation ? 'Hide Derivation' : 'Check Solution'}</span>
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setActivePreviewQuestion(null)}>
                Close Question
              </Button>
            </div>

            {/* Derivation / Solution */}
            {showExplanation && (
              <div className="p-4 bg-[#070A12] rounded-xl border border-slate-800 text-xs space-y-2 animate-fade-in">
                <span className="font-bold text-emerald-400 block uppercase tracking-wider text-[10px]">
                  Step-by-Step Derivation & Explanation:
                </span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                  {activePreviewQuestion.explanation}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* PURCHASE CONFIRMATION MODAL */}
      {purchasedBundle && (
        <Modal
          isOpen={!!purchasedBundle}
          onClose={() => setPurchasedBundle(null)}
          maxWidth="md"
          title="🎉 Question Bundle Unlocked!"
          subtitle={`Successfully purchased ${purchasedBundle.title}`}
        >
          <div className="space-y-4 text-center select-none py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center font-bold text-2xl">
              ✓
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-100">{purchasedBundle.title}</h3>
              <p className="text-xs text-slate-400">
                You now have unlimited access to {purchasedBundle.questionCount.toLocaleString()} practice questions.
              </p>
            </div>
            <Button
              variant="glow"
              size="md"
              onClick={() => setPurchasedBundle(null)}
              className="w-full justify-center"
            >
              Start Practice Session Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
