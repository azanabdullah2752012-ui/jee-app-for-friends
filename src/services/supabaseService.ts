import { supabase, isSupabaseConfigured } from './supabase';
import type { OnboardingState, TaskItem, MistakeItem } from '../types';
import type { User } from '@supabase/supabase-js';

// ==========================================
// 1. SUPABASE AUTHENTICATION (Google & OAuth)
// ==========================================

export async function signInWithGoogle(): Promise<{ error: any }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: new Error('Supabase project not connected.') };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  return { error };
}

export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
}

export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

// ==========================================
// 2. PROFILES DB OPERATIONS
// ==========================================

export async function dbFetchProfile(): Promise<OnboardingState | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) return null;

    return {
      name: data.name,
      classLevel: data.class_level,
      targetExam: data.target_exam,
      dailyStudyHours: data.daily_study_hours,
      strongestSubject: data.strongest_subject,
      weakestSubject: data.weakest_subject,
      targetRank: data.target_rank,
      physicsRating: data.physics_rating ?? 7,
      chemistryRating: data.chemistry_rating ?? 6,
      mathsRating: data.maths_rating ?? 5,
      physicsCompletion: data.physics_completion ?? 40,
      chemistryCompletion: data.chemistry_completion ?? 35,
      mathsCompletion: data.maths_completion ?? 30,
      primaryBottleneck: data.primary_bottleneck ?? 'Time Management & Speed',
      onboardingCompleted: data.onboarding_completed ?? false,
      isCompleted: true,
      xp: data.xp ?? 1450,
      level: data.level ?? 12,
    };
  } catch (err) {
    console.error('Supabase fetch profile error:', err);
    return null;
  }
}

export async function dbSaveProfile(profile: OnboardingState): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const { error } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        name: profile.name,
        class_level: profile.classLevel,
        target_exam: profile.targetExam,
        daily_study_hours: profile.dailyStudyHours,
        strongest_subject: profile.strongestSubject,
        weakest_subject: profile.weakestSubject,
        target_rank: profile.targetRank,
        physics_rating: profile.physicsRating,
        chemistry_rating: profile.chemistryRating,
        maths_rating: profile.mathsRating,
        physics_completion: profile.physicsCompletion,
        chemistry_completion: profile.chemistryCompletion,
        maths_completion: profile.mathsCompletion,
        primary_bottleneck: profile.primaryBottleneck,
        onboarding_completed: profile.onboardingCompleted,
        xp: profile.xp,
        level: profile.level,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
    return !error;
  } catch (err) {
    console.error('Supabase save profile error:', err);
    return false;
  }
}

// ==========================================
// 3. TASKS DB OPERATIONS
// ==========================================

export async function dbFetchTasks(): Promise<TaskItem[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((t) => ({
      id: t.id,
      title: t.title,
      subject: t.subject,
      topic: t.topic,
      durationMinutes: t.duration_minutes,
      completed: t.completed,
      type: t.type,
    }));
  } catch (err) {
    console.error('Supabase fetch tasks error:', err);
    return null;
  }
}

export async function dbCreateTask(task: TaskItem): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const user = await getCurrentUser();
    const { error } = await supabase.from('tasks').insert({
      user_id: user ? user.id : undefined,
      title: task.title,
      subject: task.subject,
      topic: task.topic,
      duration_minutes: task.durationMinutes,
      completed: task.completed,
      type: task.type,
    });
    return !error;
  } catch (err) {
    console.error('Supabase create task error:', err);
    return false;
  }
}

export async function dbToggleTask(id: string, completed: boolean): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase.from('tasks').update({ completed }).eq('id', id);
    return !error;
  } catch (err) {
    console.error('Supabase toggle task error:', err);
    return false;
  }
}

// ==========================================
// 4. MISTAKES DB OPERATIONS
// ==========================================

export async function dbFetchMistakes(): Promise<MistakeItem[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase.from('mistakes').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((m) => ({
      id: m.id,
      title: m.title,
      subject: m.subject,
      chapter: m.chapter,
      topic: m.topic,
      errorType: m.error_type,
      whyWrong: m.why_wrong,
      correctApproach: m.correct_approach,
      keyTakeaway: m.key_takeaway,
      daysAgo: 0,
      dateAdded: m.created_at ? m.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
      mastered: m.mastered,
      revisionCount: m.revision_count,
      nextRevisionDate: m.next_revision_date || new Date().toISOString().split('T')[0],
    }));
  } catch (err) {
    console.error('Supabase fetch mistakes error:', err);
    return null;
  }
}

export async function dbCreateMistake(mistake: MistakeItem): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const user = await getCurrentUser();
    const { error } = await supabase.from('mistakes').insert({
      user_id: user ? user.id : undefined,
      title: mistake.title,
      subject: mistake.subject,
      chapter: mistake.chapter,
      topic: mistake.topic,
      error_type: mistake.errorType,
      why_wrong: mistake.whyWrong,
      correct_approach: mistake.correctApproach,
      key_takeaway: mistake.keyTakeaway,
      mastered: mistake.mastered,
      revision_count: mistake.revisionCount,
      next_revision_date: mistake.nextRevisionDate,
    });
    return !error;
  } catch (err) {
    console.error('Supabase create mistake error:', err);
    return false;
  }
}

// ==========================================
// 5. CHAPTER PROGRESS DB OPERATIONS
// ==========================================

export async function dbSaveChapterProgress(chapterId: string, percentage: number, pyqsSolved: number): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const user = await getCurrentUser();
    if (!user) return false;

    const status = percentage >= 90 ? 'Mastered' : percentage > 0 ? 'In Progress' : 'Not Started';
    const { error } = await supabase.from('user_chapter_progress').upsert(
      {
        user_id: user.id,
        chapter_id: chapterId,
        completion_percentage: percentage,
        pyqs_solved: pyqsSolved,
        status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,chapter_id' }
    );
    return !error;
  } catch (err) {
    console.error('Supabase save chapter progress error:', err);
    return false;
  }
}
