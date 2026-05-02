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
  packageTier: BudgetTier;
}

export type BudgetTier = "budget" | "standard" | "advanced" | "premium";

// Consolidated BreakdownItem for new logic
export type BreakdownItem = {
  kind: string;
  label: string;
  amount: number | string;
};

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

export const PACKAGE_MULTIPLIERS: Record<BudgetTier, number> = {
  budget: 1.0,
  standard: 1.25,
  advanced: 1.55,
  premium: 1.9,
};

export const TIER_NEXT: Record<BudgetTier, BudgetTier> = {
  budget: 'standard',
  standard: 'advanced',
  advanced: 'premium',
  premium: 'premium',
};

export type BreakdownItem = 
  | { kind: 'base'; label: string; amount: number; }
  | { kind: 'package'; tier: BudgetTier; multiplier: number; amount: string; }
  | { kind: 'addon'; label: string; amount: number; }
  | { kind: 'discount'; label: string; amount: string; };

export function calculate(input: CalculatorInput): CalculatorResult | null {
  if (!input.websiteType) return null;

  const typeDef = WEBSITE_TYPES[input.websiteType];
  const baseMid = Math.round((typeDef.range.min + typeDef.range.max) / 2);

  let subtotal = baseMid;
  const breakdown: BreakdownItem[] = [
    { kind: 'base', label: typeDef.label, amount: baseMid },
  ];

  // Sections
  const sec = SECTION_TIERS.find(s => s.id === input.sectionTier);
  if (sec?.price) {
    subtotal += sec.price;
    breakdown.push({ kind: 'addon', label: sec.label, amount: sec.price });
  }

  // Features
  const featureTotal = input.features.reduce((sum, fid) => {
    const f = FEATURES.find(f => f.id === fid);
    return f ? sum + f.price : sum;
  }, 0);
  subtotal += featureTotal;
  breakdown.push({ kind: 'addon', label: 'Funkcijas', amount: featureTotal });

  // Materials
  let materialTotal = 0;
  if (input.materials.includes('all')) materialTotal = 70;
  else input.materials.forEach(id => {
    const m = MATERIALS.find(m => m.id === id);
    if (m) materialTotal += m.price;
  });
  subtotal += materialTotal;
  breakdown.push({ kind: 'addon', label: 'Materiāli', amount: materialTotal });

  // Design
  const design = DESIGN_LEVELS.find(d => d.id === input.designLevel);
  const designTotal = design?.price || 0;
  subtotal += designTotal;
  breakdown.push({ kind: 'addon', label: 'Dizains', amount: designTotal });

  // Urgency
  const urg = URGENCY_LEVELS.find(u => u.id === input.urgency);
  const urgencyTotal = urg?.price || 0;
  subtotal += urgencyTotal;
  breakdown.push({ kind: 'addon', label: 'Steidzamība', amount: urgencyTotal });

  // Discounts
  const discountTotal = input.assets.reduce((sum, aid) => {
    const a = ASSETS.find(a => a.id === aid);
    return a ? sum + a.discount : sum;
  }, 0);
  subtotal -= discountTotal;
  breakdown.push({ kind: 'discount', label: 'Atlaides', amount: `-${discountTotal}€` });

  // Package multiplier
  const multiplier = PACKAGE_MULTIPLIERS[input.packageTier || 'budget'];
  const average = Math.round(subtotal * multiplier);
  breakdown.push({ kind: 'package', tier: input.packageTier || 'budget', multiplier, amount: `x${multiplier.toFixed(2)}` });

  // Recommended (next tier)
  const recTier = TIER_NEXT[input.packageTier || 'budget'];
  const recMultiplier = PACKAGE_MULTIPLIERS[recTier];
  const recommended = Math.round(subtotal * recMultiplier);
  const recDiff = recommended - average;

  // Range (current ±10%)
  const rangeMin = Math.round(average * 0.9);
  const rangeMax = Math.round(average * 1.1);

  // Market (±50-180%)
  const marketMin = Math.round(average * 1.4);
  const marketMax = Math.round(average * 2.8);

  const tierInfo = TIER_INFO[input.packageTier || 'budget'];

  // Admin (commented)
  // const cost = Math.round((average / PRICE_MULTIPLIER) * COST_RATIO);
  // const profit = average - cost;

  const maint = MAINTENANCE_LEVELS.find(m => m.id === input.maintenance);
  const monthlyMaintenance = maint?.monthly || 0;

  const suggestionsCheaper = [
    input.designLevel === 'custom' ? 'Premium dizains ietaupa ~130€' : '',
    input.urgency === 'asap' ? 'Normāls termiņš ietaupa ~100€' : '',
  ].filter(Boolean).slice(0,4);

  const suggestionsBetter = [
    !input.features.includes('seo') ? 'Pievienojiet SEO' : '',
    input.designLevel === 'simple' ? 'Modern dizains' : '',
  ].filter(Boolean).slice(0,4);

  return {
    base: typeDef.range,
    addons: subtotal - baseMid,
    discounts: discountTotal,
    range: { min: rangeMin, max: rangeMax },
    average,
    recommended,
    marketRange: { min: marketMin, max: marketMax },
    tier: input.packageTier || 'budget' as BudgetTier,
    tierLabel: tierInfo.label,
    tierDescription: tierInfo.description,
    cost: 0, // hidden
    profit: 0, // hidden
    internalPrice: 0, // hidden
    monthlyMaintenance,
    breakdown,
    suggestionsCheaper,
    suggestionsBetter,
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
  packageTier: "budget" as BudgetTier,
};
