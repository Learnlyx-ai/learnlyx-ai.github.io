import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createUser } from "@/lib/server/accountStore";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = String(body?.username || "").trim().toLowerCase();
  const password = String(body?.password || "");
  const email = String(body?.email || "").trim().toLowerCase();

  if (!username || !email || !password) {
    return NextResponse.json(
      { ok: false, message: "Username, email, and password are required." },
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  const localAccount = await createUser(username, password, email);
  if (!localAccount.ok) {
    return NextResponse.json({ ok: false, message: localAccount.message }, { status: 400 });
  }

  if (hasSupabaseConfig()) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      console.warn("Supabase signup failed after local account creation:", error.message);
    }

    if (data?.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username,
        email,
        role: "learner",
        created_at: new Date().toISOString(),
      });
    }
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
    message: "Account created.",
    username,
    email,
  });
}
