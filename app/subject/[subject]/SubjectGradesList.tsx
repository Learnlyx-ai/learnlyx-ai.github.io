"use client";

import { getSkillsForGrade } from "@/data/quizzes";
import type { Grade } from "@/data/grades";
import GradeCard from "@/components/GradeCard";
import { useProgress } from "@/hooks/useProgress";

// This component handles the grades list with progress tracking
// It's a client component because it uses hooks for localStorage

interface SubjectGradesListProps {
  subjectId: string;
  grades: Grade[];
}

export default function SubjectGradesList({ subjectId, grades }: SubjectGradesListProps) {
  // Get progress data from localStorage
  const { completedQuizzes } = useProgress();

  // All grades are unlocked.
  const getGradeStatus = (_gradeIndex: number, gradeId: string) => {
    const skills = getSkillsForGrade(subjectId, gradeId);
    const completedCount = skills.filter(
      (skill) => completedQuizzes.includes(skill.quizId)
    ).length;

    return { isUnlocked: true, completedSkills: completedCount, totalSkills: skills.length };
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Select Your Grade
      </h2>
      
      <div className="space-y-3">
        {grades.map((grade, index) => {
          const { isUnlocked, completedSkills, totalSkills } = getGradeStatus(index, grade.id);
          
          return (
            <GradeCard
              key={grade.id}
              grade={grade}
              subject={subjectId}
              isUnlocked={isUnlocked}
              completedSkills={completedSkills}
              totalSkills={totalSkills}
            />
          );
        })}
      </div>
    </section>
  );
}
