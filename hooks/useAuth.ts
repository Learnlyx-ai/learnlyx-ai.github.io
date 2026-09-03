"use client";

import { useCallback, useEffect, useState } from "react";
import { createClientSupabaseBrowser } from "@/lib/supabase/client";

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
    const supabase = createClientSupabaseBrowser();
    if (!supabase) {
      setAuth({ username: null, isAuthenticated: false });
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setAuth({ username: null, isAuthenticated: false });
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    setAuth({
      username: profile?.username ?? user.user_metadata?.username ?? user.email ?? null,
      isAuthenticated: true,
    });
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

  useEffect(() => {
    const supabase = createClientSupabaseBrowser();
    if (!supabase) return;

    const { data } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => void refreshAuth(), 0);
    });

    return () => data.subscription.unsubscribe();
  }, [refreshAuth]);

  const signUp = useCallback(async (username: string, email: string, password: string): Promise<AuthResult> => {
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedUsername || !normalizedEmail || !password) {
      return { ok: false, message: "Username, email, and password are required." };
    }

    const supabase = createClientSupabaseBrowser();
    if (!supabase) {
      return { ok: false, message: "Account sign-up is not configured yet." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: { data: { username: normalizedUsername } },
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    await refreshAuth();
    emitAuthChanged();
    return {
      ok: true,
      message: data.session ? "Account created." : "Account created. Check your email to confirm it.",
    };
  }, [refreshAuth]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const supabase = createClientSupabaseBrowser();
    if (!supabase) {
      return { ok: false, message: "Account sign-in is not configured yet." };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    await refreshAuth();
    emitAuthChanged();
    return { ok: true, message: "Signed in successfully." };
  }, [refreshAuth]);

  const signOut = useCallback(async () => {
    const supabase = createClientSupabaseBrowser();
    if (supabase) await supabase.auth.signOut();
    setAuth({ username: null, isAuthenticated: false });
    emitAuthChanged();
  }, []);

  return {
    ...auth,
    isLoaded,
    signUp,
    signIn,
    signOut,
  };
}
