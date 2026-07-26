import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useApp } from '../../app/AppContext';
import { SignInWithChatGPT } from '@openai-oauth/react';
import { signInWithGoogle, signOutUser, dbSaveProfile } from '../../services/supabaseService';
import { supabase } from '../../services/supabase';
import { LogOut, CheckCircle2, ShieldCheck, AlertTriangle, Mail, Lock, UserPlus, LogIn, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authUser, setAuthUser, profile, updateProfile } = useApp();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const completeInstantAuth = async (userEmail: string) => {
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
    closeAuthModal();
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setAuthError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      if (error.message?.includes('provider is not enabled')) {
        setAuthError(
          'Google Provider is not enabled in your Supabase Dashboard yet. Enable Google in Supabase Auth -> Providers.'
        );
      } else {
        setAuthError(error.message);
      }
    } else {
      await completeInstantAuth('Google User');
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
        });
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthUser(data.user);
          setSuccessMessage('Account created successfully! Launching workspace...');
          setTimeout(async () => {
            await completeInstantAuth(email);
          }, 600);
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
          setSuccessMessage('Signed in! Launching workspace...');
          setTimeout(async () => {
            await completeInstantAuth(email);
          }, 500);
        }
      }
    } else {
      // Local Fallback if Supabase not configured
      setSuccessMessage('Welcome to JEE Mentor OS!');
      setTimeout(async () => {
        await completeInstantAuth(email);
      }, 500);
    }
    setLoadingEmail(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    setAuthUser(null);
    closeAuthModal();
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
      title="🚀 Instant Account Access"
      subtitle="Sign up or log in to launch your JEE Mentor Study OS"
    >
      <div className="space-y-5 select-none">
        
        {/* If Already Logged In */}
        {authUser ? (
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-[#131B2E] to-indigo-950/60 rounded-2xl border border-emerald-800/40 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 mx-auto flex items-center justify-center font-bold text-xl font-mono">
              {authUser.email ? authUser.email[0].toUpperCase() : 'J'}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Active Authenticated Session
              </span>
              <h3 className="text-base font-bold text-slate-100">{authUser.email}</h3>
            </div>

            <div className="flex gap-2 justify-center">
              <Button variant="glow" size="md" onClick={() => { closeAuthModal(); navigate('/dashboard'); }}>
                <Rocket className="w-4 h-4" />
                Go to Workspace
              </Button>
              <Button variant="danger" size="md" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          /* Authentication Options */
          <div className="space-y-4">
            
            {/* Success & Error Messages */}
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

            {/* Quick 1-Click SSO Buttons */}
            <div className="space-y-2">
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

              <div className="pt-1">
                <SignInWithChatGPT hideAttribution onSuccess={() => completeInstantAuth('ChatGPT User')} />
              </div>
            </div>

            <div className="flex items-center my-2">
              <div className="flex-1 border-t border-slate-800" />
              <span className="px-3 text-[10px] text-slate-500 font-mono uppercase">Or Quick Email Access</span>
              <div className="flex-1 border-t border-slate-800" />
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div className="flex rounded-xl bg-[#0B0F19] p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'signup' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    authMode === 'signin' ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Log In
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
                    : 'Log In & Continue'}
                </span>
              </Button>
            </form>

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Encrypted with Supabase PostgreSQL Row Level Security (RLS).</span>
            </div>

          </div>
        )}

      </div>
    </Modal>
  );
};
