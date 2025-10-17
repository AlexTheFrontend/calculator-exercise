import { CalculatorInput, CalculatorResult } from '@/types';
import { DISCOUNT_TIERS, getTaxRateForRegion } from './constants';

/**
 * Pseudo code example calculations:
 * For $8,000 order:
 * - $0-$1,000 (0%): $0 discount
 * - $1,000-$5,000 ($4,000 at 3%): $120 discount
 * - $5,000-$7,000 ($2,000 at 5%): $100 discount
 * - $7,000-$8,000 ($1,000 at 7%): $70 discount
 * Total: $290 discount
 */
export const calculateProgressiveDiscount = (
  subtotal: number,
  tierIndex: number = 0
): number => {
  // Base case: reached end of tiers or subtotal is 0
  if (tierIndex >= DISCOUNT_TIERS.length - 1 || subtotal <= 0) {
    return 0;
  }

  const nextTier = DISCOUNT_TIERS[tierIndex + 1];

  // If subtotal doesn't reach next tier threshold, no discount for this bracket
  if (subtotal <= nextTier.threshold) {
    return 0;
  }

  // Calculate amount in this bracket (capped at tier's upper bound)
  const upperBound = Math.min(nextTier.upperBound, subtotal);
  const amountInBracket = upperBound - nextTier.threshold;

  // Discount for this bracket
  const bracketDiscount = amountInBracket * nextTier.rate;

  // Recursively calculate discount for next bracket
  return bracketDiscount + calculateProgressiveDiscount(subtotal, tierIndex + 1);
};

export const getDiscountRate = (subtotal: number): number => {
  if (subtotal <= 0) return 0;
  const discountAmount = calculateProgressiveDiscount(subtotal);
  return discountAmount / subtotal;
};

export const calculateDiscountAmount = (
  subtotal: number
): number => {
  return calculateProgressiveDiscount(subtotal);
};

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
  const discountAmount = calculateDiscountAmount(subtotal);
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
