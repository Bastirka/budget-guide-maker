// Recommended Packages Definition
import { CalculatorInput } from './pricing';
import { WEBSITE_TYPES } from './pricing';

export type RecommendationOption = 'basic' | 'medium' | 'premium';

export const RECOMMENDED_PACKAGES: Record<RecommendationOption, {
  name: string;
  nameLV: string;
  desc: string;
  descLV: string;
  included: string[];
  includedLV: string[];
  bestFor: string;
  bestForLV: string;
  uplift: number;
}> = {
  basic: {
    name: 'Recommended Basic',
    nameLV: 'Rekomendētais Basic',
    desc: 'Simple projects / landing pages / small business.',
    descLV: 'Vienkārši projekti / landing lapas / maziem biznesiem.',
    included: ['Simple structure', 'Responsive design', 'Contact info', 'Basic SEO', 'Social buttons'],
    includedLV: ['Vienkārša struktūra', 'Responsīvs dizains', 'Kontakti', 'Pamata SEO', 'Sociālās pogas'],
    bestFor: 'Fast start',
    bestForLV: 'Ātrai palaišanai',
    uplift: 1.0,
  },
  medium: {
    name: 'Recommended Medium (Best choice)',
    nameLV: 'Rekomendētais Medium (Populārākā)',
    desc: 'Local businesses, cafes, restaurants, services.',
    descLV: 'Vietējiem biznesiem, kafejnīcām, restorāniem, pakalpojumiem.',
    included: ['Everything from Basic', 'Multiple sections', 'Menu/services', 'Google Maps', 'Reviews', 'Contact form'],
    includedLV: ['Viss no Basic', 'Vairākas sadaļas', 'Ēdienkarte/pakalpojumi', 'Google Maps', 'Atsauksmes', 'Kontaktforma'],
    bestFor: 'Best value',
    bestForLV: 'Labākā vērtība',
    uplift: 1.35,
  },
  premium: {
    name: 'Recommended Premium',
    nameLV: 'Rekomendētais Premium',
    desc: 'Visual quality, features, conversion.',
    descLV: 'Augsta vizuālā kvalitāte, funkcijas, konversija.',
    included: ['Everything from Medium', 'Premium design blocks', 'Animations', 'Advanced SEO', 'Performance', 'Priority'],
    includedLV: ['Viss no Medium', 'Premium bloki', 'Animācijas', 'Uzlabots SEO', 'Performance', 'Prioritāte'],
    bestFor: 'Long-term ROI',
    bestForLV: 'Ilgtermiņa peļņa',
    uplift: 1.8,
  },
};

export function computeRecommendedPrices(input: CalculatorInput): Record<RecommendationOption, number> {
  let base = 500; // default
  if (input.websiteType) {
    const type = WEBSITE_TYPES[input.websiteType as any];
    base = Math.round((type.range.min + type.range.max) / 2 * 2); // client price
  }
  return {
    basic: Math.round(base * RECOMMENDED_PACKAGES.basic.uplift),
    medium: Math.round(base * RECOMMENDED_PACKAGES.medium.uplift),
    premium: Math.round(base * RECOMMENDED_PACKAGES.premium.uplift),
  };
}

