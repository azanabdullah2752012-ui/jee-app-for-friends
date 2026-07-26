import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { User } from '@supabase/supabase-js';
import type {
  OnboardingState,
  TaskItem,
  MistakeItem,
  ChapterProgress,
  ResourceItem,
  QuestionBreakdownData,
  TopicMasteryData,
  ChapterDetailData,
} from '../types';
import {
  initialOnboardingState,
  initialTasks,
  initialMistakes,
  initialChapters,
  initialResources,
  sampleQuestionBreakdown,
} from '../services/mockData';
import { sampleTopicMasteryData, getTopicMasteryById } from '../services/topicMasteryData';
import { sampleChapterDetailData, getChapterDetailById } from '../services/chapterTemplateData';
import {
  dbFetchProfile,
  dbSaveProfile,
  dbFetchTasks,
  dbCreateTask,
  dbToggleTask,
  dbFetchMistakes,
  dbCreateMistake,
  dbSaveChapterProgress,
  getCurrentUser,
} from '../services/supabaseService';
import { isSupabaseConfigured, supabase } from '../services/supabase';

interface AppContextType {
  profile: OnboardingState;
  setProfile: React.Dispatch<React.SetStateAction<OnboardingState>>;
  updateProfile: (updates: Partial<OnboardingState>) => void;

