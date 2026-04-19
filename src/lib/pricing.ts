// ============================================
// CENU SISTĒMA — ar market-based multiplier
// Iekšējās cenas reizina ar PRICE_MULTIPLIER, lai iegūtu klienta cenu.
// Klients NEKAD neredz iekšējo cenu vai multiplier.
// ============================================

// Vienīgais skaitlis, ko maina, lai pielāgotu visu klienta cenu līmeni.
export const PRICE_MULTIPLIER = 2;
// Recommended package = klienta cena × šis koeficients.
export const RECOMMENDED_MULTIPLIER = 1.35;
// Iekšējās izmaksas (no iekšējās cenas).
export const COST_RATIO = 0.3;

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

// ===== KAS JUMS JAU IR (atlaide, ja klients sniedz materiālus) =====
export const ASSETS = [
  { id: "design", label: "Ir dizains / mockup", discount: 30 },
  { id: "logo", label: "Ir logo", discount: 13 },
  { id: "texts", label: "Ir teksti gatavi", discount: 13 },
  { id: "images", label: "Ir bildes / foto", discount: 10 },
] as const;
export type AssetId = (typeof ASSETS)[number]["id"];

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

// ===== UZTURĒŠANA (mēneša maksa, neietilpst gala cenā) =====
export const MAINTENANCE_LEVELS = [
  { id: "none", label: "Nav nepieciešama", monthly: 0, description: "Es pats uzturēšu" },
  { id: "basic", label: "Pamata uzturēšana", monthly: 19, description: "Hostings, drošība, backups" },
  { id: "regular", label: "Regulāri atjauninājumi", monthly: 49, description: "+ saturs, izmaiņas, atskaites" },
] as const;
export type MaintenanceId = (typeof MAINTENANCE_LEVELS)[number]["id"];

// ============================================
// CALCULATOR INPUT + OUTPUT
// ============================================

export interface CalculatorInput {
  websiteType: WebsiteType | null;
  sectionTier: SectionTierId;
  features: string[];
  materials: MaterialId[];
  assets: AssetId[];
  designLevel: DesignLevelId;
  urgency: UrgencyId;
  maintenance: MaintenanceId;
}

export type BudgetTier = "budget" | "standard" | "advanced" | "premium";

export type BreakdownItem =
  | { kind: "base"; websiteType: WebsiteType; label: string; amount: string }
  | { kind: "section"; id: SectionTierId; label: string; amount: number }
  | { kind: "feature"; id: string; label: string; amount: number }
  | { kind: "material"; id: MaterialId; label: string; amount: number }
  | { kind: "design"; id: DesignLevelId; label: string; amount: number }
  | { kind: "urgency"; id: UrgencyId; label: string; amount: number }
  | { kind: "asset"; id: AssetId; label: string; amount: string };

export interface CalculatorResult {
  base: PriceRange;
  addons: number;
  discounts: number;
  /** Klienta cenu diapazons (jau ar multiplier) — to RĀDA UI */
  range: PriceRange;
  /** Klienta gala vidējā cena — galvenā parādītā cena */
  average: number;
  /** Recommended package — nedaudz dārgāks variants */
  recommended: number;
  /** Tipiska tirgus cena — plašāks "trust" diapazons */
  marketRange: PriceRange;
  tier: BudgetTier;
  tierLabel: string;
  tierDescription: string;
  /** Iekšējās izmaksas (EUR) — tikai admin */
  cost: number;
  /** Peļņa (EUR) — tikai admin */
  profit: number;
  /** Iekšējā cena pirms multiplier — tikai admin */
  internalPrice: number;
  monthlyMaintenance: number;
  breakdown: BreakdownItem[];
  suggestionsCheaper: string[];
  suggestionsBetter: string[];
}

export const TIER_INFO: Record<BudgetTier, { label: string; description: string; range: string }> = {
  budget: {
    label: "Budget",
    description: "Vienkāršs, bet profesionāls risinājums maziem biznesiem un startupiem.",
    range: "līdz 300€",
  },
  standard: {
    label: "Standard",
    description: "Lielākajai daļai biznesu — labs balanss starp cenu un funkcionalitāti.",
    range: "300–800€",
  },
  advanced: {
    label: "Advanced",
    description: "Bagātīgs ar funkcijām, custom dizains, augstas kvalitātes risinājums.",
    range: "800–1600€",
  },
  premium: {
    label: "Premium",
    description: "Sarežģīti risinājumi, custom UI/UX, pilna funkcionalitāte.",
    range: "1600€+",
  },
};

function tierFromAverage(avg: number): BudgetTier {
  if (avg < 300) return "budget";
  if (avg < 800) return "standard";
  if (avg < 1600) return "advanced";
  return "premium";
}

