// ============================================
// LOW-BUDGET CENU SISTĒMA — startup klientiem
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
    range: { min: 70, max: 120 },
    icon: "Rocket",
  },
  business: {
    label: "Biznesa mājaslapa",
    description: "Klasiska uzņēmuma vizītkarte ar pakalpojumiem un kontaktiem",
    range: { min: 100, max: 200 },
    icon: "Building2",
  },
  restaurant: {
    label: "Restorāns / kafejnīca",
    description: "Ēdienkarte, galda rezervācija, atrašanās vieta",
    range: { min: 130, max: 270 },
    icon: "UtensilsCrossed",
  },
  portfolio: {
    label: "Portfolio",
    description: "Radoša persona vai studija — darbu galerija un par mani",
    range: { min: 80, max: 170 },
    icon: "Palette",
  },
  ecommerce: {
    label: "E-veikals",
    description: "Pilna pirkšanas plūsma — produkti, grozs, maksājumi",
    range: { min: 230, max: 500 },
    icon: "ShoppingBag",
  },
  booking: {
    label: "Booking sistēma",
    description: "Pierakstu/rezervāciju sistēma ar kalendāru un apmaksu",
    range: { min: 200, max: 400 },
    icon: "CalendarCheck",
  },
  custom: {
    label: "Custom risinājums",
    description: "Web app, dashboard, SaaS, sarežģīta integrācija",
    range: { min: 330, max: 830 },
    icon: "Sparkles",
  },
};

// ===== SADAĻU SKAITS =====
export const SECTION_TIERS = [
  { id: "1-3", label: "1–3 sadaļas", price: 0 },
  { id: "4-6", label: "4–6 sadaļas", price: 30 },
  { id: "7-10", label: "7–10 sadaļas", price: 70 },
  { id: "10+", label: "10+ sadaļas", price: 100 },
] as const;
export type SectionTierId = (typeof SECTION_TIERS)[number]["id"];

// ===== FUNKCIJAS — low-budget cenas =====
export interface FeatureDef {
  id: string;
  label: string;
  price: number;
  category: "essential" | "marketing" | "ecommerce" | "advanced";
  description?: string;
}

export const FEATURES: FeatureDef[] = [
  // Essential
  { id: "contact_form", label: "Kontaktu forma", price: 7, category: "essential" },
  { id: "whatsapp", label: "WhatsApp / Telegram", price: 7, category: "essential" },
  { id: "google_maps", label: "Google Maps", price: 3, category: "essential" },
  { id: "gallery", label: "Galerija", price: 13, category: "essential" },
  { id: "reviews", label: "Atsauksmes", price: 13, category: "essential" },
  { id: "google_reviews", label: "Google Reviews integrācija", price: 13, category: "essential" },

  // Marketing
  { id: "animations", label: "Animācijas", price: 27, category: "marketing" },
  { id: "multilang", label: "Multi-language", price: 40, category: "marketing" },
  { id: "blog", label: "Blogs", price: 33, category: "marketing" },
  { id: "seo", label: "SEO optimizācija", price: 33, category: "marketing" },
  { id: "domain_hosting", label: "Domēns / hostings", price: 17, category: "marketing" },
  { id: "performance", label: "Performance optimizācija", price: 27, category: "marketing" },

  // E-commerce
  { id: "booking_form", label: "Rezervāciju forma", price: 40, category: "ecommerce" },
  { id: "online_orders", label: "Online pasūtījumi", price: 70, category: "ecommerce" },
  { id: "ecommerce", label: "E-commerce funkcionalitāte", price: 100, category: "ecommerce" },
  { id: "payments", label: "Maksājumi (Stripe/Paysera)", price: 70, category: "ecommerce" },

  // Advanced
  { id: "admin_panel", label: "Admin panelis", price: 80, category: "advanced" },
  { id: "logo_design", label: "Logo dizains", price: 50, category: "advanced" },
  { id: "texts", label: "Tekstu rakstīšana", price: 33, category: "advanced" },
  { id: "images", label: "Bildes / fotogrāfijas", price: 27, category: "advanced" },
];

// ===== MATERIĀLI (ja klientam nav) =====
export const MATERIALS = [
  { id: "logo", label: "Logo dizains", price: 33 },
  { id: "texts", label: "Tekstu rakstīšana", price: 27 },
  { id: "images", label: "Attēli / fotogrāfijas", price: 27 },
  { id: "all", label: "Viss no nulles (logo + teksti + bildes)", price: 70 },
] as const;
export type MaterialId = (typeof MATERIALS)[number]["id"];

