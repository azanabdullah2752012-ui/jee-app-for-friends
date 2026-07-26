import React from 'react';
import { useApp } from '../app/AppContext';
import { useRoadmapEngine } from '../hooks/useRoadmapEngine';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { MapPin, Target, Calendar, Clock, Award, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const RoadmapPage: React.FC = () => {
  const { profile, chapters, tasks } = useApp();

  // TODO: Connect to backend API endpoint here to fetch live execution roadmap (GET /api/roadmap)
  const engine = useRoadmapEngine(profile, chapters, tasks);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-violet-950/60 via-[#131B2E] to-indigo-950/60 p-6 rounded-2xl border border-violet-800/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-violet-600/30 text-violet-300 border border-violet-500/40">
              <MapPin className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold font-heading text-slate-100">Deterministic Roadmap Engine</h1>
          </div>
          <p className="text-xs text-slate-300">
            Personalized execution timeline computed for <span className="font-bold text-violet-300">{profile.targetExam}</span> (Target AIR #{profile.targetRank})
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="p-4 bg-[#0B0F19] border border-slate-800 rounded-xl text-center min-w-[200px]">
          <span className="text-[10px] uppercase font-bold text-slate-400">Exam Readiness Score</span>
          <div className="text-3xl font-extrabold text-violet-400 font-mono my-0.5">
            {engine.overallExamReadiness}%
          </div>
          <ProgressBar progress={engine.overallExamReadiness} color="gradient" height="sm" />
        </div>
      </div>

      {/* Inputs & Allocations Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="md" className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Clock className="w-4 h-4 text-violet-400" />
            <span>Daily Budget</span>
          </div>
          <div className="text-2xl font-bold text-slate-100">{engine.totalHoursBudgetedDaily} Hours / Day</div>
          <p className="text-[11px] text-slate-400">Auto-split by subject difficulty</p>
        </Card>

        <Card padding="md" className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Weakest Focus</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{profile.weakestSubject}</div>
          <p className="text-[11px] text-slate-400">Allocated +35% extra daily time budget</p>
        </Card>

        <Card padding="md" className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Exam Countdown</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{engine.daysRemaining} Days</div>
          <p className="text-[11px] text-slate-400">Target JEE Advanced Phase</p>
        </Card>
      </div>

      {/* Weekly Milestones Stream */}
      <Card padding="lg" className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-violet-400" />
            Weekly Execution Milestones
          </h3>
          <span className="text-xs text-slate-400">Engine Sprint v0.2</span>
        </div>

        {engine.weeklyMilestones.length === 0 ? (
          <div className="p-8 text-center bg-[#0B0F19] rounded-xl border border-slate-800 space-y-2">
            <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">No milestones computed yet</h4>
            <p className="text-xs text-slate-500">Configure your target exam and study hours in Settings to build your roadmap.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {engine.weeklyMilestones.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0E1524] border border-slate-800/80 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-violet-950 text-violet-300 font-mono text-xs font-bold flex items-center justify-center border border-violet-800/50">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{m.weekTitle}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {m.recommendedHours} Hours Budgeted
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Milestone Completion</span>
                    <span className="font-bold text-slate-200">{m.completionPercentage}%</span>
                  </div>
                  <ProgressBar progress={m.completionPercentage} color="gradient" height="sm" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {m.targetChapters.map((ch, cIdx) => (
                    <Badge key={cIdx} variant="default" size="sm">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {ch}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
