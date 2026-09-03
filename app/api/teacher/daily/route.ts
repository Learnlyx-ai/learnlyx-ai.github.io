import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSkillsForGrade } from "@/data/quizzes";

export const runtime = "nodejs";

const SESSION_COOKIE = "learnlyx_session";

interface LessonQuestion {
  id: string;
  prompt: string;
  answer: string;
}

function toLevel(grade: string): number {
  if (grade === "jk" || grade === "kindergarten") return 0;
  const match = grade.match(/^grade-(\d{1,2})$/);
  if (!match) return 1;
  return Number(match[1]);
}

function buildQuestions(topic: string, grade: string): LessonQuestion[] {
  const lower = topic.toLowerCase();
  const level = toLevel(grade);
  const base = Math.max(2, level * 2 + 2);

  const questions: LessonQuestion[] = [];

  if (lower.includes("counting")) {
    const limitMatch = lower.match(/to\s*(\d{1,3})/);
    const limit = Math.max(5, Math.min(120, Number(limitMatch?.[1] || 10)));
    for (let i = 1; i <= 10; i++) {
      const n = Math.min(limit - 1, i);
      questions.push({
        id: `q${i}`,
        prompt: `What number comes after ${n}?`,
        answer: String(n + 1),
      });
    }
    return questions;
  }

  if (lower.includes("addition")) {
    for (let i = 1; i <= 10; i++) {
      const a = base + i;
      const b = Math.max(1, Math.floor(base / 2) + i);
      questions.push({
        id: `q${i}`,
        prompt: `What is ${a} + ${b}?`,
        answer: String(a + b),
      });
    }
    return questions;
  }

  if (lower.includes("subtraction")) {
    for (let i = 1; i <= 10; i++) {
      const b = Math.max(1, Math.floor(base / 2) + i);
      const c = base + i;
      const a = b + c;
      questions.push({
        id: `q${i}`,
        prompt: `What is ${a} - ${b}?`,
        answer: String(c),
      });
    }
    return questions;
  }

  if (lower.includes("multiplication")) {
    for (let i = 1; i <= 10; i++) {
      const a = Math.max(2, Math.min(12, Math.floor(level / 2) + 2 + (i % 4)));
      const b = Math.max(2, Math.min(12, base + (i % 5)));
      questions.push({
        id: `q${i}`,
        prompt: `What is ${a} x ${b}?`,
        answer: String(a * b),
      });
    }
    return questions;
  }

  if (lower.includes("division")) {
    for (let i = 1; i <= 10; i++) {
      const divisor = Math.max(2, Math.min(12, Math.floor(level / 2) + 2 + (i % 4)));
      const quotient = Math.max(2, Math.min(12, base + (i % 4)));
      const dividend = divisor * quotient;
      questions.push({
        id: `q${i}`,
        prompt: `What is ${dividend} / ${divisor}?`,
        answer: String(quotient),
      });
    }
    return questions;
  }

  // Fallback: basic mixed math.
  for (let i = 1; i <= 10; i++) {
    const a = base + i;
    const b = Math.max(1, Math.floor(base / 2) + i);
    questions.push({
      id: `q${i}`,
      prompt: `What is ${a} + ${b}?`,
      answer: String(a + b),
    });
  }
  return questions;
}

function buildExamples(topic: string, grade: string) {
  const qs = buildQuestions(topic, grade).slice(0, 3);
  return qs.map((q) => ({ equation: q.prompt.replace("What is ", "").replace("?", ""), answer: q.answer }));
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const username = cookieStore.get(SESSION_COOKIE)?.value;
  if (!username) {
    return NextResponse.json({ ok: false, message: "Not authenticated." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const grade = String(searchParams.get("grade") || "");
  if (!grade) {
    return NextResponse.json({ ok: false, message: "Grade is required." }, { status: 400 });
  }

  const skills = getSkillsForGrade("math", grade);
  const topic = skills[0]?.name || "Numbers and Operations";
  const today = new Date().toISOString().slice(0, 10);

  const steps = [
    `Read the ${topic} problem carefully.`,
    "Identify what operation is needed.",
    "Solve step by step without skipping.",
    "Check your final answer.",
  ];

  return NextResponse.json({
    ok: true,
    date: today,
    topic,
    oneTopicPerDay: true,
    steps,
    examples: buildExamples(topic, grade),
    questions: buildQuestions(topic, grade),
  });
}

