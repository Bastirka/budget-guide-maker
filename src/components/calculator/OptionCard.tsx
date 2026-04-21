import { memo } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  title: string;
  description?: string;
  price?: string | number;
  compact?: boolean;
  zeroLabel?: string;
}

export const OptionCard = ({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
  price,
  compact = false,
  zeroLabel = "iekļauts",
}: OptionCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={`group relative text-left w-full rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        compact ? "p-3" : "p-4"
      } ${
        selected
          ? "border-primary bg-primary/5 shadow-glow ring-1 ring-primary/40"
          : "border-border bg-card hover:border-primary/40 hover:bg-card/80"
      }`}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={`shrink-0 flex items-center justify-center rounded-lg transition-colors ${
              compact ? "w-8 h-8" : "w-10 h-10"
            } ${
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground group-hover:text-foreground"
            }`}
            aria-hidden="true"
          >
            <Icon className={compact ? "w-4 h-4" : "w-5 h-5"} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className={`font-display font-semibold ${compact ? "text-sm" : "text-base"} text-foreground`}>
              {title}
            </h4>
            {price !== undefined && (
              <span
                className={`shrink-0 text-xs font-mono font-semibold ${
                  selected ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {typeof price === "number" ? (price === 0 ? zeroLabel : `+${price}€`) : price}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export const OptionCard = memo(OptionCardImpl);
