/**
 * Region codes for tax calculation
 */
export enum RegionCode {
  AUK = 'AUK',
  WLG = 'WLG',
  WAI = 'WAI',
  CHC = 'CHC',
  TAS = 'TAS',
}

/**
 * Discount tier definition
 */
export interface DiscountTier {
  threshold: number;
  rate: number;
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
