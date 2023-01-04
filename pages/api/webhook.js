// import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET_KEY;

const parseDate = (timeStamp) => new Date(timeStamp * 1000).toLocaleString();

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["stripe-signature"];
    let data;
    let eventType;
    if (webhookSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(
          buf.toString(),
          signature,
          webhookSecret
        );
      } catch (err) {
        // On error, log and return the error message.
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      // Successfully constructed event.
      console.log("✅ Success:", event.id);
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    switch (eventType) {
      case "checkout.session.completed":
        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        const checkoutSession = data.object;
        console.log(checkoutSession);
        console.log(checkoutSession.customer);
        //session id
        console.log(checkoutSession.id);
        //currency
        console.log(checkoutSession.currency);
        //amount
        console.log(checkoutSession.amount_total);
        //subscription id
        console.log(checkoutSession.subscription);

        break;
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        const invoice = data.object;
        console.log(invoice);
        //date
        console.log(parseDate(invoice.created));
        //amount paid
        console.log(invoice.amount_paid);
        //currency
        console.log(invoice.currency);
        //customer id
        console.log(invoice.customer);
        //subscription id
        console.log(invoice.subscription);
        //invoice url
        console.log(invoice.hosted_invoice_url);
        //invoice pdf
        console.log(invoice.invoice_pdf);
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        const failedInvoice = data.object;
        console.log(failedInvoice);
        //date
        console.log(parseDate(failedInvoice.created));
        //customer id
        console.log(failedInvoice.customer);
        //subscription id
        console.log(failedInvoice.subscription);
        //customer name
        console.log(failedInvoice.customer_name);
        //customer email
        console.log(failedInvoice.customer_email);
        //invoice url
        console.log(failedInvoice.hosted_invoice_url);
        //invoice pdf
        console.log(failedInvoice.invoice_pdf);
        break;
      case "customer.created":
        const customer = data.object;
        console.log(customer);
        // Then define and call a function to handle the event customer.created
        //customer id
        console.log(customer.id);
        //date
        console.log(parseDate(customer.created));
        //email
        console.log(customer.email);
        //name
        console.log(customer.name);
        break;

      case "charge.captured":
        const charge = data.object;
        // Then define and call a function to handle the event charge.captured
        console.log(charge);
        break;
      case "customer.subscription.deleted":
        // handle subscription cancelled automatically based
        // upon your subscription settings. Or if the user
        // cancels it.
        //will send emaiil to customer
        const subscription = data.object;
        console.log(subscription);
        //date
        console.log(parseDate(subscription.canceled_at));
        //customer id
        console.log(subscription.customer);
        //subscription id
        console.log(subscription.id);
        break;

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler);
