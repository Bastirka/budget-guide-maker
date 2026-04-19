import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { FeatureDef } from "@/lib/pricing";

interface FeatureChipProps {
  feature: FeatureDef;
  selected: boolean;
  onToggle: () => void;
}

export const FeatureChip = ({ feature, selected, onToggle }: FeatureChipProps) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-card hover:border-border/80 hover:bg-card/60 text-foreground/90"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-md border transition-all ${
            selected
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border"
          }`}
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Plus className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-sm font-medium truncate">{feature.label}</span>
      </div>
      <span
        className={`shrink-0 text-xs font-mono font-semibold tabular-nums ${
          selected ? "text-primary" : "text-muted-foreground"
        }`}
      >
        +{feature.price}€
      </span>
    </motion.button>
  );
};
