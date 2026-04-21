import { memo } from "react";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { FeatureDef } from "@/lib/pricing";
import { useLanguage } from "@/i18n/LanguageContext";
import { featureKey } from "@/i18n/keys";

interface FeatureChipProps {
  feature: FeatureDef;
  selected: boolean;
  onToggle: () => void;
}

const FeatureChipImpl = ({ feature, selected, onToggle }: FeatureChipProps) => {
  const { t } = useLanguage();
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.97 }}
      aria-pressed={selected}
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
          aria-hidden="true"
        >
          {selected ? (
            <Check className="w-3 h-3" strokeWidth={3} />
          ) : (
            <Plus className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
        <span className="text-sm font-medium truncate">{t(featureKey(feature.id))}</span>
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

export const FeatureChip = memo(FeatureChipImpl);
