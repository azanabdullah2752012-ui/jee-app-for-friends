import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Rocket,
  Home as HomeIcon,
  MapPin,
  BookOpen,
  RotateCcw,
  AlertCircle,
  FolderGit2,
  User,
  Settings,
  Flame,
  ChevronDown,
  Bot,
  Trophy,
  Zap,
  ShoppingCart,
} from 'lucide-react';
import { useApp } from '../app/AppContext';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const { profile, streakDays, authUser, openAuthModal, calculatedLevel, levelTitle, weeklyActivity } = useApp();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: HomeIcon },
    { label: 'AI Tutor', path: '/ai-tutor', icon: Bot },
    { label: 'Store 🛒', path: '/store', icon: ShoppingCart },
    { label: 'Roadmap', path: '/roadmap', icon: MapPin },
    { label: 'Subjects', path: '/subjects', icon: BookOpen },
    { label: 'Revision', path: '/revision', icon: RotateCcw },
    { label: 'Mistakes', path: '/mistakes', icon: AlertCircle },
    { label: 'Resources', path: '/resources', icon: FolderGit2 },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F1626] border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Top Section: Logo & Nav Links */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
            <Rocket className="w-5 h-5 transform -rotate-12" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-slate-100 font-heading">
              JEE Mentor
            </h1>
            <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              Level {calculatedLevel} {levelTitle}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-violet-600/20 text-violet-200 border border-violet-500/30 shadow-xs shadow-violet-900/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={clsx('w-4 h-4', isActive ? 'text-violet-400' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section: Streak Card & Profile */}
      <div className="p-4 space-y-3 border-t border-slate-800/80 bg-[#0C1220]/60">
        {/* Study Streak Card Widget */}
        <div className="p-3.5 rounded-xl bg-[#131C30] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500/30 animate-pulse" />
              <span>Study Streak</span>
            </div>
            <span className="text-xs font-bold text-amber-400">{streakDays} days</span>
          </div>

          <div className="flex justify-between items-end gap-1 pt-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
              const active = weeklyActivity[i];
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={clsx(
                      'w-full rounded-xs transition-all',
                      active ? 'bg-violet-500 h-6' : 'bg-slate-800 h-3'
                    )}
                  />
                  <span className="text-[9px] text-slate-500 font-medium">{day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium pt-0.5">Keep showing up daily!</p>
        </div>

        {/* Unified Profile Card Footer */}
        <div
          onClick={openAuthModal}
          className="flex items-center justify-between p-2.5 rounded-xl bg-[#131C30]/80 border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-violet-500/30">
              {authUser?.email ? authUser.email[0].toUpperCase() : profile.name ? profile.name.charAt(0) : 'J'}
            </div>
            <div className="overflow-hidden text-left">
              <h4 className="text-xs font-bold text-slate-200 truncate">
                {authUser?.email ? authUser.email.split('@')[0] : profile.name || 'Aspirant'}
              </h4>
              <p className="text-[10px] text-emerald-400 truncate flex items-center gap-1 font-mono">
                <Trophy className="w-2.5 h-2.5" />
                AIR #{profile.targetRank} Target
              </p>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
