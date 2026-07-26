import { useMemo } from 'react';
import type { OnboardingState, ChapterProgress, TaskItem, SubjectType } from '../types';

export interface RoadmapEngineOutput {
  todaysPlan: TaskItem[];
  tomorrowsPlan: TaskItem[];
  weeklyMilestones: {
    weekTitle: string;
    targetChapters: string[];
    recommendedHours: number;
    completionPercentage: number;
  }[];
  overallExamReadiness: number;
  totalHoursBudgetedDaily: number;
  subjectTimeAllocations: Record<SubjectType, number>;
  daysRemaining: number;
}

export function useRoadmapEngine(
  profile: OnboardingState,
  chapters: ChapterProgress[],
  tasks: TaskItem[]
): RoadmapEngineOutput {
  return useMemo(() => {
    const dailyHours = profile.dailyStudyHours || 6;
    
    // Time distribution: 30% Weakest subject, 25% Strongest, 25% Middle, 20% Revision
    const totalMinutes = dailyHours * 60;
    const revisionMinutes = Math.min(45, Math.round(totalMinutes * 0.15));
    const studyMinutesRemaining = totalMinutes - revisionMinutes;

    let physShare = 0.33;
    let chemShare = 0.33;
    let mathShare = 0.34;

    // Adjust weighting based on weakest subject
    if (profile.weakestSubject === 'Chemistry') {
      chemShare = 0.40;
      physShare = 0.30;
      mathShare = 0.30;
    } else if (profile.weakestSubject === 'Physics') {
      physShare = 0.40;
      chemShare = 0.30;
      mathShare = 0.30;
    } else if (profile.weakestSubject === 'Mathematics') {
      mathShare = 0.40;
      physShare = 0.30;
      chemShare = 0.30;
    }

    const subjectTimeAllocations: Record<SubjectType, number> = {
      Physics: Math.round(studyMinutesRemaining * physShare),
      Chemistry: Math.round(studyMinutesRemaining * chemShare),
      Mathematics: Math.round(studyMinutesRemaining * mathShare),
    };

    // Calculate total readiness score
    const completedWeight = chapters.reduce((acc, ch) => {
      const weightMultiplier = ch.weightage === 'High' ? 1.5 : ch.weightage === 'Medium' ? 1.0 : 0.7;
      return acc + (ch.completionPercentage * weightMultiplier);
    }, 0);
    const maxPossibleWeight = chapters.reduce((acc, ch) => {
      const weightMultiplier = ch.weightage === 'High' ? 1.5 : ch.weightage === 'Medium' ? 1.0 : 0.7;
      return acc + (100 * weightMultiplier);
    }, 0) || 1;

    const overallExamReadiness = Math.round((completedWeight / maxPossibleWeight) * 100);

    // Days remaining mock calculation (Target JEE 2026 ~ April 2026)
    const daysRemaining = 245;

    // Weekly Milestones
    const weeklyMilestones = [
      {
        weekTitle: 'Week 1 (Current): Newtonian Dynamics & Algebra Fundamentals',
        targetChapters: ['Laws of Motion & Friction', 'Quadratic Equations & Expressions', 'Mole Concept'],
        recommendedHours: dailyHours * 7,
        completionPercentage: 68,
      },
      {
        weekTitle: 'Week 2: Work-Energy Theorem & Atomic Structure',
        targetChapters: ['Work, Power & Energy', 'Atomic Structure', 'Sequence & Series'],
        recommendedHours: dailyHours * 7,
        completionPercentage: 35,
      },
      {
        weekTitle: 'Week 3: Rotational Dynamics & Chemical Bonding',
        targetChapters: ['Rotational Motion', 'Chemical Bonding & Molecular Structure', 'Trigonometric Equations'],
        recommendedHours: dailyHours * 7,
        completionPercentage: 10,
      },
    ];

    // Forecast tomorrow's plan
    const tomorrowsPlan: TaskItem[] = [
      {
        id: 't-tom-1',
        title: 'Friction on Inclined Planes — Advanced PYQs',
        subject: 'Physics',
        topic: 'Laws of Motion',
        durationMinutes: subjectTimeAllocations.Physics,
        completed: false,
        type: 'Practice',
      },
      {
        id: 't-tom-2',
        title: 'VSEPR Theory & Lone Pair Geometry',
        subject: 'Chemistry',
        topic: 'Chemical Bonding',
        durationMinutes: subjectTimeAllocations.Chemistry,
        completed: false,
        type: 'Theory',
      },
      {
        id: 't-tom-3',
        title: 'Sequence & Series — AGP & Telescoping Series',
        subject: 'Mathematics',
        topic: 'Algebra',
        durationMinutes: subjectTimeAllocations.Mathematics,
        completed: false,
        type: 'Practice',
      },
    ];

    return {
      todaysPlan: tasks,
      tomorrowsPlan,
      weeklyMilestones,
      overallExamReadiness,
      totalHoursBudgetedDaily: dailyHours,
      subjectTimeAllocations,
      daysRemaining,
    };
  }, [profile, chapters, tasks]);
}
