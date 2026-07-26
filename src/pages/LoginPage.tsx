import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, ArrowRight, ShieldCheck, Mail, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useApp } from '../app/AppContext';
import { supabase } from '../services/supabase';
import { dbSaveProfile } from '../services/supabaseService';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthUser, profile, updateProfile } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setAuthError(null);

    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthUser(data.user);
        const updatedProf = {
          ...profile,
          name: profile.name || email.split('@')[0],
          onboardingCompleted: true,
          isCompleted: true,
        };
        updateProfile(updatedProf);
        await dbSaveProfile(updatedProf);
        navigate('/dashboard');
      }
    } else {
      const updatedProf = {
        ...profile,
        name: profile.name || email.split('@')[0],
        onboardingCompleted: true,
        isCompleted: true,
      };
      updateProfile(updatedProf);
      navigate('/dashboard');
    }
    setIsLoading(false);
  };

  const handleInstantGuestLaunch = async () => {
    const updatedProf = {
      ...profile,
      name: profile.name || 'JEE Scholar',
      targetRank: profile.targetRank || 500,
      onboardingCompleted: true,
      isCompleted: true,
    };
    updateProfile(updatedProf);
    await dbSaveProfile(updatedProf);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-[#101726] border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-violet-600/30">
            <Rocket className="w-6 h-6 transform -rotate-12" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-100">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log into your JEE Mentor Study OS workspace</p>
        </div>

        {authError && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs space-y-1 text-rose-200 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Sign In Failed</span>
            </div>
            <p>{authError}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@gmail.com"
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl pl-9 pr-4 py-3 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
              />
            </div>
          </div>

          <Button type="submit" variant="glow" size="lg" disabled={isLoading} className="w-full justify-center">
            {isLoading ? 'Signing In...' : 'Sign In to Study OS'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Demo Fast Track Button */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-3">
          <div className="p-3 bg-violet-950/30 border border-violet-800/40 rounded-xl text-xs text-violet-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              Instant Workspace Launch
            </span>
            <button
              onClick={handleInstantGuestLaunch}
              className="text-violet-400 hover:underline font-bold font-sans"
            >
              Launch Now →
            </button>
          </div>

          <div className="text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/onboarding" className="text-violet-400 hover:underline font-semibold">
              Quick Setup
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
