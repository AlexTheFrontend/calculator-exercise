import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { RegionCode } from '@/types';
import { fetchRegions, RegionOption } from '@/services/regionService';

export interface RegionSelectorProps extends Omit<TextFieldProps, 'select'> {
  value: RegionCode | '';
  onRegionChange?: (region: RegionCode) => void;
}

/**
 * Region selector atom - Material UI Select/Dropdown for region codes
 * Simulates async API call to fetch regions with 5-second delay
 */
export const RegionSelector: React.FC<RegionSelectorProps> = ({
  value,
  onRegionChange,
  onChange,
  ...props
}) => {
  const [regions, setRegions] = useState<RegionOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const loadRegions = async () => {
    // Only fetch once
    if (isFetched || loading) return;

    setLoading(true);
    try {
      const fetchedRegions = await fetchRegions();
      setRegions(fetchedRegions);
      setIsFetched(true);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleOpen = () => {
    loadRegions();
  };

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      onFocus={handleOpen}
      slotProps={{
        select: {
          onOpen: handleOpen,
        },
      }}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <MenuItem disabled>
          <CircularProgress size={20} sx={{ mr: 2 }} />
          Loading regions...
        </MenuItem>
      ) : (
        regions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      )}
    </TextField>
  );
};
