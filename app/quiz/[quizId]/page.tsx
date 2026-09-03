import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getQuizById } from "@/data/quizzes";
import { subjects } from "@/data/subjects";
import { getGradeName } from "@/data/grades";
import QuizClient from "./QuizClient";

// This page shows a quiz with questions
// Route: /quiz/[quizId] (like /quiz/math-grade1-addition)

interface QuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  // Await the params (Next.js 16)
  const { quizId } = await params;
  
  // Get the quiz data
  const quiz = getQuizById(quizId);
  
  // If quiz not found, show error
  if (!quiz) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Quiz not found
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

  // Get subject info
  const subject = subjects.find((s) => s.id === quiz.subject);
  const gradeName = getGradeName(quiz.grade);

  return (
    <QuizClient 
      quiz={quiz} 
      quizId={quizId}
      subjectName={subject?.name || "Unknown"} 
      gradeName={gradeName} 
    />
  );
}
