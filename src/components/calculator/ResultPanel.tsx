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
}

const TIER_STYLES: Record<BudgetTier, { color: string; bg: string; ring: string }> = {
  budget:   { color: "text-tier-budget",   bg: "bg-tier-budget/10",   ring: "ring-tier-budget/30" },
  standard: { color: "text-tier-standard", bg: "bg-tier-standard/10", ring: "ring-tier-standard/30" },
  advanced: { color: "text-tier-advanced", bg: "bg-tier-advanced/10", ring: "ring-tier-advanced/30" },
  premium:  { color: "text-tier-premium",  bg: "bg-tier-premium/10",  ring: "ring-tier-premium/30" },
};

const TIER_ORDER: BudgetTier[] = ["budget", "standard", "advanced", "premium"];

function localizeBreakdown(b: BreakdownItem, t: (k: any) => string): string {
  switch (b.kind) {
    case "base":
      return `${t(websiteTypeKey(b.websiteType).label)} ${t("breakdown.base")}`;
    case "section":
      return t(sectionTierKey(b.id));
    case "feature":
      return t(featureKey(b.id));
    case "material":
      return `${t("breakdown.materials")}: ${t(materialKey(b.id))}`;
    case "design":
      return `${t("breakdown.design")}: ${t(designLevelKey(b.id).label)}`;
    case "urgency":
      return t(urgencyKey(b.id));
    case "asset":
      return t(assetKey(b.id));
    default:
      return (b as { label: string }).label;
  }
}


export const ResultPanel = ({ result }: ResultPanelProps) => {
  const { t } = useLanguage();
  const [adminMode, setAdminMode] = useState(false);

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
              <div className="flex items-baseline gap-2 flex-wrap">
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
                  <div key={tier} className="flex-1 text-center">
                    <div
                      className={`h-1.5 rounded-full mb-2 transition-all ${
                        active ? ts.bg.replace("/10", "") : "bg-secondary"
                      }`}
                      style={active ? { backgroundColor: `hsl(var(--tier-${tier}))` } : undefined}
                    />
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? ts.color : "text-muted-foreground"}`}>
                      {t(tkr.label)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">{t(tk.description)}</p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED PACKAGE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl p-5 relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card"
      >
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-glow">
            <Sparkles className="w-3 h-3" /> {t("result.recommended.badge")}
          </span>
        </div>
        <div className="mb-1.5">
          <h4 className="font-display font-semibold text-sm">{t("result.recommended.title")}</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-3 max-w-[80%]">
          {t("result.recommended.text")}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-foreground tabular-nums">
            {result.recommended}€
          </span>
          <span className="text-xs text-muted-foreground">
            (+{result.recommended - result.average}€)
          </span>
        </div>
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

      {/* ADMIN */}
      <div className="rounded-xl border border-dashed border-border bg-card/40 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("result.admin.title")}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setAdminMode((v) => !v)}
          >
            {adminMode ? <><EyeOff className="w-3 h-3 mr-1" /> {t("result.admin.hide")}</> : <><Eye className="w-3 h-3 mr-1" /> {t("result.admin.show")}</>}
          </Button>
        </div>
        <AnimatePresence>
          {adminMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{t("result.admin.cost")}</div>
                  <div className="font-display font-bold text-lg text-destructive tabular-nums">{result.cost}€</div>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{t("result.admin.profit")}</div>
                  <div className="font-display font-bold text-lg text-success tabular-nums">{result.profit}€</div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 italic">
                {t("result.admin.note")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
