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
}

export const OptionCard = ({
  selected,
  onClick,
  icon: Icon,
  title,
  description,
  price,
  compact = false,
}: OptionCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative text-left w-full rounded-xl border transition-all duration-300 ${
        compact ? "p-3" : "p-4"
      } ${
        selected
          ? "border-primary bg-primary/5 shadow-glow"
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
                {typeof price === "number" ? (price === 0 ? "iekļauts" : `+${price}€`) : price}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      {selected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute inset-0 rounded-xl ring-2 ring-primary pointer-events-none"
          transition={{ type: "spring", duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};
