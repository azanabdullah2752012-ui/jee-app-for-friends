import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Save, Check } from 'lucide-react';
import type { SubjectType } from '../types';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, streakDays } = useApp();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: profile.name,
    classLevel: profile.classLevel,
    targetExam: profile.targetExam,
    dailyStudyHours: profile.dailyStudyHours,
    strongestSubject: profile.strongestSubject,
    weakestSubject: profile.weakestSubject,
    targetRank: profile.targetRank,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-violet-400" />
          Student Profile & Strategy
        </h1>
        <p className="text-xs text-slate-400">
          Manage your personal study parameters and Roadmap Engine preferences.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="space-y-1">
          <span className="text-xs font-semibold text-slate-400">Target AIR Goal</span>
          <div className="text-2xl font-bold text-violet-400 font-mono">#{profile.targetRank}</div>
          <p className="text-[10px] text-slate-500">{profile.targetExam}</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <span className="text-xs font-semibold text-slate-400">Daily Study Hours</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{profile.dailyStudyHours} Hours</div>
          <p className="text-[10px] text-slate-500">Auto-budgeted</p>
        </Card>

        <Card padding="md" className="space-y-1">
          <span className="text-xs font-semibold text-slate-400">Current Study Streak</span>
          <div className="text-2xl font-bold text-amber-400 font-mono">{streakDays} Days</div>
          <p className="text-[10px] text-slate-500">Consistency score: 96%</p>
        </Card>
      </div>

      {/* Edit Form Card */}
      <Card padding="lg">
        <form onSubmit={handleSave} className="space-y-5 text-xs text-slate-200">
          <h3 className="text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Roadmap Engine Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Student Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Class Level</label>
              <select
                value={formData.classLevel}
                onChange={(e) => setFormData({ ...formData, classLevel: e.target.value as any })}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              >
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper">Dropper</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Exam</label>
              <select
                value={formData.targetExam}
                onChange={(e) => setFormData({ ...formData, targetExam: e.target.value as any })}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              >
                <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                <option value="JEE Main 2026">JEE Main 2026</option>
                <option value="JEE Advanced 2027">JEE Advanced 2027</option>
                <option value="JEE Main 2027">JEE Main 2027</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Daily Study Hours ({formData.dailyStudyHours}h)</label>
              <input
                type="range"
                min={2}
                max={12}
                value={formData.dailyStudyHours}
                onChange={(e) => setFormData({ ...formData, dailyStudyHours: parseInt(e.target.value) })}
                className="w-full accent-violet-500 mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-emerald-400 mb-1">Strongest Subject</label>
              <select
                value={formData.strongestSubject}
                onChange={(e) => setFormData({ ...formData, strongestSubject: e.target.value as SubjectType })}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-rose-400 mb-1">Weakest Subject Focus</label>
              <select
                value={formData.weakestSubject}
                onChange={(e) => setFormData({ ...formData, weakestSubject: e.target.value as SubjectType })}
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-rose-500 text-xs"
              >
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <Button type="submit" variant="glow" size="md">
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Parameters Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save & Update Engine
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
