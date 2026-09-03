"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import type { Question } from "@/data/quizzes";

// This component shows a single quiz question with multiple choice answers
// When you click an answer, it shows if you're right or wrong

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  questionNumber: number;
}

function ShapeImage({ shape }: { shape: NonNullable<Question["image"]>["shape"] }) {
  const common = "fill-primary stroke-primary-foreground stroke-[3]";

  return (
    <div className="mx-auto mb-6 flex h-44 w-44 items-center justify-center rounded-2xl bg-primary/10">
      <svg viewBox="0 0 160 160" role="img" aria-label={`${shape} shape`} className="h-32 w-32">
        {shape === "circle" && <circle cx="80" cy="80" r="54" className={common} />}
        {shape === "square" && <rect x="34" y="34" width="92" height="92" rx="6" className={common} />}
        {shape === "triangle" && <polygon points="80,26 134,128 26,128" className={common} />}
        {shape === "rectangle" && <rect x="24" y="46" width="112" height="68" rx="6" className={common} />}
        {shape === "oval" && <ellipse cx="80" cy="80" rx="58" ry="40" className={common} />}
        {shape === "star" && (
          <polygon
            points="80,22 96,60 137,63 106,90 116,130 80,108 44,130 54,90 23,63 64,60"
            className={common}
          />
        )}
        {shape === "diamond" && <polygon points="80,22 136,80 80,138 24,80" className={common} />}
        {shape === "heart" && (
          <path
            d="M80 134 L34 88 C8 62 24 24 58 32 C68 34 75 41 80 50 C85 41 92 34 102 32 C136 24 152 62 126 88 Z"
            className={common}
          />
        )}
      </svg>
    </div>
  );
}

export default function QuizQuestion({
  question,
  onAnswer,
  questionNumber,
}: QuizQuestionProps) {
  // Track which answer was selected and if it's correct
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Handle when a user clicks an answer
  const handleAnswerClick = (answer: string) => {
    // Don't allow changing answer once selected
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    // Check if the answer is correct
    const isCorrect = answer === question.answer;

    // Wait a moment before moving to next question
    setTimeout(() => {
      onAnswer(isCorrect);
      // Reset for next question
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  // Get the style for each answer button
  const getAnswerStyle = (option: string) => {
    if (!showResult) {
      // Default style - not answered yet
      return "bg-card border-2 border-border hover:border-primary hover:bg-primary/5";
    }

    if (option === question.answer) {
      // This is the correct answer - show green
      return "bg-success/20 border-2 border-success text-success";
    }

    if (option === selectedAnswer && option !== question.answer) {
      // This was selected but wrong - show red
      return "bg-destructive/20 border-2 border-destructive text-destructive";
    }

    // Other options when showing result
    return "bg-muted/50 border-2 border-transparent opacity-50";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question number badge */}
      <div className="flex justify-center mb-6">
        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
          Question {questionNumber}
        </span>
      </div>

      {/* Question text */}
      {question.image?.type === "shape" && <ShapeImage shape={question.image.shape} />}

      <h2 className="text-2xl md:text-3xl font-bold text-center text-card-foreground mb-8">
        {question.question}
      </h2>

      {/* Answer options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
            className={`
              relative p-6 rounded-2xl text-xl font-semibold
              transform transition-all duration-200
              ${showResult ? "" : "hover:scale-[1.02] active:scale-[0.98]"}
              ${getAnswerStyle(option)}
              disabled:cursor-not-allowed
            `}
          >
            {/* Option letter (A, B, C, D) */}
            <span className="absolute top-2 left-3 text-sm font-bold text-muted-foreground">
              {String.fromCharCode(65 + index)}
            </span>

            {/* Answer text */}
            <span className="text-card-foreground">{option}</span>

            {/* Result icon */}
            {showResult && option === question.answer && (
              <Check className="absolute top-2 right-3 w-6 h-6 text-success" />
            )}
            {showResult &&
              option === selectedAnswer &&
              option !== question.answer && (
                <X className="absolute top-2 right-3 w-6 h-6 text-destructive" />
              )}
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {showResult && (
        <div
          className={`mt-8 text-center text-2xl font-bold ${
            selectedAnswer === question.answer
              ? "text-success"
              : "text-destructive"
          }`}
        >
          {selectedAnswer === question.answer
            ? "Correct! Great job!"
            : "Oops! Try harder next time!"}
        </div>
      )}
    </div>
  );
}
