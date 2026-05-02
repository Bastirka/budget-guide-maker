export const PACKAGE_DEFINITIONS: Record<BudgetTier, {
  id: BudgetTier;
  label: string;
  description: string;
  includedCategories: string[];
  includedItems: string[];
  includedCategoriesLV: string[];
  includedItemsLV: string[];
}> = {
  basic: {
    id: 'budget',
    label: 'Basic',
    description: 'Vienkāršs, bet profesionāls risinājums maziem biznesiem.',
    includedCategories: ['Essential'],
    includedItems: ['contact_form', 'whatsapp'],
    includedCategoriesLV: ['Pamata'],
    includedItemsLV: ['Kontaktu forma', 'WhatsApp'],
  },
  standard: {
    id: 'standard',
    label: 'Standard',
    description: 'Lielākajai daļai biznesu — labs balanss.',
    includedCategories: ['Essential', 'Marketing'],
    includedItems: ['contact_form', 'whatsapp', 'seo'],
    includedCategoriesLV: ['Pamata', 'Mārketings'],
    includedItemsLV: ['Kontaktu forma', 'WhatsApp', 'SEO'],
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced',
    description: 'Bagātīgs ar funkcijām, custom dizains.',
    includedCategories: ['Essential', 'Marketing', 'Advanced'],
    includedItems: ['contact_form', 'whatsapp', 'seo', 'animations', 'performance'],
    includedCategoriesLV: ['Pamata', 'Mārketings', 'Papildus'],
    includedItemsLV: ['Kontaktu forma', 'WhatsApp', 'SEO', 'Animācijas', 'Performance'],
  },
  premium: {
    id: 'premium',
    label: 'Premium',
    description: 'Sarežģīti risinājumi, custom UI/UX.',
    includedCategories: ['All'],
    includedItems: ['contact_form', 'whatsapp', 'seo', 'animations', 'performance', 'admin_panel', 'blog'],
    includedCategoriesLV: ['Pilns komplekts'],
    includedItemsLV: ['Viss iekļauts'],
  },
};

export const getPackageReason = (websiteType: WebsiteType | null, input: CalculatorInput): string[] => {
  const reasons = [];
  if (input.websiteType === 'ecommerce') reasons.push('E-veikals prasa papildu funkcijas');
  if (input.websiteType === 'custom') reasons.push('Custom prasa premium atbalstu');
  return reasons;
};

