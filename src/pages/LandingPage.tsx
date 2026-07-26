import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, ArrowRight, Sparkles, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SignInWithChatGPT } from '@openai-oauth/react';
import { signInWithGoogle } from '../services/supabaseService';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    const { error } = await signInWithGoogle();
    if (error) {
      navigate('/auth');
    } else {
      navigate('/dashboard');
    }
    setLoadingGoogle(false);
  };

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  const faqs = [
    {
      q: 'Is JEE Mentor an AI chatbot?',
      a: 'No. JEE Mentor is a structured study operating system. AI powers around 30% of the experience (like the "I\'m Stuck" diagnostic and Question Breakdown), while 70% is deterministic software designed for planning, revision, and mistake tracking.',
    },
    {
      q: 'How does the Roadmap Engine work?',
      a: 'The engine takes your target exam year, class level, available study hours, and subject strengths/weaknesses to automatically compute your daily task budget, weekly milestones, and spaced revision schedule.',
    },
    {
      q: 'Can I track mistakes for both JEE Main & Advanced?',
      a: 'Yes! The Mistake Notebook categorizes errors by subject, chapter, error type (Conceptual, Calculation, Time Pressure), and places them into an active spaced repetition queue.',
    },
    {
      q: 'Does it support Class 11, Class 12, and Droppers?',
      a: 'Yes, JEE Mentor tailors the entire curriculum roadmap based on your current academic year and target rank goals.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans overflow-x-hidden selection:bg-violet-500 selection:text-white select-none">
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
            <Rocket className="w-5 h-5 transform -rotate-12" />
          </div>
          <span className="font-extrabold text-xl tracking-tight font-heading gradient-text">
            JEE Mentor
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
          <a href="#roadmap" className="hover:text-violet-400 transition-colors">Roadmap Engine</a>
          <a href="#why" className="hover:text-violet-400 transition-colors">Why JEE Mentor</a>
          <a href="#faq" className="hover:text-violet-400 transition-colors">FAQ</a>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="px-3.5 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
            <span>Google</span>
          </button>

          <div className="shrink-0">
            <SignInWithChatGPT hideAttribution onSuccess={handleAuthSuccess} />
          </div>

          <Link to="/auth">
            <Button variant="glow" size="sm">
              <User className="w-4 h-4" />
              Sign In →
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 max-w-6xl mx-auto px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-700/50 text-xs font-semibold text-violet-300 mb-8 shadow-inner animate-pulse">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>The Study Operating System for JEE Aspirants</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-heading mb-6 max-w-4xl mx-auto leading-[1.1]">
          Your Personal <span className="gradient-text-purple">JEE Mentor</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Get coaching-like guidance through structured planning, progress tracking, mistake analysis, and intelligent mentoring.
        </p>

        {/* Hero Auth Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="px-6 py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center gap-3 shadow-xl hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
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
            <span>Continue with Google</span>
          </button>

          <div className="shrink-0">
            <SignInWithChatGPT hideAttribution onSuccess={handleAuthSuccess} />
          </div>

          <Link to="/auth">
            <Button variant="glow" size="lg" className="px-8 py-3.5 text-sm">
              <span>Launch Workspace Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-t border-slate-800/80 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold font-heading text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0E1524] border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-5 text-left font-bold text-sm flex items-center justify-between text-slate-200 hover:text-violet-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-4 h-4 text-violet-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
