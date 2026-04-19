// ============================================
// REĀLISTISKA CENU SISTĒMA — LV web agency
// Visas cenas EUR. Bāzes cenas ir RANGE (min/max).
// ============================================

export type WebsiteType =
  | "landing"
  | "business"
  | "restaurant"
  | "portfolio"
  | "ecommerce"
  | "booking"
  | "custom";

export interface PriceRange {
  min: number;
  max: number;
}

export const WEBSITE_TYPES: Record<
  WebsiteType,
  { label: string; description: string; range: PriceRange; icon: string }
> = {
  landing: {
    label: "Landing Page",
    description: "Viena lapa ar skaidru CTA — produkts, pasākums, kampaņa",
    range: { min: 200, max: 350 },
    icon: "Rocket",
  },
  business: {
    label: "Biznesa mājaslapa",
    description: "Klasiska uzņēmuma vizītkarte ar pakalpojumiem un kontaktiem",
    range: { min: 300, max: 600 },
    icon: "Building2",
  },
  restaurant: {
    label: "Restorāns / kafejnīca",
    description: "Ēdienkarte, galda rezervācija, atrašanās vieta",
    range: { min: 400, max: 800 },
    icon: "UtensilsCrossed",
  },
  portfolio: {
    label: "Portfolio",
    description: "Radoša persona vai studija — darbu galerija un par mani",
    range: { min: 250, max: 500 },
    icon: "Palette",
  },
  ecommerce: {
    label: "E-veikals",
    description: "Pilna pirkšanas plūsma — produkti, grozs, maksājumi",
    range: { min: 700, max: 1500 },
    icon: "ShoppingBag",
  },
  booking: {
    label: "Booking sistēma",
    description: "Pierakstu/rezervāciju sistēma ar kalendāru un apmaksu",
    range: { min: 600, max: 1200 },
    icon: "CalendarCheck",
  },
  custom: {
    label: "Custom risinājums",
    description: "Web app, dashboard, SaaS, sarežģīta integrācija",
    range: { min: 1000, max: 2500 },
    icon: "Sparkles",
  },
};

// ===== SADAĻU SKAITS =====
export const SECTION_TIERS = [
  { id: "1-3", label: "1–3 sadaļas", price: 0 },
  { id: "4-6", label: "4–6 sadaļas", price: 100 },
  { id: "7-10", label: "7–10 sadaļas", price: 200 },
  { id: "10+", label: "10+ sadaļas", price: 300 },
] as const;
export type SectionTierId = (typeof SECTION_TIERS)[number]["id"];

// ===== FUNKCIJAS — reālas cenas LV mazai web studio =====
export interface FeatureDef {
  id: string;
  label: string;
  price: number;
  category: "essential" | "marketing" | "ecommerce" | "advanced";
  description?: string;
}

export const FEATURES: FeatureDef[] = [
  // Essential
  { id: "contact_form", label: "Kontaktforma ar e-pastu", price: 40, category: "essential" },
  { id: "google_maps", label: "Google Maps integrācija", price: 30, category: "essential" },
  { id: "social_links", label: "Sociālo tīklu integrācija", price: 20, category: "essential" },
  { id: "cookie_banner", label: "Sīkdatņu paziņojums (GDPR)", price: 40, category: "essential" },
  { id: "favicon_og", label: "Favicon + OG attēli", price: 30, category: "essential" },

  // Marketing
  { id: "seo_basic", label: "Pamata SEO (meta, sitemap, robots)", price: 80, category: "marketing" },
  { id: "seo_advanced", label: "Advanced SEO + struktūrdati", price: 180, category: "marketing" },
  { id: "analytics", label: "Google Analytics / Plausible", price: 40, category: "marketing" },
  { id: "blog", label: "Blogs / jaunumu sadaļa", price: 150, category: "marketing" },
  { id: "newsletter", label: "Newsletter abonēšana (Mailchimp/Brevo)", price: 80, category: "marketing" },
  { id: "multilang", label: "Daudzvalodu (2 valodas)", price: 200, category: "marketing" },

  // E-commerce
  { id: "stripe", label: "Stripe maksājumi", price: 150, category: "ecommerce" },
  { id: "product_catalog", label: "Produktu katalogs (līdz 30)", price: 200, category: "ecommerce" },
  { id: "cart_checkout", label: "Grozs + checkout plūsma", price: 250, category: "ecommerce" },
  { id: "invoice", label: "Automātiski rēķini PDF", price: 120, category: "ecommerce" },

  // Advanced
  { id: "auth", label: "Lietotāju reģistrācija/login", price: 200, category: "advanced" },
  { id: "admin_panel", label: "Admin panelis saturam (CMS)", price: 300, category: "advanced" },
  { id: "booking_calendar", label: "Rezervāciju kalendārs", price: 250, category: "advanced" },
  { id: "live_chat", label: "Live chat (Tawk/Crisp)", price: 50, category: "advanced" },
  { id: "ai_chatbot", label: "AI chatbot integrācija", price: 350, category: "advanced" },
];

