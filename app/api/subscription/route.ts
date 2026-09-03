import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  activateSubscription,
  cancelSubscription,
  getSessionProfile,
  getSubscription,
} from "@/lib/server/supabaseProfileStore";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

async function getSessionUser() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value || null;
}

export async function GET() {
  const profile = await getSessionProfile();
  if (!profile) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const subscription = await getSubscription();
  return NextResponse.json({ ok: true, subscription });
}

// Demo subscription activation endpoint for the $10/month AI Teacher plan.
export async function POST() {
  const profile = await getSessionProfile();
  if (!profile) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const subscription = await activateSubscription();
  if (!subscription) {
    return NextResponse.json(
      { ok: false, message: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "AI Teacher Pro activated for $10/month.",
    subscription,
  });
}

export async function DELETE() {
  const profile = await getSessionProfile();
  if (!profile) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const subscription = await cancelSubscription();
  if (!subscription) {
    return NextResponse.json(
      { ok: false, message: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, subscription });
}

