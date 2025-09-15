# Mini Funnel

3-step funnel (Email → Name → Product → Payment) with 5-minute discount and Stripe Checkout.

## Live Demo

**🌐 [https://mini-funnel.vercel.app](https://mini-funnel.vercel.app)**

## Setup

1. `yarn install`
2. Create `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PRICE_FULL=price_your_full_price_id_here
STRIPE_PRICE_DISCOUNTED=price_your_discounted_price_id_here
BASE_URL=http://localhost:3000
```

3. `yarn dev:vercel`
4. Open http://localhost:3000

## Test Flow

Email → Name → Product → Buy Now → Stripe Checkout → Success

- 5-minute countdown shows $25 discounted price
- After expiry, shows $50 full price
- Test card: `4242 4242 4242 4242`
- Reset timer: Add `?resetTimer=1` to Product page

## Scripts

- `yarn dev:vercel` - Development server
- `yarn build` - Production build
- `yarn test` - Run tests
- `yarn lint` - Run ESLint

## Tech Stack

- **React + TypeScript** - Type-safe UI components
- **Vite** - Fast build tool and dev server
- **React Hook Form + Yup** - Form validation and state management
- **Hosted Stripe Checkout** - PCI compliance and fast payment processing
- **Vercel Serverless** - Checkout session creation and API endpoints
- **localStorage Timer** - Client-side countdown state management
