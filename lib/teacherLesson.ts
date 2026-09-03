import { getSkillsForGrade } from "@/data/quizzes";

export interface LessonQuestion {
  id: string;
  prompt: string;
  answer: string;
}

export interface LessonPayload {
  date: string;
  topic: string;
  oneTopicPerDay: boolean;
  steps: string[];
  examples: Array<{ equation: string; answer: string }>;
  questions: LessonQuestion[];
}

function toLevel(grade: string): number {
  if (grade === "jk" || grade === "kindergarten") return 0;
  const match = grade.match(/^grade-(\d{1,2})$/);
  return match ? Number(match[1]) : 1;
}

function buildQuestions(topic: string, grade: string): LessonQuestion[] {
  const lower = topic.toLowerCase();
  const level = toLevel(grade);
  const base = Math.max(2, level * 2 + 2);
  const questions: LessonQuestion[] = [];

  if (lower.includes("counting")) {
    const limitMatch = lower.match(/to\s*(\d{1,3})/);
    const limit = Math.max(5, Math.min(120, Number(limitMatch?.[1] || 10)));
    for (let i = 1; i <= 10; i += 1) {
      const n = Math.min(limit - 1, i);
      questions.push({ id: `q${i}`, prompt: `What number comes after ${n}?`, answer: String(n + 1) });
    }
    return questions;
  }

  if (lower.includes("subtraction")) {
    for (let i = 1; i <= 10; i += 1) {
      const b = Math.max(1, Math.floor(base / 2) + i);
      const result = base + i;
      questions.push({ id: `q${i}`, prompt: `What is ${b + result} - ${b}?`, answer: String(result) });
    }
    return questions;
  }

  if (lower.includes("multiplication")) {
    for (let i = 1; i <= 10; i += 1) {
      const a = Math.max(2, Math.min(12, Math.floor(level / 2) + 2 + (i % 4)));
      const b = Math.max(2, Math.min(12, base + (i % 5)));
      questions.push({ id: `q${i}`, prompt: `What is ${a} x ${b}?`, answer: String(a * b) });
    }
    return questions;
  }

  if (lower.includes("division")) {
    for (let i = 1; i <= 10; i += 1) {
      const divisor = Math.max(2, Math.min(12, Math.floor(level / 2) + 2 + (i % 4)));
      const quotient = Math.max(2, Math.min(12, base + (i % 4)));
      questions.push({ id: `q${i}`, prompt: `What is ${divisor * quotient} / ${divisor}?`, answer: String(quotient) });
    }
    return questions;
  }

  for (let i = 1; i <= 10; i += 1) {
    const a = base + i;
    const b = Math.max(1, Math.floor(base / 2) + i);
    questions.push({ id: `q${i}`, prompt: `What is ${a} + ${b}?`, answer: String(a + b) });
  }
  return questions;
}

export function buildDailyLesson(grade: string): LessonPayload {
  const skills = getSkillsForGrade("math", grade);
  const topic = skills[0]?.name || "Numbers and Operations";
  const questions = buildQuestions(topic, grade);

  return {
    date: new Date().toISOString().slice(0, 10),
    topic,
    oneTopicPerDay: true,
    steps: [
      `Read the ${topic} problem carefully.`,
      "Identify what operation is needed.",
      "Solve step by step without skipping.",
      "Check your final answer.",
    ],
    examples: questions.slice(0, 3).map((question) => ({
      equation: question.prompt.replace("What is ", "").replace("?", ""),
      answer: question.answer,
    })),
    questions,
  };
}
