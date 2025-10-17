import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { RegionCode } from '@/types';

export interface RegionSelectorProps extends Omit<TextFieldProps, 'select'> {
  value: RegionCode | '';
  onRegionChange?: (region: RegionCode) => void;
}

const REGION_OPTIONS = [
  { value: RegionCode.AUK, label: 'AUK - Auckland (6.85%)' },
  { value: RegionCode.WLG, label: 'WLG - Wellington (8.00%)' },
  { value: RegionCode.WAI, label: 'WAI - Waikato (6.25%)' },
  { value: RegionCode.CHC, label: 'CHC - Christchurch (4.00%)' },
  { value: RegionCode.TAS, label: 'TAS - Tasmania (8.25%)' },
  {value: RegionCode.NILL, label: 'Recursion test  (0%)'}
];

/**
 * Region selector atom - Material UI Select/Dropdown for region codes
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({
  value,
  onRegionChange,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as RegionCode;

    // Allow onChange handler if provided
    if (onChange) {
      onChange(event);
    }

    // Call region-specific handler
    if (onRegionChange && selectedValue) {
      onRegionChange(selectedValue);
    }
  };

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      {...props}
    >
      {REGION_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
