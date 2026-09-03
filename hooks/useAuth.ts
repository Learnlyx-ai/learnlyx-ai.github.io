"use client";

import { useCallback, useEffect, useState } from "react";

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
}

export const AUTH_CHANGED_EVENT = "learnlyx-auth-changed";

function emitAuthChanged() {
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

interface AuthResult {
  ok: boolean;
  message: string;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    username: null,
    isAuthenticated: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { method: "GET" });
      if (!res.ok) {
        setAuth({ username: null, isAuthenticated: false });
        return;
      }
      const data = await res.json();
      setAuth({
        username: data?.username ?? null,
        isAuthenticated: Boolean(data?.isAuthenticated),
      });
    } catch {
      setAuth({ username: null, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    refreshAuth().finally(() => setIsLoaded(true));
  }, [refreshAuth]);

  useEffect(() => {
    const onAuthChanged = () => {
      void refreshAuth();
    };
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    };
  }, [refreshAuth]);

  const signUp = useCallback(async (username: string, email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, message: data?.message ?? "Could not create account." };
      }
      await refreshAuth();
      emitAuthChanged();
      return { ok: true, message: data?.message ?? "Account created." };
    } catch {
      return { ok: false, message: "Network error while signing up." };
    }
  }, [refreshAuth]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false, message: data?.message ?? "Could not sign in." };
      }
      await refreshAuth();
      emitAuthChanged();
      return { ok: true, message: data?.message ?? "Signed in successfully." };
    } catch {
      return { ok: false, message: "Network error while signing in." };
    }
  }, [refreshAuth]);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } finally {
      await refreshAuth();
      emitAuthChanged();
    }
  }, [refreshAuth]);

  return {
    ...auth,
    isLoaded,
    signUp,
    signIn,
    signOut,
  };
}
