import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Mail, Lock, UserPlus, LogIn, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useApp } from '../app/AppContext';
import { SignInWithChatGPT } from '@openai-oauth/react';
import { signInWithGoogle, dbSaveProfile } from '../services/supabaseService';
import { supabase } from '../services/supabase';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthUser, profile, updateProfile } = useApp();

  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const completeInstantLaunch = async (userEmail: string) => {
    const defaultName = userEmail ? userEmail.split('@')[0] : 'JEE Scholar';
    const updatedProf = {
      ...profile,
      name: profile.name || defaultName,
      targetRank: profile.targetRank || 500,
      onboardingCompleted: true,
      isCompleted: true,
    };
    updateProfile(updatedProf);
    await dbSaveProfile(updatedProf);
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setAuthError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      if (error.message?.includes('provider is not enabled')) {
        setAuthError('Google Provider is not enabled in your Supabase Dashboard yet. Enable Google in Supabase Auth -> Providers.');
      } else {
        setAuthError(error.message);
      }
    } else {
      await completeInstantLaunch('Google User');
    }
    setLoadingGoogle(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoadingEmail(true);
    setAuthError(null);
    setSuccessMessage(null);

    if (supabase) {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthUser(data.user);
          setSuccessMessage('Account created! Launching JEE Study OS...');
          setTimeout(async () => {
            await completeInstantLaunch(email);
          }, 500);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthUser(data.user);
          setSuccessMessage('Welcome back! Opening workspace...');
          setTimeout(async () => {
            await completeInstantLaunch(email);
          }, 400);
        }
      }
    } else {
      setSuccessMessage('Launching workspace...');
      setTimeout(async () => {
        await completeInstantLaunch(email);
      }, 400);
    }
    setLoadingEmail(false);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans flex items-center justify-center p-4 md:p-8 select-none relative overflow-hidden">
      {/* Background Ambient Blur Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Split-Screen Container */}
      <div className="w-full max-w-5xl bg-[#0F1626]/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] backdrop-blur-xl z-10">
        
        {/* Left Panel: Branding & Features */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#121A2D] via-[#0D1322] to-[#0A0E1A] p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between relative">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
                <Rocket className="w-5 h-5 transform -rotate-12" />
              </div>
              <span className="font-extrabold text-xl tracking-tight font-heading gradient-text">
                JEE Mentor OS
              </span>
            </Link>

            <div className="space-y-2 pt-4">
              <span className="text-[10px] uppercase font-mono font-bold text-violet-400 bg-violet-950/80 px-2.5 py-1 rounded-full border border-violet-700/50 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                The Study Operating System
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-100 font-heading leading-tight">
                Discipline Today, Success Tomorrow.
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured planning, spaced revision queues, mistake notebooks, and first-principles Socratic tutoring for JEE Main & Advanced.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deterministic Daily Roadmap Engine</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Spaced Repetition Active Recall Queue</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full-Stack Supabase Live DB Cloud Sync</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>0-Step Instant Access. Encrypted with Supabase RLS.</span>
          </div>
        </div>

        {/* Right Panel: Instant Auth Form */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center space-y-6 bg-[#0E1524]/60">
          
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-100 font-heading">
              {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-slate-400">
              {authMode === 'signup'
                ? 'Sign up to launch your JEE Study OS workspace instantly.'
                : 'Sign in to access your daily tasks and active revisions.'}
            </p>
          </div>

          {/* Success & Error Alert Messages */}
          {authError && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs space-y-1 text-rose-200 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Authentication Error</span>
              </div>
              <p>{authError}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs flex items-center gap-2 text-emerald-300 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* SSO Buttons: Google & ChatGPT */}
          <div className="space-y-2.5">
            <button
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="w-full p-3 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-3 shadow-lg hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loadingGoogle ? 'Connecting Google...' : 'Continue with Google Account'}</span>
            </button>

            <div className="pt-0.5">
              <SignInWithChatGPT hideAttribution onSuccess={() => completeInstantLaunch('ChatGPT User')} />
            </div>
          </div>

          <div className="flex items-center my-1">
            <div className="flex-1 border-t border-slate-800" />
            <span className="px-3 text-[10px] text-slate-500 font-mono uppercase">Or Email Sign In</span>
            <div className="flex-1 border-t border-slate-800" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div className="flex rounded-xl bg-[#070A12] p-1 border border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signup' ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === 'signin' ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full bg-[#070A12] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#070A12] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <Button variant="glow" size="md" type="submit" disabled={loadingEmail} className="w-full justify-center mt-2">
              {authMode === 'signup' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>
                {loadingEmail
                  ? 'Processing...'
                  : authMode === 'signup'
                  ? 'Sign Up & Launch Workspace 🚀'
                  : 'Sign In to Workspace →'}
              </span>
            </Button>
          </form>

          {/* Quick Guest Launch Option */}
          <div className="pt-2 text-center border-t border-slate-800">
            <button
              onClick={() => completeInstantLaunch('Guest Aspirant')}
              className="text-xs font-semibold text-slate-400 hover:text-violet-300 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Continue as Guest Aspirant →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
