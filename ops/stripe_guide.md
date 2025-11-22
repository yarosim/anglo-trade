# Stripe Integration Guide

## Overview
TradeFlow Pro uses Stripe for subscription billing. 

## Configuration
The application expects the following keys. **NEVER** commit the Secret Key to the repository.

- **Publishable Key**: `pk_live_51RgFh9EJtdifHfsd6CulkZrnDx5UryV5jFsyhd5ybgogbzMSl0eW70ToXoipNWyyAoCxRbNoh1SVbIioyf9ieK7q00oXoSdQ0J` (Safe for client-side)
- **Secret Key**: `sk_live_...` (Server-side only, store in Supabase Edge Functions or Vercel Environment Variables)
- **Webhook Secret**: `whsec_9j1yOHgYMDHy3KBQsyFCykoVaxBDBkqq`

## Webhook Handling
We have a dedicated webhook handler endpoint at `https://nzegyqqvndoyxicznkpg.supabase.co/functions/v1/stripe-webhook`.

### Events Handled
1. `checkout.session.completed`: Provision the user's subscription in the database.
2. `customer.subscription.updated`: Update plan status (e.g., if they upgrade/downgrade).
3. `customer.subscription.deleted`: Revoke access.

## Testing Payments
1. Use the "Billing" tab in the dashboard.
2. The "Upgrade" buttons trigger a client-side Checkout session creation.
3. In Dev Mode, this is mocked. In Prod, it calls the backend `/api/stripe/create-checkout`.

## Products
Ensure these products exist in your Stripe Dashboard:
- `prod_starter` ($29)
- `prod_pro` ($79)
- `prod_elite` ($149)
