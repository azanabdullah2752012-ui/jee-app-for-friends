import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { Button } from '../components/ui/Button';
import { Rocket, Sparkles, ShieldCheck, Target, Clock, BookOpen, Trophy } from 'lucide-react';
import type { SubjectType } from '../types';
import { dbSaveProfile } from '../services/supabaseService';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, authUser } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name || (authUser?.email ? authUser.email.split('@')[0] : ''),
    classLevel: profile.classLevel || 'Class 11',
    targetExam: profile.targetExam || 'JEE Advanced 2026',
    dailyStudyHours: profile.dailyStudyHours || 6,
    strongestSubject: profile.strongestSubject || ('Physics' as SubjectType),
    weakestSubject: profile.weakestSubject || ('Chemistry' as SubjectType),
    targetRank: profile.targetRank || 500,
    primaryBottleneck: profile.primaryBottleneck || 'Time Management & Speed',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated = {
      ...profile,
      ...formData,
      name: formData.name.trim() || 'JEE Aspirant',
      onboardingCompleted: true,
      isCompleted: true,
    };

    updateProfile(updated);
    await dbSaveProfile(updated);

    setTimeout(() => {
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans flex items-center justify-center p-4 md:p-8 select-none">
      <div className="w-full max-w-2xl bg-[#101726] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 md:p-8 space-y-6">
        
        {/* Header Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
              <Rocket className="w-5 h-5 transform -rotate-12" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-100 font-heading">Student Setup & Goal Diagnostic</h1>
              <p className="text-xs text-slate-400">Configure your JEE target to build your personal study OS.</p>
            </div>
          </div>

          <span className="text-[10px] uppercase font-mono font-bold bg-violet-950 text-violet-300 px-3 py-1 rounded-full border border-violet-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            1-Step Setup
          </span>
        </div>

        {/* Diagnostic Form */}
        <form onSubmit={handleCompleteOnboarding} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" /> Your Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Azan"
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Target Rank */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Target All India Rank (AIR Goal)
              </label>
              <input
                type="number"
                required
                min={1}
                max={50000}
                value={formData.targetRank}
                onChange={(e) => setFormData({ ...formData, targetRank: parseInt(e.target.value) || 500 })}
                placeholder="500"
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            {/* Academic Class */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">Academic Class</label>
              <select
                value={formData.classLevel}
                onChange={(e) => setFormData({ ...formData, classLevel: e.target.value as any })}
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Class 11">Class 11 (Primary Prep)</option>
                <option value="Class 12">Class 12 (Board + JEE)</option>
                <option value="Dropper">Dropper Batch (Full Focus)</option>
              </select>
            </div>

            {/* Target Exam */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">Target Exam Year</label>
              <select
                value={formData.targetExam}
                onChange={(e) => setFormData({ ...formData, targetExam: e.target.value as any })}
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                <option value="JEE Main 2026">JEE Main 2026</option>
                <option value="JEE Advanced 2027">JEE Advanced 2027</option>
                <option value="JEE Main 2027">JEE Main 2027</option>
              </select>
            </div>

          </div>

          {/* Daily Study Hours Slider */}
          <div className="p-4 bg-[#070A12] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-violet-400" />
                Daily Available Self-Study Hours
              </span>
              <span className="text-amber-400 font-bold font-mono text-sm">{formData.dailyStudyHours} Hours / Day</span>
            </div>
            <input
              type="range"
              min={3}
              max={14}
              step={1}
              value={formData.dailyStudyHours}
              onChange={(e) => setFormData({ ...formData, dailyStudyHours: parseInt(e.target.value) })}
              className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Weakest Subject & Primary Bottleneck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-rose-400" /> Weakest Subject (Gets +35% Time)
              </label>
              <select
                value={formData.weakestSubject}
                onChange={(e) => setFormData({ ...formData, weakestSubject: e.target.value as SubjectType })}
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5">Primary Study Bottleneck</label>
              <select
                value={formData.primaryBottleneck}
                onChange={(e) => setFormData({ ...formData, primaryBottleneck: e.target.value })}
                className="w-full bg-[#070A12] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Time Management & Speed">Time Management & Speed</option>
                <option value="Conceptual Gaps in Advanced Problems">Conceptual Gaps in Advanced Problems</option>
                <option value="Formula Retention & Spaced Revision">Formula Retention & Spaced Revision</option>
                <option value="Lack of Adequate PYQ Practice">Lack of Adequate PYQ Practice</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Directly saved to Supabase PostgreSQL</span>
            </div>

            <Button variant="glow" size="lg" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Initializing Workspace...' : '🚀 Launch My Study OS'}</span>
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
};
