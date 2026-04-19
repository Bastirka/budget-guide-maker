import { TranslationKey } from "./translations";
import {
  WebsiteType,
  SectionTierId,
  DesignLevelId,
  UrgencyId,
  MaintenanceId,
  MaterialId,
  AssetId,
} from "@/lib/pricing";

// Maps for IDs from pricing.ts → translation keys

export const websiteTypeKey = (id: WebsiteType): { label: TranslationKey; description: TranslationKey } => ({
  label: `wt.${id}.label` as TranslationKey,
  description: `wt.${id}.description` as TranslationKey,
});

export const sectionTierKey = (id: SectionTierId): TranslationKey =>
  `sec.${id}` as TranslationKey;

export const featureKey = (id: string): TranslationKey =>
  `f.${id}` as TranslationKey;

export const materialKey = (id: MaterialId): TranslationKey =>
  `mat.${id}` as TranslationKey;

export const assetKey = (id: AssetId): TranslationKey =>
  `asset.${id}` as TranslationKey;

export const designLevelKey = (id: DesignLevelId): { label: TranslationKey; description: TranslationKey } => ({
  label: `design.${id}.label` as TranslationKey,
  description: `design.${id}.description` as TranslationKey,
});

export const urgencyKey = (id: UrgencyId): TranslationKey =>
  `urg.${id}` as TranslationKey;

export const maintenanceKey = (id: MaintenanceId): { label: TranslationKey; description: TranslationKey } => ({
  label: `maint.${id}.label` as TranslationKey,
  description: `maint.${id}.description` as TranslationKey,
});

export const tierKey = (
  id: "budget" | "standard" | "advanced" | "premium",
): { label: TranslationKey; description: TranslationKey } => ({
  label: `tier.${id}.label` as TranslationKey,
  description: `tier.${id}.description` as TranslationKey,
});
