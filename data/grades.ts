// This file contains all the grades from JK to Grade 12
// Each grade has an id, name, and a display order

export interface Grade {
  id: string;
  name: string;
  order: number;
}

// All grades from Junior Kindergarten to Grade 12
export const grades: Grade[] = [
  { id: "jk", name: "JK", order: 0 },
  { id: "kindergarten", name: "Kindergarten", order: 1 },
  { id: "grade-1", name: "Grade 1", order: 2 },
  { id: "grade-2", name: "Grade 2", order: 3 },
  { id: "grade-3", name: "Grade 3", order: 4 },
  { id: "grade-4", name: "Grade 4", order: 5 },
  { id: "grade-5", name: "Grade 5", order: 6 },
  { id: "grade-6", name: "Grade 6", order: 7 },
  { id: "grade-7", name: "Grade 7", order: 8 },
  { id: "grade-8", name: "Grade 8", order: 9 },
  { id: "grade-9", name: "Grade 9", order: 10 },
  { id: "grade-10", name: "Grade 10", order: 11 },
  { id: "grade-11", name: "Grade 11", order: 12 },
  { id: "grade-12", name: "Grade 12", order: 13 },
];

// Helper function to get grade name from id
export function getGradeName(gradeId: string): string {
  const grade = grades.find((g) => g.id === gradeId);
  return grade ? grade.name : gradeId;
}
