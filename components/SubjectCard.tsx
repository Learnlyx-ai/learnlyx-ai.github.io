"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Calculator, FlaskConical } from "lucide-react";
import type { Subject } from "@/data/subjects";

interface SubjectCardProps {
  subject: Subject;
}

const subjectStyles = {
  math: { icon: Calculator, accent: "bg-blue-600", soft: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", label: "Numbers & problem solving" },
  english: { icon: BookOpen, accent: "bg-emerald-600", soft: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", label: "Reading & writing" },
  science: { icon: FlaskConical, accent: "bg-amber-500", soft: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", label: "Questions & discovery" },
};

export default function SubjectCard({ subject }: SubjectCardProps) {
  const style = subjectStyles[subject.id as keyof typeof subjectStyles] ?? subjectStyles.math;
  const Icon = style.icon;

  return (
    <Link href={`/subject/${subject.id}`} className={`group rounded-2xl border ${style.border} bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      <div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-xl ${style.soft}`}><Icon className={`size-6 ${style.text}`} /></span><ArrowUpRight className="size-5 text-slate-300 transition group-hover:text-slate-700" /></div>
      <p className={`mt-7 text-xs font-bold uppercase tracking-[0.14em] ${style.text}`}>{style.label}</p>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{subject.name}</h3>
      <p className="mt-3 leading-7 text-slate-600">{subject.description}</p>
      <span className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${style.text}`}>Explore subject <span className={`size-1.5 rounded-full ${style.accent}`} /></span>
    </Link>
  );
}
