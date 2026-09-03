import Link from "next/link";
import { ArrowLeft, Calculator, BookOpen, FlaskConical } from "lucide-react";
import { subjects } from "@/data/subjects";
import { getGradeName, grades } from "@/data/grades";
import { getSkillsForGrade } from "@/data/quizzes";
import GradeSkillsList from "./GradeSkillsList";

// This page shows all skills for a specific subject and grade
// Route: /subject/[subject]/[grade] (like /subject/math/grade-1)

interface GradePageProps {
  params: Promise<{ subject: string; grade: string }>;
}

export function generateStaticParams() {
  return subjects.flatMap((subject) =>
    grades.map((grade) => ({ subject: subject.id, grade: grade.id }))
  );
}

export const dynamicParams = false;

// Map subject IDs to their icons
const iconMap = {
  math: Calculator,
  english: BookOpen,
  science: FlaskConical,
};

// Map subject IDs to their colors
const colorMap = {
  math: "from-blue-500 to-indigo-600",
  english: "from-emerald-500 to-teal-600",
  science: "from-amber-500 to-orange-600",
};

export default async function GradePage({ params }: GradePageProps) {
  // Await the params (Next.js 16)
  const { subject: subjectId, grade: gradeId } = await params;
  
  // Find the subject info
  const subject = subjects.find((s) => s.id === subjectId);
  const gradeName = getGradeName(gradeId);
  
  // Get skills for this grade
  const skills = getSkillsForGrade(subjectId, gradeId);
  
  // If subject not found, show error
  if (!subject) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Subject not found
          </h1>
          <Link
            href="/"
            className="text-primary hover:underline flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  // Get the icon and colors for this subject
  const Icon = iconMap[subjectId as keyof typeof iconMap] || Calculator;
  const gradient = colorMap[subjectId as keyof typeof colorMap] || "from-gray-500 to-gray-600";

  return (
    <main className="min-h-screen bg-background">
      {/* Header with subject and grade info */}
      <header className={`relative overflow-hidden bg-gradient-to-r ${gradient} py-12 px-4`}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button */}
          <Link
            href={`/subject/${subjectId}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {subject.name}</span>
          </Link>
          
          {/* Subject and grade title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-2xl p-4">
              <Icon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {subject.name} - {gradeName}
              </h1>
              <p className="text-white/80 text-lg">
                Practice skills to earn stars!
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Skills list - client component with hooks */}
      <GradeSkillsList skills={skills} subjectId={subjectId} gradeId={gradeId} />
    </main>
  );
}
