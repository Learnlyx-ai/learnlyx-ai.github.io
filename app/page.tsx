"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  Heart,
  Lightbulb,
  MessageCircleQuestion,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";

interface LearnerReview {
  id: string;
  username: string;
  rating: number;
  message: string;
  createdAt: string;
}

const benefits = [
  { icon: BrainCircuit, title: "Learn with clarity", text: "Short explanations and helpful hints make every concept feel manageable." },
  { icon: Trophy, title: "Stay motivated", text: "Build consistent habits through goals, progress, and rewarding practice." },
  { icon: BarChart3, title: "See what to do next", text: "Track your strengths and get a clear view of where to focus." },
];

const steps = [
  { icon: GraduationCap, title: "Choose your subject", text: "Start with Math, English, or Science." },
  { icon: BookOpenCheck, title: "Build understanding", text: "Learn concepts in clear, guided steps." },
  { icon: ClipboardCheck, title: "Practice with purpose", text: "Use quizzes to turn knowledge into confidence." },
];

// Demo reviews for the homepage.
// These are clearly labeled as sample/demo content so they are not presented as real testimonials.
const demoReviews: LearnerReview[] = [
  { id: "demo-01", username: "Maya_R", rating: 5, message: "The explanations are really easy to follow, especially when I get stuck on a math question.", createdAt: "2026-09-03" },
  { id: "demo-02", username: "NoahK", rating: 5, message: "I like how the lessons break big topics into smaller steps. It makes practice feel less stressful.", createdAt: "2026-09-03" },
  { id: "demo-03", username: "AvaLearns", rating: 4, message: "The quick quizzes are my favorite part. They help me see what I actually remember.", createdAt: "2026-09-03" },
  { id: "demo-04", username: "Ethan_7", rating: 5, message: "The AI Tutor is helpful when I need another way to understand something.", createdAt: "2026-09-03" },
  { id: "demo-05", username: "SofiaStudy", rating: 5, message: "Clean design, simple lessons, and I can practice at my own pace.", createdAt: "2026-09-03" },
  { id: "demo-06", username: "LiamM", rating: 4, message: "I really like the progress features. They make it easier to keep going.", createdAt: "2026-09-03" },
  { id: "demo-07", username: "ZoeLearner", rating: 5, message: "The hints are useful without just giving away the answer.", createdAt: "2026-09-03" },
  { id: "demo-08", username: "JaydenP", rating: 5, message: "Fractions finally started making sense after I practiced them here.", createdAt: "2026-09-03" },
  { id: "demo-09", username: "EmmaCodes", rating: 4, message: "The lessons are short enough that I can fit practice into my day.", createdAt: "2026-09-03" },
  { id: "demo-10", username: "OliverN", rating: 5, message: "I like that I can focus on one skill instead of doing everything at once.", createdAt: "2026-09-03" },
  { id: "demo-11", username: "AriaNotes", rating: 5, message: "The layout is really easy to understand and the practice feels organized.", createdAt: "2026-09-03" },
  { id: "demo-12", username: "LucasB", rating: 4, message: "Good for reviewing topics before a quiz. I especially like the guided steps.", createdAt: "2026-09-03" },
  { id: "demo-13", username: "ChloeStudy", rating: 5, message: "It feels encouraging instead of making mistakes feel like a big deal.", createdAt: "2026-09-03" },
  { id: "demo-14", username: "SamLearns", rating: 5, message: "The practice questions help me figure out exactly which parts I need to work on.", createdAt: "2026-09-03" },
  { id: "demo-15", username: "MiaM", rating: 4, message: "I like the simple interface and the fact that I can go at my own speed.", createdAt: "2026-09-03" },
  { id: "demo-16", username: "DanielT", rating: 5, message: "The explanations are clear and the quizzes are a good way to check my understanding.", createdAt: "2026-09-03" },
  { id: "demo-17", username: "EllaR", rating: 5, message: "It is a nice place to practice when I want a little extra help with schoolwork.", createdAt: "2026-09-03" },
  { id: "demo-18", username: "BenjiLearn", rating: 4, message: "The progress tracking gives me a clear idea of what to practice next.", createdAt: "2026-09-03" },
  { id: "demo-19", username: "GraceK", rating: 5, message: "I like the positive feel of the site. It makes learning feel more manageable.", createdAt: "2026-09-03" },
  { id: "demo-20", username: "RyanStudy", rating: 5, message: "The combination of lessons, hints, and quizzes makes practice much easier to organize.", createdAt: "2026-09-03" },
];

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [users, setUsers] = useState(0);
  const [rating, setRating] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [reviews, setReviews] = useState<LearnerReview[]>([]);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewStatus, setReviewStatus] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated) return;
      setHasAnimated(true);
      let currentUsers = 0;
      let currentRating = 0;
      const userInterval = window.setInterval(() => {
        currentUsers = Math.min(currentUsers + 50, 1500);
        setUsers(currentUsers);
        if (currentUsers === 1500) window.clearInterval(userInterval);
      }, 25);
      const ratingInterval = window.setInterval(() => {
        currentRating = Math.min(currentRating + 5, 95);
        setRating(currentRating);
        if (currentRating === 95) window.clearInterval(ratingInterval);
      }, 35);
    }, { threshold: 0.35 });

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data) => {
        const liveReviews = data.reviews ?? [];
        setReviews([...liveReviews, ...demoReviews]);
      })
      .catch(() => {
        setReviews(demoReviews);
        setReviewStatus("Showing sample reviews while live reviews are unavailable.");
      });
  }, []);

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmittingReview(true);
    setReviewStatus("");
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: reviewRating, message: reviewMessage }),
      });
      const data = await response.json();
      if (!response.ok) {
        setReviewStatus(data.message ?? "Your review could not be posted.");
        return;
      }
      setReviews((current) => [data.review, ...current]);
      setReviewMessage("");
      setReviewRating(5);
      setReviewStatus("Thanks — your review is now visible to other learners.");
    } catch {
      setReviewStatus("Your review could not be posted right now.");
    } finally {
      setIsSubmittingReview(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcff] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Learnlyx home">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 shadow-lg shadow-indigo-200">
              <GraduationCap className="size-5 text-white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Learnlyx</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#subjects" className="transition hover:text-indigo-600">Subjects</a>
            <a href="#how-it-works" className="transition hover:text-indigo-600">How it works</a>
            <a href="#reviews" className="transition hover:text-indigo-600">Reviews</a>
          </div>
          <Link href="/ai-teacher" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700">
            Ask AI Tutor <ArrowRight className="size-4" />
          </Link>
        </nav>
      </header>

      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_12%_18%,rgba(196,181,253,.55),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(165,243,252,.5),transparent_25%),linear-gradient(180deg,#f5f7ff_0%,#fbfcff_100%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 lg:grid-cols-[1.05fr_.95fr] lg:px-6 lg:pb-28 lg:pt-24">
          <div className="max-w-xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-bold text-indigo-700 shadow-sm">
              <Sparkles className="size-4" /> Learning that moves with you
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-6xl">
              Make steady progress, <span className="text-indigo-600">one win at a time.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Learnlyx gives students a calm, encouraging place to master school subjects, practice independently, and ask for help when they need it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#subjects" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
                Explore subjects <ArrowRight className="size-4" />
              </a>
              <Link href="/ai-teacher" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700">
                <MessageCircleQuestion className="size-4" /> Meet the AI Tutor
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
              {["Free core learning", "Built for growing confidence", "Learn at your own pace"].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-4 text-emerald-600" />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-indigo-100/70 sm:p-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-bold text-slate-900">Your learning plan</p><p className="mt-0.5 text-xs text-slate-500">A little progress every day</p></div>
              <div className="grid size-10 place-items-center rounded-xl bg-violet-100"><Lightbulb className="size-5 text-violet-600" /></div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between text-sm"><span className="font-semibold text-slate-300">Today&apos;s goal</span><span className="font-bold text-violet-300">12 min left</span></div>
              <p className="mt-4 text-xl font-extrabold">Fractions: compare values</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" /></div>
              <p className="mt-2 text-xs font-medium text-slate-300">68% complete</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><span className="grid size-9 place-items-center rounded-lg bg-emerald-100"><Check className="size-4 text-emerald-700" /></span><div className="flex-1"><p className="text-sm font-bold">Warm-up practice</p><p className="text-xs text-slate-500">Completed</p></div></div>
              <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3"><span className="grid size-9 place-items-center rounded-lg bg-indigo-600"><Play className="size-4 fill-white text-white" /></span><div className="flex-1"><p className="text-sm font-bold">Quick quiz</p><p className="text-xs text-slate-500">5 questions · 4 min</p></div><ChevronRight className="size-4 text-indigo-600" /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="subjects" className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Find your focus</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Start with a subject you want to improve.</h2></div>
          <p className="max-w-sm text-slate-600">Explore focused lessons and practice designed to meet you where you are.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">{subjects.map((subject) => <SubjectCard key={subject.id} subject={subject} />)}</div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Designed for momentum</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">More than answers. Better learning habits.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><span className="grid size-11 place-items-center rounded-xl bg-indigo-50"><Icon className="size-5 text-indigo-600" /></span><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}</div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
        <div className="grid gap-10 rounded-[2rem] bg-slate-950 p-8 text-white lg:grid-cols-[.8fr_1.2fr] lg:p-12">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">A simple routine</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">A better way to get unstuck.</h2><p className="mt-4 leading-7 text-slate-300">There&apos;s no need to race. Choose a topic, work through it with support, and make each practice session count.</p><Link href="/ai-teacher" className="mt-7 inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">Get help from the AI Tutor <ArrowRight className="size-4" /></Link></div>
          <div className="grid gap-3">{steps.map(({ icon: Icon, title, text }, index) => <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4"><span className="text-sm font-extrabold text-cyan-300">0{index + 1}</span><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Icon className="size-5 text-white" /></span><div><h3 className="font-bold">{title}</h3><p className="mt-0.5 text-sm text-slate-300">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section ref={statsRef} className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <div className="grid overflow-hidden rounded-[2rem] border border-indigo-100 bg-indigo-50 md:grid-cols-3">
          <div className="p-8 md:col-span-1"><UsersRound className="size-6 text-indigo-600" /><h2 className="mt-4 text-2xl font-extrabold tracking-tight">A supportive space to keep growing.</h2><p className="mt-3 text-slate-600">Progress is personal, and every small step deserves credit.</p></div>
          <div className="grid grid-cols-2 border-t border-indigo-100 md:border-l md:border-t-0"><div className="p-8"><p className="text-4xl font-extrabold text-indigo-600">{users.toLocaleString()}+</p><p className="mt-2 text-sm font-semibold text-slate-600">Active learners</p></div><div className="border-l border-indigo-100 p-8"><p className="text-4xl font-extrabold text-indigo-600">{rating}%</p><p className="mt-2 text-sm font-semibold text-slate-600">Learner satisfaction</p></div></div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
        <div className="mb-10 max-w-xl"><p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">From the community</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">What learners are saying</h2><p className="mt-3 text-slate-600">Share an honest note to help other students get to know Learnlyx.</p><p className="mt-2 text-xs font-medium text-slate-400">Sample reviews are shown for demonstration; published learner reviews appear alongside them.</p></div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
          <form onSubmit={submitReview} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label htmlFor="review-rating" className="text-sm font-bold">Your rating</label>
            <select id="review-rating" value={reviewRating} onChange={(event) => setReviewRating(Number(event.target.value))} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm">
              {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} out of 5 stars</option>)}
            </select>
            <label htmlFor="review-message" className="mt-5 block text-sm font-bold">Your review</label>
            <textarea id="review-message" value={reviewMessage} onChange={(event) => setReviewMessage(event.target.value)} minLength={3} maxLength={500} required rows={5} className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm" placeholder="What has helped you learn?" />
            <button type="submit" disabled={isSubmittingReview} className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60">{isSubmittingReview ? "Posting..." : "Post review"}</button>
            <p aria-live="polite" className="mt-3 text-xs leading-5 text-slate-500">{reviewStatus || "Sign in to post a review."}</p>
          </form>
          <div className="grid content-start gap-4">{reviews.length > 0 ? reviews.map((review) => <article key={review.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} className={`size-4 ${index < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />)}</div><p className="mt-4 leading-7 text-slate-600">&ldquo;{review.message}&rdquo;</p><p className="mt-4 text-sm font-bold text-slate-900">{review.username}</p></article>) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500"><CircleHelp className="mx-auto size-6 text-slate-400" /><p className="mt-3 font-medium">No reviews yet. Be the first learner to share one.</p></div>}</div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 lg:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 px-7 py-12 text-center text-white sm:px-12"><WandSparkles className="absolute -right-5 -top-5 size-28 text-white/10" /><h2 className="relative text-3xl font-extrabold tracking-tight sm:text-4xl">Ready for your next learning win?</h2><p className="relative mx-auto mt-4 max-w-xl text-indigo-100">Choose a subject, pick a skill, and build confidence one session at a time.</p><a href="#subjects" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50">Start exploring <ArrowRight className="size-4" /></a></div>
      </section>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row lg:px-6"><p className="font-semibold text-slate-700">Learnlyx <span className="font-normal text-slate-400">by BrightRoot Solutions</span></p><p className="flex items-center gap-1.5">Built with <Heart className="size-4 fill-rose-500 text-rose-500" /> for curious learners.</p><div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-emerald-600" /> Focused, positive learning</div></div></footer>
    </main>
  );
}