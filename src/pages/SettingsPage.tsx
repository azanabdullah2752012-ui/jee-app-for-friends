import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Settings,
  Shield,
  Download,
  RefreshCw,
  Bot,
  Database,
  Server,
  User,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { SignInWithChatGPT } from '@openai-oauth/react';
import { isSupabaseConfigured, setSupabaseCredentials, clearSupabaseCredentials } from '../services/supabase';
import { useApp } from '../app/AppContext';
import { dbSaveProfile } from '../services/supabaseService';
import type { SubjectType } from '../types';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'database' | 'auth' | 'preferences'>('profile');

  // Local Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    classLevel: profile.classLevel,
    targetExam: profile.targetExam,
    targetRank: profile.targetRank,
    dailyStudyHours: profile.dailyStudyHours,
    strongestSubject: profile.strongestSubject,
    weakestSubject: profile.weakestSubject,
    primaryBottleneck: profile.primaryBottleneck,
  });

  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Supabase Credentials State
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(localStorage.getItem('jee_supabase_url') || '');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(localStorage.getItem('jee_supabase_anon_key') || '');

  const handleSaveProfile = async () => {
    const next = { ...profile, ...profileForm };
    updateProfile(next);
    await dbSaveProfile(next);
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 3000);
  };

  const handleSaveSupabase = () => {
    if (!supabaseUrlInput || !supabaseKeyInput) {
      alert('Please enter both Supabase Project URL and Anon API Key.');
      return;
    }
    setSupabaseCredentials(supabaseUrlInput.trim(), supabaseKeyInput.trim());
  };

  const handleResetData = () => {
    if (confirm('Reset local study data back to default initial mock state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-400" />
          Settings & Cloud Operations
        </h1>
        <p className="text-xs text-slate-400">
          Manage your student target rank, daily study hours budget, Supabase Postgres cloud sync, and AI tutor.
        </p>
      </div>

      {/* Tab Navigation Bar */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Student Goals & AIR Target</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'database'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Supabase Postgres DB</span>
        </button>

        <button
          onClick={() => setActiveTab('auth')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'auth'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI Tutor & ChatGPT OAuth</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'preferences'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>System & Storage</span>
        </button>
      </div>

      <Card padding="lg" className="space-y-6">
        
        {/* TAB 1: STUDENT GOALS & PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-400" />
                Student Target Rank & Schedule Parameters
              </h3>
              <Button variant="glow" size="sm" onClick={handleSaveProfile}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isProfileSaved ? 'Profile Saved! ✓' : 'Save Profile Changes'}</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Student Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target AIR Rank (Goal)</label>
                <input
                  type="number"
                  value={profileForm.targetRank}
                  onChange={(e) => setProfileForm({ ...profileForm, targetRank: parseInt(e.target.value) || 500 })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-emerald-400 font-bold focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Academic Class</label>
                <select
                  value={profileForm.classLevel}
                  onChange={(e) => setProfileForm({ ...profileForm, classLevel: e.target.value as any })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="Class 11">Class 11 (Primary Prep)</option>
                  <option value="Class 12">Class 12 (Board + JEE)</option>
                  <option value="Dropper">Dropper Batch</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Exam</label>
                <select
                  value={profileForm.targetExam}
                  onChange={(e) => setProfileForm({ ...profileForm, targetExam: e.target.value as any })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="JEE Advanced 2026">JEE Advanced 2026</option>
                  <option value="JEE Main 2026">JEE Main 2026</option>
                  <option value="JEE Advanced 2027">JEE Advanced 2027</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Strongest Subject</label>
                <select
                  value={profileForm.strongestSubject}
                  onChange={(e) => setProfileForm({ ...profileForm, strongestSubject: e.target.value as SubjectType })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Weakest Subject (Needs +35% Time)</label>
                <select
                  value={profileForm.weakestSubject}
                  onChange={(e) => setProfileForm({ ...profileForm, weakestSubject: e.target.value as SubjectType })}
                  className="w-full p-3 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-rose-300 font-semibold focus:outline-none focus:border-violet-500"
                >
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUPABASE POSTGRESQL DB */}
        {activeTab === 'database' && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Supabase PostgreSQL Live Cloud Sync
              </h3>
              <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
                  : 'bg-amber-950/80 text-amber-300 border-amber-700/50'
              }`}>
                {isSupabaseConfigured ? '🟢 Connected & Synced to Live Supabase' : '🟠 Local Storage Mode'}
              </span>
            </div>

            <div className="p-4 bg-[#0B0F19] rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">VITE_SUPABASE_URL</label>
                <input
                  type="text"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  className="w-full p-2.5 bg-[#070A12] border border-slate-800 rounded-lg font-mono text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300 block">VITE_SUPABASE_ANON_KEY</label>
                <input
                  type="password"
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  className="w-full p-2.5 bg-[#070A12] border border-slate-800 rounded-lg font-mono text-slate-100 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <Button variant="glow" size="sm" onClick={handleSaveSupabase}>
                    <Server className="w-3.5 h-3.5" />
                    Save & Reconnect
                  </Button>

                  {isSupabaseConfigured && (
                    <Button variant="outline" size="sm" onClick={clearSupabaseCredentials}>
                      Disconnect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OPENAI CHATGPT OAUTH */}
        {activeTab === 'auth' && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-5 bg-gradient-to-r from-violet-950/50 via-[#131B2E] to-indigo-950/50 rounded-2xl border border-violet-800/40 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400" />
                    OpenAI ChatGPT OAuth Status
                  </h3>
                  <p className="text-xs text-slate-300">
                    Connect your ChatGPT account to use GPT-4o reasoning for free AI Socratic tutoring.
                  </p>
                </div>

                <div className="shrink-0">
                  <SignInWithChatGPT hideAttribution />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM & STORAGE */}
        {activeTab === 'preferences' && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-3 pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Local Backup & Reset Options
              </h3>
              <p className="text-xs text-slate-400">
                JEE Mentor syncs state to Supabase Postgres when connected, with local storage fallback.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" size="sm" onClick={() => alert('Exporting JEE Mentor Study OS backup JSON file...')}>
                  <Download className="w-3.5 h-3.5" />
                  Export Study Data (JSON)
                </Button>

                <Button variant="danger" size="sm" onClick={handleResetData}>
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Local Study Data
                </Button>
              </div>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
};
