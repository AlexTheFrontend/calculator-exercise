import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  children: React.ReactNode;
}

/**
 * Submit button atom - Material UI Button configured for form submission
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'large',
  ...props
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      color={color}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};
