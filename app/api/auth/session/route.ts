import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function GET() {
  const cookieStore = await cookies();
  const savedUsername = cookieStore.get(SESSION_COOKIE)?.value;
  if (savedUsername) {
    return NextResponse.json({
      isAuthenticated: true,
      username: savedUsername,
      userId: null,
    });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ isAuthenticated: false, username: null });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ isAuthenticated: false, username: null });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  cookieStore.set(SESSION_COOKIE, profile?.username ?? user.email ?? user.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    isAuthenticated: true,
    username: profile?.username ?? user.email ?? null,
    userId: user.id,
  });
}
