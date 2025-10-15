import React from 'react';
import { NumberInput, NumberInputProps } from '@/atoms';

export interface QuantityInputProps extends Omit<NumberInputProps, 'label'> {
  error?: boolean;
  helperText?: string;
}

/**
 * Quantity input molecule - Labeled numeric input with validation for quantity
 */
export const QuantityInput: React.FC<QuantityInputProps> = ({
  error,
  helperText,
  ...props
}) => {
  return (
    <NumberInput
      label="Quantity"
      placeholder="Enter quantity"
      required
      fullWidth
      error={error}
      helperText={helperText || 'Enter the number of items'}
      inputProps={{
        step: 1,
        min: 1,
      }}
      {...props}
    />
  );
};
