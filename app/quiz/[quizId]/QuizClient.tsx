"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Home, RotateCcw, Trophy, Sparkles } from "lucide-react";
import QuizQuestion from "@/components/QuizQuestion";
import ProgressBar from "@/components/ProgressBar";
import { useProgress } from "@/hooks/useProgress";
import type { Quiz } from "@/data/quizzes";

// This component handles the quiz UI and logic
// It's a client component because it uses state and hooks

interface QuizClientProps {
  quiz: Quiz;
  quizId: string;
  subjectName: string;
  gradeName: string;
}

export default function QuizClient({ quiz, quizId, subjectName, gradeName }: QuizClientProps) {
  // Progress hook to save results
  const { completeQuiz } = useProgress();
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Handle when a question is answered
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    // Check if this was the last question
    if (currentQuestion + 1 >= quiz.questions.length) {
      // Quiz is finished!
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = (finalScore / quiz.questions.length) * 100;
      
      // Calculate stars based on percentage
      let stars = 1;
      if (percentage >= 90) stars = 3;
      else if (percentage >= 70) stars = 2;
      
      // Save progress
      completeQuiz(quizId, stars);
      
      // Show celebration
      setShowCelebration(true);
      setTimeout(() => {
        setIsFinished(true);
        setShowCelebration(false);
      }, 1500);
    } else {
      // Move to next question
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Calculate stars for display
  const calculateStars = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    return 1;
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsFinished(false);
  };

  // Celebration animation component
  const CelebrationOverlay = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
      <div className="text-center animate-in zoom-in duration-500">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-white">Great Job!</h2>
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mt-4 animate-pulse" />
      </div>
    </div>
  );

  // Results screen
  if (isFinished) {
    const stars = calculateStars();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Results card */}
          <div className="bg-card rounded-3xl border-2 border-border p-8 text-center shadow-lg">
            {/* Trophy icon */}
            <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-6 mb-6">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-card-foreground mb-2">
              Quiz Complete!
            </h1>
            <p className="text-muted-foreground mb-6">
              {quiz.skill}
            </p>
            
            {/* Score */}
            <div className="bg-muted rounded-2xl p-6 mb-6">
              <div className="text-5xl font-bold text-foreground mb-2">
                {score} / {quiz.questions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                {percentage}% Correct
              </div>
            </div>
            
            {/* Stars earned */}
            <div className="mb-8">
              <p className="text-muted-foreground mb-3">Stars Earned</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3].map((starNum) => (
                  <Star
                    key={starNum}
                    className={`w-12 h-12 transition-all duration-500 ${
                      starNum <= stars
                        ? "text-yellow-400 fill-yellow-400 scale-110"
                        : "text-muted-foreground/30"
                    }`}
                    style={{
                      animationDelay: `${starNum * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {stars === 3 && "Perfect! You're a superstar!"}
                {stars === 2 && "Great job! Keep practicing!"}
                {stars === 1 && "Good try! Practice makes perfect!"}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={restartQuiz}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href={`/subject/${quiz.subject}/${quiz.grade}`}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Skills
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted/80 transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Celebration overlay */}
      {showCelebration && <CelebrationOverlay />}
      
      {/* Quiz header */}
      <header className="bg-card border-b border-border py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back button and quiz info */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/subject/${quiz.subject}/${quiz.grade}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Exit Quiz</span>
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-bold text-card-foreground">
                {quiz.skill}
              </h1>
              <p className="text-sm text-muted-foreground">
                {subjectName} - {gradeName}
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-primary">{score}</span>
              <span className="text-muted-foreground"> pts</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <ProgressBar
            current={currentQuestion + 1}
            total={quiz.questions.length}
          />
        </div>
      </header>

      {/* Question area */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <QuizQuestion
          key={currentQuestion}
          question={quiz.questions[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
        />
      </section>
    </main>
  );
}
