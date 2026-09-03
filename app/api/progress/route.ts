import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  completeQuiz,
  getProgress,
  resetProgress,
} from "@/lib/server/accountStore";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

async function getSessionUsername() {
  return (await cookies()).get(SESSION_COOKIE)?.value?.trim().toLowerCase() || null;
}

export async function GET() {
  const username = await getSessionUsername();
  if (!username) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const progress = await getProgress(username);
  return NextResponse.json({ ok: true, progress });
}

export async function POST(request: Request) {
  const username = await getSessionUsername();
  if (!username) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const quizId = String(body?.quizId || "");
  const stars = Number(body?.stars || 0);

  if (!quizId || !Number.isFinite(stars)) {
    return NextResponse.json(
      { ok: false, message: "Invalid quiz progress payload." },
      { status: 400 }
    );
  }

  const progress = await completeQuiz(username, quizId, stars);
  if (!progress) {
    return NextResponse.json(
      { ok: false, message: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, progress });
}

export async function DELETE() {
  const username = await getSessionUsername();
  if (!username) {
    return NextResponse.json(
      { ok: false, message: "Not authenticated." },
      { status: 401 }
    );
  }

  const progress = await resetProgress(username);
  if (!progress) {
    return NextResponse.json(
      { ok: false, message: "User not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, progress });
}
