import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeroProps {
  onStart: () => void;
}

export const Hero = ({ onStart }: HeroProps) => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14">
      <div className="container max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {t("hero.titleA")} <span className="text-gradient">{t("hero.titleB")}</span>?
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            {t("hero.subtitle")}
          </p>

          <Button
            onClick={onStart}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-glow group h-12 px-7 text-base"
          >
            {t("hero.cta")}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { icon: Zap, title: t("hero.badge1.title"), text: t("hero.badge1.text") },
              { icon: Shield, title: t("hero.badge2.title"), text: t("hero.badge2.text") },
              { icon: Sparkles, title: t("hero.badge3.title"), text: t("hero.badge3.text") },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="rounded-xl border border-border bg-card/40 backdrop-blur px-4 py-3 text-left flex items-start gap-3"
              >
                <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <b.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-display font-semibold">{b.title}</div>
                  <div className="text-xs text-muted-foreground">{b.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
