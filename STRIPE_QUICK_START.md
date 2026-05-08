# Stripe Setup - Quick Start (5 Minutes)

## TL;DR - Do This Now

### 1️⃣ Get Keys from Stripe (2 min)
1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Click "Developers" → "API keys"
3. Copy these two keys:
   - `pk_test_xxxxx` (Publishable key)
   - `sk_test_xxxxx` (Secret key)

### 2️⃣ Update .env (1 min)
Edit `.env` in your project root:
```env
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

### 3️⃣ Add to Netlify (2 min)
1. Go to Netlify site → Settings → Build & deploy → Environment
2. Add two environment variables:
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_xxxxx`
   - `STRIPE_SECRET_KEY` = `sk_test_xxxxx`
3. Click "Redeploy site"

---

## What You Now Have

✅ Stripe utilities configured and ready to use
✅ Environment variables set up locally and on Netlify
✅ Ready to create products in Stripe Dashboard
✅ Ready to handle payments

---

## Create Your First Product

1. Go to [https://dashboard.stripe.com/products](https://dashboard.stripe.com/products)
2. Click "Add product"
3. Enter details (name, description, image)
4. Click "Create product"
5. Add a price:
   - Click "Add pricing"
   - Enter amount ($299, $1,500, etc.)
   - Set billing period (one-time or monthly/yearly)
   - Click "Add price"

---

## Test Payment

1. Use test card: `4242 4242 4242 4242`
2. Expiry: Any future date (`12/25`)
3. CVC: Any 3 digits (`123`)
4. Complete checkout

---

## Files Modified

| File | What Changed |
|---|---|
| `.env.example` | Added Stripe variables |
| `src/lib/stripe.ts` | **NEW** - Stripe utilities |
| `.env` | You add your keys here |

---

## Next: Full Guide

See `STRIPE_SETUP.md` for complete setup including:
- Creating products and prices
- Setting up webhooks
- Advanced integrations

---

**Status**: Ready for products! 🎉
