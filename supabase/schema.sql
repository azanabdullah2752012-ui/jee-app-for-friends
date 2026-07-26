-- ========================================================
-- 🚀 JEE MENTOR FULL-STACK DATABASE SCHEMA (PostgreSQL / Supabase)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. PROFILES TABLE (User Profile & Study Parameters)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'JEE Aspirant',
    avatar_url TEXT,
    class_level TEXT NOT NULL DEFAULT 'Class 11',
    target_exam TEXT NOT NULL DEFAULT 'JEE Main 2026',
    daily_study_hours INT NOT NULL DEFAULT 6,
    strongest_subject TEXT NOT NULL DEFAULT 'Physics',
    weakest_subject TEXT NOT NULL DEFAULT 'Mathematics',
    target_rank INT NOT NULL DEFAULT 1000,
    streak_days INT NOT NULL DEFAULT 12,
    physics_rating INT NOT NULL DEFAULT 7,
    chemistry_rating INT NOT NULL DEFAULT 6,
    maths_rating INT NOT NULL DEFAULT 5,
    physics_completion INT NOT NULL DEFAULT 40,
    chemistry_completion INT NOT NULL DEFAULT 35,
    maths_completion INT NOT NULL DEFAULT 30,
    primary_bottleneck TEXT NOT NULL DEFAULT 'Time Management & Speed',
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE USING (true);

-- --------------------------------------------------------
-- Trigger to auto-create profile on Auth Signup
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url, class_level, target_exam, onboarding_completed)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email, 'JEE Aspirant'),
    new.raw_user_meta_data->>'avatar_url',
    'Class 11',
    'JEE Main 2026',
    false
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    avatar_url = EXCLUDED.avatar_url;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --------------------------------------------------------
-- 2. TASKS TABLE (Daily Study Plan & Tasks)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    type TEXT NOT NULL DEFAULT 'Practice',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all tasks" ON public.tasks FOR ALL USING (true);

-- --------------------------------------------------------
-- 3. MISTAKES TABLE (Logged Error Notebook)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    chapter TEXT NOT NULL,
    topic TEXT NOT NULL,
    error_type TEXT NOT NULL DEFAULT 'Conceptual',
    why_wrong TEXT NOT NULL,
    correct_approach TEXT NOT NULL,
    key_takeaway TEXT NOT NULL,
    mastered BOOLEAN NOT NULL DEFAULT FALSE,
    revision_count INT NOT NULL DEFAULT 0,
    next_revision_date DATE NOT NULL DEFAULT CURRENT_DATE + INTERVAL '1 day',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all mistakes" ON public.mistakes FOR ALL USING (true);

-- --------------------------------------------------------
-- 4. CHAPTER PROGRESS TABLE (~135 Topics Progress Sync)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_chapter_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    chapter_id TEXT NOT NULL,
    completion_percentage INT NOT NULL DEFAULT 0,
    pyqs_solved INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Not Started',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_chapter UNIQUE (user_id, chapter_id)
);

ALTER TABLE public.user_chapter_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all user_chapter_progress" ON public.user_chapter_progress FOR ALL USING (true);

-- --------------------------------------------------------
-- 5. AI DOUBT HISTORY TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ai_doubt_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    subject TEXT NOT NULL DEFAULT 'Physics',
    response_json JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ai_doubt_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all ai_doubt_history" ON public.ai_doubt_history FOR ALL USING (true);
