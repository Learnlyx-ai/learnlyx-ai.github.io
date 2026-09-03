"use client";

import Link from "next/link";
import { Lock, ChevronRight } from "lucide-react";
import type { Grade } from "@/data/grades";

// This component shows a card for each grade level
// Some grades are locked until you complete the previous one

interface GradeCardProps {
  grade: Grade;
  subject: string;
  isUnlocked: boolean;
  completedSkills: number;
  totalSkills: number;
}

export default function GradeCard({
  grade,
  subject,
  isUnlocked,
  completedSkills,
  totalSkills,
}: GradeCardProps) {
  // Calculate progress percentage
  const progress = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
  
  // If the grade is locked, don't make it clickable
  if (!isUnlocked) {
    return (
      <div
        className={`
          relative overflow-hidden rounded-2xl p-6
          bg-muted/50 border-2 border-dashed border-muted-foreground/20
          opacity-60 cursor-not-allowed
          flex items-center justify-between
          min-h-[100px]
        `}
      >
        {/* Grade name */}
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-full p-3">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-muted-foreground">
              {grade.name}
            </h3>
            <p className="text-sm text-muted-foreground/70">
              Complete previous grades to unlock
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/subject/${subject}/${grade.id}`}>
      <div
        className={`
          group relative overflow-hidden rounded-2xl p-6
          bg-card border-2 border-border
          transform transition-all duration-300
          hover:scale-[1.02] hover:shadow-lg hover:border-primary/50
          cursor-pointer min-h-[100px]
          flex items-center justify-between
        `}
      >
        {/* Grade info */}
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl font-bold text-primary">
              {grade.order + 1}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
              {grade.name}
            </h3>
            {totalSkills > 0 && (
              <p className="text-sm text-muted-foreground">
                {completedSkills} of {totalSkills} skills completed
              </p>
            )}
          </div>
        </div>

        {/* Progress bar (if there are skills) */}
        {totalSkills > 0 && (
          <div className="flex items-center gap-4">
            <div className="w-24 h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        )}

        {/* Arrow */}
        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
