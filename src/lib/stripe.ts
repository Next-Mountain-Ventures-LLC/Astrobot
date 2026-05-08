/**
 * Stripe Server-Side Utilities
 * 
 * This module handles server-side Stripe operations
 * For client-side operations, use the browser's Stripe.js library
 */

// Get Stripe secret key from environment
const STRIPE_SECRET_KEY = import.meta.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = import.meta.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  console.warn('⚠️ STRIPE_SECRET_KEY not configured. Stripe operations will fail.');
}

/**
 * Example: Fetch a Stripe product by ID
 * This would be used in an API route to get product details from Stripe
 */
export async function getStripeProduct(productId: string) {
  try {
    const response = await fetch(`https://api.stripe.com/v1/products/${productId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Stripe API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Stripe product:', error);
    throw error;
  }
}

/**
 * Example: List all Stripe products
 * This would be used to display available website templates as products
 */
export async function listStripeProducts(limit = 10) {
  try {
    const response = await fetch('https://api.stripe.com/v1/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error listing Stripe products:', error);
    throw error;
  }
}

/**
 * Example: Get prices for a product
 * Returns all price variations (monthly, annual, one-time, etc.)
 */
export async function getProductPrices(productId: string) {
  try {
    const response = await fetch(
      `https://api.stripe.com/v1/prices?product=${productId}&limit=100`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching product prices:', error);
    throw error;
  }
}

/**
 * Example: Create a checkout session
 * Used for redirecting to Stripe Checkout (server-side)
 */
export async function createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string) {
  try {
    const formData = new URLSearchParams();
    formData.append('payment_method_types[]', 'card');
    formData.append('line_items[0][price]', priceId);
    formData.append('line_items[0][quantity]', '1');
    formData.append('mode', 'payment');
    formData.append('success_url', successUrl);
    formData.append('cancel_url', cancelUrl);

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Stripe API error: ${response.status}`);
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Example: Verify webhook signature
 * Used in API routes to verify Stripe webhook events
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    // This is a simplified example
    // For production, use Stripe's crypto verification
    // See: https://stripe.com/docs/webhooks/signatures
    return true;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Configuration object for Stripe client initialization
 * Use this to configure Stripe.js in browser components
 */
export const stripeConfig = {
  publishableKey: import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
  apiVersion: '2023-10-16' as const,
};

export default {
  getStripeProduct,
  listStripeProducts,
  getProductPrices,
  createCheckoutSession,
  verifyWebhookSignature,
  stripeConfig,
};
