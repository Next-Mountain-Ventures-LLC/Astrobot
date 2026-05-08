# Stripe Integration Setup Guide

## Overview

This guide walks you through setting up Stripe integration for Astrobot.design to manage products (website templates) and handle payments.

---

## Step 1: Get Your Stripe Keys

### 1.1 Create/Access Stripe Account
- Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
- Sign in or create a new account

### 1.2 Find Your API Keys
1. Click **"Developers"** in the left sidebar
2. Click **"API keys"** under Developers
3. You'll see two keys:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

### 1.3 Get Your Webhook Secret (Optional, for advanced features)
1. In Developers section, click **"Webhooks"**
2. You'll see your webhook signing secret (starts with `whsec_`)

---

## Step 2: Configure Local Development (.env)

### 2.1 Update .env file

Edit `.env` in the project root:

```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

Replace `xxxxxxxxxxxxx` with your actual keys from Stripe Dashboard.

### 2.2 Test Locally
```bash
npm run dev
```

The site should work with Stripe integration in development mode (test keys).

---

## Step 3: Configure Netlify for Production

### 3.1 Add Environment Variables to Netlify

1. Go to your **Netlify site dashboard**
2. Click **"Site settings"** → **"Build & deploy"** → **"Environment"**
3. Click **"Add environment variable"**
4. Add three variables:

| Variable Name | Value | Safe to Expose |
|---|---|---|
| `PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your publishable key (`pk_...`) | ✅ Yes (used in browser) |
| `STRIPE_SECRET_KEY` | Your secret key (`sk_...`) | ❌ No (private key) |
| `STRIPE_WEBHOOK_SECRET` | Your webhook secret (`whsec_...`) | ❌ No (private) |

### 3.2 Trigger Redeploy
- After adding environment variables, go to **"Deploys"**
- Click the **"Redeploy site"** button on your latest build
- This ensures the new environment variables are used

### 3.3 Verify Configuration
- Visit your deployed site
- Try a payment flow to confirm Stripe is working
- Check browser console for any errors

---

## Step 4: Create Stripe Products

### 4.1 Create Website Template Products

