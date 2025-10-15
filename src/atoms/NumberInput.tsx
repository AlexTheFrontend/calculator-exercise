import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface NumberInputProps extends Omit<TextFieldProps, 'type'> {
  value: number | string;
  onNumberChange?: (value: number) => void;
}

/**
 * Number input atom - Material UI TextField configured for numeric input
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onNumberChange,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow onChange handler if provided
    if (onChange) {
      onChange(event);
    }

    // Parse and validate numeric value
    if (onNumberChange) {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        onNumberChange(numValue);
      } else if (inputValue === '') {
        onNumberChange(0);
      }
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange}
      inputProps={{
        step: 'any',
        min: 0,
      }}
      {...props}
    />
  );
};
