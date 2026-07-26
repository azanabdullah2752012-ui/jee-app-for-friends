import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { useRoadmapEngine } from '../hooks/useRoadmapEngine';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, getSubjectBadgeVariant } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';
import {
  Play,
  CheckCircle2,
  Flame,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  RotateCcw,
  Rocket,
  Trophy,
  Zap,
  Target,
  Trash2,
  Sliders,
  Clock,
  Save,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { SubjectType } from '../types';

export const HomePage: React.FC = () => {
  const {
    profile,
    updateProfile,
    tasks,
    toggleTask,
    deleteTask,
    mistakes,
    deleteMistake,
    chapters,
    setIsImStuckOpen,
    setIsQuestionBreakdownOpen,
    setIsAddMistakeOpen,
    setActiveTimerTask,
    openTopicMastery,
    streakDays,
    calculatedXp,
    calculatedLevel,
    levelTitle,
  } = useApp();

  const [isGoalTunerOpen, setIsGoalTunerOpen] = useState(false);
  const [tunerData, setTunerData] = useState({
    targetRank: profile.targetRank || 500,
    dailyStudyHours: profile.dailyStudyHours || 6,
    weakestSubject: profile.weakestSubject || ('Chemistry' as SubjectType),
    classLevel: profile.classLevel || 'Class 11',
  });

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...profile,
      ...tunerData,
    });
    setIsGoalTunerOpen(false);
  };

  const roadmap = useRoadmapEngine(profile, chapters, tasks);
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  const getSubjectProgress = (subj: string) => {
    const subjChs = chapters.filter((c) => c.subject === subj);
    if (subjChs.length === 0) return 0;
    const totalAcc = subjChs.reduce((acc, c) => acc + c.completionPercentage, 0);
    return Math.round(totalAcc / subjChs.length);
  };

  const physicsProgress = getSubjectProgress('Physics');
  const chemProgress = getSubjectProgress('Chemistry');
  const mathsProgress = getSubjectProgress('Mathematics');

  const xpInCurrentLevel = calculatedXp % 200;
  const xpProgressPercentage = Math.min(100, Math.round((xpInCurrentLevel / 200) * 100));

  return (
    <div className="space-y-6 select-none">
      {/* 1-LINE IN-PLACE QUICK GOAL TUNER BAR */}
      <div className="px-4 py-2.5 bg-[#0F1626] rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Trophy className="w-3.5 h-3.5" />
            AIR #{profile.targetRank} Goal
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            {profile.dailyStudyHours}h / Day Budget
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-violet-300 font-medium">
            <Target className="w-3.5 h-3.5 text-violet-400" />
            Weakest: {profile.weakestSubject} (+35% time)
          </span>
        </div>

        <button
          onClick={() => setIsGoalTunerOpen(true)}
          className="text-[11px] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer hover:underline"
        >
          <Sliders className="w-3 h-3 text-violet-400" />
          <span>Customize Goals ✏️</span>
        </button>
      </div>

      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#12192E] via-[#161F38] to-[#101728] p-6 rounded-2xl border border-slate-800/80 shadow-xl relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-100">
              Good evening, {profile.name ? profile.name.split(' ')[0] : 'Aspirant'} 👋
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-700/50 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Level {calculatedLevel} {levelTitle}
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Targeting <strong className="text-emerald-400">AIR {profile.targetRank} Goal</strong>. Your Roadmap Engine has budgeted{' '}
            <span className="text-violet-300 font-bold">{roadmap.totalHoursBudgetedDaily} hours</span> for today's plan.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0 z-10">
          <div className="p-3 bg-[#0F1626]/90 border border-slate-800 rounded-xl max-w-sm">
            <div className="flex items-center justify-between text-xs text-violet-400 font-semibold mb-1">
              <span>Daily Discipline</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs text-slate-200 italic">"Discipline today, success tomorrow. Keep showing up."</p>
          </div>

          <Button
            variant="glow"
            size="sm"
            onClick={() => openTopicMastery('topic-p1')}
            className="w-full justify-center"
          >
            <Rocket className="w-4 h-4" />
            Launch 4-Step Topic Mastery
          </Button>
        </div>
      </div>

      {/* GAMIFIED DAILY QUEST CARD */}
      <div className="p-5 bg-gradient-to-r from-violet-950/40 via-[#0F1628] to-indigo-950/40 rounded-2xl border border-violet-800/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100">Today's Gamified Study Quest</h3>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              +300 XP Available
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Level {calculatedLevel} Progress:</span>
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-violet-500 h-full transition-all duration-300"
                style={{ width: `${xpProgressPercentage}%` }}
              />
            </div>
            <span className="text-amber-400 font-bold">{calculatedXp} XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${completedTasksCount >= 2 ? 'text-emerald-400' : 'text-slate-600'}`} />
              <span className="text-xs text-slate-200">1. Complete 2 Tasks</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">+100 XP</span>
          </div>

          <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-violet-400" />
              <span className="text-xs text-slate-200">2. Master 1 Weak Chapter</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">+150 XP</span>
          </div>

          <div className="p-3 bg-[#0B0F19] rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">3. Review 1 Mistake</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">+50 XP</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Today's Plan (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Today's Plan Card */}
          <Card padding="lg" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  Today's Plan
                </h3>
                <p className="text-xs text-slate-400">
                  {completedTasksCount} of {tasks.length} tasks completed
                </p>
              </div>
              <Link to="/roadmap">
                <Button variant="ghost" size="sm" className="text-xs text-violet-400">
                  View Full Plan
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            {/* Task List / Empty State */}
            {tasks.length === 0 ? (
              <div className="p-8 text-center bg-[#0B0F19] rounded-xl border border-slate-800 space-y-3 my-2">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">No tasks scheduled for today</h4>
                <p className="text-xs text-slate-500">Your study queue is clean and empty. Generate your personalized plan when ready.</p>
                <Link to="/roadmap">
                  <Button variant="glow" size="sm">Generate Daily Plan</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      task.completed
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                        : 'bg-[#0E1524] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                          task.completed
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'border-slate-600 hover:border-violet-400 text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant={getSubjectBadgeVariant(task.subject)} size="sm">
                            {task.subject}
                          </Badge>
                          <span className="text-xs font-semibold text-slate-200 truncate">
                            {task.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {task.topic} • {task.durationMinutes} min
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {!task.completed && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openTopicMastery(task.subject === 'Physics' ? 'topic-p1' : task.subject === 'Mathematics' ? 'topic-m1' : 'topic-c1')}
                            className="text-[11px] px-2"
                          >
                            <BookOpen className="w-3 h-3 text-violet-400" />
                            Master
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveTimerTask(task)}
                          >
                            <Play className="w-3 h-3 text-violet-400 fill-violet-400" />
                            Start
                          </Button>
                        </>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        title="Remove Task"
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Mistakes & Revision Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Recent Mistakes */}
            <Card padding="md" className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  Recent Mistakes
                </h4>
                <Link to="/mistakes" className="text-[11px] text-violet-400 hover:underline">
                  View All →
                </Link>
              </div>

              {mistakes.length === 0 ? (
                <div className="p-4 text-center bg-[#0E1524] rounded-xl border border-slate-800/80 space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                  <p className="text-xs font-semibold text-slate-300">No mistakes logged yet</p>
                  <Button variant="outline" size="sm" onClick={() => setIsAddMistakeOpen(true)}>
                    + Add Mistake
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {mistakes.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="p-3 bg-[#0E1524] rounded-xl border border-slate-800/80 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-200 truncate">{m.title}</h5>
                        <p className="text-[10px] text-slate-400">
                          {m.subject} • {m.daysAgo} days ago
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link to="/mistakes">
                          <Button variant="ghost" size="sm" className="text-[11px] px-2 py-1">
                            Revisit
                          </Button>
                        </Link>
                        <button
                          onClick={() => deleteMistake(m.id)}
                          title="Remove Mistake"
                          className="p-1 text-slate-500 hover:text-rose-400 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Upcoming Revision Queue */}
            <Card padding="md" className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  Upcoming Revision
                </h4>
                <Link to="/revision" className="text-[11px] text-violet-400 hover:underline">
                  View All →
                </Link>
              </div>

              <div className="space-y-2">
                <div className="p-3 bg-[#0E1524] rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Laws of Motion</h5>
                    <p className="text-[10px] text-slate-400">Physics • In 1 day</p>
                  </div>
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="p-3 bg-[#0E1524] rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Mole Concept</h5>
                    <p className="text-[10px] text-slate-400">Chemistry • In 2 days</p>
                  </div>
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="p-3 bg-[#0E1524] rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Quadratic Equations</h5>
                    <p className="text-[10px] text-slate-400">Maths • In 3 days</p>
                  </div>
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            </Card>

          </div>

        </div>

        {/* Right Column: Subject Progress, Streak & Quick Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Subject Progress Card */}
          <Card padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                Real Subject Completion Progress
              </h3>
              <Link to="/subjects" className="text-xs text-violet-400 hover:underline">
                View Workspaces →
              </Link>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-slate-200">Physics</span>
                  <span className="text-violet-400">{physicsProgress}%</span>
                </div>
                <ProgressBar progress={physicsProgress} subject="Physics" height="sm" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-slate-200">Chemistry</span>
                  <span className="text-amber-400">{chemProgress}%</span>
                </div>
                <ProgressBar progress={chemProgress} subject="Chemistry" height="sm" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-slate-200">Mathematics</span>
                  <span className="text-emerald-400">{mathsProgress}%</span>
                </div>
                <ProgressBar progress={mathsProgress} subject="Mathematics" height="sm" />
              </div>
            </div>
          </Card>

          {/* Study Streak Card */}
          <Card padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500/30 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-100">Study Streak</h4>
              </div>
              <span className="text-lg font-extrabold text-amber-400">{streakDays} days</span>
            </div>
            <p className="text-xs text-slate-400">Keep it up! Daily study habits trigger maximum retention.</p>
          </Card>

          {/* Quick Actions Grid */}
          <Card padding="md" className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Quick Actions
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => openTopicMastery('topic-p1')}
                className="p-3.5 bg-[#0E1524] hover:bg-[#151F36] border border-slate-800 hover:border-violet-500/40 rounded-xl text-left transition-all group cursor-pointer col-span-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-violet-950 text-violet-400 border border-violet-800">
                    <Rocket className="w-5 h-5" />
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-100 group-hover:text-violet-300">4-Step Topic Mastery Pipeline</h5>
                    <p className="text-[10px] text-slate-400">Learn → Understand → Check → Practice</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setIsImStuckOpen(true)}
                className="p-3.5 bg-[#0E1524] hover:bg-[#151F36] border border-slate-800 hover:border-rose-500/40 rounded-xl text-left transition-all group cursor-pointer"
              >
                <AlertCircle className="w-5 h-5 text-rose-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-rose-300">I'm Stuck 🔴</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">Diagnostic guidance</p>
              </button>

              <button
                onClick={() => setIsQuestionBreakdownOpen(true)}
                className="p-3.5 bg-[#0E1524] hover:bg-[#151F36] border border-slate-800 hover:border-violet-500/40 rounded-xl text-left transition-all group cursor-pointer"
              >
                <HelpCircle className="w-5 h-5 text-violet-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-violet-300">Question Breakdown</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">Hints & solution steps</p>
              </button>

              <button
                onClick={() => setIsAddMistakeOpen(true)}
                className="p-3.5 bg-[#0E1524] hover:bg-[#151F36] border border-slate-800 hover:border-amber-500/40 rounded-xl text-left transition-all group cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-amber-300">Add Mistake</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">Save to notebook</p>
              </button>

              <Link
                to="/resources"
                className="p-3.5 bg-[#0E1524] hover:bg-[#151F36] border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-all group cursor-pointer block"
              >
                <BookOpen className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">Resources</h5>
                <p className="text-[10px] text-slate-400 mt-0.5">Curated formula & PYQs</p>
              </Link>
            </div>
          </Card>

        </div>

      </div>

      {/* QUICK GOAL TUNER MODAL */}
      <Modal
        isOpen={isGoalTunerOpen}
        onClose={() => setIsGoalTunerOpen(false)}
        maxWidth="md"
        title="🎯 Customize Study Goals & Rank Target"
        subtitle="Update your AIR Goal, Time Budget, and Weakest Subject"
      >
        <form onSubmit={handleSaveGoals} className="space-y-4 text-xs select-none">
          <div>
            <label className="block font-bold text-slate-200 mb-1">Target All India Rank (AIR Goal)</label>
            <input
              type="number"
              required
              min={1}
              max={50000}
              value={tunerData.targetRank}
              onChange={(e) => setTunerData({ ...tunerData, targetRank: parseInt(e.target.value) || 500 })}
              className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1">
              Daily Self-Study Hours Budget ({tunerData.dailyStudyHours} Hours/Day)
            </label>
            <input
              type="range"
              min={3}
              max={14}
              step={1}
              value={tunerData.dailyStudyHours}
              onChange={(e) => setTunerData({ ...tunerData, dailyStudyHours: parseInt(e.target.value) })}
              className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-200 mb-1">Weakest Subject (Receives +35% Time Allocation)</label>
            <select
              value={tunerData.weakestSubject}
              onChange={(e) => setTunerData({ ...tunerData, weakestSubject: e.target.value as SubjectType })}
              className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsGoalTunerOpen(false)}>
              Cancel
            </Button>
            <Button variant="glow" size="sm" type="submit">
              <Save className="w-3.5 h-3.5" />
              Save Goal Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
