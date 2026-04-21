import { memo } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepProgressProps {
  steps: { id: number; label: string }[];
  current: number;
  onJump?: (id: number) => void;
}

const StepProgressImpl = ({ steps, current, onJump }: StepProgressProps) => {
  const progress = (current / (steps.length - 1)) * 100;

  return (
    <div className="w-full" role="group" aria-label="Calculator progress">
      {/* Bar */}
      <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-progress rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>

      {/* Step pills */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {steps.map((step) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onJump?.(step.id)}
              aria-current={active ? "step" : undefined}
              aria-label={`Step ${step.id + 1}: ${step.label}`}
              className={`flex items-center gap-2 shrink-0 transition-colors duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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

export const StepProgress = memo(StepProgressImpl);
