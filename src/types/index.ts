/**
 * Region codes for tax calculation
 */
export enum RegionCode {
  AUK = 'AUK',
  WLG = 'WLG',
  WAI = 'WAI',
  CHC = 'CHC',
  TAS = 'TAS',
  NILL = 'NILL', // No tax region
}

/**
 * Discount tier definition with explicit bounds
 */
export interface DiscountTier {
  threshold: number;    // Lower bound of this tier
  upperBound: number;   // Upper bound of this tier (use Infinity for last tier)
  rate: number;         // Discount rate for amounts in this tier
}

/**
 * Tax rate by region
 */
export interface TaxRate {
  region: RegionCode;
  rate: number;
}

/**
 * Calculator input data
 */
export interface CalculatorInput {
  quantity: number;
  pricePerItem: number;
  region: RegionCode;
}

/**
 * Calculator output/result data
 */
export interface CalculatorResult {
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  discountedPrice: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}
