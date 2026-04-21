import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const META = {
  lv: {
    title: "PriceLab — Mājaslapas cenu kalkulators | Latvija",
    description:
      "Aprēķiniet jūsu mājaslapas cenu reāllaikā. Reāli tarifi Latvijas tirgum: landing, biznesa, e-veikals, booking. Cenu diapazons un budžeta līmenis.",
  },
  en: {
    title: "PriceLab — Website Price Calculator | Real Market Rates",
    description:
      "Estimate your website price in real time. Transparent rates for landing pages, business sites, e-commerce and booking systems. Get an instant quote.",
  },
} as const;

function setMeta(selector: string, attr: "content", value: string) {
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute(attr, value);
}

export function useSEO() {
  const { lang } = useLanguage();
  useEffect(() => {
    const m = META[lang];
    document.title = m.title;
    setMeta('meta[name="description"]', "content", m.description);
    setMeta('meta[property="og:title"]', "content", m.title);
    setMeta('meta[name="twitter:title"]', "content", m.title);
    setMeta('meta[property="og:description"]', "content", m.description);
    setMeta('meta[name="twitter:description"]', "content", m.description);

    // JSON-LD
    const id = "ld-json-pricelab";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "PriceLab",
      description: m.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      inLanguage: lang,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
  }, [lang]);
}
