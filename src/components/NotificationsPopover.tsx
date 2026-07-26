import React from 'react';
import { Bell, RotateCcw, Calendar, X, Sparkles } from 'lucide-react';
import { useApp } from '../app/AppContext';
import { useNavigate } from 'react-router-dom';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'revision' | 'task' | 'achievement';
  read: boolean;
  link: string;
}

export const NotificationsPopover: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { tasks, mistakes, profile, streakDays } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Generate dynamic live notifications based on actual state
  const dueRevisions = mistakes.filter((m) => !m.mastered);
  const pendingTasks = tasks.filter((t) => !t.completed);

  const notifications: NotificationItem[] = [
    ...(dueRevisions.length > 0
      ? [
          {
            id: 'notif-rev-1',
            title: `${dueRevisions.length} Spaced Revisions Due Today`,
            description: `Review "${dueRevisions[0].title}" and other active recall items.`,
            time: 'Due Now',
            type: 'revision' as const,
            read: false,
            link: '/revision',
          },
        ]
      : []),
    ...(pendingTasks.length > 0
      ? [
          {
            id: 'notif-task-1',
            title: `${pendingTasks.length} Daily Plan Tasks Remaining`,
            description: `Next up: "${pendingTasks[0].title}" (${pendingTasks[0].durationMinutes} min)`,
            time: 'Today',
            type: 'task' as const,
            read: false,
            link: '/roadmap',
          },
        ]
      : []),
    {
      id: 'notif-streak-1',
      title: `🔥 ${streakDays}-Day Active Study Streak!`,
      description: `Targeting AIR ${profile.targetRank}. Keep up daily problem solving.`,
      time: 'Active',
      type: 'achievement' as const,
      read: true,
      link: '/dashboard',
    },
  ];

  const handleNotificationClick = (link: string) => {
    navigate(link);
    onClose();
  };

  return (
    <div className="absolute top-14 right-4 w-80 md:w-96 bg-[#0E1524] border border-slate-800 rounded-2xl shadow-2xl z-50 p-4 space-y-3 animate-fade-in select-none">
      {/* Popover Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-violet-400" />
          <h3 className="text-sm font-bold text-slate-100">Live Study Notifications</h3>
          <span className="text-[10px] bg-violet-950 text-violet-300 px-2 py-0.5 rounded-full font-mono font-bold border border-violet-800">
            {notifications.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.link)}
              className="p-3 rounded-xl bg-[#131B2E] border border-slate-800 hover:border-violet-500/50 transition-all cursor-pointer space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notif.type === 'revision' && <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  {notif.type === 'task' && <Calendar className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
                  {notif.type === 'achievement' && <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-violet-300 transition-colors truncate max-w-[200px]">
                    {notif.title}
                  </h4>
                </div>
                <span className="text-[9px] text-slate-500 font-mono">{notif.time}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug pl-5">{notif.description}</p>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-slate-500">No active notifications.</div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-800/80 text-center">
        <button
          onClick={onClose}
          className="text-[11px] font-semibold text-violet-400 hover:underline cursor-pointer"
        >
          Close Notifications
        </button>
      </div>
    </div>
  );
};
