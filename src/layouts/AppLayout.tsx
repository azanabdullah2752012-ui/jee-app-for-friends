import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QuestionBreakdownModal } from '../components/features/QuestionBreakdownModal';
import { ImStuckDrawer } from '../components/features/ImStuckDrawer';
import { AddMistakeModal } from '../components/features/AddMistakeModal';
import { TimerModal } from '../components/features/TimerModal';
import { TopicMasteryModal } from '../components/features/TopicMasteryModal';
import { ChapterDetailModal } from '../components/features/ChapterDetailModal';
import { VideoPlayerModal } from '../components/features/VideoPlayerModal';
import { AiDoubtSolverModal } from '../components/features/AiDoubtSolverModal';
import { AuthModal } from '../components/features/AuthModal';
import { useApp } from '../app/AppContext';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const {
    isTopicMasteryOpen,
    setIsTopicMasteryOpen,
    activeTopicMasteryData,
    isChapterDetailOpen,
    setIsChapterDetailOpen,
    activeChapterDetailData,
    isFocusMode,
  } = useApp();

  const getPageTitle = (pathname: string): string => {
    if (pathname.includes('/dashboard')) return 'Home';
    if (pathname.includes('/ai-tutor')) return 'AI Socratic Tutor & Chatbot';
    if (pathname.includes('/roadmap')) return 'Roadmap Engine';
    if (pathname.includes('/subjects')) return 'Subject Workspaces';
    if (pathname.includes('/revision')) return 'Revision Queue';
    if (pathname.includes('/mistakes')) return 'Mistake Notebook';
    if (pathname.includes('/resources')) return 'Curated Resources Hub';
    if (pathname.includes('/profile')) return 'Student Profile';
    if (pathname.includes('/settings')) return 'Settings';
    return 'JEE Mentor';
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-violet-500 selection:text-white">
      {/* Sidebar — Hidden when Focus Mode (Remove Extras) is active */}
      {!isFocusMode && <Sidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle(location.pathname)} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Modals & Drawers */}
      <QuestionBreakdownModal />
      <ImStuckDrawer />
      <AddMistakeModal />
      <TimerModal />
      <TopicMasteryModal
        isOpen={isTopicMasteryOpen}
        onClose={() => setIsTopicMasteryOpen(false)}
        topicData={activeTopicMasteryData}
      />
      <ChapterDetailModal
        isOpen={isChapterDetailOpen}
        onClose={() => setIsChapterDetailOpen(false)}
        chapterData={activeChapterDetailData}
      />
      <VideoPlayerModal />
      <AiDoubtSolverModal />
      <AuthModal />
    </div>
  );
};
