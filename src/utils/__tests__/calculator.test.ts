import { calculateOrder, getDiscountRate, calculateDiscountAmount, calculateTaxAmount } from '../calculator';
import { RegionCode } from '@/types';

describe('Calculator Utility Functions', () => {
  describe('getDiscountRate', () => {
    it('should return 0% discount for orders under $1,000', () => {
      expect(getDiscountRate(999)).toBe(0);
      expect(getDiscountRate(500)).toBe(0);
    });

    it('should return 3% discount for orders $1,000+', () => {
      expect(getDiscountRate(1000)).toBe(0.03);
      expect(getDiscountRate(4999)).toBe(0.03);
    });

    it('should return 5% discount for orders $5,000+', () => {
      expect(getDiscountRate(5000)).toBe(0.05);
      expect(getDiscountRate(6999)).toBe(0.05);
    });

    it('should return 7% discount for orders $7,000+', () => {
      expect(getDiscountRate(7000)).toBe(0.07);
      expect(getDiscountRate(9999)).toBe(0.07);
    });

    it('should return 10% discount for orders $10,000+', () => {
      expect(getDiscountRate(10000)).toBe(0.10);
      expect(getDiscountRate(49999)).toBe(0.10);
    });

    it('should return 15% discount for orders $50,000+', () => {
      expect(getDiscountRate(50000)).toBe(0.15);
      expect(getDiscountRate(100000)).toBe(0.15);
    });
  });

  describe('calculateDiscountAmount', () => {
    it('should calculate correct discount amount', () => {
      expect(calculateDiscountAmount(1000, 0.03)).toBe(30);
      expect(calculateDiscountAmount(5000, 0.05)).toBe(250);
      expect(calculateDiscountAmount(10000, 0.10)).toBe(1000);
    });

    it('should return 0 for 0% discount rate', () => {
      expect(calculateDiscountAmount(500, 0)).toBe(0);
    });
  });

  describe('calculateTaxAmount', () => {
    it('should calculate correct tax amount', () => {
      expect(calculateTaxAmount(1000, 0.0685)).toBe(68.5);
      expect(calculateTaxAmount(5000, 0.08)).toBe(400);
    });
  });

  describe('calculateOrder', () => {
    it('should calculate complete order with discount and tax - AUK region', () => {
      const result = calculateOrder({
        quantity: 10,
        pricePerItem: 150,
        region: RegionCode.AUK,
      });

      // Subtotal: 10 * 150 = 1500
      // Discount: 3% of 1500 = 45
      // Discounted Price: 1500 - 45 = 1455
      // Tax (6.85%): 1455 * 0.0685 = 99.6675
      // Total: 1455 + 99.6675 = 1554.6675

      expect(result.subtotal).toBe(1500);
      expect(result.discountRate).toBe(0.03);
      expect(result.discountAmount).toBe(45);
      expect(result.discountedPrice).toBe(1455);
      expect(result.taxRate).toBe(0.0685);
      expect(result.taxAmount).toBeCloseTo(99.6675, 2);
      expect(result.total).toBeCloseTo(1554.6675, 2);
    });

    it('should calculate order with no discount - CHC region', () => {
      const result = calculateOrder({
        quantity: 5,
        pricePerItem: 100,
        region: RegionCode.CHC,
      });

      // Subtotal: 5 * 100 = 500
      // Discount: 0% (under $1000)
      // Tax (4%): 500 * 0.04 = 20
      // Total: 500 + 20 = 520

      expect(result.subtotal).toBe(500);
      expect(result.discountRate).toBe(0);
      expect(result.discountAmount).toBe(0);
      expect(result.discountedPrice).toBe(500);
      expect(result.taxRate).toBe(0.04);
      expect(result.taxAmount).toBe(20);
      expect(result.total).toBe(520);
    });

    it('should calculate order with 15% discount - WLG region', () => {
      const result = calculateOrder({
        quantity: 100,
        pricePerItem: 600,
        region: RegionCode.WLG,
      });

      // Subtotal: 100 * 600 = 60000
      // Discount: 15% of 60000 = 9000
      // Discounted Price: 60000 - 9000 = 51000
      // Tax (8%): 51000 * 0.08 = 4080
      // Total: 51000 + 4080 = 55080

      expect(result.subtotal).toBe(60000);
      expect(result.discountRate).toBe(0.15);
      expect(result.discountAmount).toBe(9000);
      expect(result.discountedPrice).toBe(51000);
      expect(result.taxRate).toBe(0.08);
      expect(result.taxAmount).toBe(4080);
      expect(result.total).toBe(55080);
    });

    it('should handle decimal prices correctly', () => {
      const result = calculateOrder({
        quantity: 3,
        pricePerItem: 99.99,
        region: RegionCode.WAI,
      });

      // Subtotal: 3 * 99.99 = 299.97
      // Discount: 0% (under $1000)
      // Tax (6.25%): 299.97 * 0.0625 = 18.748125
      // Total: 299.97 + 18.748125 = 318.718125

      expect(result.subtotal).toBeCloseTo(299.97, 2);
      expect(result.discountRate).toBe(0);
      expect(result.taxAmount).toBeCloseTo(18.748125, 2);
      expect(result.total).toBeCloseTo(318.718125, 2);
    });
  });
});
