const express = require('express')
const app = express()
//const stripe = require('stripe')('sk_test_4d2d71YdjTMjxJJVknsPJcvO')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3003

var braintree = require("braintree");
//var customerId = ""

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   'k2z7jdk8znqf6y3p',
  publicKey:    'kg47c9snxby9prwm',
  privateKey:   '9530676083d31b2f88e43964cb59d18a'
});
// var gateway = braintree.connect({
//   environment:  braintree.Environment.Sandbox,
//   merchantId:   'k2z7jdk8znqf6y3p',
//   publicKey:    'kg47c9snxby9prwm',
//   privateKey:   '9530676083d31b2f88e43964cb59d18a'
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended : true
}))


app.listen(PORT, ()=>{
    console.log("Server up and listening on port: " + PORT)
})



app.get('/',(req,res)=>{
    res.send('This is my app! Hell yeah!')
})

app.post("/client_token", function (req, res){
  console.log("Client token generating...")
  var customerID = req.query.customerId

  gateway.clientToken.generate({
    customerId: customerID
  }, function (err, response) {
    if (err instanceof Error) {
      throw err;
    } else {
      console.log("TOKEN GENERATED")
      res.status(200).json(response.clientToken)
    }
  });
});

app.post("/create_customer", function (req, res){
  gateway.customer.create({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email
  }, function (err, result) {
    if (err instanceof Error) {
      throw err;
    } else {
      res.status(200).json(result.customer.id)
    }
  });
})

app.post("/checkout", function (req, res) {
  var nonce = req.query.paymentMethodNonce;
  var amount = req.query.amount;

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (err instanceof Error) {
      throw err;
    } else {
      res.status(200).json(result)
    }
  });
});
/*
app.post('/ephemeral_keys',(req,res)=>{
    const stripe_version = req.query.api_version
    console.log('Stripe Version: ' + stripe_version)
    if (!stripe_version) {
        res.status(400).end();
        return;
      }
      // This function assumes that some previous middleware has determined the
      // correct customerId for the session and saved it on the request object.
      stripe.ephemeralKeys.create(
        {customer: req.query.customerId},
        {stripe_version: stripe_version}
      ).then((key) => {
        res.status(200).json(key);
      }).catch((err) => {
        console.log(err)
        res.status(500).end();
      });
})

app.post('/charge',(req,res)=>{
  
  const customer = req.body.customer
  const amount = req.body.amount
  const currency = req.body.currency

  const charge = stripe.charges.create ({
    customer: customer,
    amount: amount,
    currency: currency,
    description: 'Example charge'
  }, function(err,charge){
    if (err){
      console.log(err)
      res.status(500).end()
    } else { 
      res.status(200).end()
    }
  })
})
*/