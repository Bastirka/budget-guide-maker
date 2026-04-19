import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Building2, UtensilsCrossed, Palette, ShoppingBag, CalendarCheck, Sparkles,
  ArrowRight, ArrowLeft, RotateCcw, Calculator,
} from "lucide-react";
import {
  WEBSITE_TYPES, SECTION_TIERS, FEATURES, MATERIALS, DESIGN_LEVELS, URGENCY_LEVELS,
  calculate, INITIAL_INPUT, CalculatorInput, WebsiteType, MaterialId,
} from "@/lib/pricing";
import { StepProgress } from "@/components/calculator/StepProgress";
import { OptionCard } from "@/components/calculator/OptionCard";
import { FeatureChip } from "@/components/calculator/FeatureChip";
import { ResultPanel } from "@/components/calculator/ResultPanel";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  Rocket, Building2, UtensilsCrossed, Palette, ShoppingBag, CalendarCheck, Sparkles,
};

const STEPS = [
  { id: 0, label: "Tips" },
  { id: 1, label: "Sadaļas" },
  { id: 2, label: "Funkcijas" },
  { id: 3, label: "Materiāli" },
  { id: 4, label: "Dizains" },
  { id: 5, label: "Termiņš" },
];

const FEATURE_CATEGORIES = [
  { id: "essential", label: "Pamata" },
  { id: "marketing", label: "Marketings & SEO" },
  { id: "ecommerce", label: "E-komercija" },
  { id: "advanced", label: "Advanced" },
] as const;

const Index = () => {
  const [input, setInput] = useState<CalculatorInput>(INITIAL_INPUT);
  const [step, setStep] = useState(0);

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

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => { setInput(INITIAL_INPUT); setStep(0); };

  const canProceed = step === 0 ? !!input.websiteType : true;

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
              <div className="font-display font-bold text-sm">PriceLab</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Web Calculator</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-xs">
            <RotateCcw className="w-3 h-3 mr-1.5" /> Sākt no jauna
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-12 pb-8">
        <div className="container max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Reālas cenas · Latvijas tirgus
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Cik maksā <span className="text-gradient">jūsu mājaslapa</span>?
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Atbildiet uz dažiem jautājumiem un saņemiet precīzu cenu diapazonu — bez liekiem solījumiem,
              bez slēptām maksām. Aprēķins notiek reāllaikā.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative pb-24">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-[1fr_440px] gap-6 lg:gap-8 items-start">
            {/* LEFT — STEPS */}
            <div className="glow-card rounded-2xl p-5 sm:p-7">
              <StepProgress steps={STEPS} current={step} onJump={setStep} />

              <div className="mt-8 min-h-[320px]">
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
                        <h2 className="font-display text-xl font-semibold mb-1">Kāda veida mājaslapa?</h2>
                        <p className="text-sm text-muted-foreground mb-5">Izvēlieties projektam vistuvāko tipu.</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {(Object.keys(WEBSITE_TYPES) as WebsiteType[]).map((key) => {
                            const t = WEBSITE_TYPES[key];
                            const Icon = ICON_MAP[t.icon as keyof typeof ICON_MAP];
                            return (
                              <OptionCard
                                key={key}
                                selected={input.websiteType === key}
                                onClick={() => update("websiteType", key)}
                                icon={Icon}
                                title={t.label}
                                description={t.description}
                                price={`${t.range.min}–${t.range.max}€`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 1: SECTIONS */}
                    {step === 1 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">Cik sadaļu būs mājaslapā?</h2>
                        <p className="text-sm text-muted-foreground mb-5">
                          Sadaļa = atsevišķa lapa vai liels bloks (Sākums, Par mums, Pakalpojumi utt.)
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {SECTION_TIERS.map((s) => (
                            <OptionCard
                              key={s.id}
                              selected={input.sectionTier === s.id}
                              onClick={() => update("sectionTier", s.id)}
                              title={s.label}
                              price={s.price}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: FEATURES */}
                    {step === 2 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">Kādas funkcijas vajag?</h2>
                        <p className="text-sm text-muted-foreground mb-5">
                          Atzīmējiet visu, kas jums nepieciešams. Cenas redzamas blakus.
                        </p>
                        <div className="space-y-5">
                          {FEATURE_CATEGORIES.map((cat) => {
                            const items = FEATURES.filter((f) => f.category === cat.id);
                            return (
                              <div key={cat.id}>
                                <div className="flex items-center gap-2 mb-2.5">
                                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                                    {cat.label}
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
                        <h2 className="font-display text-xl font-semibold mb-1">Vai jums ir materiāli?</h2>
                        <p className="text-sm text-muted-foreground mb-5">
                          Logo, teksti, attēli — ja nav, mēs to izveidojam.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {MATERIALS.map((m) => (
                            <OptionCard
                              key={m.id}
                              selected={input.materials.includes(m.id)}
                              onClick={() => toggleMaterial(m.id)}
                              title={m.label}
                              price={m.price}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 italic">
                          💡 Ja izvēlēsieties "Viss no nulles", atsevišķās pozīcijas tiks ignorētas.
                        </p>
                      </div>
                    )}

                    {/* STEP 4: DESIGN */}
                    {step === 4 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">Kāds dizaina līmenis?</h2>
                        <p className="text-sm text-muted-foreground mb-5">No template līdz pilnībā unikālam.</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {DESIGN_LEVELS.map((d) => (
                            <OptionCard
                              key={d.id}
                              selected={input.designLevel === d.id}
                              onClick={() => update("designLevel", d.id)}
                              title={d.label}
                              description={d.description}
                              price={d.price}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 5: URGENCY */}
                    {step === 5 && (
                      <div>
                        <h2 className="font-display text-xl font-semibold mb-1">Cik ātri vajag gatavu?</h2>
                        <p className="text-sm text-muted-foreground mb-5">Steidzamība ietekmē galīgo cenu.</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {URGENCY_LEVELS.map((u) => (
                            <OptionCard
                              key={u.id}
                              selected={input.urgency === u.id}
                              onClick={() => update("urgency", u.id)}
                              title={u.label}
                              price={u.price}
                            />
                          ))}
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
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Atpakaļ
                </Button>
                <span className="text-xs text-muted-foreground tabular-nums">
                  Solis {step + 1} / {STEPS.length}
                </span>
                <Button
                  onClick={next}
                  disabled={step === STEPS.length - 1 || !canProceed}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-glow"
                >
                  Tālāk <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* RIGHT — RESULT */}
            <div className="lg:sticky lg:top-24">
              <ResultPanel result={result} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/60 py-6">
        <div className="container text-center text-xs text-muted-foreground">
          Cenas balstītas uz vidējām likmēm Latvijas tirgū maziem web studio · Galīgā cena tiek apstiprināta pēc projekta brīfa
        </div>
      </footer>
    </div>
  );
};

export default Index;
