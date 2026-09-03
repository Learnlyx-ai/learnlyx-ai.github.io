import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { validateCredentials } from "@/lib/server/accountStore";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Email and password are required." },
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  let username: string | null = null;
  let userId: string | null = null;

  if (hasSupabaseConfig()) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      username = data.user?.user_metadata?.username ?? email;
      userId = data.user?.id ?? null;
    }
  }

  if (!username) {
    const localUser = await validateCredentials(email, password);
    if (!localUser) {
      return NextResponse.json(
        { ok: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }
    username = localUser.username;
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    ok: true,
    message: "Signed in successfully.",
    username,
    email,
    userId,
  });
}
