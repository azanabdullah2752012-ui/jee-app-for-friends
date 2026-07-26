import React from 'react';
import { useApp } from '../app/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, getSubjectBadgeVariant } from '../components/ui/Badge';
import { RotateCcw, CheckCircle2, Brain, Sparkles } from 'lucide-react';

export const RevisionPage: React.FC = () => {
  const { mistakes, toggleMistakeMastered } = useApp();

  // TODO: Connect to backend API endpoint here to fetch active revision queue items (GET /api/revision/queue)
  const revisionQueue = mistakes.filter((m) => !m.mastered);
  const masteredList = mistakes.filter((m) => m.mastered);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/40 via-[#161B2A] to-indigo-950/40 p-6 rounded-2xl border border-amber-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-600/30 text-amber-300 border border-amber-500/40">
              <RotateCcw className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold font-heading text-slate-100">Spaced Revision Queue</h1>
          </div>
          <p className="text-xs text-slate-300">
            Active recall feedback loop ensuring high retention and zero forgotten mistakes.
          </p>
        </div>

        {/* Revision Pipeline Diagram Banner */}
        <div className="p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs font-mono text-slate-400 flex items-center gap-2 overflow-x-auto">
          <span className="text-violet-400 font-bold">Study</span>
          <span>→</span>
          <span className="text-emerald-400 font-bold">Practice</span>
          <span>→</span>
          <span className="text-rose-400 font-bold">Wrong</span>
          <span>→</span>
          <span className="text-amber-400 font-bold">Revision Queue</span>
          <span>→</span>
          <span className="text-emerald-300 font-bold">Mastered</span>
        </div>
      </div>

      {/* Revision Queue List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Queue (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-400" />
              Due for Active Recall ({revisionQueue.length} items)
            </h3>
            <span className="text-xs text-slate-400">Spaced Intervals: 1d → 3d → 7d → 21d</span>
          </div>

          {revisionQueue.length > 0 ? (
            <div className="space-y-3">
              {revisionQueue.map((m) => (
                <Card key={m.id} padding="md" className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSubjectBadgeVariant(m.subject)} size="sm">
                          {m.subject}
                        </Badge>
                        <span className="text-xs text-slate-400 font-semibold">• {m.chapter}</span>
                        <span className="text-[10px] text-amber-400 font-mono bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                          Due Today
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">{m.title}</h4>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => toggleMistakeMastered(m.id)}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Mastered
                    </Button>
                  </div>

                  <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-300 font-mono">
                      <span className="text-amber-400 font-bold">Key Rule:</span> {m.keyTakeaway}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-slate-500">Correct procedure:</span> {m.correctApproach}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card padding="lg" className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-100">Revision Queue Cleared!</h3>
              <p className="text-xs text-slate-400">You have no pending revisions due for today. Excellent work!</p>
            </Card>
          )}
        </div>

        {/* Mastered Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mastered Concepts ({masteredList.length})
              </h4>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>

            {masteredList.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 bg-[#0B0F19] rounded-xl border border-slate-800">
                No mastered items yet. Complete active recall revisions to master concepts!
              </div>
            ) : (
              <div className="space-y-2">
                {masteredList.map((m) => (
                  <div key={m.id} className="p-3 bg-[#0E1524] rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-200 truncate">{m.title}</h5>
                      <p className="text-[10px] text-slate-400">{m.subject} • Mastered</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">✓</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
