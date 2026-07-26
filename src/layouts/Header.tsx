import React, { useState } from 'react';
import { Bell, Search, AlertCircle, HelpCircle, Bot, Sparkles, Trophy, Minimize2, Maximize2, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useApp } from '../app/AppContext';
import { NotificationsPopover } from '../components/NotificationsPopover';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../services/supabaseService';

export interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Home' }) => {
  const {
    setIsImStuckOpen,
    setIsQuestionBreakdownOpen,
    openAiDoubtSolver,
    authUser,
    setAuthUser,
    profile,
    mistakes,
    tasks,
    isFocusMode,
    toggleFocusMode,
  } = useApp();

  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadCount = mistakes.filter((m) => !m.mastered).length + tasks.filter((t) => !t.completed).length;

  const handleSignOut = async () => {
    await signOutUser();
    setAuthUser(null);
    setIsProfileMenuOpen(false);
    navigate('/auth');
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between select-none">
      {/* Title / Search */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-slate-100 font-heading">{title}</h2>
        {!isFocusMode && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121A2B] border border-slate-800 text-xs text-slate-400 w-64">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="flex-1">Search topics, formulas...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">⌘K</kbd>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 relative">
        {/* Distraction-Free Focus Mode Toggle */}
        <Button
          variant={isFocusMode ? 'glow' : 'outline'}
          size="sm"
          onClick={toggleFocusMode}
          title={isFocusMode ? 'Exit Distraction-Free Focus Mode' : 'Remove Extras / Distraction-Free Study Mode'}
        >
          {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-amber-400" />}
          <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus Mode 🎯'}</span>
        </Button>

        {/* OpenAI OAuth Powered AI Tutor Button */}
        {!isFocusMode && (
          <Button
            variant="glow"
            size="sm"
            onClick={() => openAiDoubtSolver()}
            className="hidden sm:inline-flex"
          >
            <Bot className="w-4 h-4 text-violet-300" />
            <span>AI Tutor</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </Button>
        )}

        {/* Quick Question Breakdown Trigger */}
        {!isFocusMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsQuestionBreakdownOpen(true)}
            className="hidden md:inline-flex"
          >
            <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
            Question Breakdown
          </Button>
        )}

        {/* Psychological AI Trigger: "I'm Stuck" */}
        <Button
          variant="stuck"
          size="sm"
          onClick={() => setIsImStuckOpen(true)}
        >
          <AlertCircle className="w-4 h-4 animate-pulse" />
          I'm Stuck 🔴
        </Button>

        {/* Unified Student Identity & Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#121A2B] border border-slate-800 hover:border-violet-500/50 text-xs text-slate-200 hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-violet-500/30">
              {authUser?.email ? authUser.email[0].toUpperCase() : profile.name ? profile.name.charAt(0) : 'J'}
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                {authUser?.email ? authUser.email.split('@')[0] : profile.name || 'Scholar'}
              </span>
              <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5">
                <Trophy className="w-2.5 h-2.5" />
                AIR #{profile.targetRank} Target
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Student Account Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute top-12 right-0 w-56 bg-[#0E1524] border border-slate-800 rounded-2xl shadow-2xl z-50 p-2 space-y-1 animate-fade-in select-none">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="text-xs font-bold text-slate-200 truncate">
                  {authUser?.email || profile.name || 'JEE Student'}
                </p>
                <p className="text-[10px] text-emerald-400 font-mono">AIR #{profile.targetRank} Goal Target</p>
              </div>

              <button
                onClick={() => { setIsProfileMenuOpen(false); navigate('/profile'); }}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-violet-400" />
                Student Profile
              </button>

              <button
                onClick={() => { setIsProfileMenuOpen(false); navigate('/settings'); }}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-indigo-400" />
                Settings & Cloud DB Sync
              </button>

              <div className="border-t border-slate-800/80 my-1" />

              <button
                onClick={handleSignOut}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out Account
              </button>
            </div>
          )}
        </div>

        {/* Interactive Notifications Trigger */}
        <button
          onClick={() => setIsNotifOpen((prev) => !prev)}
          className="p-2 rounded-xl bg-[#121A2B] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-violet-500/40 transition-colors relative cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          )}
        </button>

        {/* Live Notifications Popover */}
        <NotificationsPopover isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      </div>
    </header>
  );
};
