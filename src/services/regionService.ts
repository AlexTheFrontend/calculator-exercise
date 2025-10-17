import { RegionCode } from '@/types';

export interface RegionOption {
  value: RegionCode;
  label: string;
}

/**
 * Simulates an API call to fetch region options
 * Adds a 5-second delay to simulate network latency
 */
export const fetchRegions = async (): Promise<RegionOption[]> => {
  // Simulate 5-second API delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Return region options (simulating API response)
  return [
    { value: RegionCode.AUK, label: 'AUK - Auckland (6.85%)' },
    { value: RegionCode.WLG, label: 'WLG - Wellington (8.00%)' },
    { value: RegionCode.WAI, label: 'WAI - Waikato (6.25%)' },
    { value: RegionCode.CHC, label: 'CHC - Christchurch (4.00%)' },
    { value: RegionCode.TAS, label: 'TAS - Tasmania (8.25%)' },
    { value: RegionCode.NILL, label: 'Recursion test (0%)' },
  ];
};