  tasks: TaskItem[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  deleteTask: (id: string) => void;

  mistakes: MistakeItem[];
  addMistake: (mistake: Omit<MistakeItem, 'id' | 'daysAgo' | 'dateAdded' | 'revisionCount' | 'nextRevisionDate' | 'mastered'>) => void;
  toggleMistakeMastered: (id: string) => void;
  deleteMistake: (id: string) => void;

  chapters: ChapterProgress[];
  updateChapterProgress: (id: string, percentage: number) => void;

  resources: ResourceItem[];

  // Supabase Auth & Cloud State
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isCloudSynced: boolean;

  // Modals & Drawers state
  isImStuckOpen: boolean;
  setIsImStuckOpen: (open: boolean) => void;

  isQuestionBreakdownOpen: boolean;
  setIsQuestionBreakdownOpen: (open: boolean) => void;
  activeQuestionBreakdown: QuestionBreakdownData;
  setActiveQuestionBreakdown: (data: QuestionBreakdownData) => void;

  // 4-Step Topic Mastery Pipeline Modal
  isTopicMasteryOpen: boolean;
  setIsTopicMasteryOpen: (open: boolean) => void;
  activeTopicMasteryData: TopicMasteryData;
  openTopicMastery: (topicId?: string) => void;

  // 12-Section Chapter Detail Template Modal
  isChapterDetailOpen: boolean;
  setIsChapterDetailOpen: (open: boolean) => void;
  activeChapterDetailData: ChapterDetailData;
  openChapterDetail: (chapterId?: string) => void;

  // Real YouTube Video Embed Player Modal
  activeVideo: { title: string; embedUrl: string } | null;
  openVideoPlayer: (title: string, embedUrl: string) => void;
  closeVideoPlayer: () => void;

  // OpenAI OAuth AI Socratic Doubt Solver Modal
  isAiDoubtSolverOpen: boolean;
  initialAiDoubtPrompt: string;
  openAiDoubtSolver: (prompt?: string) => void;
  closeAiDoubtSolver: () => void;

  isAddMistakeOpen: boolean;
  setIsAddMistakeOpen: (open: boolean) => void;

  activeTimerTask: TaskItem | null;
  setActiveTimerTask: (task: TaskItem | null) => void;

  // Calculated Real Dynamic Progress Stats
  streakDays: number;
  calculatedXp: number;
  calculatedLevel: number;
  levelTitle: string;
  weeklyActivity: boolean[];

  // Distraction-Free Focus Mode State ("Remove Extras")
  isFocusMode: boolean;
  toggleFocusMode: () => void;

  // Unlocked Question Bundles
  unlockedBundleIds: string[];
  unlockBundle: (bundleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'jee_mentor_app_state_v9';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : initialOnboardingState;
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_mistakes`);
    return saved ? JSON.parse(saved) : initialMistakes;
  });

  const [chapters, setChapters] = useState<ChapterProgress[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chapters`);
    return saved ? JSON.parse(saved) : initialChapters;
  });

  const [resources] = useState<ResourceItem[]>(initialResources);

  // Supabase Auth & Cloud Sync State
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(isSupabaseConfigured);

  // Distraction-Free Focus Mode State
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Unlocked Question Bundles State
  const [unlockedBundleIds, setUnlockedBundleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_unlocked_bundles`);
    return saved ? JSON.parse(saved) : [];
  });

  const unlockBundle = (bundleId: string) => {
    setUnlockedBundleIds((prev) => {
      if (prev.includes(bundleId)) return prev;
      const updated = [...prev, bundleId];
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_unlocked_bundles`, JSON.stringify(updated));
      return updated;
    });
  };

  // Modals
  const [isImStuckOpen, setIsImStuckOpen] = useState(false);
  const [isQuestionBreakdownOpen, setIsQuestionBreakdownOpen] = useState(false);
  const [activeQuestionBreakdown, setActiveQuestionBreakdown] = useState<QuestionBreakdownData>(sampleQuestionBreakdown);
  
  // Topic Mastery Pipeline
  const [isTopicMasteryOpen, setIsTopicMasteryOpen] = useState(false);
  const [activeTopicMasteryData, setActiveTopicMasteryData] = useState<TopicMasteryData>(sampleTopicMasteryData[0]);

  // 12-Section Chapter Detail Template Modal
  const [isChapterDetailOpen, setIsChapterDetailOpen] = useState(false);
  const [activeChapterDetailData, setActiveChapterDetailData] = useState<ChapterDetailData>(sampleChapterDetailData[0]);

  // YouTube Video Player Modal
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string } | null>(null);

  // AI Doubt Solver Modal
  const [isAiDoubtSolverOpen, setIsAiDoubtSolverOpen] = useState(false);
  const [initialAiDoubtPrompt, setInitialAiDoubtPrompt] = useState('');

  const [isAddMistakeOpen, setIsAddMistakeOpen] = useState(false);
  const [activeTimerTask, setActiveTimerTask] = useState<TaskItem | null>(null);

  // ==========================================
  // DYNAMIC XP, LEVEL & STREAK CALCULATIONS
  // ==========================================
  const completedTasks = useMemo(() => tasks.filter((t) => t.completed), [tasks]);
  const masteredMistakes = useMemo(() => mistakes.filter((m) => m.mastered), [mistakes]);

  const calculatedXp = useMemo(() => {
    const baseOnboardingXp = profile.onboardingCompleted ? 250 : 50;
    const taskXp = completedTasks.length * 50;
    const mistakeXp = mistakes.length * 30;
    const masteredXp = masteredMistakes.length * 100;
    return baseOnboardingXp + taskXp + mistakeXp + masteredXp;
  }, [profile.onboardingCompleted, completedTasks.length, mistakes.length, masteredMistakes.length]);

  const calculatedLevel = useMemo(() => {
    return Math.max(1, Math.floor(calculatedXp / 200) + 1);
  }, [calculatedXp]);

  const levelTitle = useMemo(() => {
    if (calculatedLevel < 3) return 'JEE Aspirant';
    if (calculatedLevel < 6) return 'Concept Scholar';
    if (calculatedLevel < 10) return 'PYQ Specialist';
    return 'JEE Master Scholar';
  }, [calculatedLevel]);

  const streakDays = useMemo(() => {
    const activeTasksCount = completedTasks.length;
    if (activeTasksCount === 0 && mistakes.length === 0) return 0;
    return Math.max(1, activeTasksCount + (mistakes.length > 0 ? 1 : 0));
  }, [completedTasks.length, mistakes.length]);

  const weeklyActivity = useMemo(() => {
    const hasCompleted = completedTasks.length > 0;
    return [true, true, hasCompleted, hasCompleted, completedTasks.length >= 2, false, false];
  }, [completedTasks.length]);

  // Sync calculated XP and level back into profile
  useEffect(() => {
    if (profile.xp !== calculatedXp || profile.level !== calculatedLevel) {
      setProfile((prev) => ({
        ...prev,
        xp: calculatedXp,
        level: calculatedLevel,
      }));
    }
  }, [calculatedXp, calculatedLevel]);

  // Supabase User Auth Listener & Hydration Sync
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      getCurrentUser().then((u) => setAuthUser(u));

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setAuthUser(session?.user || null);
        if (session?.user) {
          dbFetchProfile().then((dbProf) => {
            if (dbProf) setProfile(dbProf);
          });
          dbFetchTasks().then((dbTs) => {
            if (dbTs && dbTs.length > 0) setTasks(dbTs);
          });
          dbFetchMistakes().then((dbMs) => {
            if (dbMs && dbMs.length > 0) setMistakes(dbMs);
          });
        }
      });

      setIsCloudSynced(true);

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_mistakes`, JSON.stringify(mistakes));
  }, [mistakes]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_chapters`, JSON.stringify(chapters));
  }, [chapters]);

  const updateProfile = (updates: Partial<OnboardingState>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      dbSaveProfile(next);
      return next;
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          dbToggleTask(id, nextState);
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const addTask = (newTask: Omit<TaskItem, 'id'>) => {
    const taskItem: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [taskItem, ...prev]);
    dbCreateTask(taskItem);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addMistake = (newMistake: Omit<MistakeItem, 'id' | 'daysAgo' | 'dateAdded' | 'revisionCount' | 'nextRevisionDate' | 'mastered'>) => {
    const item: MistakeItem = {
      ...newMistake,
      id: `mistake-${Date.now()}`,
      daysAgo: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      mastered: false,
      revisionCount: 0,
      nextRevisionDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    };
    setMistakes((prev) => [item, ...prev]);
    dbCreateMistake(item);
  };

  const toggleMistakeMastered = (id: string) => {
    setMistakes((prev) =>
      prev.map((m) => (m.id === id ? { ...m, mastered: !m.mastered } : m))
    );
  };

  const deleteMistake = (id: string) => {
    setMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  const updateChapterProgress = (id: string, percentage: number) => {
    setChapters((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          const nextPercentage = percentage;
          const status = nextPercentage >= 90 ? 'Mastered' : nextPercentage > 0 ? 'In Progress' : 'Not Started';
          dbSaveChapterProgress(id, nextPercentage, ch.pyqsSolved);
          return {
            ...ch,
            completionPercentage: nextPercentage,
            status,
          };
        }
        return ch;
      })
    );
  };

  const toggleFocusMode = () => setIsFocusMode((prev) => !prev);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openTopicMastery = (topicId?: string) => {
    if (topicId) {
      const found = getTopicMasteryById(topicId);
      if (found) setActiveTopicMasteryData(found);
    }
    setIsTopicMasteryOpen(true);
  };

  const openChapterDetail = (chapterId?: string) => {
    if (chapterId) {
      const found = getChapterDetailById(chapterId);
      if (found) setActiveChapterDetailData(found);
    }
    setIsChapterDetailOpen(true);
  };

  const openVideoPlayer = (title: string, embedUrl: string) => {
    let formattedUrl = embedUrl;
    if (embedUrl.includes('watch?v=')) {
      formattedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      formattedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    setActiveVideo({ title, embedUrl: formattedUrl });
  };

  const closeVideoPlayer = () => setActiveVideo(null);

  const openAiDoubtSolver = (prompt?: string) => {
    if (prompt) setInitialAiDoubtPrompt(prompt);
    setIsAiDoubtSolverOpen(true);
  };

  const closeAiDoubtSolver = () => setIsAiDoubtSolverOpen(false);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        mistakes,
        addMistake,
        toggleMistakeMastered,
        deleteMistake,
        chapters,
        updateChapterProgress,
        resources,
        authUser,
        setAuthUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isCloudSynced,
        isImStuckOpen,
        setIsImStuckOpen,
        isQuestionBreakdownOpen,
        setIsQuestionBreakdownOpen,
        activeQuestionBreakdown,
        setActiveQuestionBreakdown,
        isTopicMasteryOpen,
        setIsTopicMasteryOpen,
        activeTopicMasteryData,
        openTopicMastery,
        isChapterDetailOpen,
        setIsChapterDetailOpen,
        activeChapterDetailData,
        openChapterDetail,
        activeVideo,
        openVideoPlayer,
        closeVideoPlayer,
        isAiDoubtSolverOpen,
        initialAiDoubtPrompt,
        openAiDoubtSolver,
        closeAiDoubtSolver,
        isAddMistakeOpen,
        setIsAddMistakeOpen,
        activeTimerTask,
        setActiveTimerTask,
        streakDays,
        calculatedXp,
        calculatedLevel,
        levelTitle,
        weeklyActivity,
        isFocusMode,
        toggleFocusMode,
        unlockedBundleIds,
        unlockBundle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