export function calculate(input: CalculatorInput): CalculatorResult | null {
  if (!input.websiteType) return null;

  const typeDef = WEBSITE_TYPES[input.websiteType];
  const base = { ...typeDef.range };

  let addons = 0;
  const breakdown: BreakdownItem[] = [
    { kind: "base", websiteType: input.websiteType, label: `${typeDef.label} (bāzes diapazons)`, amount: `${base.min}–${base.max}€` },
  ];

  // Sadaļas
  const sec = SECTION_TIERS.find((s) => s.id === input.sectionTier);
  if (sec && sec.price > 0) {
    addons += sec.price;
    breakdown.push({ kind: "section", id: sec.id, label: sec.label, amount: sec.price });
  }

  // Funkcijas
  const selectedFeatures = FEATURES.filter((f) => input.features.includes(f.id));
  for (const f of selectedFeatures) {
    addons += f.price;
    breakdown.push({ kind: "feature", id: f.id, label: f.label, amount: f.price });
  }

  // Materiāli — "all" pārraksta atsevišķos
  let mats = input.materials;
  if (mats.includes("all")) mats = ["all"];
  for (const id of mats) {
    const m = MATERIALS.find((x) => x.id === id);
    if (m && m.price > 0) {
      addons += m.price;
      breakdown.push({ kind: "material", id: m.id, label: `Materiāli: ${m.label}`, amount: m.price });
    }
  }

  // Dizains
  const design = DESIGN_LEVELS.find((d) => d.id === input.designLevel);
  if (design && design.price > 0) {
    addons += design.price;
    breakdown.push({ kind: "design", id: design.id, label: `Dizains: ${design.label}`, amount: design.price });
  }

  // Steidzamība
  const urg = URGENCY_LEVELS.find((u) => u.id === input.urgency);
  if (urg && urg.price > 0) {
    addons += urg.price;
    breakdown.push({ kind: "urgency", id: urg.id, label: urg.label, amount: urg.price });
  }

  // Atlaide par materiāliem, kas klientam jau ir
  let discounts = 0;
  for (const id of input.assets) {
    const a = ASSETS.find((x) => x.id === id);
    if (a) {
      discounts += a.discount;
      breakdown.push({ kind: "asset", id: a.id, label: `Ir ${a.label.toLowerCase().replace("ir ", "")}`, amount: `−${a.discount}€` });
    }
  }

  // === IEKŠĒJĀS cenas (raw) — netiek rādītas klientam ===
  const internalMin = Math.max(50, base.min + addons - discounts);
  const internalMax = Math.max(60, base.max + addons - discounts);
  const internalAvg = Math.round((internalMin + internalMax) / 2);
  const internalPrice = internalAvg;

  // === KLIENTA cenas (ar multiplier) — TĀS RĀDA UI ===
  const range: PriceRange = {
    min: Math.round(internalMin * PRICE_MULTIPLIER),
    max: Math.round(internalMax * PRICE_MULTIPLIER),
  };
  const average = Math.round(internalAvg * PRICE_MULTIPLIER);

  // Recommended package — nedaudz dārgāks "Labākā izvēle" variants
  const recommended = Math.round(average * RECOMMENDED_MULTIPLIER);

  // Tipiska tirgus cena — nedaudz plašāks "trust" diapazons (±15%)
  const marketRange: PriceRange = {
    min: Math.round(range.min * 0.92),
    max: Math.round(range.max * 1.18),
  };

  const tier = tierFromAverage(average);
  const tierInfo = TIER_INFO[tier];

  // Iekšējie aprēķini (no IEKŠĒJĀS cenas, lai peļņa ir reālistiska)
  const cost = Math.round(internalPrice * COST_RATIO);
  // Peļņa = klienta cena - mūsu izmaksas
  const profit = average - cost;

  // Uzturēšana (atsevišķa mēneša maksa)
  const maint = MAINTENANCE_LEVELS.find((m) => m.id === input.maintenance);
  const monthlyMaintenance = maint?.monthly ?? 0;

  // Ieteikumi — kā samazināt (cenas klientam = ×2)
  const suggestionsCheaper: string[] = [];
  if (input.designLevel === "custom") suggestionsCheaper.push("Izvēlieties Premium dizainu, nevis Custom — ietaupījums ~100€");
  else if (input.designLevel === "premium") suggestionsCheaper.push("Modernais dizains tā vietā ietaupīs ~94€");

  if (input.urgency === "asap") suggestionsCheaper.push("Ja varat pagaidīt 2 nedēļas — ietaupījums ~134€");
  else if (input.urgency === "urgent") suggestionsCheaper.push("Normāls termiņš ietaupīs ~140€");

  if (selectedFeatures.length > 5)
    suggestionsCheaper.push(`Jums ir ${selectedFeatures.length} funkcijas — apsveriet sākumā tikai būtiskākās`);

  if (input.materials.includes("all"))
    suggestionsCheaper.push("Ja sagādāsiet daļu materiālu paši (piem. fotos) — ietaupījums līdz ~54€");

  if (input.sectionTier === "10+") suggestionsCheaper.push("Mazāk sadaļu (4–6) ietaupīs ~140€");

  // Ieteikumi — kā uzlabot
  const suggestionsBetter: string[] = [];
  const has = (id: string) => input.features.includes(id);
  if (!has("seo"))
    suggestionsBetter.push("Pievienojiet SEO optimizāciju — bez tā Google jūs neatradīs");
  if (!has("contact_form"))
    suggestionsBetter.push("Kontaktu forma — vienkāršākais veids saņemt pieprasījumus");
  if (!has("whatsapp"))
    suggestionsBetter.push("WhatsApp poga — klienti raksta tieši, nevis aiziet");
  if (input.designLevel === "simple")
    suggestionsBetter.push("Modernais dizains — pirmais iespaids ir izšķirošs");
  if (input.websiteType === "ecommerce" && !has("payments"))
    suggestionsBetter.push("Maksājumu integrācija — bez tā e-veikals nestrādās");
  if (input.websiteType === "booking" && !has("booking_form"))
    suggestionsBetter.push("Rezervāciju forma — booking sistēmas pamats");
  if (!has("performance"))
    suggestionsBetter.push("Performance optimizācija — ātrāka lapa = vairāk klientu");

  return {
    base,
    addons,
    discounts,
    range,
    average,
    recommended,
    marketRange,
    tier,
    tierLabel: tierInfo.label,
    tierDescription: tierInfo.description,
    cost,
    profit,
    internalPrice,
    monthlyMaintenance,
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
  assets: [],
  designLevel: "simple",
  urgency: "normal",
  maintenance: "none",
};
