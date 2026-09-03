import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSubscription } from "@/lib/server/accountStore";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

type Subject = "math" | "english" | "science";

const topicPool: Record<Subject, string[]> = {
  math: [
    "number sense",
    "addition strategies",
    "subtraction practice",
    "multiplication patterns",
    "division reasoning",
    "fractions basics",
    "decimals and place value",
    "measurement and time",
    "geometry and shapes",
    "problem-solving skills",
  ],
  english: [
    "phonics sounds",
    "vocabulary building",
    "parts of speech",
    "sentence structure",
    "punctuation and capitalization",
    "reading comprehension",
    "summarizing passages",
    "grammar review",
    "writing clear paragraphs",
    "editing and revising",
  ],
  science: [
    "scientific method",
    "living things",
    "human body systems",
    "plants and ecosystems",
    "matter and energy",
    "force and motion",
    "earth systems",
    "weather and climate",
    "space science",
    "real-world experiments",
  ],
};

function pickSubject(value: string): Subject {
  const normalized = value.toLowerCase();
  if (normalized === "english" || normalized === "science") return normalized;
  return "math";
}

function buildPlan(subject: Subject) {
  const topics = topicPool[subject];
  return Array.from({ length: 30 }, (_, index) => {
    const day = index + 1;
    const topic = topics[index % topics.length];
    return {
      day,
      topic,
      title: `Day ${day}: ${topic}`,
      objective: `Learn the core idea of ${topic} and practice with guided examples.`,
      activity: `Complete a short lesson, then solve 5 ${subject} questions on ${topic}.`,
      homework: `Review mistakes and explain ${topic} in your own words.`,
    };
  });
}

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const subject = pickSubject(searchParams.get("subject") || "math");
  return NextResponse.json({ ok: true, subject, schedule: buildPlan(subject) });
}

