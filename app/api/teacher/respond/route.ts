import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSubscription } from "@/lib/server/accountStore";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

type Subject = "math" | "english" | "science";

function pickSubject(value: string): Subject {
  const normalized = value.toLowerCase();
  if (normalized === "english" || normalized === "science") return normalized;
  return "math";
}

function buildSubjectResponse(subject: Subject, topic: string, day: number, question: string): string {
  if (subject === "math") {
    return `Day ${day} ${subject} lesson on ${topic}: Start by identifying what the question asks, then choose the correct operation. Example method: write known values, solve step by step, and check your final answer. Your question was: "${question}". Practice task: solve 3 similar problems and explain each step out loud.`;
  }

  if (subject === "english") {
    return `Day ${day} ${subject} lesson on ${topic}: First find key words and context clues, then apply grammar or reading rules carefully. Your question was: "${question}". Practice task: write 3 sentences using today's rule and revise them for punctuation and clarity.`;
  }

  return `Day ${day} ${subject} lesson on ${topic}: Use observation, reasoning, and evidence. Your question was: "${question}". Practice task: make a simple claim, support it with 2 facts, and describe one real-world example.`;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get(SESSION_COOKIE)?.value;
  if (!username) {
    return NextResponse.json({ ok: false, message: "Not authenticated." }, { status: 401 });
  }

  const subscription = await getSubscription(username);
  if (!subscription?.isActive) {
    return NextResponse.json(
      { ok: false, message: "AI Teacher Pro subscription required." },
      { status: 402 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const subject = pickSubject(String(body?.subject || "math"));
  const topic = String(body?.topic || "core concepts");
  const day = Number(body?.day || 1);
  const question = String(body?.question || "Teach me this topic.");

  const response = buildSubjectResponse(subject, topic, day, question);
  return NextResponse.json({
    ok: true,
    response,
  });
}