// ===== DIZAINS =====
export const DESIGN_LEVELS = [
  { id: "simple", label: "Vienkāršs", description: "Template-based, ātri", price: 0 },
  { id: "modern", label: "Moderns", description: "Pielāgots dizains", price: 33 },
  { id: "premium", label: "Premium", description: "Unikāls, ar animācijām", price: 80 },
  { id: "custom", label: "Custom UI/UX", description: "No nulles, ar prototipēšanu", price: 130 },
] as const;
export type DesignLevelId = (typeof DESIGN_LEVELS)[number]["id"];

// ===== STEIDZAMĪBA =====
export const URGENCY_LEVELS = [
  { id: "normal", label: "Normāli (3–4 nedēļas)", price: 0 },
  { id: "fast", label: "Paātrināti (2 nedēļas)", price: 33 },
  { id: "urgent", label: "Steidzami (1 nedēļa)", price: 70 },
  { id: "asap", label: "ASAP (3–5 dienas)", price: 100 },
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
  base: PriceRange;
  addons: number;
  range: PriceRange;
  average: number;
  tier: BudgetTier;
  tierLabel: string;
  tierDescription: string;
  cost: number;
  profit: number;
  breakdown: { label: string; amount: number | string }[];
  suggestionsCheaper: string[];
  suggestionsBetter: string[];
}

export const TIER_INFO: Record<BudgetTier, { label: string; description: string; range: string }> = {
  budget: {
    label: "Budget",
    description: "Vienkāršs, bet profesionāls risinājums maziem biznesiem un startupiem.",
    range: "līdz 150€",
  },
  standard: {
    label: "Standard",
    description: "Lielākajai daļai biznesu — labs balanss starp cenu un funkcionalitāti.",
    range: "150–400€",
  },
  advanced: {
    label: "Advanced",
    description: "Bagātīgs ar funkcijām, custom dizains, augstas kvalitātes risinājums.",
    range: "400–800€",
  },
  premium: {
    label: "Premium",
    description: "Sarežģīti risinājumi, custom UI/UX, pilna funkcionalitāte.",
    range: "800€+",
  },
};

function tierFromAverage(avg: number): BudgetTier {
  if (avg < 150) return "budget";
  if (avg < 400) return "standard";
  if (avg < 800) return "advanced";
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
  if (input.designLevel === "custom") suggestionsCheaper.push("Izvēlieties Premium dizainu, nevis Custom — ietaupījums ~50€");
  else if (input.designLevel === "premium") suggestionsCheaper.push("Modernais dizains tā vietā ietaupīs ~47€");

  if (input.urgency === "asap") suggestionsCheaper.push("Ja varat pagaidīt 2 nedēļas — ietaupījums 67€");
  else if (input.urgency === "urgent") suggestionsCheaper.push("Normāls termiņš ietaupīs 70€");

  if (selectedFeatures.length > 5)
    suggestionsCheaper.push(`Jums ir ${selectedFeatures.length} funkcijas — apsveriet sākumā tikai būtiskākās`);

  if (input.materials.includes("all"))
    suggestionsCheaper.push("Ja sagādāsiet daļu materiālu paši (piem. fotos) — ietaupījums līdz 27€");

  if (input.sectionTier === "10+") suggestionsCheaper.push("Mazāk sadaļu (4–6) ietaupīs 70€");

  // Ieteikumi — kā uzlabot
  const suggestionsBetter: string[] = [];
  const has = (id: string) => input.features.includes(id);
  if (!has("seo"))
    suggestionsBetter.push("Pievienojiet SEO optimizāciju (+33€) — bez tā Google jūs neatradīs");
  if (!has("contact_form"))
    suggestionsBetter.push("Kontaktu forma (+7€) — vienkāršākais veids saņemt pieprasījumus");
  if (!has("whatsapp"))
    suggestionsBetter.push("WhatsApp poga (+7€) — klienti raksta tieši, nevis aiziet");
  if (input.designLevel === "simple")
    suggestionsBetter.push("Modernais dizains (+33€) — pirmais iespaids ir izšķirošs");
  if (input.websiteType === "ecommerce" && !has("payments"))
    suggestionsBetter.push("Maksājumi (+70€) — bez tā e-veikals nestrādās");
  if (input.websiteType === "booking" && !has("booking_form"))
    suggestionsBetter.push("Rezervāciju forma (+40€) — booking sistēmas pamats");
  if (!has("performance"))
    suggestionsBetter.push("Performance optimizācija (+27€) — ātrāka lapa = vairāk klientu");

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
