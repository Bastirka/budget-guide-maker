import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Building2, UtensilsCrossed, Palette, ShoppingBag, CalendarCheck, Sparkles,
  ArrowRight, ArrowLeft, RotateCcw, Calculator, Wrench,
} from "lucide-react";
import {
  WEBSITE_TYPES, SECTION_TIERS, FEATURES, MATERIALS, ASSETS, DESIGN_LEVELS, URGENCY_LEVELS, MAINTENANCE_LEVELS,
  calculate, INITIAL_INPUT, CalculatorInput, WebsiteType, MaterialId, AssetId,
} from "@/lib/pricing";
import { Hero } from "@/components/calculator/Hero";
import { StepProgress } from "@/components/calculator/StepProgress";
import { OptionCard } from "@/components/calculator/OptionCard";
import { FeatureChip } from "@/components/calculator/FeatureChip";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { LeadForm } from "@/components/calculator/LeadForm";
import { QuoteRequestForm } from "@/components/calculator/QuoteRequestForm";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  websiteTypeKey,
  sectionTierKey,
  materialKey,
  assetKey,
  designLevelKey,
  urgencyKey,
  maintenanceKey,
} from "@/i18n/keys";

const ICON_MAP = {
  Rocket, Building2, UtensilsCrossed, Palette, ShoppingBag, CalendarCheck, Sparkles,
};

const FEATURE_CATEGORIES = [
  { id: "essential", labelKey: "features.essential" },
  { id: "marketing", labelKey: "features.marketing" },
  { id: "ecommerce", labelKey: "features.ecommerce" },
  { id: "advanced", labelKey: "features.advanced" },
] as const;

