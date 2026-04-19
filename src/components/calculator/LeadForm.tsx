import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { MessageCircle, Mail, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalculatorInput, CalculatorResult,
  WEBSITE_TYPES, FEATURES, DESIGN_LEVELS, URGENCY_LEVELS, MAINTENANCE_LEVELS, ASSETS,
} from "@/lib/pricing";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  websiteTypeKey, sectionTierKey, featureKey, assetKey,
  designLevelKey, urgencyKey, maintenanceKey, tierKey,
} from "@/i18n/keys";
import { TranslationKey } from "@/i18n/translations";

interface LeadFormProps {
  input: CalculatorInput;
  result: CalculatorResult | null;
}

// Konfigurācija — viegli mainīt vienā vietā
const CONTACT_CONFIG = {
  whatsappNumber: "37100000000",
  email: "info@pricelab.lv",
};

const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  contact: z.string().trim().min(5).max(120),
  company: z.string().trim().max(120).optional(),
  comments: z.string().trim().max(800).optional(),
});

type LeadData = z.infer<typeof leadSchema>;

function buildSummaryText(
  data: LeadData,
  input: CalculatorInput,
  result: CalculatorResult,
  t: (k: TranslationKey) => string,
): string {
  const lines: string[] = [];
  lines.push(t("summary.heading"));
  lines.push("");
  lines.push(`${t("summary.name")}: ${data.name}`);
  lines.push(`${t("summary.contact")}: ${data.contact}`);
  if (data.company) lines.push(`${t("summary.company")}: ${data.company}`);
  lines.push("");
  lines.push(t("summary.project"));
  if (input.websiteType) lines.push(`• ${t("summary.type")}: ${t(websiteTypeKey(input.websiteType).label)}`);
  lines.push(`• ${t("summary.sections")}: ${t(sectionTierKey(input.sectionTier))}`);
  lines.push(`• ${t("summary.design")}: ${t(designLevelKey(input.designLevel).label)}`);
  lines.push(`• ${t("summary.deadline")}: ${t(urgencyKey(input.urgency))}`);

  if (input.features.length) {
    lines.push("");
    lines.push(t("summary.features"));
    input.features.forEach((fid) => {
      const f = FEATURES.find((x) => x.id === fid);
      if (f) lines.push(`  • ${t(featureKey(f.id))}`);
    });
  }

  if (input.assets.length) {
    lines.push("");
    lines.push(t("summary.assets"));
    input.assets.forEach((aid) => {
      const a = ASSETS.find((x) => x.id === aid);
      if (a) lines.push(`  • ${t(assetKey(a.id))}`);
    });
  }

  const m = MAINTENANCE_LEVELS.find((x) => x.id === input.maintenance);
  if (m && m.monthly > 0) {
    lines.push("");
    lines.push(`${t("summary.maintenance")} ${t(maintenanceKey(m.id).label)} (${m.monthly}€${t("common.perMonth")})`);
  }

  lines.push("");
  lines.push(t("summary.price"));
  lines.push(`${t("summary.range")}: ${result.range.min}€ – ${result.range.max}€`);
  lines.push(`${t("summary.average")}: ~${result.average}€`);
  lines.push(`${t("summary.tier")}: ${t(tierKey(result.tier).label)}`);

  if (data.comments) {
    lines.push("");
    lines.push(t("summary.comments"));
    lines.push(data.comments);
  }
  return lines.join("\n");
}

export const LeadForm = ({ input, result }: LeadFormProps) => {
  const { t } = useLanguage();
  const [data, setData] = useState<LeadData>({ name: "", contact: "", company: "", comments: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [submitted, setSubmitted] = useState<null | { whatsapp: string; mailto: string }>(null);

  const set = <K extends keyof LeadData>(key: K, value: LeadData[K]) => {
    setData((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;

    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof LeadData, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof LeadData;
        if (!fieldErrors[k]) {
          if (k === "name") fieldErrors[k] = t("lead.error.name");
          else if (k === "contact") fieldErrors[k] = t("lead.error.contact");
          else fieldErrors[k] = t("lead.error.max");
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const summary = buildSummaryText(parsed.data, input, result, t);
    const encoded = encodeURIComponent(summary);

    const payload = { lead: parsed.data, input, result, timestamp: new Date().toISOString() };
    // eslint-disable-next-line no-console
    console.log("[LEAD SUBMITTED]", payload);

    const whatsapp = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encoded}`;
    const mailto = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(t("summary.subject") + parsed.data.name)}&body=${encoded}`;
    setSubmitted({ whatsapp, mailto });
  };

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">{t("lead.empty")}</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-card rounded-2xl p-6 sm:p-8 text-center"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-display text-xl font-bold mb-2">{t("lead.success.title")}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          {t("lead.success.text")}
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <a href={submitted.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-success/90 hover:bg-success text-background font-semibold">
              <MessageCircle className="w-4 h-4 mr-2" /> {t("lead.success.whatsapp")}
            </Button>
          </a>
          <a href={submitted.mailto}>
            <Button variant="outline" className="w-full font-semibold">
              <Mail className="w-4 h-4 mr-2" /> {t("lead.success.email")}
            </Button>
          </a>
        </div>
        <button
          onClick={() => setSubmitted(null)}
          className="text-xs text-muted-foreground hover:text-foreground mt-6 underline-offset-4 hover:underline"
        >
          {t("lead.success.edit")}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glow-card rounded-2xl p-5 sm:p-7"
    >
      <div className="mb-5">
        <h3 className="font-display text-xl font-bold mb-1">{t("lead.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("lead.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("lead.field.name")} <span className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={t("lead.placeholder.name")}
              maxLength={80}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="contact" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("lead.field.contact")} <span className="text-primary">*</span>
            </Label>
            <Input
              id="contact"
              value={data.contact}
              onChange={(e) => set("contact", e.target.value)}
              placeholder={t("lead.placeholder.contact")}
              maxLength={120}
              aria-invalid={!!errors.contact}
            />
            {errors.contact && <p className="text-xs text-destructive mt-1">{errors.contact}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="company" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {t("lead.field.company")} <span className="text-muted-foreground/60">{t("common.optional")}</span>
          </Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder={t("lead.placeholder.company")}
            maxLength={120}
          />
        </div>

        <div>
          <Label htmlFor="comments" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {t("lead.field.comments")} <span className="text-muted-foreground/60">{t("common.optional")}</span>
          </Label>
          <Textarea
            id="comments"
            value={data.comments}
            onChange={(e) => set("comments", e.target.value)}
            placeholder={t("lead.placeholder.comments")}
            maxLength={800}
            rows={3}
          />
        </div>
      </div>

      <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{t("lead.estimate")}</span>
        <span className="font-display font-bold text-primary tabular-nums">
          {result.range.min}€ – {result.range.max}€
        </span>
      </div>

      <Button
        type="submit"
        className="w-full mt-5 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-glow"
      >
        <Send className="w-4 h-4 mr-2" /> {t("lead.submit")}
      </Button>

      <p className="text-[11px] text-muted-foreground text-center mt-3">
        {t("lead.disclaimer")}
      </p>
    </motion.form>
  );
};
