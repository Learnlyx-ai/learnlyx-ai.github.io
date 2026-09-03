"use client";

import Link from "next/link";
import { Lock, Star, ChevronRight } from "lucide-react";
import type { Skill } from "@/data/quizzes";

// This component shows a card for each skill
// Skills can be locked, in progress, or completed with stars

interface SkillCardProps {
  skill: Skill;
  isUnlocked: boolean;
  stars: number; // 0-3 stars
  isCompleted: boolean;
}

export default function SkillCard({
  skill,
  isUnlocked,
  stars,
  isCompleted,
}: SkillCardProps) {
  // If the skill is locked, show a disabled card
  if (!isUnlocked) {
    return (
      <div
        className={`
          relative overflow-hidden rounded-xl p-5
          bg-muted/30 border border-dashed border-muted-foreground/20
          opacity-50 cursor-not-allowed
          flex items-center justify-between
        `}
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">{skill.name}</span>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/quiz/${skill.quizId}`}>
      <div
        className={`
          group relative overflow-hidden rounded-xl p-5
          bg-card border-2 
          ${isCompleted ? "border-success/50 bg-success/5" : "border-border"}
          transform transition-all duration-300
          hover:scale-[1.02] hover:shadow-md hover:border-primary/50
          cursor-pointer
          flex items-center justify-between
        `}
      >
        {/* Skill name */}
        <div className="flex items-center gap-3">
          <span className="text-card-foreground font-semibold group-hover:text-primary transition-colors">
            {skill.name}
          </span>
        </div>

        {/* Stars rating */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            // Show earned stars
            <div className="flex gap-1">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className={`w-5 h-5 ${
                    starNum <= stars
                      ? "text-warning fill-warning"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          ) : (
            // Show empty stars for incomplete
            <div className="flex gap-1">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className="w-5 h-5 text-muted-foreground/30"
                />
              ))}
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
