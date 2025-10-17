import { DiscountTier, RegionCode, TaxRate } from '@/types';

/**
 * Discount tiers - Progressive calculation (like tax brackets)
 * Each tier explicitly defines its range and discount rate
 * The discount for each tier applies only to the amount within that bracket
 */
export const DISCOUNT_TIERS: DiscountTier[] = [
  { threshold: 0,     upperBound: 1000,     rate: 0 },     // No discount for $0-$1,000
  { threshold: 1000,  upperBound: 5000,     rate: 0.03 },  // 3% off for $1,000-$5,000
  { threshold: 5000,  upperBound: 7000,     rate: 0.05 },  // 5% off for $5,000-$7,000
  { threshold: 7000,  upperBound: 10000,    rate: 0.07 },  // 7% off for $7,000-$10,000
  { threshold: 10000, upperBound: 50000,    rate: 0.10 },  // 10% off for $10,000-$50,000
  { threshold: 50000, upperBound: Infinity, rate: 0.15 },  // 15% off for $50,000+
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
  { region: RegionCode.NILL, rate: 0}, // 0% for testing recursion
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