1. Go to [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click **"Add product"**
3. Fill in details:
   - **Name**: "Professional Services Website"
   - **Description**: Brief description of the template
   - **Image**: (Optional) Upload a preview image
4. Click **"Create product"**

### 4.2 Add Prices to Products

Each product needs pricing. For example:

**Website for Sale - $299 (One-time)**
1. Click product → **"Add pricing"**
2. Set:
   - Price: `$299`
   - Billing period: `One-time`
3. Click **"Add price"**

**Orbit Plan - $1,500/year (Subscription)**
1. Click product → **"Add pricing"**
2. Set:
   - Price: `$1,500`
   - Billing period: `Yearly`
   - Recurring: Yes
3. Click **"Add price"**

**Orbit Plan - $149/month (Subscription)**
1. Click product → **"Add pricing"**
2. Set:
   - Price: `$149`
   - Billing period: `Monthly`
   - Recurring: Yes
3. Click **"Add price"**

### 4.3 Note Product & Price IDs

Each product and price has an ID. You'll use these in your code:
- Product ID: `prod_xxxxxxxxxxxxx`
- Price ID: `price_xxxxxxxxxxxxx`

Save these IDs for later reference.

---

## Step 5: Use Stripe in Your Code

### 5.1 Client-Side: Redirect to Checkout

Use pre-built Stripe checkout links (simplest method):

```astro
<a 
  href="https://buy.stripe.com/[link-from-stripe]"
  target="_blank"
  rel="noopener noreferrer"
>
  Purchase Now
</a>
```

To get this link:
1. Go to Product details in Stripe
2. Click the price
3. Click **"Share"**
4. Copy the checkout link

### 5.2 Server-Side: Create Checkout Programmatically

Use the Stripe utilities for dynamic checkout:

```typescript
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: Request) {
  const priceId = 'price_xxxxxxxxxxxxx';
  const successUrl = 'https://yoursite.com/success';
  const cancelUrl = 'https://yoursite.com/cancel';

  const session = await createCheckoutSession(priceId, successUrl, cancelUrl);
  
  return Response.json({ sessionUrl: session.url });
}
```

### 5.3 Fetch Products Dynamically

```typescript
import { listStripeProducts } from '@/lib/stripe';

async function getAvailableProducts() {
  const products = await listStripeProducts();
  return products;
}
```

---

## Step 6: Test Payments

### 6.1 Use Stripe Test Cards

Stripe provides test cards for development:

| Card Number | Use Case |
|---|---|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Payment declined |
| `4000 0025 0000 3155` | Requires 3D Secure |

**Expiry**: Any future date (e.g., `12/25`)
**CVC**: Any 3 digits (e.g., `123`)

### 6.2 Test Checkout Flow

1. Visit your site locally or on Netlify
2. Click a "Purchase Now" or checkout button
3. You'll be redirected to Stripe Checkout
4. Use a test card to complete payment
5. Check [test dashboard](https://dashboard.stripe.com/test/payments) to see the test payment

---

## Step 7: Handle Webhooks (Advanced)

Webhooks let you react to Stripe events (payment completed, subscription canceled, etc.).

### 7.1 Create API Route for Webhooks

```typescript
// src/pages/api/webhooks/stripe.ts
import { verifyWebhookSignature } from '@/lib/stripe';

export async function POST({ request }) {
  const signature = request.headers.get('stripe-signature');
  const body = await request.text();

  // Verify webhook is from Stripe
  if (!verifyWebhookSignature(body, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Parse webhook event
  const event = JSON.parse(body);

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Payment completed
      console.log('Payment succeeded:', event.data.object);
      break;
    
    case 'customer.subscription.created':
      // Subscription started
      console.log('Subscription created:', event.data.object);
      break;

    default:
      console.log('Unhandled event:', event.type);
  }

  return Response.json({ received: true });
}
```

### 7.2 Configure Webhook Endpoint in Stripe

1. Go to Developers → **"Webhooks"**
2. Click **"Add endpoint"**
3. Enter your webhook URL: `https://yoursite.com/api/webhooks/stripe`
4. Select events: `payment_intent.succeeded`, `customer.subscription.created`, etc.
5. Save

---

## File Structure

```
src/
├── lib/
│   └── stripe.ts                 ← Server-side utilities
├── pages/
│   ├── api/
│   │   └── webhooks/
│   │       └── stripe.ts         ← Webhook handler
│   └── ...
└── .env                          ← Environment variables (local)
```

---

## Troubleshooting

### Issue: "PUBLIC_STRIPE_PUBLISHABLE_KEY not found"

**Solution**: Check `.env` file has the correct variable name (must start with `PUBLIC_`)

### Issue: "STRIPE_SECRET_KEY is undefined"

**Solution**: 
- Ensure `.env` is committed to git
- Check Netlify environment variables are set
- Redeploy site after adding variables

### Issue: Checkout link doesn't work

**Solution**: 
- Verify product/price is active (not archived)
- Check Stripe key is correct
- Try a different browser (private/incognito mode)

### Issue: Payment fails with test card

**Solution**:
- Use correct test card: `4242 4242 4242 4242`
- Ensure future expiry date
- Check Stripe dashboard for error details

---

## Key Files

| File | Purpose |
|---|---|
| `.env` | Local environment variables (development) |
| `.env.example` | Template for environment variables |
| `src/lib/stripe.ts` | Stripe utility functions |
| Netlify settings | Production environment variables |

---

## Next Steps

1. ✅ Set up Stripe account and get keys
2. ✅ Configure `.env` locally
3. ✅ Add environment variables to Netlify
4. ✅ Create products and prices in Stripe
5. ✅ Test checkout flow with test cards
6. ✅ Set up webhooks (optional, for advanced features)

---

## Security Notes

⚠️ **Important**: 
- **Never commit** `STRIPE_SECRET_KEY` to public repositories
- **Only use** `PUBLIC_STRIPE_PUBLISHABLE_KEY` in browser code
- **Private keys** should only exist in:
  - Local `.env` file (git-ignored)
  - Netlify environment variables (encrypted)
  - Never in code commits

---

## Resources

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Test Card Numbers](https://stripe.com/docs/testing)

---

**Status**: Ready for integration
**Next**: Start creating products in your Stripe dashboard
