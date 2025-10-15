# Retail Calculator

A modern web application for calculating retail order totals with tiered discounts and regional tax rates.

## Overview

This calculator accepts three inputs:
- **Quantity** - Number of items ordered
- **Price per item** - Unit price
- **Region code** - Location for tax calculation (AUK, WLG, WAI, CHC, TAS)

The app calculates the final total by applying:
- Volume-based discounts (3% to 15% based on order value)
- Regional tax rates (4% to 8.25% depending on location)

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with TypeScript
- **UI Library**: [Material UI](https://mui.com)
- **Architecture**: Atomic Design pattern
- **Package Manager**: Yarn
- **Deployment**: [Vercel](https://vercel.com)
- **Testing**: Jest + React Testing Library

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Project Structure

The project follows Atomic Design principles:

```
src/
├── atoms/           # Basic UI components (TextField, Button)
├── molecules/       # Component combinations (InputField with label)
├── organisms/       # Complex components (CalculatorForm)
├── templates/       # Page layouts
├── utils/           # Business logic (calculations, tax rates)
└── types/           # TypeScript type definitions
```

## Features

**Discount Tiers**
- $1,000+ → 3% off
- $5,000+ → 5% off
- $7,000+ → 7% off
- $10,000+ → 10% off
- $50,000+ → 15% off

**Regional Tax Rates**
- AUK: 6.85%
- WLG: 8.00%
- WAI: 6.25%
- CHC: 4.00%
- TAS: 8.25%

## Development

Run tests:

```bash
yarn test
```

Build for production:

```bash
yarn build
```

## Deployment

The app is optimized for deployment on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/material-ui/getting-started/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Business Logic Details

### Discount Tiers
| Order Value | Discount Rate |
|-------------|---------------|
| $1,000      | 3%            |
| $5,000      | 5%            |
| $7,000      | 7%            |
| $10,000     | 10%           |
| $50,000     | 15%           |

### Regional Tax Rates
| Region | Tax Rate |
|--------|----------|
| AUK    | 6.85%    |
| WLG    | 8.00%    |
| WAI    | 6.25%    |
| CHC    | 4.00%    |
| TAS    | 8.25%    |

## Calculation Formula
1. Subtotal = Quantity × Price per item
2. Discount = Apply highest applicable discount tier to subtotal
3. Discounted Price = Subtotal - Discount
4. Tax = Discounted Price × Regional tax rate
5. Final Total = Discounted Price + Tax
