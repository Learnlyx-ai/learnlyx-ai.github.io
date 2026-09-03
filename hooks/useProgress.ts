"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AUTH_CHANGED_EVENT } from "@/hooks/useAuth";

interface Progress {
  completedQuizzes: string[];
  quizStars: Record<string, number>;
}

const defaultProgress: Progress = {
  completedQuizzes: [],
  quizStars: {},
};

const GUEST_STORAGE_KEY = "smart-learning-progress:guest";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loadRequestId = useRef(0);

  const loadGuestProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(GUEST_STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
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
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json().catch(() => ({}));
      const loggedIn = Boolean(session?.isAuthenticated);
      if (requestId !== loadRequestId.current) return;
      setIsAuthenticated(loggedIn);

      if (!loggedIn) {
        loadGuestProgress();
        return;
      }

      const res = await fetch("/api/progress");
      if (requestId !== loadRequestId.current) return;
      if (!res.ok) {
        setProgress(defaultProgress);
        return;
      }
      const data = await res.json();
      if (requestId !== loadRequestId.current) return;
      setProgress(data?.progress ?? defaultProgress);
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
      setProgress((prev) => {
        const existingStars = prev.quizStars[quizId] || 0;
        const newStars = Math.max(existingStars, safeStars);
        return {
          completedQuizzes: prev.completedQuizzes.includes(quizId)
            ? prev.completedQuizzes
            : [...prev.completedQuizzes, quizId],
          quizStars: {
            ...prev.quizStars,
            [quizId]: newStars,
          },
        };
      });

      if (isAuthenticated) {
        void fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId, stars: safeStars }),
        }).then(async (res) => {
          if (!res.ok) return;
          const data = await res.json().catch(() => ({}));
          if (data?.progress) {
            setProgress(data.progress);
          }
        });
      }
    },
    [isAuthenticated]
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
      void fetch("/api/progress", { method: "DELETE" });
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