// ===== MATERIĀLI =====
export const MATERIALS = [
  { id: "logo", label: "Logo dizains", price: 100 },
  { id: "texts", label: "Tekstu rakstīšana", price: 80 },
  { id: "images", label: "Attēli / fotogrāfijas", price: 80 },
  { id: "all", label: "Viss no nulles (logo + teksti + bildes)", price: 200 },
] as const;
export type MaterialId = (typeof MATERIALS)[number]["id"];

// ===== DIZAINS =====
export const DESIGN_LEVELS = [
  { id: "simple", label: "Vienkāršs", description: "Template-based, ātri", price: 0 },
  { id: "modern", label: "Moderns", description: "Pielāgots dizains", price: 100 },
  { id: "premium", label: "Premium", description: "Unikāls, ar animācijām", price: 250 },
  { id: "custom", label: "Custom UI/UX", description: "No nulles, ar prototipēšanu", price: 400 },
] as const;
export type DesignLevelId = (typeof DESIGN_LEVELS)[number]["id"];

// ===== STEIDZAMĪBA =====
export const URGENCY_LEVELS = [
  { id: "normal", label: "Normāli (3–4 nedēļas)", price: 0 },
  { id: "fast", label: "Paātrināti (2 nedēļas)", price: 100 },
  { id: "urgent", label: "Steidzami (1 nedēļa)", price: 200 },
  { id: "asap", label: "ASAP (3–5 dienas)", price: 300 },
] as const;
export type UrgencyId = (typeof URGENCY_LEVELS)[number]["id"];

// ============================================
// CALCULATOR INPUT + OUTPUT
// ============================================

export interface CalculatorInput {
  websiteType: WebsiteType | null;
  sectionTier: SectionTierId;
  features: string[];
  materials: MaterialId[];
  designLevel: DesignLevelId;
  urgency: UrgencyId;
}

export type BudgetTier = "budget" | "standard" | "advanced" | "premium";

export interface CalculatorResult {
  base: PriceRange;        // bāzes diapazons no website tipa
  addons: number;          // visi pieskaitījumi (fiksēti)
  range: PriceRange;       // gala diapazons (base + addons)
  average: number;         // vidējā cena
  tier: BudgetTier;
  tierLabel: string;
  tierDescription: string;
  cost: number;            // mūsu izmaksas (30%)
  profit: number;          // mūsu peļņa (70%)
  breakdown: { label: string; amount: number | string }[];
  suggestionsCheaper: string[];
  suggestionsBetter: string[];
}

export const TIER_INFO: Record<BudgetTier, { label: string; description: string; range: string }> = {
  budget: {
    label: "Budget",
    description: "Vienkāršs, bet profesionāls risinājums maziem biznesiem un startupiem.",
    range: "līdz 400€",
  },
  standard: {
    label: "Standard",
    description: "Lielākajai daļai biznesu — labs balanss starp cenu un funkcionalitāti.",
    range: "400–800€",
  },
  advanced: {
    label: "Advanced",
    description: "Bagātīgs ar funkcijām, custom dizains, augstas kvalitātes risinājums.",
    range: "800–1500€",
  },
  premium: {
    label: "Premium",
    description: "Sarežģīti risinājumi, custom UI/UX, pilna funkcionalitāte.",
    range: "1500€+",
  },
};

function tierFromAverage(avg: number): BudgetTier {
  if (avg < 400) return "budget";
  if (avg < 800) return "standard";
  if (avg < 1500) return "advanced";
  return "premium";
}

