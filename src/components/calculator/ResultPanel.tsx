import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Sparkles, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CalculatorResult, BudgetTier } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  tierKey, websiteTypeKey, sectionTierKey, featureKey,
  materialKey, designLevelKey, urgencyKey, assetKey,
} from "@/i18n/keys";
import { BreakdownItem } from "@/lib/pricing";

interface ResultPanelProps {
  result: CalculatorResult | null;
  input: CalculatorInput;
}

const TIER_STYLES: Record<BudgetTier, { color: string; bg: string; ring: string }> = {
  budget:   { color: "text-tier-budget",   bg: "bg-tier-budget/10",   ring: "ring-tier-budget/30" },
  standard: { color: "text-tier-standard", bg: "bg-tier-standard/10", ring: "ring-tier-standard/30" },
  advanced: { color: "text-tier-advanced", bg: "bg-tier-advanced/10", ring: "ring-tier-advanced/30" },
  premium:  { color: "text-tier-premium",  bg: "bg-tier-premium/10",  ring: "ring-tier-premium/30" },
};

const TIER_ORDER: BudgetTier[] = ["budget", "standard", "advanced", "premium"];

function localizeBreakdown(b: BreakdownItem, t: (k: any) => string): string {
  return b.label;
}


export const ResultPanel = ({ result, input }: ResultPanelProps) => {
  const { t } = useLanguage();
  const TIER_NEXT: Record<string, string> = {
    'budget': 'standard',
    'standard': 'advanced',
    'advanced': 'premium',
    'premium': 'premium'
  };
  const isRecommendedSelected = input.packageTier === TIER_NEXT[input.packageTier || 'budget'];
// Removed adminMode state - no longer needed

  if (!result) {
    return (
      <div className="glow-card rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
          <Sparkles className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="font-display text-lg font-semibold mb-2">{t("result.placeholder.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("result.placeholder.text")}</p>
      </div>
    );
  }

  const style = TIER_STYLES[result.tier];
  const tk = tierKey(result.tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* HERO RESULT */}
      <div className="glow-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("result.heading")}
            </span>
            <div className={`px-3 py-1 rounded-full ring-1 ${style.bg} ${style.ring} ${style.color} text-xs font-semibold uppercase tracking-wider`}>
              {t(tk.label)}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={result.average}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-baseline gap-2 flex-wrap" aria-live="polite" aria-atomic="true">
                <span className="text-5xl sm:text-6xl font-display font-bold text-gradient tabular-nums leading-none">
                  {result.average}€
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {t("result.marketRange")}{" "}
                <span className="text-foreground font-semibold tabular-nums">
                  {result.marketRange.min}€ – {result.marketRange.max}€
                </span>
              </p>
              {result.discounts > 0 && (
                <p className="text-xs text-success mt-1.5 font-medium">
                  {t("result.savings")}{Math.round(result.discounts * 2)}€
                </p>
              )}
            </motion.div>
          </AnimatePresence>

      <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between gap-2">
              {TIER_ORDER.map((tier) => {
                const active = tier === result.tier;
                const ts = TIER_STYLES[tier];
                const tkr = tierKey(tier);
                return (
                  <button
                    key={tier}
                    className="flex-1 p-2 rounded-lg transition-all hover:bg-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ring-primary/50 cursor-pointer group"
                    onClick={() => onSelectTier(tier as BudgetTier)}
                  >
                    <div
                      className={`h-1.5 rounded-full mb-2 transition-all mx-auto ${
                        active ? ts.bg.replace("/10", "") : "bg-secondary group-hover:bg-accent/50"
                      }`}
                      style={active ? { backgroundColor: `hsl(var(--tier-${tier}))` } : undefined}
                    />
                    <span className={`text-[10px] font-semibold uppercase tracking-wider block ${active ? ts.color : "text-muted-foreground group-hover:text-foreground"}`}>
                      {t(tkr.label)}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">{t(tk.description)}</p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED PACKAGE - CLICKABLE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-200 border-2 shadow-glow hover:shadow-glow-lg ${
          isRecommendedSelected 
            ? 'border-success ring-2 ring-success/50 bg-gradient-to-br from-success/10 via-card to-success/5' 
            : 'border-primary/50 hover:border-primary ring-primary/20 hover:shadow-glow bg-gradient-to-br from-primary/5 via-card to-card hover:from-primary/10'
        }`}
        role="button"
        tabIndex={0}
        onClick={() => {
          // Select recommended
          onSelectTier(TIER_NEXT[input.packageTier || 'budget'] as BudgetTier);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectTier(TIER_NEXT[input.packageTier || 'budget'] as BudgetTier);
          }
        }}
      >
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-glow">
            <Sparkles className="w-3 h-3" /> {t("result.recommended.badge")}
          </span>
        </div>
        <div className="mb-1.5">
          <h4 className="font-display font-semibold text-sm">
            {t("result.recommended.title")} 
            {isRecommendedSelected && (
              <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-success text-success-foreground text-xs font-bold">
                <Check className="w-2.5 h-2.5" /> Izvēlēts
              </span>
            )}
          </h4>
        </div>
        <p className="text-xs text-muted-foreground mb-3 max-w-[80%]">
          {t("result.recommended.text")}
        </p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-display font-bold text-foreground tabular-nums">
            {result.recommended}€
          </span>
          <span className="text-xs text-muted-foreground">
            (+{result.recommended - result.average}€)
          </span>
        </div>
        <Button 
          size="sm" 
          className="w-full font-semibold text-sm shadow-glow group-hover:bg-primary hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            onSelectRecommended?.();
          }}
        >
          Izvēlēties šo / Choose this
        </Button>
      </motion.div>

      {/* SUGGESTIONS */}
      {(result.suggestionsCheaper.length > 0 || result.suggestionsBetter.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {result.suggestionsCheaper.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-tier-budget/10 flex items-center justify-center">
                  <TrendingDown className="w-3.5 h-3.5 text-tier-budget" />
                </div>
                <h4 className="font-display font-semibold text-sm">{t("result.cheaper")}</h4>
              </div>
              <ul className="space-y-2">
                {result.suggestionsCheaper.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-tier-budget shrink-0">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.suggestionsBetter.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-sm">{t("result.better")}</h4>
              </div>
              <ul className="space-y-2">
                {result.suggestionsBetter.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-primary shrink-0">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* BREAKDOWN */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h4 className="font-display font-semibold text-sm mb-3">{t("result.breakdown")}</h4>
        <div className="space-y-1.5">
          {result.breakdown.map((b, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
              <span className="text-muted-foreground">{localizeBreakdown(b, t)}</span>
              <span className="font-mono font-semibold text-foreground tabular-nums">
                {typeof b.amount === "number" ? `+${b.amount}€` : b.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

