import Stripe from 'stripe'
export function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) throw new Error('Stripe is not configured')
  return new Stripe(secret)
}
export const SONORA_PRICE_INR = 500000
export const SONORA_PLAN = { name: 'Sonora Pro', description: 'Unlimited analysis and high-fidelity one-shot generation', priceInCents: SONORA_PRICE_INR }
