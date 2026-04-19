import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepProgressProps {
  steps: { id: number; label: string }[];
  current: number;
  onJump?: (id: number) => void;
}

export const StepProgress = ({ steps, current, onJump }: StepProgressProps) => {
  const progress = ((current) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Bar */}
      <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-progress rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* Step pills */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <button
              key={step.id}
              onClick={() => onJump?.(step.id)}
              className={`flex items-center gap-2 shrink-0 transition-all duration-300 ${
                active
                  ? "text-foreground"
                  : done
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : done
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : step.id + 1}
              </span>
              <span className="text-xs font-medium hidden sm:inline whitespace-nowrap">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
