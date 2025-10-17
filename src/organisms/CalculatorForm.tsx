'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { QuantityInput, PriceInput, RegionInput, ResultDisplay } from '@/molecules';
import { SubmitButton } from '@/atoms';
import { RegionCode, CalculatorResult } from '@/types';
import { calculateOrder } from '@/utils/calculator';

/**
 * Calculator form organism - Complete form with all inputs and calculation logic
 */
export const CalculatorForm: React.FC = () => {
  const [quantity, setQuantity] = useState<number | ''>('');
  const [pricePerItem, setPricePerItem] = useState<number | ''>('');
  const [region, setRegion] = useState<RegionCode | ''>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate inputs
    if (!quantity || !pricePerItem || !region || quantity <= 0 || pricePerItem <= 0) {
      return;
    }

    // Set calculating state and clear previous result
    setCalculating(true);
    setResult(null);

    // Simulate 5-second delay for calculation
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Calculate the order
    const calculatedResult = calculateOrder({
      quantity: Number(quantity),
      pricePerItem: Number(pricePerItem),
      region: region as RegionCode,
    });

    setResult(calculatedResult);
    setCalculating(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <QuantityInput
              value={quantity}
              onNumberChange={setQuantity}
            />

            <PriceInput
              value={pricePerItem}
              onNumberChange={setPricePerItem}
            />

            <RegionInput
              value={region}
              onRegionChange={setRegion}
            />

            <SubmitButton disabled={calculating}>
              Calculate Total
            </SubmitButton>
          </Stack>
        </form>

        {calculating && (
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
              Please wait, calculating your total amount
            </Typography>
          </Box>
        )}

        {result && !calculating && (
          <Box sx={{ mt: 4 }}>
            <ResultDisplay result={result} />
          </Box>
        )}
      </Paper>
    </Box>
  );
};
