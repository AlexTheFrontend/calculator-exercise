import React from 'react';
import { RegionSelector, RegionSelectorProps } from '@/atoms';

export interface RegionInputProps extends Omit<RegionSelectorProps, 'label'> {
  error?: boolean;
  helperText?: string;
}

/**
 * Region input molecule - Labeled region selector with validation
 */
export const RegionInput: React.FC<RegionInputProps> = ({
  error,
  helperText,
  ...props
}) => {
  return (
    <RegionSelector
      label="Region"
      required
      fullWidth
      error={error}
      helperText={helperText || 'Select your region for tax calculation'}
      {...props}
    />
  );
};
