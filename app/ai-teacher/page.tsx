"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

type Stage = "ask_name" | "ask_grade" | "lesson";

interface ChatMessage {
  role: "teacher" | "student";
  text: string;
}

interface LessonQuestion {
  id: string;
  prompt: string;
  answer: string;
}

interface LessonPayload {
  date: string;
  topic: string;
  oneTopicPerDay: boolean;
  steps: string[];
  examples: Array<{ equation: string; answer: string }>;
  questions: LessonQuestion[];
}

function normalizeGradeInput(input: string): string | null {
  const text = input.trim().toLowerCase();
  if (!text) return null;
  if (text === "jk" || text === "junior kindergarten") return "jk";
  if (text === "k" || text === "kg" || text === "kindergarten") return "kindergarten";

  const plainNum = text.match(/^(\d{1,2})$/);
  if (plainNum) {
    const n = Number(plainNum[1]);
    if (n >= 1 && n <= 12) return `grade-${n}`;
  }

  const gradeNum = text.match(/grade\s*(\d{1,2})/);
  if (gradeNum) {
    const n = Number(gradeNum[1]);
    if (n >= 1 && n <= 12) return `grade-${n}`;
  }

  return null;
}

export default function AITeacherPage() {
  const { isAuthenticated, isLoaded } = useAuth();

  const [stage, setStage] = useState<Stage>("ask_name");
  const [name, setName] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [lesson, setLesson] = useState<LessonPayload | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [entry, setEntry] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const greetedRef = useRef(false);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const teacherSay = (text: string) => {
    setChat((prev) => [...prev, { role: "teacher", text }]);
    if (autoSpeak) speak(text);
  };

  useEffect(() => {
    if (!isLoaded || !isAuthenticated) return;
    if (greetedRef.current) return;
    greetedRef.current = true;
    const intro = "Hi, I am Learnlyx. May I know your name please?";
    teacherSay(intro);
  }, [isLoaded, isAuthenticated]);

  const loadLessonForGrade = async (gradeId: string) => {
    setIsBusy(true);
    setStatus("");
    try {
      const res = await fetch(`/api/teacher/daily?grade=${gradeId}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus(data?.message ?? "Could not load today's lesson.");
        return;
      }
      setLesson(data as LessonPayload);
      setAnswers({});
      setScore(null);
      setStage("lesson");
      teacherSay(
        `Okay ${name}, so today we are gonna learn ${data.topic}. ` +
          `This is your only topic for today.`
      );
    } catch {
      setStatus("Network error while loading lesson.");
    } finally {
      setIsBusy(false);
    }
  };

  const submitIntro = async (event: FormEvent) => {
    event.preventDefault();
    if (!entry.trim()) return;

    const value = entry.trim();
    setEntry("");
    setChat((prev) => [...prev, { role: "student", text: value }]);

    if (stage === "ask_name") {
      setName(value);
      setStage("ask_grade");
      teacherSay(`Hi ${value}. May I know what grade are you in?`);
      return;
    }

    if (stage === "ask_grade") {
      setGradeInput(value);
      const gradeId = normalizeGradeInput(value);
      if (!gradeId) {
        teacherSay("Please enter grade as JK, Kindergarten, or Grade 1 to Grade 12.");
        return;
      }
      await loadLessonForGrade(gradeId);
    }
  };

  const evaluate = () => {
    if (!lesson) return;
    let correct = 0;
    for (const q of lesson.questions) {
      const userAnswer = (answers[q.id] || "").trim();
      if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
        correct += 1;
      }
    }
    setScore(correct);
    teacherSay(`Great work ${name}. You got ${correct} out of ${lesson.questions.length}.`);
  };

  const allAnswered = useMemo(() => {
    if (!lesson) return false;
    return lesson.questions.every((q) => (answers[q.id] || "").trim().length > 0);
  }, [lesson, answers]);

  if (!isLoaded) {
    return <main className="min-h-screen bg-background px-4 py-8">Loading...</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center">
          <h1 className="text-3xl font-bold">AI Teacher</h1>
          <p className="mt-2 text-muted-foreground">Please sign in first.</p>
          <Link href="/" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Learnlyx AI Teacher</h1>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
            />
            Auto speak
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-[360px,1fr]">
          <section className="rounded-2xl border bg-card p-4">
            <h2 className="mb-3 text-lg font-semibold">Conversation</h2>
            <div className="h-[420px] overflow-y-auto rounded-lg border bg-muted/20 p-3">
              {chat.map((message, idx) => (
                <div
                  key={`${idx}-${message.role}`}
                  className={`mb-2 rounded-md p-2 text-sm ${
                    message.role === "teacher" ? "bg-primary/10" : "bg-secondary/40"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{message.role}</p>
                  <p>{message.text}</p>
                  {message.role === "teacher" && (
                    <button
                      type="button"
                      onClick={() => speak(message.text)}
                      className="mt-1 rounded border px-2 py-0.5 text-xs"
                    >
                      Speak
                    </button>
                  )}
                </div>
              ))}
            </div>

            {stage !== "lesson" && (
              <form onSubmit={submitIntro} className="mt-3 flex gap-2">
                <input
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder={stage === "ask_name" ? "Enter your name" : "Enter your grade"}
                  className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
                />
                <button
                  type="submit"
                  disabled={isBusy}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {isBusy ? "Loading..." : "Send"}
                </button>
              </form>
            )}

            {status && <p className="mt-2 text-sm text-muted-foreground">{status}</p>}
          </section>

          <section className="rounded-2xl border bg-card p-4">
            {!lesson ? (
              <div className="text-sm text-muted-foreground">
                Complete the intro on the left. Then your lesson, steps, examples, and 10 questions will appear here.
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{lesson.topic}</h2>
                <p className="text-sm text-muted-foreground">
                  Date: {lesson.date} | One topic per day: {lesson.oneTopicPerDay ? "Yes" : "No"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Student: {name} | Grade: {gradeInput}</p>

                <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                  <h3 className="font-semibold">Steps</h3>
                  <ol className="mt-2 list-decimal pl-5 text-sm">
                    {lesson.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                  <h3 className="font-semibold">Examples</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {lesson.examples.map((ex, idx) => (
                      <li key={idx}>
                        {ex.equation} = <strong>{ex.answer}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-lg border bg-muted/20 p-3">
                  <h3 className="font-semibold">10 Questions</h3>
                  <div className="mt-3 space-y-3">
                    {lesson.questions.map((q, idx) => (
                      <div key={q.id} className="rounded-md border bg-background p-2">
                        <p className="text-sm font-medium">
                          {idx + 1}. {q.prompt}
                        </p>
                        <input
                          value={answers[q.id] || ""}
                          onChange={(e) =>
                            setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Your answer"
                          className="mt-2 h-9 w-full rounded-md border bg-background px-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={evaluate}
                    disabled={!allAnswered}
                    className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    Submit Answers
                  </button>
                  {score !== null && (
                    <p className="mt-2 text-sm font-semibold">
                      Score: {score} / {lesson.questions.length}
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

