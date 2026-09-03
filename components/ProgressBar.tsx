"use client";

// This component shows a progress bar for the quiz
// It shows which question number you're on out of the total

interface ProgressBarProps {
  current: number; // Current question number (1-based)
  total: number; // Total number of questions
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  // Calculate the percentage complete
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Question counter text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-muted-foreground">
          Question {current} of {total}
        </span>
        <span className="text-sm font-semibold text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i + 1 <= current
                ? "bg-primary scale-100"
                : "bg-muted-foreground/30 scale-75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
