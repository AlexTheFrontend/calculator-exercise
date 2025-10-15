import { CalculatorInput, CalculatorResult } from '@/types';
import { DISCOUNT_TIERS, getTaxRateForRegion } from './constants';

/**
 * Calculate the applicable discount rate based on subtotal
 * @param subtotal - The order subtotal before discount
 * @returns The discount rate (0-1) or 0 if no discount applies
 */
export const getDiscountRate = (subtotal: number): number => {
  const tier = DISCOUNT_TIERS.find((tier) => subtotal >= tier.threshold);
  return tier ? tier.rate : 0;
};

/**
 * Calculate the discount amount
 * @param subtotal - The order subtotal before discount
 * @param discountRate - The discount rate (0-1)
 * @returns The discount amount in dollars
 */
export const calculateDiscountAmount = (
  subtotal: number,
  discountRate: number
): number => {
  return subtotal * discountRate;
};

/**
 * Calculate the tax amount based on discounted price and region
 * @param discountedPrice - The price after discount is applied
 * @param taxRate - The tax rate (0-1)
 * @returns The tax amount in dollars
 */
export const calculateTaxAmount = (
  discountedPrice: number,
  taxRate: number
): number => {
  return discountedPrice * taxRate;
};

/**
 * Main calculator function - calculates total with discounts and taxes
 * @param input - Calculator input data (quantity, pricePerItem, region)
 * @returns Complete calculation result with all intermediate values
 */
export const calculateOrder = (input: CalculatorInput): CalculatorResult => {
  const { quantity, pricePerItem, region } = input;

  // Step 1: Calculate subtotal
  const subtotal = quantity * pricePerItem;

  // Step 2: Determine and apply discount
  const discountRate = getDiscountRate(subtotal);
  const discountAmount = calculateDiscountAmount(subtotal, discountRate);
  const discountedPrice = subtotal - discountAmount;

  // Step 3: Calculate tax
  const taxRate = getTaxRateForRegion(region);
  const taxAmount = calculateTaxAmount(discountedPrice, taxRate);

  // Step 4: Calculate final total
  const total = discountedPrice + taxAmount;

  return {
    subtotal,
    discountRate,
    discountAmount,
    discountedPrice,
    taxRate,
    taxAmount,
    total,
  };
};
