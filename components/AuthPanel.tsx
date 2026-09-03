"use client";

import { FormEvent, useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "signin" | "signup";

export default function AuthPanel() {
  const { username, isAuthenticated, isLoaded, signIn, signOut, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await (mode === "signin"
      ? signIn(formEmail, formPassword)
      : signUp(formUsername, formEmail, formPassword));

    setMessage(result.message);
    if (result.ok) {
      setFormUsername("");
      setFormEmail("");
      setFormPassword("");
    }
    setIsSubmitting(false);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 lg:px-6">
        <p className="hidden text-xs font-medium text-slate-400 sm:block">Your learning space is ready when you are.</p>
        {isAuthenticated ? (
          <>
            <span className="ml-auto text-sm text-slate-300">
              Signed in as <strong className="text-white">{username}</strong>
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-md bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Sign out
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="ml-auto flex flex-wrap items-center justify-end gap-2">
            {mode === "signup" && (
              <input
                type="text"
                value={formUsername}
                onChange={(e) => setFormUsername(e.target.value)}
                placeholder="Username"
                aria-label="Username"
                autoComplete="username"
                required
                className="h-8 w-24 rounded-md border border-white/15 bg-white/10 px-2.5 text-xs text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none sm:w-28"
              />
            )}
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              autoComplete="email"
              required
              className="h-8 w-36 rounded-md border border-white/15 bg-white/10 px-2.5 text-xs text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none sm:w-44"
            />
            <input
              type="password"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              placeholder="Password"
              aria-label="Password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              className="h-8 w-24 rounded-md border border-white/15 bg-white/10 px-2.5 text-xs text-white placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none sm:w-28"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-indigo-500 px-3 text-xs font-bold text-white transition hover:bg-indigo-400"
            >
              {isSubmitting ? "Please wait..." : mode === "signin" ? <><LogIn className="size-3.5" /> Sign in</> : <><UserPlus className="size-3.5" /> Sign up</>}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode((prev) => (prev === "signin" ? "signup" : "signin"));
                setMessage("");
              }}
              className="text-xs font-semibold text-indigo-300 transition hover:text-white"
            >
              {mode === "signin" ? "Need an account?" : "Have an account?"}
            </button>
            {message && <p className="w-full text-right text-xs text-slate-400">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
