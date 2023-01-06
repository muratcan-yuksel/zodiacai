import Stripe from "stripe";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getSubscriptionsForCustomer(customerId) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
  });
  return subscriptions;
}
