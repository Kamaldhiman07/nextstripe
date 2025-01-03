// This is your test secret API key.
const stripe = require("stripe")("sk_test_51JIVaHSIfk35L8nBZUeT35Kkc0KcNT4hqHcNxXKkWRO38In57TncoUDX9PAWM0y5igZGcxTm6AGHNQuLbOUduhlW00qQkEy5HY");

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    description: 'test payment',
    shipping: {
            'name': 'Jenny Rosen',
            'address': {
            'line1': '510 Townsend St',
            'postal_code': '98140',
            'city': 'San Francisco',
            'state': 'CA',
            'country': 'US',
            },
        },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

};