const Index = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState<CalculatorInput>(INITIAL_INPUT);
  const [step, setStep] = useState(0);
  const calcRef = useRef<HTMLElement>(null);

  const STEPS = [
    { id: 0, label: t("steps.type") },
    { id: 1, label: t("steps.sections") },
    { id: 2, label: t("steps.features") },
    { id: 3, label: t("steps.materials") },
    { id: 4, label: t("steps.assets") },
    { id: 5, label: t("steps.design") },
    { id: 6, label: t("steps.urgency") },
    { id: 7, label: t("steps.maintenance") },
  ];

  const result = useMemo(() => calculate(input), [input]);

  const update = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) =>
    setInput((p) => ({ ...p, [key]: value }));

  const toggleFeature = (id: string) =>
    setInput((p) => ({
      ...p,
      features: p.features.includes(id) ? p.features.filter((f) => f !== id) : [...p.features, id],
    }));

  const toggleMaterial = (id: MaterialId) =>
    setInput((p) => ({
      ...p,
      materials: p.materials.includes(id) ? p.materials.filter((m) => m !== id) : [...p.materials, id],
    }));

  const toggleAsset = (id: AssetId) =>
    setInput((p) => ({
      ...p,
      assets: p.assets.includes(id) ? p.assets.filter((a) => a !== id) : [...p.assets, id],
    }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => { setInput(INITIAL_INPUT); setStep(0); };

  const scrollToCalc = () => {
    calcRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const canProceed = step === 0 ? !!input.websiteType : true;
  const isLastStep = step === STEPS.length - 1;
  const zeroLabel = t("common.included");

  return (
    <div className="min-h-screen relative">
      {/* Grid backdrop */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-border/60 backdrop-blur-xl bg-background/40 sticky top-0 z-30">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Calculator className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm">{t("header.brand")}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("header.tagline")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
              <RotateCcw className="w-3 h-3 mr-1.5" /> {t("header.reset")}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero onStart={scrollToCalc} />

      {/* Calculator */}
      <section ref={calcRef} className="relative pb-16 scroll-mt-20">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_440px] gap-6 lg:gap-8 items-start">
            {/* LEFT — STEPS */}
            <div className="glow-card rounded-2xl p-5 sm:p-7">
              <StepProgress steps={STEPS} current={step} onJump={setStep} />

              <div className="mt-8 min-h-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* STEP 0: WEBSITE TYPE */}
                    {step === 0 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step0.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step0.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {(Object.keys(WEBSITE_TYPES) as WebsiteType[]).map((key) => {
                            const tDef = WEBSITE_TYPES[key];
                            const k = websiteTypeKey(key);
                            const Icon = ICON_MAP[tDef.icon as keyof typeof ICON_MAP];
                            return (
                              <OptionCard
                                key={key}
                                selected={input.websiteType === key}
                                onClick={() => update("websiteType", key)}
                                icon={Icon}
                                title={t(k.label)}
                                description={t(k.description)}
                                price={`${tDef.range.min}–${tDef.range.max}€`}
                                zeroLabel={zeroLabel}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 1: SECTIONS */}
                    {step === 1 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step1.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step1.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {SECTION_TIERS.map((s) => (
                            <OptionCard
                              key={s.id}
                              selected={input.sectionTier === s.id}
                              onClick={() => update("sectionTier", s.id)}
                              title={t(sectionTierKey(s.id))}
                              price={s.price}
                              zeroLabel={zeroLabel}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: FEATURES */}
                    {step === 2 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step2.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step2.subtitle")}</p>
                        <div className="space-y-5">
                          {FEATURE_CATEGORIES.map((cat) => {
                            const items = FEATURES.filter((f) => f.category === cat.id);
                            return (
                              <div key={cat.id}>
                                <div className="flex items-center gap-2 mb-2.5">
                                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                                    {t(cat.labelKey)}
                                  </span>
                                  <div className="flex-1 h-px bg-border" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-2">
                                  {items.map((f) => (
                                    <FeatureChip
                                      key={f.id}
                                      feature={f}
                                      selected={input.features.includes(f.id)}
                                      onToggle={() => toggleFeature(f.id)}
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: MATERIALS */}
                    {step === 3 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step3.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step3.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {MATERIALS.map((m) => (
                            <OptionCard
                              key={m.id}
                              selected={input.materials.includes(m.id)}
                              onClick={() => toggleMaterial(m.id)}
                              title={t(materialKey(m.id))}
                              price={m.price}
                              zeroLabel={zeroLabel}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 italic">
                          {t("step3.note")}
                        </p>
                      </div>
                    )}

                    {/* STEP 4: ASSETS */}
                    {step === 4 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step4.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step4.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {ASSETS.map((a) => (
                            <OptionCard
                              key={a.id}
                              selected={input.assets.includes(a.id)}
                              onClick={() => toggleAsset(a.id)}
                              title={t(assetKey(a.id))}
                              price={`−${a.discount}€`}
                              zeroLabel={zeroLabel}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 5: DESIGN */}
                    {step === 5 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step5.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step5.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {DESIGN_LEVELS.map((d) => {
                            const k = designLevelKey(d.id);
                            return (
                              <OptionCard
                                key={d.id}
                                selected={input.designLevel === d.id}
                                onClick={() => update("designLevel", d.id)}
                                title={t(k.label)}
                                description={t(k.description)}
                                price={d.price}
                                zeroLabel={zeroLabel}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 6: URGENCY */}
                    {step === 6 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step6.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step6.subtitle")}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {URGENCY_LEVELS.map((u) => (
                            <OptionCard
                              key={u.id}
                              selected={input.urgency === u.id}
                              onClick={() => update("urgency", u.id)}
                              title={t(urgencyKey(u.id))}
                              price={u.price}
                              zeroLabel={zeroLabel}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 7: MAINTENANCE */}
                    {step === 7 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">{t("step7.title")}</h2>
                        <p className="text-sm text-muted-foreground mb-5">{t("step7.subtitle")}</p>
                        <div className="grid gap-3">
                          {MAINTENANCE_LEVELS.map((m) => {
                            const k = maintenanceKey(m.id);
                            return (
                              <OptionCard
                                key={m.id}
                                selected={input.maintenance === m.id}
                                onClick={() => update("maintenance", m.id)}
                                icon={Wrench}
                                title={t(k.label)}
                                description={t(k.description)}
                                price={m.monthly === 0 ? zeroLabel : `${m.monthly}€${t("common.perMonth")}`}
                                zeroLabel={zeroLabel}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav buttons */}
              <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 0}
                  className="text-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("nav.back")}
                </Button>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {t("nav.step")} {step + 1} / {STEPS.length}
                </span>
                <Button
                  onClick={next}
                  disabled={isLastStep || !canProceed}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-glow"
                >
                  {t("nav.next")} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* RIGHT — RESULT */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <ResultPanel result={result} />
            </div>
          </div>

          {/* LEAD FORM */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 max-w-3xl mx-auto space-y-6"
            >
              <LeadForm input={input} result={result} />
              <QuoteRequestForm input={input} result={result} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/60 py-6">
        <div className="container text-center text-xs text-muted-foreground">
          {t("footer.text")}
        </div>
      </footer>
    </div>
  );
};

export default Index;
