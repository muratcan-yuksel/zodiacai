// import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";
import addUser from "./addUser";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const webhookSecret = process.env.NEXT_PUBLIC_WEBHOOK_SECRET_KEY;
import axios from "axios";
import { parse } from "dotenv";

const returnedData = {
  checkoutSession: {
    fired: false,
    //takes "complete" if completed
    status: "",
    //takes "paid" if paid
    paymentStatus: "",
  },
  customer: {
    fired: false,
    //customer id
    id: "",
    //customer name
    name: "",
    //customer email
    email: "",
    //created at
    createdAt: "",
    //boolean
    delinquent: "",
  },
  invoice: {
    fired: false,
    //invoice id
    id: "",
    //invoice date
    date: "",
    //invoice amount
    amount: "",
    //invoice currency
    currency: "",
    //invoice customer id
    customer: "",
    //url
    hosted_invoice_url: "",
    //pdf
    invoice_pdf: "",
    //status- takes paid if paid, takes open if not
    status: "",
    //paid- boolean
    paid: "",
  },
  charge: {
    fired: false,
    //amount_captured
    amount_captured: "",
    //paid-boolean
    paid: "",
    //takes card for example
    type: "",
    //receipt url
    receipt_url: "",
    //status- takes succeeded if succeeded
    status: "",
  },
  subscription: {
    fired: false,
    //subscription id
    id: "",
    //subscription status
    //gives cancelled if cancelled
    status: "",
    //subscription plan
    //takes object
    plan: {},
    //subscription start date
    start_date: "",
    //cancel date
    canceled_at: "",
  },
};

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
        returnedData.checkoutSession.fired = true;
        returnedData.checkoutSession.status = checkoutSession.status;
        returnedData.checkoutSession.paymentStatus =
          checkoutSession.payment_status;
        console.log(checkoutSession);

        break;
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        const invoice = data.object;
        returnedData.invoice.fired = true;
        returnedData.invoice.id = invoice.id;
        returnedData.invoice.date = parseDate(invoice.created);
        returnedData.invoice.amount = invoice.amount_paid;
        returnedData.invoice.currency = invoice.currency;
        returnedData.invoice.customer = invoice.customer;
        returnedData.invoice.hosted_invoice_url = invoice.hosted_invoice_url;
        returnedData.invoice.invoice_pdf = invoice.invoice_pdf;
        returnedData.invoice.status = invoice.status;
        returnedData.invoice.paid = invoice.paid;
        console.log(invoice);

        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        const failedInvoice = data.object;
        returnedData.invoice.fired = true;
        returnedData.invoice.id = failedInvoice.id;
        returnedData.invoice.date = parseDate(failedInvoice.created);
        returnedData.invoice.amount = failedInvoice.amount_paid;
        returnedData.invoice.currency = failedInvoice.currency;
        returnedData.invoice.customer = failedInvoice.customer;
        returnedData.invoice.hosted_invoice_url =
          failedInvoice.hosted_invoice_url;
        returnedData.invoice.invoice_pdf = failedInvoice.invoice_pdf;
        returnedData.invoice.status = failedInvoice.status;
        returnedData.invoice.paid = failedInvoice.paid;

        console.log(failedInvoice);

        break;
      case "customer.created":
        const customer = data.object;
        returnedData.customer.fired = true;
        returnedData.customer.id = customer.id;
        returnedData.customer.createdAt = parseDate(customer.created);
        returnedData.customer.email = customer.email;
        returnedData.customer.name = customer.name;
        //delinquent
        returnedData.customer.delinquent = customer.delinquent;

        console.log(customer);
        // try {
        //   const res = await axios.post("http://localhost:3000/api/addUser", {
        //     customerId: customer.id,
        //     email: customer.email,
        //     name: customer.name,
        //     createdAt: parseDate(customer.created),
        //     delinquent: customer.delinquent,
        //   });
        //   console.log(res);
        // } catch (err) {
        //   console.log(err);
        // }

        console.log(parseDate(customer.created));
        break;

      case "charge.captured":
        const charge = data.object;
        returnedData.charge.fired = true;
        returnedData.charge.amount_captured = charge.amount_captured;
        returnedData.charge.paid = charge.paid;
        returnedData.charge.type = charge.payment_method_details.type;
        returnedData.charge.receipt_url = charge.receipt_url;
        returnedData.charge.status = charge.status;
        console.log(charge);
        break;
      case "customer.subscription.deleted":
        // handle subscription cancelled automatically based
        // upon your subscription settings. Or if the user
        // cancels it.
        //will send emaiil to customer
        const subscription = data.object;
        returnedData.subscription.fired = true;
        returnedData.subscription.status = subscription.status;
        returnedData.subscription.id = subscription.id;
        returnedData.subscription.canceled_at = parseDate(
          subscription.canceled_at
        );
        returnedData.subscription.customer = subscription.customer;
        //start date
        returnedData.subscription.start_date = parseDate(
          subscription.start_date
        );
        console.log(subscription);

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
  //call database functions here
  returnedData.customer.fired &&
    console.log("this is the returned data", returnedData.customer.id);
  // let counter = 0;

  // function logCount() {
  //   counter++;
  //   console.log(`This function has been called ${counter} time(s).`);
  // }
  // logCount();
  // console.log("this is the returned data", returnedData);
  //send a post request to addUser in api/addUser.js
  // try {
  //   const res = await axios.post("http://localhost:3000/api/addUser", {
  //     customerId: returnedData.customer.id,
  //     email: returnedData.customer.email,
  //     name: returnedData.customer.name,
  //     // createdAt: returnedData.customer.createdAt,
  //     // delinquent: returnedData.customer.delinquent,
  //   });
  //   console.log(res);
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    const res = await axios.post("http://localhost:3000/api/addUser", {
      customerId: returnedData.customer.id,
      email: returnedData.customer.email,
      name: returnedData.customer.name,
      createdAt: returnedData.customer.createdAt,
      delinquent: returnedData.customer.delinquent,
    });
    console.log(res);
    console.log("addd meeeeee");
  } catch (err) {
    console.log(err);
  }
  console.log("log me " + returnedData.customer.name);
};

export default cors(webhookHandler);
