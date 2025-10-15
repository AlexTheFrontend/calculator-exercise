import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CalculatorResult } from '@/types';

export interface ResultDisplayProps {
  result: CalculatorResult | null;
}

/**
 * Format a number as currency (USD)
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format a decimal as percentage
 */
const formatPercentage = (rate: number): string => {
  return `${(rate * 100).toFixed(2)}%`;
};

/**
 * Result display molecule - Formatted output showing calculation breakdown
 */
export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body1" color="text.secondary">
          Enter values and calculate to see results
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" gutterBottom>
        Calculation Results
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Subtotal:
          </Typography>
          <Typography variant="body2">{formatCurrency(result.subtotal)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Discount ({formatPercentage(result.discountRate)}):
          </Typography>
          <Typography variant="body2" color="success.main">
            -{formatCurrency(result.discountAmount)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Discounted Price:
          </Typography>
          <Typography variant="body2">{formatCurrency(result.discountedPrice)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Tax ({formatPercentage(result.taxRate)}):
          </Typography>
          <Typography variant="body2">{formatCurrency(result.taxAmount)}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {formatCurrency(result.total)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
