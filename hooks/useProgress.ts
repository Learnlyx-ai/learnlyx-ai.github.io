"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AUTH_CHANGED_EVENT } from "@/hooks/useAuth";
import { createClientSupabaseBrowser } from "@/lib/supabase/client";

interface Progress {
  completedQuizzes: string[];
  quizStars: Record<string, number>;
}

const defaultProgress: Progress = {
  completedQuizzes: [],
  quizStars: {},
};

const GUEST_STORAGE_KEY = "smart-learning-progress:guest";

function normalizeProgress(value: unknown): Progress {
  if (!value || typeof value !== "object") return defaultProgress;
  const candidate = value as Partial<Progress>;
  return {
    completedQuizzes: Array.isArray(candidate.completedQuizzes)
      ? candidate.completedQuizzes.filter((id): id is string => typeof id === "string")
      : [],
    quizStars:
      candidate.quizStars && typeof candidate.quizStars === "object"
        ? candidate.quizStars
        : {},
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loadRequestId = useRef(0);

  const loadGuestProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY);
      if (saved) {
        setProgress(normalizeProgress(JSON.parse(saved)));
      } else {
        setProgress(defaultProgress);
      }
    } catch {
      setProgress(defaultProgress);
    }
  }, []);

  const loadProgress = useCallback(async () => {
    const requestId = ++loadRequestId.current;
    // Never display the previous account's progress while the next session loads.
    setProgress(defaultProgress);

    try {
      const supabase = createClientSupabaseBrowser();
      if (!supabase) {
        setIsAuthenticated(false);
        loadGuestProgress();
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const loggedIn = Boolean(user);
      if (requestId !== loadRequestId.current) return;
      setIsAuthenticated(loggedIn);

      if (!user) {
        loadGuestProgress();
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("progress")
        .eq("id", user.id)
        .maybeSingle();
      if (requestId !== loadRequestId.current) return;
      setProgress(normalizeProgress(data?.progress));
    } catch {
      if (requestId !== loadRequestId.current) return;
      setIsAuthenticated(false);
      loadGuestProgress();
    }
  }, [loadGuestProgress]);

  useEffect(() => {
    loadProgress().finally(() => setIsLoaded(true));
  }, [loadProgress]);

  useEffect(() => {
    const onAuthChanged = () => {
      void loadProgress();
    };
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    };
  }, [loadProgress]);

  useEffect(() => {
    if (!isLoaded || isAuthenticated) return;
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore guest save errors
    }
  }, [progress, isLoaded, isAuthenticated]);

  const completeQuiz = useCallback(
    (quizId: string, stars: number) => {
      const safeStars = Math.max(1, Math.min(3, stars));
      const existingStars = progress.quizStars[quizId] || 0;
      const nextProgress = {
        completedQuizzes: progress.completedQuizzes.includes(quizId)
          ? progress.completedQuizzes
          : [...progress.completedQuizzes, quizId],
        quizStars: {
          ...progress.quizStars,
          [quizId]: Math.max(existingStars, safeStars),
        },
      };
      setProgress(nextProgress);

      if (isAuthenticated) {
        const supabase = createClientSupabaseBrowser();
        if (supabase) {
          void supabase.auth.getUser().then(({ data }) => {
            if (!data.user) return;
            return supabase
              .from("profiles")
              .update({ progress: nextProgress })
              .eq("id", data.user.id);
          });
        }
      }
    },
    [isAuthenticated, progress]
  );

  const getStars = useCallback(
    (quizId: string): number => {
      return progress.quizStars[quizId] || 0;
    },
    [progress.quizStars]
  );

  const isCompleted = useCallback(
    (quizId: string): boolean => {
      return progress.completedQuizzes.includes(quizId);
    },
    [progress.completedQuizzes]
  );

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    if (isAuthenticated) {
      const supabase = createClientSupabaseBrowser();
      if (supabase) {
        void supabase.auth.getUser().then(({ data }) => {
          if (!data.user) return;
          return supabase
            .from("profiles")
            .update({ progress: defaultProgress })
            .eq("id", data.user.id);
        });
      }
    }
  }, [isAuthenticated]);

  return {
    completedQuizzes: progress.completedQuizzes,
    quizStars: progress.quizStars,
    completeQuiz,
    getStars,
    isCompleted,
    resetProgress,
    isLoaded,
  };
}
