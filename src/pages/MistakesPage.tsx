import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, getSubjectBadgeVariant } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { AlertCircle, PlusCircle, Search, CheckCircle2 } from 'lucide-react';

export const MistakesPage: React.FC = () => {
  const { mistakes, toggleMistakeMastered, setIsAddMistakeOpen } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TODO: Connect to backend API endpoint here to fetch filter counts (GET /api/mistakes/stats)
  const filterTabs = [
    { id: 'All', label: 'All Subjects', count: mistakes.length },
    { id: 'Physics', label: 'Physics', count: mistakes.filter((m) => m.subject === 'Physics').length },
    { id: 'Chemistry', label: 'Chemistry', count: mistakes.filter((m) => m.subject === 'Chemistry').length },
    { id: 'Mathematics', label: 'Maths', count: mistakes.filter((m) => m.subject === 'Mathematics').length },
  ];

  const filteredMistakes = mistakes.filter((m) => {
    const matchesSubject = selectedSubject === 'All' || m.subject === selectedSubject;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.whyWrong.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-rose-400" />
            Mistake Notebook
          </h1>
          <p className="text-xs text-slate-400">
            Review wrong attempts, analyze failure patterns, and move items into spaced revision.
          </p>
        </div>

        <Button variant="glow" size="md" onClick={() => setIsAddMistakeOpen(true)}>
          <PlusCircle className="w-4 h-4" />
          Add Mistake
        </Button>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <Tabs tabs={filterTabs} activeTab={selectedSubject} onChange={setSelectedSubject} />

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F1626] border border-slate-800 text-xs text-slate-300 w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search mistakes or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-xs text-slate-100 w-full"
          />
        </div>
      </div>

      {/* Mistakes Cards List / Empty State */}
      <div className="space-y-4">
        {filteredMistakes.length > 0 ? (
          filteredMistakes.map((m) => (
            <Card key={m.id} padding="lg" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={getSubjectBadgeVariant(m.subject)} size="md">
                    {m.subject}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">• {m.chapter}</span>
                  <span className="text-xs text-slate-500 font-medium">• {m.topic}</span>
                  <Badge variant="danger" size="sm">
                    {m.errorType}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">{m.daysAgo} days ago</span>
                  <Button
                    variant={m.mastered ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => toggleMistakeMastered(m.id)}
                  >
                    {m.mastered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Mastered
                      </>
                    ) : (
                      'Mark Mastered'
                    )}
                  </Button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-100">{m.title}</h3>

              {/* Error Explanation Box */}
              <div className="p-4 bg-rose-950/20 border border-rose-800/40 rounded-xl space-y-1.5 text-xs">
                <div className="font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  Why it was wrong:
                </div>
                <p className="text-slate-300 leading-relaxed">{m.whyWrong}</p>
              </div>

              {/* Correct Approach & Takeaway */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0B0F19] border border-slate-800 rounded-lg">
                  <span className="font-semibold text-slate-400 block mb-1">Correct Procedure:</span>
                  <p className="text-slate-300">{m.correctApproach}</p>
                </div>

                <div className="p-3 bg-[#0B0F19] border border-slate-800 rounded-lg">
                  <span className="font-semibold text-amber-400 block mb-1">Key Takeaway Rule:</span>
                  <p className="text-slate-300 font-mono">{m.keyTakeaway}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card padding="lg" className="text-center py-12 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-300">No mistakes found matching your criteria</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Track your incorrect problem attempts and key takeaways to build active recall retention.
            </p>
            <Button variant="glow" size="sm" onClick={() => setIsAddMistakeOpen(true)} className="mx-auto">
              <PlusCircle className="w-4 h-4" />
              Add First Mistake
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
