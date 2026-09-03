import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface ProfileProgress {
  completedQuizzes: string[];
  quizStars: Record<string, number>;
}

export interface ProfileSubscription {
  isActive: boolean;
  plan: "ai-teacher-pro";
  amountUsdPerMonth: number;
  startedAt: string | null;
  renewsAt: string | null;
}

const defaultProgress: ProfileProgress = {
  completedQuizzes: [],
  quizStars: {},
};

const defaultSubscription: ProfileSubscription = {
  isActive: false,
  plan: "ai-teacher-pro",
  amountUsdPerMonth: 10,
  startedAt: null,
  renewsAt: null,
};

async function getCurrentAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

export async function getSessionProfile() {
  const session = await getCurrentAuthenticatedUser();
  if (!session) {
    return null;
  }

  const { data: profile } = await session.supabase
    .from("profiles")
    .select("username, progress, subscription")
    .eq("id", session.user.id)
    .maybeSingle();

  return {
    userId: session.user.id,
    username: profile?.username ?? session.user.email ?? null,
    progress: (profile?.progress as ProfileProgress | undefined) ?? defaultProgress,
    subscription:
      (profile?.subscription as ProfileSubscription | undefined) ?? defaultSubscription,
  };
}

export async function getProgress() {
  const profile = await getSessionProfile();
  return profile?.progress ?? defaultProgress;
}

export async function completeQuiz(quizId: string, stars: number) {
  const session = await getCurrentAuthenticatedUser();
  if (!session) return null;

  const safeStars = Math.max(1, Math.min(3, stars));
  const { data: profile } = await session.supabase
    .from("profiles")
    .select("progress")
    .eq("id", session.user.id)
    .maybeSingle();

  const currentProgress = ((profile?.progress as ProfileProgress | undefined) ?? defaultProgress) as ProfileProgress;
  const existing = currentProgress.quizStars[quizId] ?? 0;
  const bestStars = Math.max(existing, safeStars);

  const nextProgress: ProfileProgress = {
    completedQuizzes: currentProgress.completedQuizzes.includes(quizId)
      ? currentProgress.completedQuizzes
      : [...currentProgress.completedQuizzes, quizId],
    quizStars: {
      ...currentProgress.quizStars,
      [quizId]: bestStars,
    },
  };

  const { data, error } = await session.supabase
    .from("profiles")
    .update({ progress: nextProgress })
    .eq("id", session.user.id)
    .select("progress")
    .single();

  if (error || !data) {
    return null;
  }

  return (data.progress as ProfileProgress) ?? nextProgress;
}

export async function resetProgress() {
  const session = await getCurrentAuthenticatedUser();
  if (!session) return null;

  const { data, error } = await session.supabase
    .from("profiles")
    .update({ progress: defaultProgress })
    .eq("id", session.user.id)
    .select("progress")
    .single();

  if (error || !data) {
    return null;
  }

  return (data.progress as ProfileProgress) ?? defaultProgress;
}

export async function getSubscription() {
  const profile = await getSessionProfile();
  return profile?.subscription ?? defaultSubscription;
}

export async function activateSubscription() {
  const session = await getCurrentAuthenticatedUser();
  if (!session) return null;

  const now = new Date();
  const renews = new Date(now);
  renews.setDate(renews.getDate() + 30);

  const nextSubscription: ProfileSubscription = {
    isActive: true,
    plan: "ai-teacher-pro",
    amountUsdPerMonth: 10,
    startedAt: now.toISOString(),
    renewsAt: renews.toISOString(),
  };

  const { data, error } = await session.supabase
    .from("profiles")
    .update({ subscription: nextSubscription })
    .eq("id", session.user.id)
    .select("subscription")
    .single();

  if (error || !data) {
    return null;
  }

  return (data.subscription as ProfileSubscription) ?? nextSubscription;
}

export async function cancelSubscription() {
  const session = await getCurrentAuthenticatedUser();
  if (!session) return null;

  const { data, error } = await session.supabase
    .from("profiles")
    .update({ subscription: defaultSubscription })
    .eq("id", session.user.id)
    .select("subscription")
    .single();

  if (error || !data) {
    return null;
  }

  return (data.subscription as ProfileSubscription) ?? defaultSubscription;
}
