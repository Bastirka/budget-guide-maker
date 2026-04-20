import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalculatorInput, CalculatorResult } from "@/lib/pricing";
import { useLanguage } from "@/i18n/LanguageContext";

interface QuoteRequestFormProps {
  input: CalculatorInput;
  result: CalculatorResult | null;
}

const QUOTE_ENDPOINT = "https://neflixybot.sedokafe.workers.dev/quote-request";

const formSchema = z.object({
  name: z.string().trim().min(2).max(120),
  businessName: z.string().trim().max(160).optional(),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), { message: "invalid_email" }),
  phone: z.string().trim().min(3).max(120),
  notes: z.string().trim().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;
type Status = "idle" | "loading" | "success" | "error";

export const QuoteRequestForm = ({ input, result }: QuoteRequestFormProps) => {
  const { t } = useLanguage();
  const [data, setData] = useState<FormData>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((p) => ({ ...p, [key]: value }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || status === "loading") return;

    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormData;
        if (fieldErrors[k]) return;
        if (k === "name") fieldErrors[k] = t("quote.error.name");
        else if (k === "phone") fieldErrors[k] = t("quote.error.phone");
        else if (k === "email") fieldErrors[k] = t("quote.error.email");
      });
      setErrors(fieldErrors);
      return;
    }

    const payload = {
      name: parsed.data.name,
      businessName: parsed.data.businessName ?? "",
      email: parsed.data.email ?? "",
      phone: parsed.data.phone,
      notes: parsed.data.notes ?? "",
      projectType: input.websiteType ?? "",
      designLevel: input.designLevel,
      pages: input.sectionTier,
      languages: "",
      features: input.features,
      extras: [...input.materials, ...input.assets],
      timeline: input.urgency,
      estimatedPrice: result.average,
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      setStatus("success");
      setData({ name: "", businessName: "", email: "", phone: "", notes: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : t("quote.error"));
    }
  };

  if (!result) return null;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glow-card rounded-2xl p-5 sm:p-7"
    >
      <div className="mb-5">
        <h3 className="font-display text-xl font-bold mb-1">{t("quote.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("quote.subtitle")}</p>
      </div>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="q-name" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("quote.field.name")} <span className="text-primary">*</span>
            </Label>
            <Input
              id="q-name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={t("quote.placeholder.name")}
              maxLength={120}
              aria-invalid={!!errors.name}
              disabled={status === "loading"}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="q-business" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("quote.field.business")}
            </Label>
            <Input
              id="q-business"
              value={data.businessName}
              onChange={(e) => set("businessName", e.target.value)}
              placeholder={t("quote.placeholder.business")}
              maxLength={160}
              disabled={status === "loading"}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="q-email" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("quote.field.email")}
            </Label>
            <Input
              id="q-email"
              type="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder={t("quote.placeholder.email")}
              maxLength={200}
              aria-invalid={!!errors.email}
              disabled={status === "loading"}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="q-phone" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
              {t("quote.field.phone")} <span className="text-primary">*</span>
            </Label>
            <Input
              id="q-phone"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder={t("quote.placeholder.phone")}
              maxLength={120}
              aria-invalid={!!errors.phone}
              disabled={status === "loading"}
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="q-notes" className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
            {t("quote.field.notes")}
          </Label>
          <Textarea
            id="q-notes"
            value={data.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder={t("quote.placeholder.notes")}
            maxLength={2000}
            rows={3}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("lead.estimate")}</span>
          <span className="font-display font-bold text-primary tabular-nums">
            {result.range.min}€ – {result.range.max}€
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1.5 italic">{t("quote.priceNote")}</p>
      </div>

      <Button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full mt-5 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-glow disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("quote.sending")}
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> {t("quote.submit")}
          </>
        )}
      </Button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/30 text-sm text-success">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{t("quote.success")}</span>
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg || t("quote.error")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};
