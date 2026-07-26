import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, getSubjectBadgeVariant } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Tabs } from '../components/ui/Tabs';
import type { SubjectType } from '../types';
import { ArrowRight, Lightbulb, Rocket, Sparkles, Filter, BookOpen } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const { chapters, mistakes, resources, openTopicMastery, openChapterDetail } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('Physics');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<string>('chapters');

  const subjectTabs = [
    { id: 'Physics', label: 'Physics Workspace (~40 Topics)' },
    { id: 'Chemistry', label: 'Chemistry Workspace (~50 Topics)' },
    { id: 'Mathematics', label: 'Mathematics Workspace (~45 Topics)' },
  ];

  const workspaceSubTabs = [
    { id: 'chapters', label: 'Complete Master Syllabus Hierarchy' },
    { id: 'concepts', label: 'Key Formulas & Laws' },
    { id: 'mistakes', label: 'Subject Mistakes' },
    { id: 'resources', label: 'Curated Resources' },
  ];

  const subjectChapters = chapters.filter((c) => c.subject === selectedSubject);
  const categories = Array.from(new Set(subjectChapters.map((c) => c.category)));

  const filteredChapters = subjectChapters.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const subjectMistakes = mistakes.filter((m) => m.subject === selectedSubject);
  const subjectResources = resources.filter((r) => r.subject === selectedSubject);

  const avgProgress = Math.round(
    subjectChapters.reduce((acc, c) => acc + c.completionPercentage, 0) / (subjectChapters.length || 1)
  );

  const conceptsBySubject: Record<SubjectType, { title: string; formula: string; note: string }[]> = {
    Physics: [
      {
        title: "Newton's 2nd Law in Non-Inertial Accelerated Frame",
        formula: 'Σ F_real + F_pseudo = m * a_relative  (where F_pseudo = -m * A_frame)',
        note: 'Crucial for resolving vector equilibrium on accelerating wedges, elevators, and rotating frames.',
      },
      {
        title: 'Work-Energy Theorem',
        formula: 'W_total = ΔK = (1/2)m v_f^2 - (1/2)m v_i^2',
        note: 'Applies in both inertial and non-inertial frames when work done by pseudo forces is accounted for.',
      },
      {
        title: 'Parallel Axis Theorem of Rotational Inertia',
        formula: 'I_parallel = I_cm + M * d^2',
        note: 'Valid ONLY when starting from an axis passing through the Center of Mass (I_cm).',
      },
    ],
    Chemistry: [
      {
        title: 'Steric Number & Hybridization Formula',
        formula: 'Steric Number = (V + M - C + A) / 2',
        note: 'V = Valence e-, M = Monovalent atoms, C = Cationic charge, A = Anionic charge.',
      },
      {
        title: 'Van der Waals Real Gas Equation',
        formula: '(P + a*n^2 / V^2) * (V - n*b) = n * R * T',
        note: "'a' measures intermolecular attraction strength, 'b' represents effective molecular co-volume.",
      },
    ],
    Mathematics: [
      {
        title: 'Quadratic Equations — Location of Both Roots > k',
        formula: 'Condition: (1) D ≥ 0   AND   (2) -b / (2a) > k   AND   (3) a * f(k) > 0',
        note: 'Solve simultaneous inequalities to find valid range of coefficient parameter m.',
      },
      {
        title: 'Infinite Arithmetico-Geometric Progression (AGP) Sum',
        formula: 'S_∞ = a / (1 - r) + (d * r) / (1 - r)^2   for |r| < 1',
        note: 'Used for series combining AP term (a + (n-1)d) with GP ratio r^n.',
      },
    ],
  };

  const getTopicIdForSubject = (subj: SubjectType) => {
    if (subj === 'Physics') return 'topic-p1';
    if (subj === 'Mathematics') return 'topic-m1';
    return 'topic-c1';
  };

  return (
    <div className="space-y-6">
      {/* Subject Header Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-100">Master Syllabus Workspaces</h1>
          <p className="text-xs text-slate-400">
            Complete ~135 topic hierarchy featuring 60-minute exhaustive textbook-grade study notes.
          </p>
        </div>

        <Tabs
          tabs={subjectTabs}
          activeTab={selectedSubject}
          onChange={(id) => {
            setSelectedSubject(id as SubjectType);
            setSelectedCategory('All');
          }}
        />
      </div>

      {/* Workspace Banner with Direct 4-Step & 60-Min Exhaustive Notes Triggers */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111827] via-[#141E33] to-[#0F172A] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <Badge variant={getSubjectBadgeVariant(selectedSubject)} size="md">
              {selectedSubject}
            </Badge>
            <span className="text-xs text-slate-400 font-semibold">• {subjectChapters.length} Syllabus Topics</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">{selectedSubject} Master Syllabus Hub</h2>
          <p className="text-xs text-slate-300">
            Each chapter includes: <span className="text-amber-300 font-bold">Exhaustive 1-Hour Textbook Notes, Derivations, NCERT Highlights, PYQs & Practice</span>.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              variant="glow"
              size="sm"
              onClick={() => openChapterDetail('ch-p2')}
            >
              <BookOpen className="w-4 h-4" />
              Open 1-Hour Textbook Study Manual
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openTopicMastery(getTopicIdForSubject(selectedSubject))}
            >
              <Rocket className="w-4 h-4 text-violet-400" />
              4-Step Topic Mastery Pipeline
            </Button>
          </div>
        </div>

        {/* Overview Stat Box */}
        <div className="p-4 bg-[#0B0F19] border border-slate-800 rounded-xl min-w-[220px] space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-400">Syllabus Progress</span>
            <span className="text-violet-400">{avgProgress}%</span>
          </div>
          <ProgressBar progress={avgProgress} subject={selectedSubject} height="md" />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>{subjectChapters.filter(c => c.status === 'Mastered').length}/{subjectChapters.length} Mastered</span>
            <span>{subjectResources.length} Resources</span>
          </div>
        </div>
      </div>

      {/* Sub Workspace Tabs */}
      <Tabs
        tabs={workspaceSubTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="w-full justify-start"
      />

      {/* Sub View: Chapters Master Syllabus */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          {/* Category Unit Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Unit:
            </span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-violet-600 text-white'
                  : 'bg-[#0E1524] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Units ({subjectChapters.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-[#0E1524] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat} ({subjectChapters.filter((c) => c.category === cat).length})
              </button>
            ))}
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChapters.map((ch) => (
              <Card key={ch.id} padding="md" hoverEffect className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] uppercase font-bold text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
                        {ch.category}
                      </span>
                      {ch.isAdvancedOnly && (
                        <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                          JEE Advanced
                        </span>
                      )}
                    </div>
                    <h4
                      onClick={() => openChapterDetail(ch.id)}
                      className="text-sm font-bold text-slate-100 hover:text-violet-300 transition-colors cursor-pointer"
                    >
                      {ch.name}
                    </h4>
                    <p className="text-xs text-slate-400">{ch.classLevel} • Weightage: {ch.weightage}</p>
                  </div>
                  <Badge
                    variant={ch.status === 'Mastered' ? 'success' : ch.status === 'In Progress' ? 'warning' : 'default'}
                    size="sm"
                  >
                    {ch.status}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Topic Progress</span>
                    <span className="text-slate-200 font-bold">{ch.completionPercentage}%</span>
                  </div>
                  <ProgressBar progress={ch.completionPercentage} subject={selectedSubject} height="sm" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 font-mono">PYQs: {ch.pyqsSolved}/{ch.totalPyqs}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openChapterDetail(ch.id)}
                      className="text-xs text-amber-300"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      1-Hour Textbook Notes
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openTopicMastery(getTopicIdForSubject(selectedSubject))}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      4-Step Mastery
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Sub View: Concepts */}
      {activeTab === 'concepts' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Key Formulas & Core Laws ({selectedSubject})
          </h3>
          <div className="space-y-3">
            {conceptsBySubject[selectedSubject].map((item, idx) => (
              <div key={idx} className="p-4 bg-[#0B0F19] rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-violet-400">{item.title}</span>
                <div className="font-mono text-sm text-slate-200 bg-[#070A12] p-2.5 rounded-lg border border-slate-800">
                  {item.formula}
                </div>
                <p className="text-xs text-slate-400">{item.note}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sub View: Mistakes */}
      {activeTab === 'mistakes' && (
        <div className="space-y-3">
          {subjectMistakes.length > 0 ? (
            subjectMistakes.map((m) => (
              <Card key={m.id} padding="md" className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">{m.title}</h4>
                  <Badge variant="danger" size="sm">{m.errorType}</Badge>
                </div>
                <p className="text-xs text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-800/40">
                  <span className="font-bold">Why wrong:</span> {m.whyWrong}
                </p>
              </Card>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">No logged mistakes for {selectedSubject} yet.</p>
          )}
        </div>
      )}

      {/* Sub View: Resources */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectResources.map((res) => (
            <Card key={res.id} padding="md" className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="info" size="sm">{res.type}</Badge>
                <span className="text-[10px] text-slate-400">{res.durationOrPages}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">{res.title}</h4>
              <p className="text-xs text-slate-400">{res.description}</p>
              <Button variant="outline" size="sm" className="mt-2 w-full justify-center">
                {res.linkText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
