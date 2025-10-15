import React from 'react';
import { NumberInput, NumberInputProps } from '@/atoms';
import InputAdornment from '@mui/material/InputAdornment';

export interface PriceInputProps extends Omit<NumberInputProps, 'label'> {
  error?: boolean;
  helperText?: string;
}

/**
 * Price input molecule - Labeled currency input with validation for price per item
 */
export const PriceInput: React.FC<PriceInputProps> = ({
  error,
  helperText,
  ...props
}) => {
  return (
    <NumberInput
      label="Price per Item"
      placeholder="Enter price"
      required
      fullWidth
      error={error}
      helperText={helperText || 'Enter the price per item in dollars'}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      inputProps={{
        step: 0.01,
        min: 0.01,
      }}
      {...props}
    />
  );
};
