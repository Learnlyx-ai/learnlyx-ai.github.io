// This file contains all the subjects available in our learning app
// Each subject has an id, name, icon, color, and description

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// Our three main subjects - Math, English, and Science
export const subjects: Subject[] = [
  {
    id: "math",
    name: "Math",
    icon: "calculator",
    color: "bg-blue-500",
    description: "Learn numbers, addition, subtraction, and more!",
  },
  {
    id: "english",
    name: "English",
    icon: "book-open",
    color: "bg-emerald-500",
    description: "Read, write, and learn new words!",
  },
  {
    id: "science",
    name: "Science",
    icon: "flask",
    color: "bg-amber-500",
    description: "Discover how the world works!",
  },
];