export function calculate(input: CalculatorInput): CalculatorResult | null {
  if (!input.websiteType) return null;

  const typeDef = WEBSITE_TYPES[input.websiteType];
  const base = { ...typeDef.range };

  let addons = 0;
  const breakdown: CalculatorResult["breakdown"] = [
    { label: `${typeDef.label} (bāzes diapazons)`, amount: `${base.min}–${base.max}€` },
  ];

  // Sadaļas
  const sec = SECTION_TIERS.find((s) => s.id === input.sectionTier);
  if (sec && sec.price > 0) {
    addons += sec.price;
    breakdown.push({ label: sec.label, amount: sec.price });
  }

  // Funkcijas
  const selectedFeatures = FEATURES.filter((f) => input.features.includes(f.id));
  for (const f of selectedFeatures) {
    addons += f.price;
    breakdown.push({ label: f.label, amount: f.price });
  }

  // Materiāli — "all" pārraksta atsevišķos
  let mats = input.materials;
  if (mats.includes("all")) mats = ["all"];
  for (const id of mats) {
    const m = MATERIALS.find((x) => x.id === id);
    if (m && m.price > 0) {
      addons += m.price;
      breakdown.push({ label: `Materiāli: ${m.label}`, amount: m.price });
    }
  }

  // Dizains
  const design = DESIGN_LEVELS.find((d) => d.id === input.designLevel);
  if (design && design.price > 0) {
    addons += design.price;
    breakdown.push({ label: `Dizains: ${design.label}`, amount: design.price });
  }

  // Steidzamība
  const urg = URGENCY_LEVELS.find((u) => u.id === input.urgency);
  if (urg && urg.price > 0) {
    addons += urg.price;
    breakdown.push({ label: urg.label, amount: urg.price });
  }

  const range: PriceRange = {
    min: base.min + addons,
    max: base.max + addons,
  };
  const average = Math.round((range.min + range.max) / 2);
  const tier = tierFromAverage(average);
  const tierInfo = TIER_INFO[tier];

  // Iekšējie aprēķini
  const cost = Math.round(average * 0.3);
  const profit = average - cost;

  // Ieteikumi — kā samazināt
  const suggestionsCheaper: string[] = [];
  if (input.designLevel === "custom") suggestionsCheaper.push("Izvēlieties Premium dizainu, nevis Custom — ietaupījums ~150€");
  else if (input.designLevel === "premium") suggestionsCheaper.push("Modernais dizains tā vietā ietaupīs ~150€");

  if (input.urgency === "asap") suggestionsCheaper.push("Ja varat pagaidīt 2 nedēļas — ietaupījums 200€");
  else if (input.urgency === "urgent") suggestionsCheaper.push("Normāls termiņš ietaupīs 200€");

  if (selectedFeatures.length > 5)
    suggestionsCheaper.push(`Jums ir ${selectedFeatures.length} funkcijas — apsveriet sākumā tikai būtiskākās`);

  if (input.materials.includes("all"))
    suggestionsCheaper.push("Ja sagādāsiet daļu materiālu paši (piem. fotos) — ietaupījums līdz 80€");

  if (input.sectionTier === "10+") suggestionsCheaper.push("Mazāk sadaļu (4–6) ietaupīs 200€");

  // Ieteikumi — kā uzlabot
  const suggestionsBetter: string[] = [];
  const has = (id: string) => input.features.includes(id);
  if (!has("seo_basic") && !has("seo_advanced"))
    suggestionsBetter.push("Pievienojiet pamata SEO (+80€) — bez tā Google jūs neatradīs");
  if (!has("analytics"))
    suggestionsBetter.push("Analytics (+40€) — bez datiem nezināsiet, kas strādā");
  if (input.designLevel === "simple")
    suggestionsBetter.push("Modernais dizains (+100€) — pirmais iespaids ir izšķirošs");
  if (!has("contact_form"))
    suggestionsBetter.push("Kontaktforma (+40€) — vienkāršākais veids saņemt pieprasījumus");
  if (input.websiteType === "ecommerce" && !has("stripe"))
    suggestionsBetter.push("Stripe maksājumi (+150€) — bez tā e-veikals nestrādās");
  if (input.websiteType === "booking" && !has("booking_calendar"))
    suggestionsBetter.push("Rezervāciju kalendārs (+250€) — booking sistēmas pamats");

  return {
    base,
    addons,
    range,
    average,
    tier,
    tierLabel: tierInfo.label,
    tierDescription: tierInfo.description,
    cost,
    profit,
    breakdown,
    suggestionsCheaper: suggestionsCheaper.slice(0, 4),
    suggestionsBetter: suggestionsBetter.slice(0, 4),
  };
}

export const INITIAL_INPUT: CalculatorInput = {
  websiteType: null,
  sectionTier: "1-3",
  features: [],
  materials: [],
  designLevel: "simple",
  urgency: "normal",
};
