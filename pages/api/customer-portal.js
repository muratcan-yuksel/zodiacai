import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function customerPortal(req, res) {
  // Create a customer portal session
  const customerId = req.body.customerId;
  const customerPortalSession = await stripe.billingPortal.sessions.create({
    //this customer id should be in the email I send to the customer
    //and be accessible in the button in that email
    customer: "cus_N6DKzD6eBh9kbb",
  });
  // Redirect the customer to the customer portal
  res.send(customerPortalSession.url);
}
