import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculatorForm } from '../CalculatorForm';

describe('CalculatorForm Component', () => {
  it('should render all input fields and submit button', () => {
    render(<CalculatorForm />);

    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price per item/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/region/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate total/i })).toBeInTheDocument();
  });

  it('should display calculation results when form is submitted with valid data', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const quantityInput = screen.getByLabelText(/quantity/i);
    const priceInput = screen.getByLabelText(/price per item/i);
    const regionSelect = screen.getByLabelText(/region/i);
    const submitButton = screen.getByRole('button', { name: /calculate total/i });

    await user.clear(quantityInput);
    await user.type(quantityInput, '10');

    await user.clear(priceInput);
    await user.type(priceInput, '150');

    // Region
    await user.click(regionSelect);
    const aukOption = await screen.findByText(/AUK - Auckland/i);
    await user.click(aukOption);

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/calculation results/i)).toBeInTheDocument();
    });

    // Check if the total is displayed
    // Subtotal: 10 * 150 = 1500
    // Discount: 3% of 1500 = 45
    // Discounted: 1455
    // Tax (6.85%): 99.67
    // Total: 1554.67
    expect(screen.getByText(/\$1,500\.00/)).toBeInTheDocument(); // Subtotal
    expect(screen.getByText(/\$1,554\.67/)).toBeInTheDocument(); // Total
  });

  it('should not submit form with empty fields', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const submitButton = screen.getByRole('button', { name: /calculate total/i });

    await user.click(submitButton);

    expect(screen.queryByText(/calculation results/i)).not.toBeInTheDocument();
  });

  it('should update input values when user types', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const quantityInput = screen.getByLabelText(/quantity/i) as HTMLInputElement;
    const priceInput = screen.getByLabelText(/price per item/i) as HTMLInputElement;

    await user.clear(quantityInput);
    await user.type(quantityInput, '25');
    expect(quantityInput.value).toBe('25');

    await user.clear(priceInput);
    await user.type(priceInput, '99.99');
    expect(priceInput.value).toBe('99.99');
  });

  it('should calculate correctly with different discount tiers', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    const quantityInput = screen.getByLabelText(/quantity/i);
    const priceInput = screen.getByLabelText(/price per item/i);
    const regionSelect = screen.getByLabelText(/region/i);
    const submitButton = screen.getByRole('button', { name: /calculate total/i });

    // Test with $50,000+ order (15% discount)
    await user.clear(quantityInput);
    await user.type(quantityInput, '100');

    await user.clear(priceInput);
    await user.type(priceInput, '600');

    await user.click(regionSelect);
    const chcOption = await screen.findByText(/CHC - Christchurch/i);
    await user.click(chcOption);

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/calculation results/i)).toBeInTheDocument();
    });

    // Subtotal: 100 * 600 = 60000
    // Discount: 15% = 9000
    // Discounted: 51000
    // Tax (4%): 2040
    // Total: 53040
    expect(screen.getByText(/\$60,000\.00/)).toBeInTheDocument(); // Subtotal
    expect(screen.getByText(/\$53,040\.00/)).toBeInTheDocument(); // Total
  });
});
