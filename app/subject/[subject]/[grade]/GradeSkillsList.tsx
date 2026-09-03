"use client";

import { Trophy } from "lucide-react";
import type { Skill } from "@/data/quizzes";
import SkillCard from "@/components/SkillCard";
import { useProgress } from "@/hooks/useProgress";

// This component handles the skills list with progress tracking
// It's a client component because it uses hooks for localStorage

interface GradeSkillsListProps {
  skills: Skill[];
  subjectId: string;
  gradeId: string;
}

export default function GradeSkillsList({ skills, subjectId, gradeId }: GradeSkillsListProps) {
  // Get progress data from localStorage
  const { completedQuizzes, getStars, isCompleted } = useProgress();

  // Calculate progress stats
  const completedCount = skills.filter((skill) =>
    completedQuizzes.includes(skill.quizId)
  ).length;
  const totalStars = skills.reduce(
    (sum, skill) => sum + getStars(skill.quizId),
    0
  );
  const maxStars = skills.length * 3;

  // All skills are unlocked.
  const isSkillUnlocked = (_index: number): boolean => true;

  return (
    <>
      {/* Progress summary header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-primary/10 rounded-xl px-4 py-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-foreground font-semibold">
                {completedCount} / {skills.length} Skills
              </span>
            </div>
            <div className="bg-yellow-100 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-foreground font-semibold">
                {totalStars} / {maxStars} Stars
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills list section */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        {skills.length === 0 ? (
          // No skills message
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Coming Soon!
            </h2>
            <p className="text-muted-foreground">
              We{"'"}re still building quizzes for this grade. Check back later!
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Skills to Practice
            </h2>
            
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isUnlocked={isSkillUnlocked(index)}
                  stars={getStars(skill.quizId)}
                  isCompleted={isCompleted(skill.quizId)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
