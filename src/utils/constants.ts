import { DiscountTier, RegionCode, TaxRate } from '@/types';

/**
 * Discount tiers - higher thresholds should be listed first for proper matching
 */
export const DISCOUNT_TIERS: DiscountTier[] = [
  { threshold: 50000, rate: 0.15 }, // 15% off for orders $50,000+
  { threshold: 10000, rate: 0.10 }, // 10% off for orders $10,000+
  { threshold: 7000, rate: 0.07 },  // 7% off for orders $7,000+
  { threshold: 5000, rate: 0.05 },  // 5% off for orders $5,000+
  { threshold: 1000, rate: 0.03 },  // 3% off for orders $1,000+
];

/**
 * Tax rates by region
 */
export const TAX_RATES: TaxRate[] = [
  { region: RegionCode.AUK, rate: 0.0685 }, // 6.85%
  { region: RegionCode.WLG, rate: 0.08 },   // 8.00%
  { region: RegionCode.WAI, rate: 0.0625 }, // 6.25%
  { region: RegionCode.CHC, rate: 0.04 },   // 4.00%
  { region: RegionCode.TAS, rate: 0.0825 }, // 8.25%
];

/**
 * Get tax rate for a specific region
 */
export const getTaxRateForRegion = (region: RegionCode): number => {
  const taxRate = TAX_RATES.find((tr) => tr.region === region);
  if (!taxRate) {
    throw new Error(`Invalid region code: ${region}`);
  }
  return taxRate.rate;
};
